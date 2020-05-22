import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyCec9NQFaWlwLwzJ7kkBI1Nd_lMImmLF9s",
  authDomain: "campus-c9ddd.firebaseapp.com",
  databaseURL: "https://campus-c9ddd.firebaseio.com",
  projectId: "campus-c9ddd",
  storageBucket: "campus-c9ddd.appspot.com",
  messagingSenderId: "484940282952",
  appId: "1:484940282952:web:76cf338d9970ab40ce6c7d",
  measurementId: "G-9S3XDCQGH9"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firestorage = firebase.storage();
