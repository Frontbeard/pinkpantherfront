import React from 'react';
import notFoundImage from '../../public/images/imagenNotFound.jpg'; 

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img src={notFoundImage} alt="Página no encontrada"  /> 
    </div>
  );
};

export default NotFound;
