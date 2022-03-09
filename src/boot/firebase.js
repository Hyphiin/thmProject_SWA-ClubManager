import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmiTBHT2nkQFLFrQCUQaM1-ro136iMXa8",
  authDomain: "club-manager-179a2.firebaseapp.com",
  projectId: "club-manager-179a2",
  storageBucket: "club-manager-179a2.appspot.com",
  messagingSenderId: "477064358556",
  appId: "1:477064358556:web:faf7e110ba93f4b20a5b59",
  measurementId: "G-DR2RXB0FV1",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
