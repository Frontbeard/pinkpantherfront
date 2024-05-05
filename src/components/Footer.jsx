import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";
import logo2 from "./../../public/logo2.png"
import { FaInstagram, FaGoogle } from 'react-icons/fa';


const Footer = () => {
  return (

    <footer className="bg-gray-50 text-black mt-10 relative shadow-inner">
 

      <div className=" text-gray-500 flex flex-row justify-evenly items-center py-4">
        <img
          src={logo2}
          alt="logo"
          style={{
            height: "7rem",
            width: "15rem"
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
          <a href="mailto:pink27854@gmail.com" className="text-gray-500 hover:text-gray-700">
            <FaGoogle size={24} />
          </a>
        </div>
      </div>

      <div className="sm:mx-auto gap-10 text-center pt-2 text-white text-sm pb-2 bg-pink-400">
        <span class="block text-sm text-white sm:text-center dark:text-white">© 2024 <a href="https://www.instagram.com/pink.pantherindumentaria" target="_blank" class="hover:underline">PinkPanther™</a>. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;


