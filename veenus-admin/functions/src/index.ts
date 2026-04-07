import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import { defineString } from "firebase-functions/params";

admin.initializeApp();

const gmailUser = defineString("GMAIL_USER");
const gmailAppPassword = defineString("GMAIL_APP_PASSWORD");

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser.value(),
        pass: gmailAppPassword.value(),
      },
    });
  }
  return transporter;
}

export const sendPasswordResetEmail = onCall(
  { cors: true },
  async (request) => {
    const email = request.data?.email;

    if (!email || typeof email !== "string") {
      throw new HttpsError("invalid-argument", "Email is required.");
    }

    // Verify the email belongs to an existing user
    try {
      await admin.auth().getUserByEmail(email);
    } catch {
      // Don't reveal if user exists or not for security
      return { success: true };
    }

    // Generate password reset link from Firebase
    const firebaseResetLink = await admin.auth().generatePasswordResetLink(
      email,
      { url: "https://veenuskleding.com" }
    );

    // Extract oobCode from Firebase link and build our own domain link
    // This avoids the firebaseapp.com domain which triggers spam filters
    const url = new URL(firebaseResetLink);
    const oobCode = url.searchParams.get("oobCode");
    const resetLink = `https://veenuskleding.com/reset-password?oobCode=${oobCode}`;

    // Plain text version (critical for deliverability)
    const textContent = [
      `Hi there,`,
      ``,
      `You requested a password reset for your Veenus Kleding account (${email}).`,
      ``,
      `Reset your password here: ${resetLink}`,
      ``,
      `If you did not request this, please ignore this email.`,
      `This link expires in 1 hour.`,
      ``,
      `- Veenus Kleding`,
      `  https://veenuskleding.com`,
    ].join("\n");

    // Send email via Gmail SMTP
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Veenus Kleding" <${gmailUser.value()}>`,
      replyTo: gmailUser.value(),
      to: email,
      subject: "Your password reset link",
      text: textContent,
      html: `
<p>Hi there,</p>
<p>You requested a password reset for your Veenus Kleding account (${email}).</p>
<p>Click below to choose a new password:</p>
<p><a href="${resetLink}" style="display:inline-block;padding:12px 28px;background:#000;color:#fff;text-decoration:none;border-radius:4px;">Reset Password</a></p>
<p>Or copy and paste this link into your browser:<br>${resetLink}</p>
<p style="color:#888;font-size:13px;">If you did not request this, you can ignore this email. The link expires in 1 hour.</p>
<p>Veenus Kleding<br><a href="https://veenuskleding.com">veenuskleding.com</a></p>
      `.trim(),
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Veenus Kleding",
      },
    };

    try {
      await getTransporter().sendMail(mailOptions);
    } catch (error) {
      console.error("Failed to send password reset email:", error);
      throw new HttpsError("internal", "Failed to send password reset email.");
    }

    return { success: true };
  }
);
