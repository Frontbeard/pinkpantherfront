import { FaShoppingBag } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';

const Videobanner = ({ onVerAhoraClick }) => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white">
      <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <iframe
          className="min-w-full min-h-full absolute inset-0"
          title="YouTube video"
          src="https://www.youtube.com/embed/d2SSULDHQuc?autoplay=1&mute=1&loop=1&playlist=d2SSULDHQuc"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-content flex flex-col items-center justify-center space-y-2 z-10 h-full">
        <div className="md:w-1/2 w-full">
          <h1 className="text-7xl mb-5 text-pink-400 font-semibold">Colección 2024</h1>
          <p className="text-xl mb-5 text-white">
            ¡Potencia tu estilo, libera tu fuerza! Descubrí nuestra colección de indumentaria deportiva para brillar en cada movimiento.
          </p>
          <div className="flex justify-center">
            <Link to="./Category">
              <button className="bg-black hover:bg-pink-400 px-6 py-2 text-white font-semibold flex items-center rounded-sm">
                <FaShoppingBag className="inline-flex mr-2" /> Productos destacados
              </button>
            </Link>
          </div>
        </div>
      </div>
      <style>
        {`
          .video-docker::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1;
          }
        `}
      </style>
    </section>
  );
};

export default Videobanner;
