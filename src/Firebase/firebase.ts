// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmzj17E5XigT2cVbyR_wEPPg0I_qOmtXM",
  authDomain: "readeasykids.firebaseapp.com",
  projectId: "readeasykids",
  storageBucket: "readeasykids.appspot.com",
  messagingSenderId: "951438180625",
  appId: "1:951438180625:web:5efa5c02cc0118ff950cb0",
  measurementId: "G-BHGL2CMGQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log(analytics)

export { app, analytics, auth };



