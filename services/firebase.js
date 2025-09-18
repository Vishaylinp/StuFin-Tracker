// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_t3J2BeOjWGRlOUvQVDN82j-7OrDyERs",
  authDomain: "stufin-tracker.firebaseapp.com",
  projectId: "stufin-tracker",
  storageBucket: "stufin-tracker.firebasestorage.app",
  messagingSenderId: "294687171513",
  appId: "1:294687171513:web:244e04c962eb21433a8c68",
  measurementId: "G-WFWEMXTG3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);