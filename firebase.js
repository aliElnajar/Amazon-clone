import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyASem1iHpPOuD2Fsem-PRpBwvxX12RWvoU",
  authDomain: "clone-853c0.firebaseapp.com",
  projectId: "clone-853c0",
  storageBucket: "clone-853c0.appspot.com",
  messagingSenderId: "547964943917",
  appId: "1:547964943917:web:5554c6db1eb9e1cb0702a4",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebase.firestore(app);

export default db;
