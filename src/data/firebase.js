import firebase from "firebase/app";
import "firebase/firestore";
require('dotenv').config()
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: "hub-app-8d580",
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const usersCollection = db.collection("users");

export default db;
export { db, usersCollection };
