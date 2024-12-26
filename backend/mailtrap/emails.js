
import { VERIFICATION_EMAIL_TEMPLATE } from "../nodemailer/emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrapConfig.js"


export const sendVerificationEmail = async (email, verificationToken) => {

    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.log(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`)
    }

}


export const sendWelcomeEmail = async (email, name) => {

    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            template_uuid: "ccde9891-3d68-4021-bb41-0625aaac225c",
            template_variables: {
                "company_info_name": "FITNESS CLUB",
                "name": name
            }
        })
        console.log("Welcome email send successfully", response);
    } catch (error) {
        console.log(`Error sending welcom email`, error);
        throw new Error(`Error sending welcome email: ${error}`)
    }
}
