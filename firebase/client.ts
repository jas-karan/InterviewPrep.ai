// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7w8pXyOzzl6uC7fB0na0fVNEIdhNlW3k",
  authDomain: "covid-19-tracker-262.firebaseapp.com",
  projectId: "covid-19-tracker-262",
  storageBucket: "covid-19-tracker-262.firebasestorage.app",
  messagingSenderId: "1002365862658",
  appId: "1:1002365862658:web:12bbb3d635105ee06bb81b",
  measurementId: "G-Y8EBKZ4MXP"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);