// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDpv8sC7cFvnBGF0bV0qiFaVJUrFa-XLAM",
    authDomain: "olx-assignment-aea68.firebaseapp.com",
    projectId: "olx-assignment-aea68",
    storageBucket: "olx-assignment-aea68.firebasestorage.app",
    messagingSenderId: "367784250641",
    appId: "1:367784250641:web:e3b046eb3113e11a0f90b0",
    measurementId: "G-JC9SKMHB11"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);