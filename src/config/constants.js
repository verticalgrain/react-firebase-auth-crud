import * as firebase from 'firebase';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()

export const firebaseAuth = firebase.auth
