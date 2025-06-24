//ES6 WAY TO IMPORT
import express from 'express'
import 'dotenv/config'  
import dbConnect from './config/database.js'
import cloudinaryConnect from './config/cloudinary.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import cors from 'cors'

// Routes Import
import userRoutes from './routes/User.js'
import clientRoutes from './routes/Client.js'
import galleryRoutes from './routes/Gallery.js'
import profileRoutes from './routes/Profile.js'



const picApp = express()
const PORT = process.env.PORT || 4001


//MIDDLEWARES :- IF ERROR OCCURED MOVE IT ABOVE CLOUDINARY CONNECT
picApp.use(express.json())
// DATABASE CONNECTION
dbConnect();
//CLOUDINARY CONNECTION 
cloudinaryConnect();
picApp.get('/', (req, res)=>{
    // console.log("cookies are", req.cookies)
    return res.json({
        success: true,
        message: "Pick Picker Backend Started"
    })
})

// FOR PARSING THE COOKIES
picApp.use(cookieParser());
//CORSE
picApp.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
)
//FILE UPLOAD
picApp.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

//Routes For Handling 
picApp.use("/api/v1/auth", userRoutes);
picApp.use("/api/v1/client", clientRoutes);
picApp.use("/api/v1/gallery", galleryRoutes)
picApp.use("/api/v1/profile", profileRoutes);

//SERVER LISTEN PORT
picApp.listen(PORT, '0.0.0.0', ()=>{
    console.log(`Pic Picker Started on ${PORT}`)
})