import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
require("dotenv").config();
const firebaseConfig = {
  apiKey: "AIzaSyDGcHWPAof8KY9qFSlQqOM-CyfpynQzMMY",
  authDomain: "hub-app-8d580.firebaseapp.com",
  databaseURL: "https://hub-app-8d580.firebaseio.com",
  projectId: "hub-app-8d580",
  storageBucket: "hub-app-8d580.appspot.com",
  messagingSenderId: "639221412948",
  appId: "1:639221412948:web:b7241e3b6cb3210e3929c1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const usersCollection = db.collection("users");
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export default db;
export { db, usersCollection, provider, auth, firebase };
