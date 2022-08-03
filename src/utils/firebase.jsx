// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKRyMTQTg8mtCz7xLhJsktXd-9OAIq7hA",
  authDomain: "chat-application-25c8c.firebaseapp.com",
  databaseURL: "https://chat-application-25c8c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-application-25c8c",
  storageBucket: "chat-application-25c8c.appspot.com",
  messagingSenderId: "152575073172",
  appId: "1:152575073172:web:6ce56f6326ebd743020d81",
  measurementId: "G-R51WZHR3H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);