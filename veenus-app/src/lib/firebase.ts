import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDljxT6fZ8BFOF4Z8rOoDcdF79KSbyp9U",
  authDomain: "veenus-3451d.firebaseapp.com",
  projectId: "veenus-3451d",
  storageBucket: "veenus-3451d.firebasestorage.app",
  messagingSenderId: "153200382480",
  appId: "1:153200382480:web:f94c1b6236f1d4bd307095",
  measurementId: "G-M0X1VEFNZR"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
