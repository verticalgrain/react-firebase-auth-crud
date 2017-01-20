import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDMkJOU44LTPfwIHDNYaG7SihfeQnYhvMw",
  authDomain: "mixmeals-144307.firebaseapp.com",
  databaseURL: "https://mixmeals-144307.firebaseio.com",
  storageBucket: "mixmeals-144307.appspot.com",
  messagingSenderId: "411842349083"
};

firebase.initializeApp(config)

export const ref = firebase.database().ref()

export const firebaseAuth = firebase.auth
