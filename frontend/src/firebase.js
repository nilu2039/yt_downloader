import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBullFzwo2T80CwXtX-s_L_AHBaKCEuP8A",
  authDomain: "chatapp-976fe.firebaseapp.com",
  projectId: "chatapp-976fe",
  storageBucket: "chatapp-976fe.appspot.com",
  messagingSenderId: "521862854895",
  appId: "1:521862854895:web:1d091b45e09672bcd2431a",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
