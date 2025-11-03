
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your own Firebase configuration from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBHdDI4xxSzbIG5XQpl7_3KKQv2XAodARA",
  authDomain: "agritech-31b9c.firebaseapp.com",
  projectId: "agritech-31b9c",
  storageBucket: "agritech-31b9c.firebasestorage.app",
  messagingSenderId: "362743683197",
  appId: "1:362743683197:web:65859dd7e3279606e93914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
