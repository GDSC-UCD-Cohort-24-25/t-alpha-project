import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0KvUq3hAaIqCL2lt_h7VB6QRG8qJZf7o",
  authDomain: "t-alpha-gdsc.firebaseapp.com",
  projectId: "t-alpha-gdsc",
  storageBucket: "t-alpha-gdsc.firebasestorage.app",
  messagingSenderId: "111245863376",
  appId: "1:111245863376:web:2e39e8caff1d6857f571d5",
  measurementId: "G-84B0JZKGNC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
