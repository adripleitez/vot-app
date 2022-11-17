// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnFNzd5250XjjAM4Y4k21MKI0NG8fCBaE",
    authDomain: "vot-app-7d7c1.firebaseapp.com",
    projectId: "vot-app-7d7c1",
    storageBucket: "vot-app-7d7c1.appspot.com",
    messagingSenderId: "1067857525304",
    appId: "1:1067857525304:web:b56652cef5a13d2b7d84cd",
    measurementId: "G-5MMW58L57B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);