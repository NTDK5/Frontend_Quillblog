// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALvC0hDN7dtLJ6sKQWpK7xWL-uMZmWfbQ",
  authDomain: "my-blogpost-project.firebaseapp.com",
  projectId: "my-blogpost-project",
  storageBucket: "my-blogpost-project.appspot.com",
  messagingSenderId: "1076548700444",
  appId: "1:1076548700444:web:b317f27c738827705212d9",
  measurementId: "G-S0171CBNBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;
