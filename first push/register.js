// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set , get , child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9gHim51ecM6rMqMjF7N-FNDJRnGOTnnI",
  authDomain: "software-engineering-17dd3.firebaseapp.com",
  projectId: "software-engineering-17dd3",
  storageBucket: "software-engineering-17dd3.appspot.com",
  messagingSenderId: "952604620572",
  appId: "1:952604620572:web:29a19895e888e56338acd9",
  measurementId: "G-551MVD47X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get ref to database serbices
const db = getDatabase(app);
document.getElementById("submit").addEventListener('click', function(e)
{
    set(ref(db, 'user/' + document.getElementById("username").value),
    {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    });
    alert("Login Success");
})
