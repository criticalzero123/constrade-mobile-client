// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbM6OvRB2K1FA1LgN007IoIIwidaDr578",
  authDomain: "constrade-web.firebaseapp.com",
  projectId: "constrade-web",
  storageBucket: "constrade-web.appspot.com",
  messagingSenderId: "208981149421",
  appId: "1:208981149421:web:d1fd5be2c035d243c06ee4",
  measurementId: "G-STVCK1TVDH",
};

const app = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = getStorage(app);
export const db = getFirestore();

export default firebase;
