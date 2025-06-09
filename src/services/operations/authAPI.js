import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndPoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setPhotographer } from "../../slices/profileSlice";

const {LOGIN_API, SIGNUP_API, SENDOTP_API, CHANGEPASSWORD_API} = authEndPoints

export function login(data, navigate){
    return async(dispatch) => {
        //SEND LOADING TOASTER
        const toastId = toast.loading("Loading")
        //DISPATCH SET LOADING TRUE FOR LOGIN IN AUTH
        dispatch(setLoading(true))
        try{
            //SEND THE AXIOS REQUREST
            console.log("Data got is", data)
            const response = await apiConnector('POST', LOGIN_API, data)
            //CHECK FOR THE ERROR IF GOT
            if(!response){
                throw new Error(response.data.message)
            }
            //SET TOKEN
            toast.success("Login Successfull")
            dispatch(setToken(response.data.token))

            //SET THE USER IMAGE
            const photographerImage = response?.data?.user?.image ? response?.data?.user?.image : `https://api.dicebear.com/9.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(
              setPhotographer({
                ...response.data.user,
                image: photographerImage,
              })
            );
            //SET THE TOKEN AND USER IN LOCAL STORAGE
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("photographer", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        }
        catch(err){
            //CATCH THE ERROR IF ANY
            console.log("LOGIN API ERROR...", err)
            toast.error(err.response.data.message)
        }
        //MARK SET LOADING FALSE
        // dispatch(setToken)
        dispatch(setLoading(false))
        //DISMISS THE TOAST
        toast.dismiss(toastId)
    }
}

export function signUp(data, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        try{
            console.log("Signup data is", data)
            console.log("Reached signup api");
            const response = await apiConnector("POST", SIGNUP_API, data);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Sign Up Successfull")
            navigate("/login")
        }
        catch(err){
            console.log("Sign Up Failed", err)
            toast.error("Sign Up Failed")
            navigate("/signUp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function sendOtp(email){
    return async(dispatch) => {
        const toastId = toast.loading("Loading")
        dispatch(setLoading(true))
        try{
            console.log("Email is", email)
            const response = await apiConnector('POST',SENDOTP_API, {email
                //checkUserPresent: true
            })

            // console.log("Response is", response)

            if(!response.data.success){
                console.log("Response success is", response.data.success)
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully");
        }
        catch(err){ 
            console.log("OTP API ERROR", err.response)
            toast.error(err.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function changePassword(oldPassword, newPassword){
    return async (dispatch) => {
        const toastId = toast.loading(true)
        dispatch(setLoading(true))
        try{
            const response = await apiConnector('PATCH', CHANGEPASSWORD_API, {oldPassword, newPassword})

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            //PASSWORD MATCHED
            toast.success("Password changed successfully")
            navigate("/dashboard/my-profile")
        }
        catch(err){
            console.log("CHANGE PASSWORD API ERROR", err.response.data.message)
            toast.error(err.response.data.message)
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}