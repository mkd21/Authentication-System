

import dotenv from "dotenv";
dotenv.config();

import {Resend} from "resend";


if(!process.env.RESEND_API_KEY)
{
    throw new Error("missing resend api key");
}


const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async({to , subject , html}) =>{

    const {data , error} = await resend.emails.send({

        from : process.env.SENDER_EMAIL || "no-reply@example.com",
        to : [to],
        subject,
        html
    });

    if(error) throw error;
    
    return data;

}

export default sendEmail;