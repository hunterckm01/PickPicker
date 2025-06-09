import cloudinary from 'cloudinary'
import 'dotenv/config'

export default async function cloudinaryConnect(){
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
        console.log("Cloudiary Connected Successully")
    }
    catch(err){
        console.log("Error found while connecting to Cloudinary")
        console.error(err)
    }
}