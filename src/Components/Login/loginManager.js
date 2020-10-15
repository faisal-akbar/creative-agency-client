import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import jwt_decode from 'jwt-decode';

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

// Google Sign In Handler
export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        name: displayName,
        email: email,
        success: true,
        photo: photoURL,
      };
      // const signedInUser = res.user;
      return signedInUser;
    })
    .catch(function (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

// Sign Out handler:
export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        success: false,
      };
      return signedOutUser;
    })
    .catch((err) => {
      const errorMessage = err.message;
      console.log(errorMessage);
    });
};

// check is user logged in
export const isLoggedIn = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false;
  }
  const decodedToken = jwt_decode(token);
  // console.log(decodedToken)
  // get current time
  const currentTime = new Date().getTime() / 1000;
  // compare the expiration time with the current time
  // will return false if expired and will return true if not expired
  return decodedToken.exp > currentTime;
};

// check is user logged in
export const loggedInInfo = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false;
  }
  const decodedToken = jwt_decode(token);
  return decodedToken;
};
