import { Resend } from 'resend';
import { NextRequest } from 'next/server';

// สร้าง resend instance โดยเช็คว่ามี API key หรือไม่
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('API Key length:', process.env.RESEND_API_KEY?.length);
    console.log('Resend instance:', !!resend);
    const { name, email, subject, message } = body;

    // Validation - เช็คข้อมูลที่จำเป็น
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, อีเมล, ข้อความ)' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // เช็ครูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'รูปแบบอีเมลไม่ถูกต้อง' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // เช็คว่ามี API key หรือไม่
    if (!process.env.RESEND_API_KEY || !resend) {
      // Mode สำหรับ development - ไม่ส่งเมลจริง
      console.log('Email Mock Mode - ข้อความที่ได้รับ:', {
        name,
        email,
        subject: subject || 'ไม่ระบุหัวข้อ',
        message,
        timestamp: new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })
      });

      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'ส่งข้อความเรียบร้อยแล้ว! (Mock Mode)',
          note: 'ระบบอีเมลยังไม่ได้เปิดใช้งาน'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // ส่งอีเมลจริงผ่าน Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.RECIPIENT_EMAIL || 'wattanai.yodc@gmail.com'], // เปลี่ยนเป็น email ของคุณ
      subject: subject || `ข้อความใหม่จาก ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 25px;">
              <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">📧 ข้อความใหม่จากเว็บไซต์</h1>
            </div>
            
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 8px 0; color: #1565c0;"><strong>👤 ชื่อ:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #1565c0;"><strong>📧 อีเมล:</strong> ${email}</p>
              ${subject ? `<p style="margin: 8px 0; color: #1565c0;"><strong>📌 หัวข้อ:</strong> ${subject}</p>` : ''}
              <p style="margin: 8px 0; color: #1565c0;"><strong>🕐 ส่งเมื่อ:</strong> ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</p>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
              <h3 style="color: #2c3e50; margin-top: 0;">💬 ข้อความ:</h3>
              <div style="line-height: 1.6; color: #495057; white-space: pre-line;">${message}</div>
            </div>

            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                📝 ข้อความนี้ส่งมาจากฟอร์มติดต่อในเว็บไซต์ Portfolio ของคุณ
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email, // ตอบกลับไปที่อีเมลของผู้ส่ง
    });

    if (error) {
      console.error('Resend API Error:', error);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่อีกครั้งภายหลัง' 
        }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด',
        id: data?.id 
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}