import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Wardrobe } from './components/Wardrobe';
import { CameraComponent } from './components/Camera';
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
        element: <CameraComponent/>,
      },
      {
        path: "fits",
        element: <Fits/>,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
