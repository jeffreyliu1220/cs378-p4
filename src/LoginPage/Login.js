//Goal: Basically create a form to have login stuff in it
//TODO: Create UI for Login: Done
//TODO: Create functionality for Login
//TODO: Switch to new page if authenticated


import {
  getAuth,
  connectAuthEmulator,
  signInWithCredenials,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth'
import {GoogleButton} from 'react-google-button'
import {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5RNzX4djVgWHR76UOGkVLVvt4kPdaXGM",
  authDomain: "human-computer-interacti-bc357.firebaseapp.com",
  databaseURL: "https://human-computer-interacti-bc357-default-rtdb.firebaseio.com",
  projectId: "human-computer-interacti-bc357",
  storageBucket: "human-computer-interacti-bc357.appspot.com",
  messagingSenderId: "1087306834452",
  appId: "1:1087306834452:web:c4e5b2379c41ef85927d01",
  measurementId: "G-3Y9Q0CFP7C"
};

// Initialize Firebase and Emulator
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//connectAuthEmulator(auth);

//Initialize google sign in
const provider = new GoogleAuthProvider();




export default function Login(){

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    //If user is already logged in just go straight to main page
    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          // ...
          setUser(user)
          navigate('/MainPage');
        } 
      });
    })

    //On click bring up popup and switch to main page if user crds are correct
    const handleClick = async () => {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setUser(result.user);
        // IdP data available using getAdditionalUserInfo(result)
        console.log(result.user);
       
        //Go to main page if user is not null
        if (result.user != null){
          console.log("NAVIGATING");
          navigate('/MainPage');
        }else{
          console.log("CANNOT NAVIGATE");
        }

      }).catch((error) => {
        console.log("HAVING SOME SORT OF ERROR IDK WHATT IS GOING ON?");
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });


    }

    return(
        <>

            <div style={{height: "100%", display:"flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column"}}>
              <div>
                <h1>P4 Google Firebase Assignment</h1>
              </div>
              <div style={{display:"flex", justifyContent:"center", flexDirection: "column"}}>
              <h2>Login with Google</h2>
              <GoogleButton onClick={handleClick}></GoogleButton>
              </div>
            </div>

        </>
    )
}










