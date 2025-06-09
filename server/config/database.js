import mongoose from 'mongoose'
// import { connect } from 'mongoose'
import 'dotenv/config'

export default async function dbConnect() {
    try{
        // console.log(process.env.DATABASE_URL)
        // console.log(typeof(process.env.DATABASE_URL))
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database Connection Established")
    }
    catch(err){
        console.log("Error Occured while connecting to the databse")
        console.error(err)
        process.exit(1)
    }
}