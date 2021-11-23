// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2rV8eAuDBFS4LiPPgJGneUbMuTvv_UkA",
  authDomain: "sparta-react-basic-883df.firebaseapp.com",
  projectId: "sparta-react-basic-883df",
  storageBucket: "sparta-react-basic-883df.appspot.com",
  messagingSenderId: "312745235522",
  appId: "1:312745235522:web:58b284acc8c1e819ed09db",
  measurementId: "G-J99M86KRC9"
};
//firebase초기화
initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();