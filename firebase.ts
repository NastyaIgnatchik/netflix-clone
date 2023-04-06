import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1XufiVbtxDLc6posh8ow-C6XilpPFA74",
  authDomain: "netflix-5890d.firebaseapp.com",
  projectId: "netflix-5890d",
  storageBucket: "netflix-5890d.appspot.com",
  messagingSenderId: "295098818551",
  appId: "1:295098818551:web:946cb7711f89c751c858f2",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
