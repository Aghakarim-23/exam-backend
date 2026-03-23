import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("❌ SMTP verify xətası:", err);
  else console.log("✅ SMTP server işləyir");
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📌 Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"Aghakarim Hamidzada" <support@aghakarim.info>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email göndərildi:", info.response);
    return true;
  } catch (err) {
    console.error("❌ Email göndərmə xətası:", err);
    return false;
  }
};
