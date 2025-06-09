import express from 'express'
const router = express.Router()

import {
  createClient,
  deleteClient,
  deleteAllClient,
  updateClient,
  getAllClient,
} from "../controllers/Client.js";
import {auth, isPhotographer} from '../middlewares/auth.js'
auth

router.post("/createClient", auth, isPhotographer, createClient)

router.put("/updateClient", updateClient)

router.delete("/deleteClient", auth, isPhotographer, deleteClient);
router.delete("/deleteAllClient", auth, isPhotographer, deleteAllClient);

router.get("/getAllClients", auth, isPhotographer, getAllClient)

const clientRoutes = router
export default clientRoutes