import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAsFqHI7px-rNs2JaNSnVpydW5InaPWRzg",
  authDomain: "drone-control-app-ad7c4.firebaseapp.com",
  projectId: "drone-control-app-ad7c4",
  storageBucket: "drone-control-app-ad7c4.firebasestorage.app",
  messagingSenderId: "540652645452",
  appId: "1:540652645452:web:39e30f5de091843a6318e9",
  measurementId: "G-73QZ4EYYX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics }; 