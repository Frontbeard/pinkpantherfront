import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import SingleProduct from './pages/Home/SingleProduct';
import AboutUs from './components/AboutUs.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop/:id',
        element: <SingleProduct />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {path: '/login',
      element: <Login />
    },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
