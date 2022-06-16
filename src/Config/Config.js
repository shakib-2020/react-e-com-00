// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDynGXvJgqiMt8ms1KrsNtsmg52VCXIoo",
  authDomain: "e-commerce-react-site.firebaseapp.com",
  projectId: "e-commerce-react-site",
  storageBucket: "e-commerce-react-site.appspot.com",
  messagingSenderId: "94878982260",
  appId: "1:94878982260:web:82f5ffd79f5aaaec673121",
  measurementId: "G-PCG3DZ4JQ2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
