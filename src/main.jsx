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
import CreateAccountGoogle from "./components/CreateAccountGoogle.jsx";
import AuthenticationHandler from "./Firebase/checkAuth.jsx";
// import Dashboard from "./components/Dashboard.jsx";
import CreateProduct from "./components/formCreateProduct/CreateProduct.jsx";
import Carrito from "./pages/Carrito/Carrito.jsx";
import ProductFilter from "./components/ProductFilter.jsx";
import NotFound from "./components/NotFound.jsx";

import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Resumen from "./components/Dashboard/Panel/Resumen.jsx";

//import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ProductsTable from "./components/Dashboard/ProductsTable/ProductsTable.jsx";
import OrdersTable from "./components/Dashboard/OrderTable/OrderTable.jsx";
import UsersTable from "./components/Dashboard/UsersTable/UsersTable.jsx";

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
      { path: "/create-account-google", element: <CreateAccountGoogle /> },
      // { path: "/dashboard", element: <Dashboard /> },
      { path: "/create-product", element: <CreateProduct /> },
      {
        path: "/cart",
        element: <Carrito />,
      },

      {
        path: "/categories/:categoryId",
        element: <ProductFilter/>,
      },
      // {
      //   path: "/dashboard",
      //   element: <ProtectedAdmin user={user}><Dashboard /></ProtectedAdmin>,
      // },
      // {
      //   path: "/profile",
      //   element: <ProtectedRoute user={user}><><NavBarProfile/><PanelUser/><Footer/></></ProtectedRoute>,
      // }, rutas dashboard del admin y perfil protegidas
      {
        path: "*",
        element: <NotFound />, // Ruta para la página 404
      },
      {
        path:"/admin",
        element:<Dashboard/>,
      },
      {
      
        path:"/admin/createProduct",
        element: <CreateProduct />

      },
      {
        path:'/admin/resumen',
        element: <Resumen/>
      },

      {
        path:'/admin/products',
        element: <ProductsTable/>
      },
      {
        path: '/admin/orders',
        element: <OrdersTable/>,
      },
      {
        path: '/admin/user',
        element: <UsersTable/>,
      }

    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
