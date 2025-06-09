import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../models/User.js'
import 'dotenv/config'
import {sendResponse} from '../utils/sendResponse.js'

export async function auth(req, res, next){
    try{
        // Check the req.body in details from here:- You logged error that couldn't get fixed
        // console.log("Request got is", req.body)
        const token = req.cookies?.token 
                        || req.body?.token 
                        || req.header("Authorization").replace("Bearer ", "")
        // If Token Is Missing                        
        // console.log("Token is", token)
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Is Missing"
            })
        }

        // console.log("Request user is", req.user)

        // Verifying the Present Token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("Decoded values are", decode)
            req.user = decode 
        }
        catch(err){
            return res.status(401).json({
                success: false,
                message: "Couldn't login properly",
                error: err.message 
            })
        }
        next()
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Error Occur while validating the token",
            error: err.message
        })
    }   
}


// Verifying for the Photographer
export async function isPhotographer(req, res, next){
    try{
        if(req.user.role !== "Photographer"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Photographer Only"
            })
        }
        next()
    }
    catch(err){
        console.log("Error Occured while verifying for photographer", err)
        return res.status(500).json({
            success: false,
            message: "User Role cannot Be verfied"
        })
    }
}

//Verifying for the customer
export async function isCustomer(req, res, next){
    try{
        if(req.user.role !== "Customer"){
            sendResponse(res, 401, false, "This is a protected route for Customer Only")
        }
    }
    catch(err){
        console.log("Error occured while verifying for Customer", err)
        sendResponse(res, 500, false, "User role cannot be verified")
    }
}

//Verifying for the admin
export async function isAdmin(req, res, next){
    try{
        if(req.user.role !== "Admin"){
            sendResponse(res, 401, false, "This is a protected route for Admin Only")
        }
    }
    catch(err){
        console.log("Error occured while verifying for Admin")
        sendResponse(res, 500, false, "User Role Cannot be verified")
    }
}