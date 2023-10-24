import firebase from 'firebase/compat/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCJjCM-kea7XeFDpPEqz4KvpqR9T8IgHqA",
    authDomain: "event-8a8a2.firebaseapp.com",
    databaseURL: "https://event-8a8a2-default-rtdb.firebaseio.com",
    projectId: "event-8a8a2",
    storageBucket: "event-8a8a2.appspot.com",
    messagingSenderId: "389268200746",
    appId: "1:389268200746:web:3ec5c0d04b535debb69253",
    measurementId: "G-43L8PSN12L"
  }
};


// Initialize Firebase
const app = firebase.initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
