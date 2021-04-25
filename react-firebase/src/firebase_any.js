
import firebase from 'firebase/app';
import 'firebase/firestore';


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDde-Bf6UsPi6xQSfWVGixlaiX5NAIVILI",
    authDomain: "anycocina-dd130.firebaseapp.com",
    databaseURL: "https://anycocina-dd130.firebaseio.com",
    projectId: "anycocina-dd130",
    storageBucket: "anycocina-dd130.appspot.com",
    messagingSenderId: "789148396832",
    appId: "1:789148396832:web:72bde1aa00c43b47e43b45",
    measurementId: "G-VWYWQW5KH4"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();