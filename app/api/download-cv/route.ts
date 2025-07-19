// app/api/download-cv/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

interface DownloadStats {
  count: number;
  lastDownload: string;
}

// Type for error responses
interface ErrorResponse {
  error: string;
  message: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
     console.log("📥 Download CV API hit");
    // Get query parameters (optional: for analytics or different CV versions)
    const { searchParams } = new URL(request.url);
    const version = searchParams.get('version') || 'default';
    const format = searchParams.get('format') || 'pdf';

    // Define file paths based on version
    const fileName = `my-cv-${version}.${format}`;
    const filePath = path.join(process.cwd(), 'public', 'cv', fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      const errorResponse: ErrorResponse = {
        error: 'FILE_NOT_FOUND',
        message: `CV file not found: ${fileName}`
      };
      
      return NextResponse.json(errorResponse, { 
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath);
    const fileStats = fs.statSync(filePath);

    // Optional: Track download analytics (simple file-based approach)
    await trackDownload(fileName);

    // Get client IP for logging (optional)
    const clientIP = getClientIP(request);
    console.log(`CV downloaded: ${fileName} by IP: ${clientIP} at ${new Date().toISOString()}`);

    // Determine content type based on format
    const contentTypes: Record<string, string> = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };

    const contentType = contentTypes[format] || 'application/octet-stream';

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="Portfolio_CV_${version}.${format}"`,
        'Content-Length': fileStats.size.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Last-Modified': fileStats.mtime.toUTCString(),
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    });

  } catch (error: unknown) {
    console.error('Error in CV download API:', error);
    
    const errorResponse: ErrorResponse = {
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to process CV download request'
    };

    return NextResponse.json(errorResponse, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Optional: Handle POST requests for analytics
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { action, metadata } = body;

    if (action === 'track-view') {
      // Track when someone views the CV button (not downloads)
      console.log('CV button viewed:', metadata);
      
      return NextResponse.json({ 
        success: true, 
        message: 'View tracked' 
      });
    }

    return NextResponse.json({ 
      error: 'INVALID_ACTION',
      message: 'Invalid action specified' 
    }, { status: 400 });

  } catch (error: unknown) {
    console.error('Error in CV analytics API:', error);
    
    return NextResponse.json({ 
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to process analytics request' 
    }, { status: 500 });
  }
}

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// Helper function to track downloads (simple file-based approach)
async function trackDownload(fileName: string): Promise<void> {
  try {
    const statsPath = path.join(process.cwd(), 'data', 'download-stats.json');
    const statsDir = path.dirname(statsPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(statsDir)) {
      fs.mkdirSync(statsDir, { recursive: true });
    }

    let stats: Record<string, DownloadStats> = {};

    // Read existing stats
    if (fs.existsSync(statsPath)) {
      const statsData = fs.readFileSync(statsPath, 'utf-8');
      stats = JSON.parse(statsData);
    }

    // Update stats
    if (!stats[fileName]) {
      stats[fileName] = {
        count: 0,
        lastDownload: new Date().toISOString()
      };
    }

    stats[fileName].count += 1;
    stats[fileName].lastDownload = new Date().toISOString();

    // Write updated stats
    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));

  } catch (error) {
    console.error('Error tracking download:', error);
    // Don't throw error - tracking failure shouldn't break download
  }
}

// Optional: Get download statistics
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      const statsPath = path.join(process.cwd(), 'data', 'download-stats.json');
      
      if (!fs.existsSync(statsPath)) {
        return NextResponse.json({ 
          message: 'No download statistics available',
          stats: {}
        });
      }

      const statsData = fs.readFileSync(statsPath, 'utf-8');
      const stats = JSON.parse(statsData);

      return NextResponse.json({ 
        message: 'Download statistics retrieved successfully',
        stats 
      });
    }

    return NextResponse.json({ 
      error: 'INVALID_ACTION',
      message: 'Invalid action specified' 
    }, { status: 400 });

  } catch (error: unknown) {
    console.error('Error retrieving stats:', error);
    
    return NextResponse.json({ 
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to retrieve statistics' 
    }, { status: 500 });
  }
}