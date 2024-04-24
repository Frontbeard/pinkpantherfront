import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import SingleProduct from './pages/Home/SingleProduct';
import AboutUs from './components/AboutUs.jsx';
import Navbar from './components/Navbar.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store'; // Corrige la importación del store

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<SingleProduct />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/public/comingsoon/index.html" element={<Navbar />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
);


