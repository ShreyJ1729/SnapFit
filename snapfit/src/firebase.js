import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1f7Sy92LOZQ-fVSOUIoLvsOls7ck7XI4",
    authDomain: "snapfit-e9ed9.firebaseapp.com",
    projectId: "snapfit-e9ed9",
    storageBucket: "snapfit-e9ed9.appspot.com",
    messagingSenderId: "450027673483",
    appId: "1:450027673483:web:ee22e2c06f82cd2e2b418e"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;