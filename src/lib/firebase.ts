// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "vizag-voyager",
  "appId": "1:226724557632:web:c0024ccb451a27e82980a5",
  "storageBucket": "vizag-voyager.firebasestorage.app",
  "apiKey": "AIzaSyA6TfQ2s0UlDdlp8uvfwEhpOEKj5bbnTn4",
  "authDomain": "vizag-voyager.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "226724557632"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
