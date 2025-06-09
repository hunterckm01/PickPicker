import express from 'express'
const router = express.Router()

import {sendOtp, login, signUp, changePassword} from '../controllers/Auth.js'
import { auth } from '../middlewares/auth.js'
// import sendOtp from '../controllers/Auth'

router.post('/sendOtp', sendOtp)
router.post("/signUp", signUp)
router.post("/login", login)
router.patch("/changePassword", auth, changePassword);

const userRoutes = router 
export default userRoutes ;