import express from 'express'
const router = express.Router()
import { auth } from '../middlewares/auth.js';
import { deleteAccount, getProfile, updateAdditonalProfile, updateDisplayPicture, updateProfile } from "../controllers/Profile.js";

router.post("/updateProfile", auth, updateProfile)
router.post("/updateAdditionalProfile", auth, updateAdditonalProfile);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getProfile", auth, getProfile);
router.patch("/updateDisplayPicture", auth, updateDisplayPicture);

const profileRoutes = router ;
export default profileRoutes ;

