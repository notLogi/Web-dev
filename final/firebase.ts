// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbpoQSexulZZSU7crtD2-NRNcyK90_EjA",
  authDomain: "final-web-project-e91b5.firebaseapp.com",
  projectId: "final-web-project-e91b5",
  storageBucket: "final-web-project-e91b5.firebasestorage.app",
  messagingSenderId: "444962103163",
  appId: "1:444962103163:web:b291ce467babb09df227de",
  measurementId: "G-XNLMFNTQKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);   
export const google = new GoogleAuthProvider();
