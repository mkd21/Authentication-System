

import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({

    host : "smtp-relay.brevo.com",
    port : 587,
    secure : false,
    auth : {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS
    }

});


const sendEmail = async({to , subject , html}) =>{

    try 
    {
        const info = await transporter.sendMail({
            from : ` "Auth App" <${process.env.SENDER_EMAIL}>`,
            to,
            subject,
            html
        });

        console.log("Email sent:", info.messageId);
        return info;
    }
    catch(err)
    {
        console.error("EMAIL ERROR:", err);
        throw new Error(err.message);
    }

}

export default sendEmail;