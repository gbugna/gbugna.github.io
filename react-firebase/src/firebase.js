
import firebase from 'firebase/app';
import 'firebase/firestore';


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAVzRjYJCr21AANopk19lZ0EnDEi6FUgJk",
    authDomain: "react-firebase-a7d84.firebaseapp.com",
    databaseURL: "https://react-firebase-a7d84.firebaseio.com",
    projectId: "react-firebase-a7d84",
    storageBucket: "react-firebase-a7d84.appspot.com",
    messagingSenderId: "463784983108",
    appId: "1:463784983108:web:7ef3895299001c548ada11"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();