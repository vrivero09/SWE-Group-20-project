import { getFirestore} from '@firebase/firestore'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsyeWfjj1S8PsPBboF18RH50w40CFsUVc",
  authDomain: "swe-group-20.firebaseapp.com",
  projectId: "swe-group-20",
  storageBucket: "swe-group-20.appspot.com",
  messagingSenderId: "65081668759",
  appId: "1:65081668759:web:b9049877b4e502528b25d2",
  measurementId: "G-VXQMR76TG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);