import AdditionalDetails from "../models/AdditionalDetails.js";
import Client from "../models/Client.js";
import Gallery from "../models/Gallery.js";
import User from "../models/User.js";
import { isValidimageTypes } from "../utils/imageTypes.js";
import { deleteFileFromCloudinary, uploadImageToCloudinary } from "../utils/imageUploader.js";
import {
  sendResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/sendResponse.js";
import "dotenv/config";

//Update Profile
export const updateProfile = async (req, res) => {
  try {
    const photographerId = req.user.id;
    // console.log("Photographer id is", photographerId)

    if (!photographerId) {
      console.log("Could not get the photograher id", photographerId);
      return sendResponse(res, 400, false, "Could not get the photographer Id");
    }

    const { 
        firstName = "",
        lastName = "",
        gender = "", 
        dateOfBirth = "",
        about = "",
        contactNumber = "" 
    } = req.body;

    const photographerDetails = await User.findById(photographerId).exec();

    if (!photographerDetails) {
      console.log(
        "Could not find the photographer with the id",
        photographerDetails
      );
      return sendResponse(
        res,
        404,
        false,
        "Could not the photographer with the id"
      );
    }

    const photographerUpdate = await findByIdAndUpdate(photographerId,
        {firstName, lastName},
        {new: true}
    ).exec()

    await photographerUpdate.save() ;

    const profileDetails = await AdditionalDetails.findById(
      photographerDetails.additionalDetails
    );

    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    const photographer = await User.findById(photographerId)
      .populate("additionalDetails")
      .exec();

    console.log("Profile Details Saved Successfully");

    return sendResponse(
      res,
      200,
      true,
      "Profile Details updated Successfully",
      { data: photographer }
    );
  } catch (err) {
    console.log("Profile Details Error Occured while updating");
    return sendResponse(res, 500, false, "Internal Server Error", {
      error: err.message,
    });
  }
};

//Delete Account
export const deleteAccount = async (req, res) => {
  try {
    const photographerId = req.user.id;
    if (!photographerId) {
      console.log("Could not Find the photographer Id");
      return sendErrorResponse(res, 400, "Could not get the photographer Id");
    }

    const photographerDetails = await User.findById(photographerId)
      .populate("galleryID")
      .exec();
    console.log("Photographer Details are", photographerDetails);

    if (!photographerDetails) {
      console.log("Could not find the photographer details with the id");
      return sendErrorResponse(res, 404, "Could not find the photographer");
    }

    //DELETE THE GALLERY
    const gallery = photographerDetails.galleryID;
    console.log("Gallery Id's are", gallery);

    for (const key of gallery) {
      console.log("Key is", key);
      const imageGallery = key?.galleryImagesUrl;
      console.log("Image Gallery Array is", imageGallery);
      if (imageGallery) {
        // Delete images from gallery
        for (const images of imageGallery) {
          await deleteFileFromCloudinary(images, process.env.FOLDER_NAME);
          await Gallery.findByIdAndUpdate(key, {
            $pull: {
              galleryImagesUrl: images,
            },
          });
        }
      }
      await Gallery.findByIdAndDelete(key);
      console.log("Gallery is deleted", key);
    }

    // DELETE THE CLIENT
    const clients = photographerDetails.clientID;
    console.log("client id's are", clients);

    for (let key of clients) {
      console.log("Client Id is", key);
      await Client.findByIdAndDelete(key);
      console.log("Client is deleted", key);
    }

    //DELETE THE ADDITIONAL DETAILS
    await AdditionalDetails.findByIdAndDelete(
      photographerDetails.additionalDetails
    );

    await User.findByIdAndDelete(photographerId);

    console.log("Photgrapher Deleted Successfully");

    return sendSuccessResponse(res, 200, "Photograher Deleted Successfully");
  } catch (err) {
    console.log("Something went wrong while deleting the Photographer");
    return sendErrorResponse(
      res,
      500,
      "Error arise while deleting the photographer",
      { error: err.message }
    );
  }
};

//Get Profile Data
export const getProfile = async (req, res) => {
  try {
    const photographerId = req.user.id;
    console.log("Photographer id is", photographerId)
    if (!photographerId) {
      console.log("Photographer id is not present");
      return sendErrorResponse(res, 401, "Could not get the photographerId");
    }

    const photographerDetails = await User.findById(photographerId)
      .populate("additionalDetails")
      .exec();

    if (!photographerDetails) {
      console.log("No photographer is registered with the id");
      return sendErrorResponse(
        res,
        404,
        "Could not find the photographer with the id"
      );
    }

    return sendSuccessResponse(res, 200, "Photographer Details are",
        {data: photographerDetails}
    )
  } catch (err) {
    console.log("Error Occured while getting photographer details", err)
    return sendErrorResponse(res, 500, {error: err.message})
  }
};

//Update the display Picture
export const updateDisplayPicture = async(req, res) => {
    try{
      // console.log("Here i am")
        const photographerId = req.user.id ;
        if (!photographerId) {
          console.log("Photographer id is not present");
          return sendErrorResponse(
            res,
            401,
            "Could not get the photographerId"
          );
        }

        console.log("file is", req.files.displayPicture)
        const displayPicture = req.files.displayPicture ;

        //Const Validation Checks
        const validImageTypes = ["jpg", "png", "jpeg"]
        const displayPictureType = displayPicture.name.split(".")[1].toLowerCase()
        console.log("DisplayPictureType is", displayPictureType)

        if(!isValidimageTypes(displayPictureType, validImageTypes)){
            return sendErrorResponse(res, 401, `Invalid Image Type, supported types are ${validImageTypes}`)
        }

        const updatedImage = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000)

        console.log("Reached here");
        const updatedPhotographer = await User.findByIdAndUpdate(
            {_id: photographerId},
            {image: updatedImage.secure_url},
            {new: true}
        )

        console.log("Updated successfully")
        return sendSuccessResponse(res, 201, "Image Updated Successfully", {updatedPhotographer})

    }
    catch(err){
        console.log("Something went wrong")
        return sendErrorResponse(res, 500, "Could Not Update Profile Picture", {error: err.message})
    }
}
