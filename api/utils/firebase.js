// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCbGPLbYoqWKOZWlNkfVmUlKhEserKlYU",
    authDomain: "rapid-f23c9.firebaseapp.com",
    projectId: "rapid-f23c9",
    storageBucket: "rapid-f23c9.appspot.com",
    messagingSenderId: "669261778046",
    appId: "1:669261778046:web:66dd4b617c570177cd9c2f",
    measurementId: "G-F1KTQLS4S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
