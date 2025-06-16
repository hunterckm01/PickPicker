import toast from "react-hot-toast";
import { profileEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setPhotographer, setLoading } from "../../slices/profileSlice";

const {
  UPDATE_PROFILE_API,
  DELETE_ACCOUNT_API,
  GET_PROFILE_API,
  UPDATE_PROFILE_PICTURE_API,
  UPDATE_ADDITIONAL_PROFILE_API
} = profileEndPoints;

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating")
    dispatch(setLoading(true));
    console.log("Form Data is", formData)
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_PROFILE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
     
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage =
        response?.data?.photographer?.image ??
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.photographer.firstName} ${response.data.photographer.lastName}`;

      dispatch(
        setPhotographer({ ...response.data.photographer, image: userImage })
      );

      localStorage.setItem(
        "photographer",
        JSON.stringify(response.data.photographer)
      );

      toast.success("Profile Updated Successfully");
    } catch (err) {
        console.log("Could not update successfully")
      console.log("COULD NOT UPDATE THE PROFILE", err);
    //   toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function updateAdditionalProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating");
    dispatch(setLoading(true));
    console.log("Form Data is", formData);
    try {
      const response = await apiConnector(
        "POST",
        UPDATE_ADDITIONAL_PROFILE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("Error is here")
      const userImage =
        response?.data?.photographer?.image ??
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.photographer.firstName} ${response.data.photographer.lastName}`;
    
      dispatch(
        setPhotographer({ ...response.data.photographer, image: userImage })
      );

      localStorage.setItem(
        "photographer",
        JSON.stringify(response.data.photographer)
      );

      toast.success("Profile Updated Successfully");
    } catch (err) {
      toast.error("Could not update successfully");
      console.log("COULD NOT UPDATE THE  ADDITIONAL PROFILE", err);
      //   toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading(true);

    try {
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account Deleted");
      dispatch(navigate(logout));
    } catch (err) {
      console.log("DELETE ACCOUNT API ERROR");
      toast.error(err.response.data.message);
    }
    toast.dismiss(toastId);
  };
}

export async function getProfileData(token) {
  const toastId = setLoading(true);
  let details = [];
  try {
    const response = await apiConnector("GET", GET_PROFILE_API, null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    details = response?.data?.photographerDetails;
  } catch (err) {
    console.log("GET PROFILE API ERROR", err);
    toast.error(err.response.data.message);
  }
  toast.dismiss(toastId);
  return details;
}

export function updateProfilePicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating");
    try {
      console.log("Display picture is", formData);
      const response = await apiConnector(
        "PATCH",
        UPDATE_PROFILE_PICTURE_API,
        formData,
        {   
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile Picture updated successfully");
      console.log("Response got is", response)
      dispatch(setPhotographer(response.data.updatedPhotographer));
      localStorage.setItem(
        "photographer",
        JSON.stringify(response.data.updatedPhotographer)
      );
    } catch (err) {
      console.log("UPDATE PROFILE PICTURE API ERROR", err.response);
      toast.error(err.response.data.message);
    }
    toast.dismiss(toastId);
  };
}
