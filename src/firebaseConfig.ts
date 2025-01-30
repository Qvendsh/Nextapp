import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYpbZRPicS2hCC3hblz3m0X86JlcTBKUw",
  authDomain: "my-next-app-d0e26.firebaseapp.com",
  projectId: "my-next-app-d0e26",
  storageBucket: "my-next-app-d0e26.firebasestorage.app",
  messagingSenderId: "440966628286",
  appId: "1:440966628286:web:e8cc04a7b056209ee8efef",
  measurementId: "G-LJ0CHP5WQD",
};

const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export const auth = getAuth(app);
