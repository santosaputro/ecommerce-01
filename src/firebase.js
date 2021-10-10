// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import firebase from "firebase/compat";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5TWH8YHYcr8XWILiiACEfWUUfLRxXAxg",
  authDomain: "ecommerce-01-1d346.firebaseapp.com",
  projectId: "ecommerce-01-1d346",
  storageBucket: "ecommerce-01-1d346.appspot.com",
  messagingSenderId: "888211324225",
  appId: "1:888211324225:web:de67c62e92d0362d8235c0",
  measurementId: "G-WNW2PWXKTK",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const createUser = async (name, email, password) => {
  console.log({ name, email, password });

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const loginWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user;
      console.log("you are is logged in", userCredential);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(error);
    });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("you are is logged out");
    })
    .catch((error) => {
      // An error happened.
    });
};

export const getUserProfile = async (uid) => {
  const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();
  const query = await db.collection("users").where("uid", "==", uid).get();
  const data = await query.docs[0].data();

  return data;
};
