const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

//AUTH ENDPOINTS
export const authEndPoints = {
 LOGIN_API: BACKEND_URL + "/auth/login",
 SIGNUP_API: BACKEND_URL + "/auth/signUp",
 SENDOTP_API: BACKEND_URL + "/auth/sendOtp",
 CHANGEPASSWORD_API: BACKEND_URL + "/auth/changePassword"   
}


//GALLERY ENDPOINTS
export const galleryEndPoints = {
  GET_GALLERY_DETAILS_API: BACKEND_URL + "/gallery/getGalleryDetails",
  CREATE_GALLERY_API: BACKEND_URL + "/gallery/createGallery",
  UPDATE_GALLERY_API: BACKEND_URL + "/gallery/updateGallery",
  DELETE_GALLERY_API: BACKEND_URL + "/gallery/deleteGallery",
  ADD_GALLERY_CLIENT_API: BACKEND_URL + "/gallery/addClientToGallery",
  ADD_GALLERY_IMAGES_API: BACKEND_URL + "/gallery/addImagesToGallery",
  GET_GALLERY_IMAGES_API: BACKEND_URL + "/gallery/fetchImages",
  GET_ALL_FOLDER_API: BACKEND_URL + "/gallery/getAllFolders",
  SHARE_GALLERY_API: (galleryId) => BACKEND_URL + `/gallery/${galleryId}/share`,
  PREVIEW_GALLERY_API: (galleryId, shareCode)=> BACKEND_URL + `/gallery/${galleryId}/images?code=${shareCode}`,
  DOWNLOAD_GALLERY_API: (galleryId) => BACKEND_URL + `/gallery/${galleryId}/download`  
};


//CLIENT ENDPOINTS
export const clientEndPoints = {
  CREATE_CLIENT_API: BACKEND_URL + "/client/createClient",
  UPDATE_CLIENT_API: BACKEND_URL + "/client/updateClient",
  DELETE_CLIENT_API: BACKEND_URL + "/client/deleteClient",
  DELETE_ALL_CLIENT_API: BACKEND_URL + "/client/deleteAllClient",
  GET_ALL_CLIENT_API: BACKEND_URL + "/client/getAllClients",
 
};


//PROFILE END POINTS
export const profileEndPoints = {
  UPDATE_PROFILE_API: BACKEND_URL + "/profile/updateProfile",
  UPDATE_ADDITIONAL_PROFILE_API: BACKEND_URL + "/profile/updateAdditionalProfile",
  DELETE_ACCOUNT_API: BACKEND_URL + "/profile/deleteAccount",
  GET_PROFILE_API: BACKEND_URL + "/profile/getProfile",
  UPDATE_PROFILE_PICTURE_API: BACKEND_URL + "/profile/updateDisplayPicture",
};