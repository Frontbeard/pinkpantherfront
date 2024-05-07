import React from 'react';
import notFoundImage from '../../public/images/imagenNotFound.jpg';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from './Navbar';
import Footer from './Footer';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="text-center">
        <img src={notFoundImage} alt="Página no encontrada" />
        <p>¡Oops! Página no encontrada</p>
        <Link to="/">Ir a la página de inicio</Link>
      </div>
    </div>
  );
};

export default NotFound;
