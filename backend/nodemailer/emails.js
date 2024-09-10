import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { sendEmail } from "./nodemailer.js";

// Verification Email
export const sendVerificationEmail = (to, verificationToken) => {
    sendEmail({
        to,
        subject: "Email Verification",
        text: "Heres your verification code to complete your sign up. This code will expire in 10 minutes. Please enter this code to complete the verification process. Thank you for choosing",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
    });
};

// Welcome Email
export const sendWelcomeEmail = (to, username) => {
    sendEmail({
        to,
        subject: "Welcome Email✌️",
        text: "Welcome to Socialize!!",
        html: WELCOME_EMAIL_TEMPLATE.replace("[User's Name]", username)
    });
};