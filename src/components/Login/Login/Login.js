import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Button } from 'react-bootstrap';
import googleLogo from '../../../images/googleLogo.png'
import './Login.css'
import { UserContext } from '../../../App';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                const { email, displayName, photoURL } = result.user;
                const signedInUser = { name: displayName, email: email, image: photoURL }
                setLoggedInUser(signedInUser);

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    return (
        <div className='d-flex justify-content-center '>
            <div className="login-container ">
                <h1 className=" text-center">Login with</h1>
                <Button variant='light' onClick={handleGoogleSignIn} className="login-btn d-flex justify-content-start"> <img src={googleLogo} alt="" className="mr-5" /> Continue with Google</Button>
            </div>
        </div>
    );
};

export default Login;