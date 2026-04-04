import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCSzZlEvZb_N0x326t06QHsZpgK-m9ilX4",
  authDomain: "veenuskleding-802f1.firebaseapp.com",
  projectId: "veenuskleding-802f1",
  storageBucket: "veenuskleding-802f1.firebasestorage.app",
  messagingSenderId: "1050257282594",
  appId: "1:1050257282594:web:5dcca2cd1278e7bcc69c7b",
  measurementId: "G-9T2HJ99BF1"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const storage = getStorage(app);
