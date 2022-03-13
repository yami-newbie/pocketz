// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkzmuLuNLqFRVZ-DsC3M-EaXp8VB64NSM",
  authDomain: "pocketz-fd817.firebaseapp.com",
  projectId: "pocketz-fd817",
  storageBucket: "pocketz-fd817.appspot.com",
  messagingSenderId: "736924773929",
  appId: "1:736924773929:web:b83a80223158387cbf7638",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;