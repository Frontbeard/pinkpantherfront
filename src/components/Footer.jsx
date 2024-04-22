import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";
import logo2 from "./../../public/logo2.png"
import { FaInstagram, FaGoogle } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-50 text-black mt-10 relative shadow-inner">
      {/* Utilizamos flexbox para alinear el contenido verticalmente */}
      {/* <div className="flex flex-col items-center px-4 py-7 md:px-12 bg-[#ffffff19]">
        <h1 className="text-3xl md:text-4xl font-semibold leading-normal lg:w-4/5 mb-6 relative text-pink-500">
          ¡Suscribite a nuestro NewsLetter para recibir novedades!
        </h1>
        <div >
          <input
            type="text"
            placeholder="Ingresa tu correo electrónico"
            className="flex-grow px-2 py-2.5 text-gray-800 rounded border border-pink-400 focus:outline-none mr-2"
          />
          <button className="bg-pink-500 hover:bg-pink-600 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full mt-4 ml-1">
            Suscribirse
          </button>
        </div>
      </div> */}

      <div className=" text-gray-500 flex flex-row justify-evenly items-center py-4">
        <img
          src={logo2}
          alt="logo"
          style={{
            height: "10rem",
            width: "10rem"
          }}
          className="mr-4"
        />
        <ItemsContainer />
        <div className="flex items-center">
          {/* Enlace al perfil de Instagram */}
          <a href="https://www.instagram.com/pink.pantherindumentaria" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 mr-4">
            <FaInstagram size={24} />
          </a>
          {/* Enlace al correo de Gmail */}
          <a href="mailto:Pink27854@gmail.com" className="text-gray-500 hover:text-gray-700">
            <FaGoogle size={24} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-white text-sm pb-8 bg-pink-400">
  <span className="block mx-auto text-center">
    © 2024 <span className="font-bold">PINKPANTHER</span>. Todos los derechos reservados.
  </span>
</div>

    </footer>
  );
};

export default Footer;

