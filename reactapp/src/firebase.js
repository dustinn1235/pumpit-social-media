import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import 'firebase/compat/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXEt12tZ-sg5PCymXYDUgjqFvxOc0bC84",
  authDomain: "workout-db-b444f.firebaseapp.com",
  projectId: "workout-db-b444f",
  storageBucket: "workout-db-b444f.appspot.com",
  messagingSenderId: "328419390282",
  appId: "1:328419390282:web:47c70fc48da145a95c07b3",
  measurementId: "G-ZB9GYW1T5F"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true});
export const auth = app.auth();
export default app;
export { storage };
export { db };