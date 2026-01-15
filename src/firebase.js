// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDbzOnQs0fuvcSoyskBo6X-FII9ticSng0",
    authDomain: "hola-a9696.firebaseapp.com",
    databaseURL: "https://hola-a9696-default-rtdb.firebaseio.com",
    projectId: "hola-a9696",
    storageBucket: "hola-a9696.firebasestorage.app",
    messagingSenderId: "110663792412",
    appId: "1:110663792412:web:dc26b18cd38a40bf742cd9"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);