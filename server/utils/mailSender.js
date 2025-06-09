import nodemailer from 'nodemailer'
import 'dotenv/config'

const mailSender = async(email, title, message) => {
    try{
        console.log("reached mail sender")
        console.log(email, title, message);
        // console.log(process.env.MAIL_HOST, process.env.MAIL_USER, process.env.MAIL_PASS)
        let transporter =  nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        await transporter.verify()
        console.log("Server is Ready to deliever messages")

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: `${email}`,
            subject: `${title}`,
            html: `${message}`
        })

        console.log("Info Get is", info)
        return info ;
    }
    catch(err){
        console.log("Error Got while Sending Email", err.message)
    }
}

export default mailSender ;

