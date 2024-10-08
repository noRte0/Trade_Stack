// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "tradestack-66a9b.firebaseapp.com",
  projectId: "tradestack-66a9b",
  storageBucket: "tradestack-66a9b.appspot.com",
  messagingSenderId: "421579011660",
  appId: "1:421579011660:web:738cd9baa5be7eec2fa6e9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);