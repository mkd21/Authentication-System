
import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.SENDER_EMAIL,
        pass : process.env.APP_PASSWORD
    }
});

export default transporter;