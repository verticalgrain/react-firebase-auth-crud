import * as firebase from 'firebase';
import FirebaseImageUploader from 'firebase-image-uploader'

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