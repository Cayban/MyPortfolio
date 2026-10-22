import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Web config is public by design; Firestore rules (firestore.rules) are what protect the data.
const app = initializeApp({
  apiKey: "AIzaSyCicBy-bdCdORjwfKOos_3FIrsjge7_1hg",
  authDomain: "kimebora-portfolio.firebaseapp.com",
  projectId: "kimebora-portfolio",
  storageBucket: "kimebora-portfolio.firebasestorage.app",
  messagingSenderId: "214655007851",
  appId: "1:214655007851:web:a011414ff70bec8203452e",
});
export const db = getFirestore(app);
