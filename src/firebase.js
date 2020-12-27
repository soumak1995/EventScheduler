import firebase from "firebase"
var firebaseConfig = {
    apiKey: "AIzaSyCk7jK7CkVhdGXZOtp-fo2vhSI5nanzP-Q",
    authDomain: "eventscheduler-f8c3a.firebaseapp.com",
    projectId: "eventscheduler-f8c3a",
    storageBucket: "eventscheduler-f8c3a.appspot.com",
    messagingSenderId: "682369115712",
    appId: "1:682369115712:web:fc162990968a1e3a4be1a5",
    measurementId: "G-EWPLEC75ZX"
  };
  const firebaseapp=firebase.initializeApp(firebaseConfig);
  const db=firebaseapp.firestore();
  const storage=firebase.storage();
  export {db,storage}