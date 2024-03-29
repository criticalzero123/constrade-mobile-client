import firebase from "firebase/compat/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// Initialize Firebase
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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = firebase.firestore();
export const storage = getStorage(app);
export const db = getFirestore();

export default firebase;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
