import nodemailer from "nodemailer";

export const emailAdapter = {


     async sendEmail(email:string,subject:string,html:string) {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });


          transporter.sendMail({
            from: 'Blog API',
            to: email,
            subject: subject,
            text: 'Blog API',
            html: html, // HTML body
        }).then();


    }





}