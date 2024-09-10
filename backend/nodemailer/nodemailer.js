import nodemailer from "nodemailer";

// Reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

// Send generic email (common function)
export const sendEmail = async (options) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html, // for sending HTML formatted emails
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
