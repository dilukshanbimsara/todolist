// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQZxRhkEKj303yZqy2VCibYGSMdB3c9Ps",
  authDomain: "task-shedule.firebaseapp.com",
  projectId: "task-shedule",
  storageBucket: "task-shedule.appspot.com",
  messagingSenderId: "256068333626",
  appId: "1:256068333626:web:2c68d9d8379d3f3d37c503"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);



export {auth};