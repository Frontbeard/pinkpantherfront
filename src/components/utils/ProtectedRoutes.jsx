import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ children, redirecTo="/login"}) => {
    
    // console.log("soy firebaseUid en protec",user);
    if(!localStorage.getItem('firebaseUid')) {
        return <Navigate to={redirecTo} />
    }
    return children ? children : <Outlet/>
}