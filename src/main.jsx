import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import SingleProduct from './pages/Home/SingleProduct';
import AboutUs from "./components/AboutUs.jsx"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {   
        path: "/shop/:id",
        element: <SingleProduct/>
      },
      {
        path: "/about",
        element: <AboutUs/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
