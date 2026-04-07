"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const nodemailer = __importStar(require("nodemailer"));
const params_1 = require("firebase-functions/params");
admin.initializeApp();
const gmailUser = (0, params_1.defineString)("GMAIL_USER");
const gmailAppPassword = (0, params_1.defineString)("GMAIL_APP_PASSWORD");
let transporter = null;
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
exports.sendPasswordResetEmail = (0, https_1.onCall)({ cors: true }, async (request) => {
    var _a;
    const email = (_a = request.data) === null || _a === void 0 ? void 0 : _a.email;
    if (!email || typeof email !== "string") {
        throw new https_1.HttpsError("invalid-argument", "Email is required.");
    }
    // Verify the email belongs to an existing user
    try {
        await admin.auth().getUserByEmail(email);
    }
    catch (_b) {
        // Don't reveal if user exists or not for security
        return { success: true };
    }
    // Generate password reset link from Firebase
    const firebaseResetLink = await admin.auth().generatePasswordResetLink(email, { url: "https://veenuskleding.com" });
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
    const mailOptions = {
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
    }
    catch (error) {
        console.error("Failed to send password reset email:", error);
        throw new https_1.HttpsError("internal", "Failed to send password reset email.");
    }
    return { success: true };
});
//# sourceMappingURL=index.js.map