import firebase from "firebase";
import '@firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCvZgIQfxZ71UTpTi2fSqBBWAY5q6J_Bp4",
    authDomain: "fastmessanger-bodyan359.firebaseapp.com",
    projectId: "fastmessanger-bodyan359",
    storageBucket: "fastmessanger-bodyan359.appspot.com",
    messagingSenderId: "436591331981",
    appId: "1:436591331981:web:7d5d427ee13863423770c4"
  });

let db = firebaseConfig.firestore();

// //initiating references to the databases
// const usersRef = db.collection('users');

// // for privileges purposes
// const functions = firebase.functions();

// //google provider sign-in
// const googleProvider = new firebase.auth.GoogleAuthProvider();


export default db;