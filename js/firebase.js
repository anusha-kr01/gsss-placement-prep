// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAoC7nQxduuDNDK95zncCWo6o2P4u_RZj4",
  authDomain: "gsss-placements-prep-guide.firebaseapp.com",
  projectId: "gsss-placements-prep-guide",
  storageBucket: "gsss-placements-prep-guide.firebasestorage.app",
  messagingSenderId: "1071887091508",
  appId: "1:1071887091508:web:d0bf06d519fed391280761",
  measurementId: "G-155B4296GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);