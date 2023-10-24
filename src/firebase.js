// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-4ehGcVahO-LwJ84qUWIndZiGlJfLhwo",
  authDomain: "registration-6ed39.firebaseapp.com",
  databaseURL: "https://registration-6ed39-default-rtdb.firebaseio.com",
  projectId: "registration-6ed39",
  storageBucket: "registration-6ed39.appspot.com",
  messagingSenderId: "165957906470",
  appId: "1:165957906470:web:7931be3fcbd87bacfab6e7",
  measurementId: "G-66QR4DSM6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);