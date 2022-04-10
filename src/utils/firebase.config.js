import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA57K1CKCX4mlW1EPdl0mGY0-oPsH5lEOM",
  authDomain: "pomodoro-5d306.firebaseapp.com",
  projectId: "pomodoro-5d306",
  storageBucket: "pomodoro-5d306.appspot.com",
  messagingSenderId: "116049520760",
  appId: "1:116049520760:web:9c0fb2971628dacc9ae58d",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
