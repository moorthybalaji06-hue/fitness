import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

// Default configuration with environment variable fallbacks
const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopmentFitBuddyStudentApp",
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || "fitbuddy-wellness.firebaseapp.com",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || "fitbuddy-wellness",
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || "fitbuddy-wellness.appspot.com",
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "837730015271",
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || "1:837730015271:web:fitbuddy12345",
};

let app: any;
let auth: any;
let db: any;
let isFirebaseInitialized = false;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  isFirebaseInitialized = true;
} catch (e) {
  console.warn("Firebase initialization warning (using local fallback store):", e);
}

export {
  app,
  auth,
  db,
  isFirebaseInitialized,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
};
export type { FirebaseUser };
