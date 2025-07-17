import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, อีเมล, ข้อความ)' }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'รูปแบบอีเมลไม่ถูกต้อง' }), { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [process.env.RECIPIENT_EMAIL || 'example@example.com'],
      subject: subject || 'ข้อความใหม่จากเว็บไซต์',
      html: `
        <h2>ข้อความจาก ${name}</h2>
        <p><strong>อีเมล:</strong> ${email}</p>
        <p><strong>หัวข้อ:</strong> ${subject}</p>
        <p><strong>ข้อความ:</strong><br>${message}</p>
        <p><strong>ส่งเมื่อ:</strong> ${new Date().toLocaleString('th-TH', {
          timeZone: 'Asia/Bangkok',
        })}</p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่อีกครั้ง' }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: 'ส่งข้อความเรียบร้อยแล้ว!', id: data?.id }), {
      status: 200,
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' }), {
      status: 500,
    });
  }
}
