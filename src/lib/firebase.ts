import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtCKabJMaGVdx_v3lPwmKxEdKvATjnCm0",
  authDomain: "quote-1fdd1.firebaseapp.com",
  projectId: "quote-1fdd1",
  storageBucket: "quote-1fdd1.firebasestorage.app",
  messagingSenderId: "771845341508",
  appId: "1:771845341508:web:ce86bc838b915ca9789711",
  measurementId: "G-KT4D13NLYZ"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)