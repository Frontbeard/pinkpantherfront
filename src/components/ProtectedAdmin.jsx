import React, { useEffect,useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { Navigate, Outlet} from "react-router-dom"
// falta action de reducer, authstate y auth

export const ProtectedAdmin = ({user, children, redirecTo = "/home"}) => {
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.userInfo)
    const [userAdmin, setUserAdmin] = useState({
        email: "",
    })

    useEffect(() => {
        authState(auth, (currentUser) => {
            if(currentUser) {
                setUserAdmin({
                    ...userAdmin,
                    email: currentUser.email,
                })
            }
        })
    }, [dispatch, userInfo])

    useEffect(() => {
        dispatch(reduxAction(userAdmin.email))
    }, [userAdmin.email])

    if(userInfo.admin === false) {
        return <Navigate to={redirectTo} />
    }
    return <Outlet />
}