import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "mern-blog-c5e1f.firebaseapp.com",
  projectId: "mern-blog-c5e1f",
  storageBucket: "mern-blog-c5e1f.firebasestorage.app",
  messagingSenderId: "1028435465558",
  appId: "1:1028435465558:web:a88756ff88de83ae89f2f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
