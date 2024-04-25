import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
//import { Link, useHistory } from "react-router-dom";

const AuthenticationHandler = () => {
//const history = useHistory();
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid.toString();
    // Check if the UID matches the one stored in local storage
    const firebaseUid = localStorage.getItem('firebaseUid');
    if (uid === firebaseUid) {
      // User is authenticated
      console.log("User is authenticated");
    } else {
      // User is not authenticated
      console.log("User is not authenticated", error);
      const notAutho = localStorage.setItem('');
      //return (<Link to="/"></Link>)
      //history.push("/");

    }
  } else {
    // User is signed out
    console.log("User is signed out", error);
    const notAutho = localStorage.setItem('');
    //return (<Link to="/"></Link>)
    //history.push("/");
    
  }
});
}
export default AuthenticationHandler;

// import { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { Link, useHistory } from "react-router-dom";

// const AuthenticationHandler = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const history = useHistory();

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in
//         const uid = user.uid.toString();
//         // Check if the UID matches the one stored in local storage
//         const firebaseUid = localStorage.getItem('firebaseUid');
//         if (uid === firebaseUid) {
//           // User is authenticated
//           setIsAuthenticated(true);
//         } else {
//           // User is not authenticated
//           setIsAuthenticated(false);
//           history.push("/");
//         }
//       } else {
//         // User is signed out
//         setIsAuthenticated(false);
//         history.push("/");
//       }
//     });

//     return () => unsubscribe();
//   }, [history]);

//   return null;
// };

// export default AuthenticationHandler;