import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi2EiDwLRSkELWHpYMn4uDkPEqWypbb_s",
  authDomain: "contact-app-67486.firebaseapp.com",
  projectId: "contact-app-67486",
  storageBucket: "contact-app-67486.firebasestorage.app",
  messagingSenderId: "262192335532",
  appId: "1:262192335532:web:6f722516fa0d98bd332d09",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
