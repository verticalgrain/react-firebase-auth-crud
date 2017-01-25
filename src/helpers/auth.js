import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => console.log('Oops', error))
}

export function logout() {
  return firebaseAuth().signOut()
}

export function login (email,pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function loginOauth(oauthId) {

  switch(oauthId) {
    case 'google':
      var provider = new firebaseAuth.GoogleAuthProvider();
      loginPopup(provider);
      break;
    case 'facebook':
      provider = new firebaseAuth.FacebookAuthProvider();
      loginPopup(provider);
      console.log('facebook')
      break;
    case 'twitter':
      provider = new firebaseAuth.TwitterAuthProvider();
      loginPopup(provider);
      break;
  }
}

export function loginPopup(provider){
  return firebaseAuth().signInWithPopup(provider).then(function(result) {
    console.log('logged in')
  }).catch(function(error) {
    console.log(error)
  });    
}

export function saveUser(user) {
  return ref.child('users/${user.uid}/info')
    .set({
      email: user.email,
      uid: user.uid
    }) 
    .then(() => user)
}