import toast from "react-hot-toast";
import { clientEndPoints, galleryEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setFolders, setGallery } from "../../slices/gallerySlice";
import { setLoading, setClients } from "../../slices/clientSlice";

const {
  CREATE_CLIENT_API,
  UPDATE_CLIENT_API, //PUT METHOD
  DELETE_CLIENT_API,
  GET_ALL_CLIENT_API,
  DELETE_ALL_CLIENT_API,
} = clientEndPoints;

const {
  CREATE_GALLERY_API,
  UPDATE_GALLERY_API,
  DELETE_GALLERY_API, 
  ADD_GALLERY_CLIENT_API,
  ADD_GALLERY_IMAGES_API,
  GET_GALLERY_IMAGES_API,
  GET_ALL_FOLDER_API,
} = galleryEndPoints;


//ALL GALLERY END PONINTS
export async function createGallery(data, token) {
  let gallery = null ;  
  const toastId = toast.loading("Creating");
  try {
    const response = await apiConnector(
      "POST",
      CREATE_GALLERY_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("New Gallery Created")
    gallery = response?.data?.data ;

  } catch (err) {
    console.log("CREATE GALLERY API......", err.response);
    toast.error(err.response.data.message);
  }
  toast.dismiss(toastId);
}

export async function updateGallery(data, token){
    let result = null ;
    const toastId = toast.loading("Updating...")
    try{
        const response = await apiConnector('PUT', UPDATE_GALLERY_API, data, {Authorization: `Bearer ${token}`})

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data?.galleryDetails ;
        toast.success("Gallery Updated Successfully")

    }
    catch(err){
        console.log("UPDATE GALLERY API ERROR...", err.response.data.message)
        toast.error(err.response.data.message)
    }

    toast.dismiss(toastId)
    return result ;
}

export async function deleteGallery(galleryId, token){
    const toastId = toast.loading("On Way To Delete...")
    try{
        const response = await apiConnector('POST', DELETE_GALLERY_API, {galleryId}, {Authorization: `Bearer ${token}`})

        if(!response.data?.success){
            throw new Error(response.data?.message)
        }

        toast.success("Gallery Deleted")
    }
    catch(err){
        console.log("GALLERY DELETED API ERROR......", err.response?.data?.message)
        toast.error(err.response?.data?.message)
    }
    toast.dismiss(toastId)
}

export async function addClientToGallery(data, token){
    const toastId = toast.loading("Adding Client...")
    try{
        const response = await apiConnector('POST', ADD_GALLERY_CLIENT_API, data, {Authorization: `Bearer ${token}`})

        if(!response.data?.success){
            throw new Error(response.data?.message)
        }

        toast.success("Client Added Successfully")
        
    }
    catch(err){
        console.log("ADD CLIENT TO GALLERY API ERROR", err.message)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
}

export async function addImagesToGallery(formData, token){
  const toastId = toast.loading("Adding Images....")

  try{
    const response = await apiConnector('POST', ADD_GALLERY_IMAGES_API, formData, {Authorization: `Bearer ${token}`})

    if(!response.data.success)
      throw new Error(response.data.message)

    toast.success("Images Added Successfully");
  }
  catch(err){
    console.log("ADD IMAGES TO GALLERY API ERROR....", err.response.data.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
}

export async function getGalleryImages(data, token){
  const toastId = toast.loading("Loading...")
  const galleryImages = []
  try{
    const response = await apiConnector('GET', GET_GALLERY_IMAGES_API, data, {Authorization: `Bearer ${token}`})

    if(!response.data?.success){
      throw new Error(response.data?.message)
    }

    galleryImages = response.data?.galleryImages
  }
  catch(err){
    console.log("GET GALLERY IMAGES API ERROR...", err.response.data?.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return galleryImages
}

export function getAllFolders(token){
  return async (dispatch) => {
    const toastId = toast.loading("Getting Folders..")
    
    try{
      console.log("Token is", token)
      const response = await apiConnector(
        'GET',
        GET_ALL_FOLDER_API,
        null, 
        {Authorization: `Bearer ${token}`}
       )

      console.log("Response is", response)

      if(!response.data?.success){
       throw new Error(response.data?.message)
      }

      const folders = response.data?.data  ;
      
      if(folders.length === 0)
        toast.error("You don't have any Folders, Please Add")
      else
      toast.success("Got All Your Folders")
    
    dispatch(setFolders(folders))
    // console.log("Folders are", folders)
    }
    catch(err){
      console.log("Could not get the Folders", err.message)
      toast.error(err.message)
    }
    toast.dismiss(toastId)
  }
}


//ALL CLIENTS END POINTS
export async function createClient(data, token){
  const toastId = toast.loading("Creating...")
  try{
    // console.log("Data is", data)
    const response = await apiConnector('POST', CREATE_CLIENT_API, data, {Authorization: `Bearer ${token}`})

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    toast.success("New Client Created")

  }
  catch(err){
    console.log('CREATE CLIENT API ERROR', err.messaage)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
}

export async function updateClient(data, token){
  const toastId = toast.loading("Updating...")
  try{
    const response = await apiConnector('PUT', UPDATE_CLIENT_API, data, {Authorization: `Bearer ${token}`})

    if(!response.data.success)
      throw new Error(response.data.message)
    
    toast.success("Updated Client")
  }
  catch(err){
    console.log("UPDATE CLIENT API ERROR...", err.response.data.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
} 

export async function deleteClient(clientId, token){
  const toastId = toast.loading("Deleting...");
  try {
    console.log("client data is", clientId)
    const response = await apiConnector('DELETE', DELETE_CLIENT_API, { clientId }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) throw new Error(response.data.message);

    toast.success("Deleted Client");
  } catch (err) {
    console.log("DELETE CLIENT API ERROR...", err.response.data.message);
    toast.error(err.message);
  }
  toast.dismiss(toastId);
}

export async function deleteAllClient(token){
  const toastId = toast.loading("Deleting...");
  try {
    const response = await apiConnector("DELETE", DELETE_ALL_CLIENT_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) throw new Error(response.data.message);

    toast.success("Deleted Client");
  } catch (err) {
    console.log("DELETE ALL CLIENT API ERROR...", err.response.data.message);
    toast.error(err.message);
  }
  toast.dismiss(toastId);
}

export function getAllClient(token){
  return async(dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    
    try{
      // console.log("token is", token)
      const response = await apiConnector(
        "GET", 
        GET_ALL_CLIENT_API,
        "hunter",
        {
          Authorization: `Bearer ${token}`
        }
      )
      console.log("Response is", response)

      if(!response.data?.success)
        throw new Error(response.data?.message)

      const clients = response.data?.allClients ;
      // console.log("Clients is", clients.length)
      if(clients.length === 0)
        toast.success("You don't have any Clients")
      else{
        localStorage.setItem("clients", JSON.stringify(clients))
        toast.success("Got all your Clients")
      }
      dispatch(setClients(clients))
    }
    catch(err){
      console.log("GET ALL CLIENTS API ERROR", err.message)
      toast.error(err.message)
    }
    dispatch(setLoading(false)) ;
    toast.dismiss(toastId)
  }
}

// Client Images Forward and get them api
export async function shareCode(galleryId){
  try{
    const response = await apiConnector("POST", `http://localhost:4000/api/v1/gallery/${galleryId}/share`,
    null)

    console.log("Share link response is", response?.data)
    return response?.data
  }
  catch(err){
    console.error(
      "Error sharing the gallery:",
      err?.response?.data || err.message
    );
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        "Error occurred while sharing the gallery",
    };
  }
}

export async function previewGallery(galleryId, shareCode){
  try{
    console.log("Gallery id and share code is", galleryId, shareCode)
    const response = await apiConnector(
      "GET",
      `http://localhost:4000/api/v1/gallery/${galleryId}/images?code=${shareCode}`,
      null
    );

    console.log("Gallery Preview Response", response?.data)
    return response?.data
  }
  catch(err){
    console.error(
      "Error fetching gallery preview:",
      err?.response?.data || err.message
    );
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        "Error occurred while previewing the gallery",
    };
  }
}


