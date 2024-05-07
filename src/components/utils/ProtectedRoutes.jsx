import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({user, children, redirecTo="/login"}) => {
    console.log("soy firebaseUid en protec",user);
    if(!user) {
        return <Navigate to={redirecTo} />
    }
    return children ? children : <Outlet/>
}