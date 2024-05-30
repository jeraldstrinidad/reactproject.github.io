// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhEqnoB0FNOsF7HycW4YtkJ9LXYmScrYQ",
  authDomain: "reactproject-fae39.firebaseapp.com",
  projectId: "reactproject-fae39",
  storageBucket: "reactproject-fae39.appspot.com",
  messagingSenderId: "413287922093",
  appId: "1:413287922093:web:7cee8f27b2e76e76b04924",
  measurementId: "G-HV6Y3V5MKW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
