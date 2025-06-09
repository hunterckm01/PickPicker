import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function OpenRoute({children}){
    const {token} = useSelector(state => state.auth)

    if(token){
        console.log("Token Is Already Available, This Route is not for Logged In User")
        return <Navigate to = "/dashboard/my-profile" replace/>
    }
    else{
        return children ;
    }
}
