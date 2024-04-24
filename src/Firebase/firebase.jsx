import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//import dotenv from 'dotenv'
//dotenv.config();

// const firebaseConfig = {
//     apiKey: FIREBASE_API_KEY,
//     authDomain: FIREBASE_AUTH_DOMAIN,
//     projectId: FIREBASE_PROJECT_ID,
//     storageBucket: FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
//     appId: FIREBASE_APP_ID,
//     measurementId: FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDwxT2yAxPIl43qpsMqd16knZLJDhS4gcI",
  authDomain: "pinkpanther-ba639.firebaseapp.com",
  projectId: "pinkpanther-ba639",
  storageBucket: "pinkpanther-ba639.appspot.com",
  messagingSenderId: "162806064326",
  appId: "1:162806064326:web:adac8f58da679972f823c7",
  measurementId: "G-N5MZ5YHD6C",
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth }