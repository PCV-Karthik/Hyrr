// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3gxVIAMIf0ubKgMI9cdkjuHJ8B3ZJQCc",
  authDomain: "lite-e572a.firebaseapp.com",
  projectId: "lite-e572a",
  storageBucket: "lite-e572a.appspot.com",
  messagingSenderId: "700217497995",
  appId: "1:700217497995:web:a77fe2a9d5978da610b78e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;