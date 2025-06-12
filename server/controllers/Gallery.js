import User from "../models/User.js";
import Gallery from "../models/Gallery.js";
import {sendErrorResponse, sendResponse, sendSuccessResponse} from "../utils/sendResponse.js";
import "dotenv/config";
import { uploadImageToCloudinary, deleteFileFromCloudinary } from "../utils/imageUploader.js";
import 'dotenv/config'
import crypto from 'crypto'


// CREATE GALLERY
export async function createGallery(req, res) {
  try {
    const photographerId = req.user.id;
    if (!photographerId) {
      console.log("Could Not Get Photographer Id");
      return sendResponse(res, 403, false, "Could Not Get PhotographerId");
    }

    const { galleryName } = req.body;
    if (!galleryName) {
      console.log("Could Not Get Gallery Name");
      return sendResponse(res, 400, false, "Could Not Get Gallery Name", {
        error: err.message,
      });
    }

    // Creating Gallery
    const galleryDetails = await Gallery.create({
      galleryName,
      photographerID: photographerId,
    });

    // Finding The Photographer And Updating the Gallery

    await User.findByIdAndUpdate(
      { _id: photographerId },
      {
        $push: { galleryID: galleryDetails._id },
      },
      { new: true }
    );

    return sendResponse(res, 201, true, "Gallery Created Successfully", {
      data: galleryDetails,
    });
  } catch (err) {
    console.log("Error Occured while creating Gallery");
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: err.message,
    });
  }
}


// UPDATE GALLERY
export async function updateGallery(req, res) {
  try {
    const photographerId = req.user.id;
    if (!photographerId) {
      console.log("Could Not Get Photographer Id");
      return sendResponse(res, 403, false, "Could Not Get PhotographerId");
    }

    const { galleryId, galleryName } = req.body;
    if (!galleryId || !galleryName) {
      console.log("Could Not Get Any Gallery All Fields");
      return sendResponse(res, 400, false, "Could Not Get Gallery All Fields", {
        error: err.message,
      });
    }

    // Update The Gallery
    const galleryDetails = await Gallery.findByIdAndUpdate(
      { _id: galleryId },
      { galleryName },
      { new: true }
    );

    // Send the Success Response
    return sendResponse(res, 200, true, "Gallery Name Updated Successfully", {
      data: galleryDetails,
    });
  } catch (err) {
    console.log("Error Occured while Updating the Gallery");
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: err.message,
    });
  }
}


//DELETE GALLERY
export async function deleteGallery(req, res) {
  try {

    const photographerId = req.user.id;
    if (!photographerId) {
      console.log("Could Not Get Photographer Id");
      return sendResponse(res, 403, false, "Could Not Get PhotographerId");
    }
    
    // console.log(req.body)
    const {galleryId}  = req.body;
    console.log("Gallery id is", galleryId)
    if(!galleryId) {
      console.log("Could Not Get Any Gallery Id");
      return sendResponse(res, 400, false, "Could Not Get Gallery All Fields", { error: err.message});
    }


    // Delete the Gallery
    const galleryImages = await Gallery.findOne({_id: galleryId}).select("galleryImagesUrl");
    console.log("Gallery Images Url are", galleryImages)

    for(let imageUrl of galleryImages.galleryImagesUrl){
      console.log("Image url is", imageUrl);
      await deleteFileFromCloudinary(imageUrl, process.env.FOLDER_NAME)

      await Gallery.findByIdAndUpdate(galleryId,
        {
          $pull: {galleryImagesUrl: imageUrl}
        },
        {new: true}
      ).exec()
    }

    await Gallery.findByIdAndDelete(galleryId)

    // Delete the Gallery from Photographer Database
    await User.findByIdAndUpdate(
        photographerId, 
        {$pull: {galleryID: galleryId}}, 
        {new: true}
    )

    console.log("Gallery Deleted Successfully")
    return sendResponse(res, 200, true, "Successfully Deleted the Gallery")
  } 
  catch (err) {
    console.log("Error Occured while deleting the gallery")
    return sendResponse(res, 500, false, "Internal Server Error",
        {error: err.message}
    )
  }
}


//ADD CLIENTS TO GALLERY
export async function addClientsToGallery(req, res){
    try{
        const photographerId = req.user.id ;
        if(!photographerId){
            console.log("Could Not get the photographer id's")
            return sendResponse(res, 400, false, "Could Not get the photographers id")
        }

        const {clientId, galleryId} = req.body ;

        if(!clientId || !galleryId){
            console.log("Could Not Get All the required Fields")
            return sendResponse(res, 400, false, "Could Not Get the all Fields", {error: err.message})
        }

        // Check if Gallery already has other customer
        const galleryDetails = await Gallery.findById(galleryId)

        if(galleryDetails?.clientID){
            console.log("Client Is Already Added")
            return sendResponse(res, 400, false, "Could Not Add More Clients");
            // console.log("Not Completed")
        }

        //Joining client to gallery
        await Gallery.findByIdAndUpdate(
            {_id: galleryId},
            {clientID: clientId},
            {new: true}
        )

        console.log("Client Is Added Successfully to the Gallery")
        return sendResponse(res, 200, true, "Client is added Successfully")
    }
    catch(err){
        console.log("Could Not Add Client to the Gallery");
        return sendResponse(res, 400, false, "Client could not be added, Internal Server Error", {error: err.message});
    }
}


