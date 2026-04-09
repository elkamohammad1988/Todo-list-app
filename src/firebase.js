// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCtuDYvlTMpJUTblYQ40I1o1O9Vu_ALsU",
  authDomain: "my-project-ff821.firebaseapp.com",
  projectId: "my-project-ff821",
  storageBucket: "my-project-ff821.appspot.com",
  messagingSenderId: "799811477461",
  appId: "1:799811477461:web:ba8242f85a11fdd362275c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
