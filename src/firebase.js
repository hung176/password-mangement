import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCCrK1K1apXfIaOtR24d2Rkb2IXxGSscuo",
  authDomain: "password-machine-4f976.firebaseapp.com",
  projectId: "password-machine-4f976",
  storageBucket: "password-machine-4f976.appspot.com",
  messagingSenderId: "707943846514",
  appId: "1:707943846514:web:6025b3366162da5668e8eb"
};

firebase.initializeApp(config);

export default firebase;