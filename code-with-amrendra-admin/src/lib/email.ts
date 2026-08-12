export interface SendPasswordResetEmailParams {
  email: string;
  name?: string | null;
  resetUrl: string;
  expiresMinutes?: number;
}

export async function sendPasswordResetEmail({
  email,
  name,
  resetUrl,
  expiresMinutes = 30,
}: SendPasswordResetEmailParams): Promise<{ success: boolean; messageId?: string }> {
  const recipientName = name || 'Admin';
  const fromEmail = process.env.EMAIL_FROM || 'Code with Amrendra <noreply@codewithamrendra.in>';
  const resendApiKey = process.env.RESEND_API_KEY;

  const subject = 'Reset your CWA CMS password';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6fc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 40px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); }
          .logo { font-size: 18px; font-weight: 800; color: #4f46e5; margin-bottom: 24px; display: inline-block; text-decoration: none; }
          h1 { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 12px; }
          p { font-size: 14px; line-height: 1.6; color: #475569; margin: 12px 0; }
          .button-wrap { text-align: center; margin: 32px 0; }
          .button { display: inline-block; background-color: #4f46e5; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25); }
          .footer { font-size: 12px; color: #94a3b8; border-t: 1px solid #f1f5f9; padding-top: 20px; margin-top: 32px; text-align: center; }
          .warning { font-size: 12px; color: #64748b; background: #f8fafc; border-left: 3px solid #4f46e5; padding: 12px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">Code with Amrendra CMS</div>
          <h1>Reset your password</h1>
          <p>Hello ${recipientName},</p>
          <p>We received a request to reset the password for your CWA CMS account.</p>
          
          <div class="button-wrap">
            <a href="${resetUrl}" class="button" target="_blank">Reset Password</a>
          </div>

          <div class="warning">
            ⏳ <strong>This link will expire in ${expiresMinutes} minutes.</strong>
          </div>

          <p>If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>

          <div class="footer">
            © ${new Date().getFullYear()} Code with Amrendra. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `Hello ${recipientName},\n\nWe received a request to reset the password for your CWA CMS account.\n\nUse the link below to reset your password:\n${resetUrl}\n\nThis link will expire in ${expiresMinutes} minutes.\n\nIf you did not request this reset, please ignore this email.\n\n© ${new Date().getFullYear()} Code with Amrendra`;

  // 1. Send via Resend HTTP API if configured
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          subject,
          html: htmlContent,
          text: textContent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, messageId: data.id };
      } else {
        const errData = await res.json();
        console.error('Resend Email Error:', errData);
      }
    } catch (err) {
      console.error('Failed to send email via Resend:', err);
    }
  }

  // 2. Development Mode Console Logger Fallback
  console.log('\n============================================================');
  console.log('🔑 CWA CMS PASSWORD RESET LINK (LOCAL / DEV MODE)');
  console.log(`To: ${email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Reset URL: ${resetUrl}`);
  console.log(`Expires In: ${expiresMinutes} minutes`);
  console.log('============================================================\n');

  return { success: true };
}
