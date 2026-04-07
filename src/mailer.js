import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send contact form email to portfolio owner
 */
export async function sendContactEmail({ name, email, message }) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    subject: `New message from ${name} — Portfolio`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0a0a0f;color:#e5e7eb;padding:32px;border-radius:12px;border:1px solid #1f2937">
        <h2 style="color:#00f5d4;margin-top:0">New Portfolio Contact</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;color:#9ca3af;width:80px">Name</td>
            <td style="padding:8px 0;font-weight:600">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#9ca3af">Email</td>
            <td style="padding:8px 0"><a href="mailto:${email}" style="color:#00f5d4">${email}</a></td>
          </tr>
        </table>
        <hr style="border-color:#1f2937;margin:20px 0"/>
        <p style="color:#9ca3af;margin-bottom:8px">Message</p>
        <p style="background:#111827;padding:16px;border-radius:8px;border-left:3px solid #00f5d4;margin:0">${message.replace(/\n/g, "<br/>")}</p>
        <p style="color:#4b5563;font-size:12px;margin-top:24px">Sent from your portfolio contact form</p>
      </div>
    `,
  });
}

/**
 * Send auto-reply to the person who contacted
 */
export async function sendAutoReply({ name, email }) {
  await transporter.sendMail({
    from: `"Prashant Kumar" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Got your message — Prashant Kumar",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0a0a0f;color:#e5e7eb;padding:32px;border-radius:12px;border:1px solid #1f2937">
        <h2 style="color:#00f5d4;margin-top:0">Hey ${name} 👋</h2>
        <p>Thanks for reaching out. I've received your message and will get back to you within 24 hours.</p>
        <p style="color:#9ca3af">In the meantime, feel free to check out my projects on GitHub or connect on LinkedIn.</p>
        <hr style="border-color:#1f2937;margin:20px 0"/>
        <p style="margin:0;font-weight:600">Prashant Kumar</p>
        <p style="color:#9ca3af;margin:4px 0 0">Software Engineer · Node.js · TypeScript · Gen AI</p>
      </div>
    `,
  });
}
