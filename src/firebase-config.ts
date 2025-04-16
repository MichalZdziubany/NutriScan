// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDYd3EQ2avZ0YKMWG52he4NDIb3vpwmoLc",
  authDomain: "nutriscan-2d3c3.firebaseapp.com",
  projectId: "nutriscan-2d3c3",
  storageBucket: "nutriscan-2d3c3.firebasestorage.app",
  messagingSenderId: "1021976733210",
  appId: "1:1021976733210:web:c0eff66b802f87893613a3",
  measurementId: "G-QTL1PNR2PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);