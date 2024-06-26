// import React from "react"
// import { Navigate, Outlet} from "react-router-dom"

// export const ProtectedRoute = ({user, children, redirecTo="/login"}) => {
//     if(!user) {
//         return <Navigate to={redirecTo} />
//     }
//     return children ? children : <Outlet/>
// }

// import React, { useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { URL_LINK } from "../URL.js";
// import login from "../redux/actions/Customer/login.js";
// import logout from "../redux/actions/Customer/logout.js";

// const ProtectedRoute = ({ children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (user, error) => {
//       if (user) {
//         // User is signed in
//         const uid = user.uid.toString();
//         // Check if the UID matches the one stored in local storage
//         const firebaseUid = localStorage.getItem("firebaseUid");
//         if (uid !== firebaseUid) {
//           // User is not authenticated
//           console.log("User is not authenticated");
//           localStorage.removeItem("firebaseUid"); 
//           dispatch(logout());// Remove the item from localStorage
//           //navigate("/login"); // Redirect to login
//         } else {
//           // User is authenticated
//           try {
//             const response = await axios.get(`${URL_LINK}/customer/${firebaseUid}`);
//             console.log("User is authenticated", response.data);
//             dispatch(login(response.data));
//           } catch (error) {
//             console.error("Error fetching customer data:", error);
//             localStorage.removeItem("firebaseUid"); // Remove the item from localStorage
//             //navigate("/login"); // Redirect to login
//           }
//         }
//       } else {
//         // User is signed out
//         console.log("User is not authenticated or an error occurred", error);
//         //localStorage.removeItem("firebaseUid"); // Remove the item from localStorage
//         //navigate("/login"); // Redirect to login
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch, navigate]);

//   return <>{children}</>;
// };

// export default ProtectedRoute;