// ADD IMAGES TO GALLERY
export async function addImagesToGallery(req, res){
  try{
    const photographerId = req.user.id ;
    if(!photographerId){
      console.log("Photographer Id is not defined")
      return sendResponse(res, 400, false, "Cannot get photographer Id")
    }

    const {galleryId} = req.body ;
    console.log("Gallery id is", galleryId)
    if(!galleryId){
      console.log("Could not find Gallery Id")
      return sendResponse(res, 400, false, "Cannot get Gallery Id")
    }

    if(!await Gallery.exists({_id: galleryId, photographerID: photographerId})){
      console.log("Could not find the gallery Id or Photographer registered with the gallerId")
      return sendErrorResponse(res, 404, "Cannot Find the Gallery")
    }

    console.log("Reached here")
    const galleryImages = req.files.imageGallery ;
    // console.log("Cant able to reach here")
    console.log("Gallery Images length are", galleryImages.length)

    if(!galleryImages){
      console.log("Could not get any images")
      return sendResponse(res, 400, false, "Cannot Get any images")
    }
    
    // UPLOADING MULTIPLE IMAGES AT ONCE
    for(const image in galleryImages){
      const result = await uploadImageToCloudinary(
        galleryImages[image],
        process.env.FOLDER_NAME
      );
      console.log("Result after uploading images to the cloudinary", result)
      await Gallery.findByIdAndUpdate(
        galleryId, 
        {
          $push:{
            galleryImagesUrl: result.secure_url},
        },
        {new: true}
      )
    }

    // console.log("Result is", result)
    // // ADD THE URL TO THE DATABASE
    // await Gallery.findByIdAndUpdate(
    //   galleryId,
    //   {galleryImagesUrl: result},
    //   {new: true}
    // )

    // SUCCESSFULL COMPLETION OF UPLOADING ALL IMAGES
    return sendResponse(res, 200, true, "Images uploaded Successfully to the database")

  }
  catch(err){
    console.log("Error Occured while uploading images to gallery")
    return sendResponse(res, 400, false, "Cannot Add Images, Internal Server Error", {error: err.message})
  }
}


// GET ALL IMAGES OF THE GALLERY
export async function fetchImagesFromGallery(req, res){
  try{
    // const photographerId = req.user.id ;
    const {clientId, galleryId} = req.body ;

    if(!clientId || !galleryId){
      console.log("Required Id from user")
      return sendResponse(res, 401, false, "Need User Id To View Images", {error: err.messge})
    }

    // Might have to use find
    const galleryDetails = await Gallery.findOne(
      {_id: galleryId,
        clientID : clientId
      } 
    )

    if(!galleryDetails){
      return sendResponse(res, 404, false , "Could not get gallery with the id or client id")
    }

    console.log("Gallery Details are", galleryDetails)

    const galleryImages = galleryDetails?.galleryImagesUrl ;

    // Send A Successfull response
    return sendResponse(res, 200, true, "Gallery Images Got Successfully", {data: galleryImages})
  }
  catch(err){
    console.log("Error Occured while fetching images")
    return sendResponse(res, 400, false, "Internal Server Error", {error: err.message})
  }
}

//GET ALL GALLERIES IS PENDING
export async function getAllFolders(req, res){
  try{
    //PHOTOGRAPHER ID
    const photographerId = req.user.id ;
    //CHECK FOR THE FOLDERS 
    const folders = await Gallery.find({photographerID: photographerId}).populate("clientID").exec()

    if(!folders){
      return sendErrorResponse(res, 404, "Could not get any Folders")
    }
    console.log("Folders data is", folders)
    //RETURN THE FOLDERS
    return sendSuccessResponse(res, 200, "Got Photographers Folders", {data: folders})
  }
  catch(err){
    console.log("Error got while getting all folders", err.message)
    return sendErrorResponse(res, 500, "Internal Server Error", {error: err.message})
  }
}

// SHAREBALE CODE OF GALLERY
export async function shareCode(req, res){
  try{
    // const { galleryId } = req.body ;
    const galleryId = req.params.id ;

    const gallery = await Gallery.findById(galleryId)

    if(!gallery){
      return sendErrorResponse(res, 404, "Could not find the gallery", {error: err.message})
    }

    const shareCode = crypto.randomInt(100000, 999999).toString()

    const expiresAt = Date.now() + 3*24*60*60*1000 //Expires after 3 days

    gallery.shareCode = shareCode ;
    gallery.shareCodeExpiresAt = expiresAt ;
    await gallery.save()

    res.json({
      link: `http://localhost:5173/preview/${gallery._id}?code=${shareCode}`,
    });

  }
  catch(err){
    console.log("Internal Server Error", err.message);
    return sendErrorResponse(res, 500, "Internal Server Error", {
      error: err.message,
    });
  }
}

export async function getClientImages(req, res){
  try{
    console.log("yes the work is done")
    console.log("In the get client images")
    const {id} = req.params ;
    const {code} = req.query ;

    const gallery = await Gallery.findById(id)
    if(!gallery){
      return sendErrorResponse(res, 404, "Could not found the gallery")
    }

    console.log("Gallery data is", gallery)

    if(gallery.shareCode !== code ||
      !gallery.shareCodeExpiresAt ||
      gallery.shareCodeExpiresAt < Date.now()
    ){
      return sendErrorResponse(res, 401, "Invalid or expired Code")
    }

    res.json({
      images: gallery.galleryImagesUrl
    })
  }
  catch(err){

  }
}