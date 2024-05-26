/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "tmproject-627d2.firebaseapp.com",
    projectId: "tmproject-627d2",
    storageBucket: "tmproject-627d2.appspot.com",
    messagingSenderId: "513760392296",
    appId: "1:513760392296:web:1424f3abe48d28d71a77dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);