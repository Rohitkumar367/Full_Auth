
import createTransporter from "./nodemailerConfig.js";
import dotenv from 'dotenv'
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
dotenv.config();

export const sendVerificationEmail =  async (userEmail, verificationToken) =>{

    const transporter = await createTransporter();

    try {
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Email verification',
            text: 'Hello to myself!',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        };
    
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Email sent successfully', info.messageId);
        });
    } catch (error) {
        console.log("Error sending verification", error);
        throw new Error(`Error sending verification code: ${error}`)
    }

}

export const sendWelcomeEmail = async (userEmail, name) => {

    const transporter = await createTransporter();

    try {
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Welcome Email',
            text: 'Hello to myself!',
            html: WELCOME_EMAIL_TEMPLATE.replace("{user_name}", name)
        };
    
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Welcome email send successfully', info.messageId);
        });
    } catch (error) {
        console.log("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`)
    }
}

