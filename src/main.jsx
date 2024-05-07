import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AdminApp from "./AdminApp.jsx";
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

import { Compras } from "./components/Compras.jsx";
import { useSelector } from "react-redux";
import { CreateReview } from "./components/CreateReview.jsx";
import MiPerfil from "./components/MiPerfil.jsx";
import MiPerfilEdit from "./components/MiPerfilEdit.jsx";
import MisCompras from "./components/MisCompras.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Resumen from "./components/Dashboard/Panel/Resumen.jsx";
//import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ProductsTable from "./components/Dashboard/ProductsTable/ProductsTable.jsx";
import OrdersTable from "./components/Dashboard/OrderTable/OrderTable.jsx";
import UsersTable from "./components/Dashboard/UsersTable/UsersTable.jsx";
//import SearchBar from "./components/Searchbar.jsx";
import SearchResult from "./components/SearchResult.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import Panel from "./components/Dashboard/Panel/Panel.jsx";
import EditProduct from "./components/EditProduct/EditProduct.jsx";
import Destacados from "./pages/Home/Destacados.jsx";
import { ProtectedRoutes } from "./components/utils/ProtectedRoutes.jsx";



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
      { 
        path: "/login", 
        element: <Login /> 
      },
      { 
        path: "/create-account", 
        element: <CreateAccount /> 
      },
      {
        element: <ProtectedRoutes user={localStorage.getItem('firebaseUid')} />,
        children: [
          {
            path: "/perfil",
            element: <MiPerfil/>,
          },
          {
            path: "/perfil-edit",
            element: <MiPerfilEdit />,
          },
        ]
      },
      { 
        path: "/create-account-google", 
        element: <CreateAccountGoogle /> 
      },
      { 
        path: "/create-product", 
        element: <CreateProduct /> 
      },
      {
        path: "/cart",
        element: <Carrito />,
      },
      {
        path: "/miscompras",
        element: <MisCompras />,
      },
      // {
      //   path: "/perfil",
      //   element: <MiPerfil />,
      // },
      
      {
        path: "/categories/:categoryId",
        element: <ProductFilter/>,
      },
      {
        path: "/compras",
        element: <Compras/>
      },
      {
        path: "/create-review/:id",
        element: <CreateReview/>
      },
      {
        path:'/search/:query', 
        element: <SearchResult/>
      },
      {
        path:'Privacy', 
        element: <TermsAndConditions/>
      },
      {
        path:'Destacados', 
        element: <Destacados/>
      },

    ],
  },
  {
    path: "/admin",
    element: <AdminApp />,
    children: [
      {
        path: "/admin",
        element: <Panel />,
      },
      {
        path:"products",
        element: <ProductsTable/>
      },
      {
        path: 'user',
        element: <UsersTable/>,
      },
      {
        path: 'orders',
        element: <OrdersTable/>,
      },
      {
      
        path:"create-product",
        element: <CreateProduct />

      },
      {
        path:"edit-product/:id",
        element: <EditProduct/>
      },
      {
        path:'resumen',
        element: <Resumen/>
      },
    ]
  },
  {
    path: "*",
    element: <NotFound/>,
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
