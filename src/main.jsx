import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import SingleProduct from "./pages/Home/SingleProduct";
import AboutUs from "./components/AboutUs.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { app, auth } from "./Firebase/firebase.jsx";

import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import AuthenticationHandler from "./Firebase/checkAuth.jsx";
import Dashboard from "./components/Dashboard.jsx";
import FormCreacion from "./components/cloudinary/FormCreacion.jsx";
import Carrito from "./pages/Carrito/Carrito.jsx";
import ProductFilter from "./components/ProductFilter.jsx";
// import dotenv from 'dotenv'
// dotenv.config();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      { path: "/login", element: <Login /> },
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/formCreacion", element: <FormCreacion /> },
      {
        path: "/cart",
        element: <Carrito />,
      },

      {
        path: "/product",
        element: <ProductFilter/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
