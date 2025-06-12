import express from 'express'
const router = express.Router()

import { createGallery, updateGallery, deleteGallery, addClientsToGallery, addImagesToGallery, fetchImagesFromGallery, getAllFolders } from '../controllers/Gallery.js'
import { auth, isPhotographer } from '../middlewares/auth.js'

router.post("/createGallery", auth, isPhotographer, createGallery);

router.put("/updateGallery", auth, isPhotographer, updateGallery);

router.post("/deleteGallery", auth, isPhotographer, deleteGallery);

router.post("/addClientToGallery", auth, isPhotographer, addClientsToGallery)

router.post("/addImagesToGallery", auth, isPhotographer, addImagesToGallery);

router.get("/fetchImages", fetchImagesFromGallery)

router.get("/getAllFolders", auth, isPhotographer, getAllFolders)

const galleryRoutes = router ;
export default galleryRoutes ;