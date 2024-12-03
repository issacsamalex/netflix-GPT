import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflixgpt-d7aa3.firebaseapp.com",
  projectId: "netflixgpt-d7aa3",
  storageBucket: "netflixgpt-d7aa3.appspot.com",
  messagingSenderId: "412959548367",
  appId: "1:412959548367:web:b577e741278ef78c2ea8ba",
  measurementId: "G-TWL1GG499D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

// user Sign Up function

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, { displayName: name });
    // await addDoc(collection(db, "user"), {
    //   uid: user.uid,
    //   displayName: name,
    //   authProvider: "local",
    //   email,
    // });
    toast.success(`Welcome${user.displayName ? `, ${user.displayName}` : ""}`);
  } catch (error) {
    // toast.error(error.code.split("/")[1].split("-").join(" "));
    toast.error(error.code);
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success(`Welcome, ${res.user.displayName}`);
  } catch (error) {
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth)
    .then(() => {
      toast.success("Logged out successfully");
    })
    .catch((error) => {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    });
};

export { auth, db, login, signup, logout };
