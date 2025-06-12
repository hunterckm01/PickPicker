import express from 'express'
const router = express.Router()

import { createGallery, updateGallery, deleteGallery, addClientsToGallery, addImagesToGallery, fetchImagesFromGallery, getAllFolders, shareCode, getClientImages, downloadGalleryImages, getGalleryDetails } from '../controllers/Gallery.js'
import { auth, isPhotographer } from '../middlewares/auth.js'

router.get("/getGalleryDetails", auth, getGalleryDetails)

router.post("/createGallery", auth, isPhotographer, createGallery);

router.put("/updateGallery", auth, isPhotographer, updateGallery);

router.post("/deleteGallery", auth, isPhotographer, deleteGallery);

router.post("/addClientToGallery", auth, isPhotographer, addClientsToGallery)

router.post("/addImagesToGallery", auth, isPhotographer, addImagesToGallery);

router.get("/fetchImages", fetchImagesFromGallery)

router.get("/getAllFolders", auth, isPhotographer, getAllFolders)

// New From Here
router.post("/:id/share", shareCode)

router.get("/:id/images", getClientImages)

router.get("/:id/download", downloadGalleryImages)

const galleryRoutes = router ;
export default galleryRoutes ;