import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  getAuth,
  ConnectAuthEmulator,
  signInWithCredenials
} from 'firebase/auth'

import {useState} from 'react'

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
connectAuthEmulator(auth);

const loginEmailPassword = async() => {

}


//Functions to handle login data 
const handleEmailChange = () => {
   this.setState({email: e.target.value});
}

const handlePasswordChange = () => {
   this.setState({password: e.target.value});
}


export default function LoginForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

