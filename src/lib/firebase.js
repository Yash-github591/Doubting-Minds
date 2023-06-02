import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Initialize Firebase app instance with config variables from .env file
export const db = getFirestore(app); // Initialize Firestore instance with app instance as argument (so we can use it in our code)
export const auth = getAuth(app); // Initialize Firebase Auth instance with app instance as argument (so we can use it in our code)
export const storage = getStorage(app); // Initialize Firebase Storage instance with app instance as argument (so we can use it in our code)
