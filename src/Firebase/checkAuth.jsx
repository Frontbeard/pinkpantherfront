import { getAuth, onAuthStateChanged } from "firebase/auth";

const isAuthenticated = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user, error) => {
    if (user) {
      // User is signed in
      const uid = user.uid.toString();
      // Check if the UID matches the one stored in local storage
      const firebaseUid = localStorage.getItem('firebaseUid');
      if (uid !== firebaseUid) {
        // User is not authenticated
        console.log("User is not authenticated");
        localStorage.removeItem('firebaseUid'); // Remove the item from localStorage
      } else {
        // User is authenticated
        console.log("User is authenticated");
      }
    } else {
      // User is signed out
      console.log("User is not authenticated or an error occurred", error);
      localStorage.removeItem('firebaseUid'); // Remove the item from localStorage
    }
  });
}

export default isAuthenticated;
