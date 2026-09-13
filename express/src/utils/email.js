import nodemailer from "nodemailer";
import "dotenv/config";
import emailTemplate from "../template/emailTemplate.js";

export default async function sendMail(name , email , subject  , html , text = undefined) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // STARTTLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Example Team" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            html: html,
            text : text
        });


    } catch (err) {
        throw new Error(err.message)
    }
}