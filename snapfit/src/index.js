import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Wardrobe } from './components/Wardrobe';
import { Camera } from './components/Camera';
import { Fits } from './components/Fits';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "wardrobe",
        element: <Wardrobe/>
      },
      {
        path: "camera",
        element: <Camera/>,
      },
      {
        path: "fits",
        element: <Fits/>,
      }
    ]
  },
]);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const shhhh = require('./shhhh.json')
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: shhhh.apiKey,
  authDomain: "snapfit-37278.firebaseapp.com",
  projectId: "snapfit-37278",
  storageBucket: "snapfit-37278.appspot.com",
  messagingSenderId: "52964751355",
  appId: "1:52964751355:web:cb4bd5c95456e6d2a13d5e",
  measurementId: "G-VHRMLXCCY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


