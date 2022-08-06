import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDAZFHgssYqJIAgwAi5FDn13bWTyZQts70",
    authDomain: "wheres-waldo-ef642.firebaseapp.com",
    projectId: "wheres-waldo-ef642",
    storageBucket: "wheres-waldo-ef642.appspot.com",
    messagingSenderId: "563947798058",
    appId: "1:563947798058:web:cc2aa1cdc4afc5f00e0d53"
}

export const app = initializeApp(config);

export const auth = getAuth(app);

export const db = getFirestore(app);