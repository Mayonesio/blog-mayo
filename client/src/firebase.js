// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "blog-mern-mayo.firebaseapp.com",
  projectId: "blog-mern-mayo",
  storageBucket: "blog-mern-mayo.appspot.com",
  messagingSenderId: "432207931852",
  appId: "1:432207931852:web:7ac237e19b50143d6c5569"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

