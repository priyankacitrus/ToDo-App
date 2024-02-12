import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBiLqGkB1QansNrHkN-ka6tGoYgm5L4tp4',
  authDomain: 'sixth-clone-321915.firebaseapp.com',
  databaseURL: 'https://sixth-clone-321915-default-rtdb.firebaseio.com',
  projectId: 'sixth-clone-321915',
  storageBucket: 'sixth-clone-321915.appspot.com',
  messagingSenderId: '117308653573',
  appId: '1:117308653573:web:8e174f200a99a6523e9c6c',
  measurementId: 'G-QEVZR5ERE5',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
