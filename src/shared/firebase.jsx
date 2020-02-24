import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import FirebaseUIAuth from "react-firebaseui-localized";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.firestore();

const uiConfig = {
    credentialHelper: 'none',
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

export function SignIn() {
    return (
        <FirebaseUIAuth
            lang="ru"
            config={uiConfig}
            auth={firebaseApp.auth()}
            firebase={firebase}
        />
    );
}