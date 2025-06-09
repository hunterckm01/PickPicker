import User from '../models/User.js'
import Otp from '../models/Otp.js'
import AdditionalDetails from '../models/AdditionalDetails.js'
// const Otp = require("../models/Otp")
import 'dotenv/config'
import otpGenerator from 'otp-generator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {sendErrorResponse, sendResponse, sendSuccessResponse} from '../utils/sendResponse.js'
import mailSender from '../utils/mailSender.js'

// Send Otp Method  :- Mail Sender Implementation is Pending
export async function sendOtp(req, res){
    try{
        console.log("Reeached herer")
        const {email} = req.body ;

        const checkUserPresent = await User.findOne({email})

        // CHECK IF THE ALREADY IS USER PRESENT
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User Already Exist"
            })
        }

        //Generate random otp :- You can change otp to lowercase and uppercase too later on if you want to

        var otpCreated = otpGenerator.generate(5, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })

        console.log("Otp Generated", otpCreated);

        var result = await Otp.findOne({ otp: otpCreated });

        // Checks if otp is already present in the database
        while(result){
            otpCreated = otpGenerator.generate(5, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            result = await Otp.findOne({ otp: otpCreated})
        }

        console.log("Otp Generated is Unique", result)
        
        const otpPayload = {email:email, otp:otpCreated}
        //Crate an Entry for Otp in Otp Database
        
        await Otp.create(otpPayload)

        res.status(200).json({
            success: true,
            message: "Otp Generated Successully",
            otpCreated
        })
    }
    catch(err){
        console.log("Error Occured while creating Otp", err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//Sign UP Controller :- Mail Sender Implementation is Pending
export async function signUp(req, res){
    try{
        const {
          studioName,
          accountType = "Photographer",
          firstName,
          lastName,
          email,
          password,
          confirmPsd,
          otp,
        } = req.body; ;

        console.log(
          studioName,
          firstName,
          lastName,
          email,
          password,
          confirmPsd,
          otp
        );

        // Check for Required Fields
        if(!studioName || !firstName || !lastName || !email || !password || !confirmPsd || !otp){
            res.status(400).json({
                success: false,
                message: "All Fields are required"
            })
        }

        // Check For Existing Order
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            throw new Error("User Already Exist, Please Login")
        }

        // Match Both Passwords that get are same or not
        if(password !== confirmPsd){
            throw new Error("All Fields are Required")
        }

        // Find the most Recent Otp Assosciated with the account
        const userOtp = await Otp.findOne({email}).sort({createAt: -1}).limit(1);

        // Otp Validation
        console.log(userOtp);
        if(!userOtp){
            return res.status(400).json({
                success: false,
                message: "Cannot Find Otp"
            })
        }
        else if(otp !== userOtp.otp){
            return res.status(400).json({
                success: false,
                message: "Otp Does not matched"
            })
        }

        //Hash the password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        //Create Entry for the Photographer in database
        const additionalDetails = await AdditionalDetails.create({
            gender: null,
            dateOfBirth: null,
            about: null, 
            contactNumber: null
        })

        console.log("Reached after Profile Creation");
        const user = await User.create({
            studioName,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetails: additionalDetails._id,
            accountType,
            image: `https://api.dicebear.com/9.x/initials/svg?radius=10&seed=${firstName} ${lastName}`
        })

        await mailSender(
            email,
            "You have signed up successfully for Pic Picker",
            `<html>
            <body>
            <p>Dear ${firstName} you have successfully Signed Up for Pic Picker</p>
            <p>Please Login with Us to complete your Projects</p>
            <p>Best Regards</p>
            <p>Pick Picker Team</p>
            </body>
            </html>
            `
        )



        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: user
        })
    }
    catch(err){
        console.log("Error Occured While Creating the user", err)
        return res.status(500).json({
            success: false,
            message: "User Cannot be Registered",
            error: err.message
        })
    }
}

//Login Controller
export async function login(req, res){
    try{
        const {email, password} = req.body ;

        // Validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All Fields are Required while login",
                error: err.message
            })
        }

        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            console.log("User is Not Registered with Us")
            throw new Error("User is not registered with us, please sign in")
        }

        // console.log("Passwrod got is", password, user.password)
        const correctPsd = await bcrypt.compare(password, user.password)
        // console.log(correctPsd)
        
        if(correctPsd){
            const payload = {
                id: user._id,
                email: user.email,
                role: user.accountType           
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "3h"})

            user.token = token ;
            user.password = undefined ;

            const options = {
                expires: new Date(Date.now() + 3*60*60*1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully"
            })
        }
        else{
            sendResponse(res, 500, false, "Password is Incorrect")
        }
    }
    catch(err){
        console.log("Login Failed")
        return res.status(500).json({
            success: false,
            message: "Login Failed, Please Try Again",
            error: err.message
        })
    }
}

// Change Password Controller
export async function changePassword(req, res){
    try{
        const photographerId = req.user.id ;
        if(!photographerId){
            console.log("Could not get any photographer id")
            return sendErrorResponse(res, 401, "Could not get the photographer id")
        }
        
        const {oldPassword, newPassword} = req.body ;

        if(!oldPassword || !newPassword){
            console.log("Did not get old or new password")
            return sendErrorResponse(
              res,
              401,
              "Did not get old or new password"
            );
        }

        const photographerDetails = await User.findById(photographerId);
        

        //Check If the password matches
        if(!await bcrypt.compare(oldPassword, photographerDetails.password)){
            console.log("Passwords do not matched")
            return sendErrorResponse(res, 400, "Passwords do not matched")
        }

        const saltRounds = 12 ;
        const encryptedPsd = await bcrypt.hash(newPassword, saltRounds)

        photographerDetails.password = encryptedPsd;
        photographerDetails.save()

        try{
            await mailSender(photographerDetails.email, "Your Password has been changed for Pic Picker", 
                `<html>
                <body>
                <h3>Pic Picker Update</h3>
                <p>Your Password for Pick Picker is changed</p>
                <p>Regards
                    Pick Picker Team
                </p>
                </body>
                </html>
                `
            )
            console.log("Mail has been sent for changing password")
        }
        catch(err){
            console.log("Error occured while sending male for change password")
        }

        return sendSuccessResponse(res, 201, "Password has been changed successfully")

    }
    catch(err){
        console.log("Error Got while changing password")
        return sendErrorResponse(res, 500, {error: err.message})
    }
}