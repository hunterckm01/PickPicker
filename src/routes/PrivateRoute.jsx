import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function PrivateRoute({children}){
    const {token} = useSelector(state => state.auth)

    if(token)
        return children 
    else
        return <NavLink to = "/login" replace/>
}