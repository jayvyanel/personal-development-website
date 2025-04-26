// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBrebCw6H4TaHSZctt2_8Umg91TdNxKHlI",
  authDomain: "personal-development-platform.firebaseapp.com",
  projectId: "personal-development-platform",
  storageBucket: "personal-development-platform.appspot.com",
  messagingSenderId: "857610968459",
  appId: "1:857610968459:web:a0563d64b4de3671bc638e",
  measurementId: "G-145NZPYELH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
