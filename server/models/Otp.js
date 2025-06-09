import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60
    }
})

async function sendOtpToEmail(email, otp){
    try{
        const mailResponse = await mailSender(
          email,
          "Otp to Verify your Activity",
          `<html>
            <head></head>
            <body>
            <p>Verification Email From Pic Picker</p>
            <p>Your Otp is ${otp}</p><hr/>
            <p>Please Use the Otp to verify yourself</p>
            </body>
            </html>
            `
        );
        console.log("Email has been sent successfully", mailResponse)
    }
    catch(err){
        console.log("Error emerged while sending the email")
        throw err ;
    }
}

otpSchema.pre("save", async function(next){
    try{
        await sendOtpToEmail(this.email, this.otp)
        next();
    }
    catch(err){
        console.log("Error while sending Otp to email", err)
        next(err);
    }
})

const Otp = mongoose.model("Otp", otpSchema)
export default Otp ;