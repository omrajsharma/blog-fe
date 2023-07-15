import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIqEWvMB44zSYfCoDHWpYWXirmSsSgMrk",
  authDomain: "blogs-45a6e.firebaseapp.com",
  databaseURL: "https://blogs-45a6e-default-rtdb.firebaseio.com",
  projectId: "blogs-45a6e",
  storageBucket: "blogs-45a6e.appspot.com",
  messagingSenderId: "832779916661",
  appId: "1:832779916661:web:8e63ecc920af7c560fef3c",
  measurementId: "G-PTL6WJ7F31",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
