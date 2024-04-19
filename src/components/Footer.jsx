import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";
import logo from "./../../public/logo.jpeg"

const Footer = () => {
    return (
         <footer className="bg-white text-black mt-auto border-t-4  ">        {/* Utilizamos flexbox para alinear el contenido verticalmente */}
     <div className="flex flex-row justify-center items-center px-4 py-7 md:px-12 bg-[#ffffff19]">
    <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-semibold leading-normal lg:w-5/5 mb-6 relative text-pink-500">
            ¡Suscribite a nuestro NewsLetter para recibir novedades!
        </h1>
    </div>

    <div className="flex flex-row items-center justify-center ml-2">
        <input
            type="text"
            placeholder="Ingresa tu correo electrónico"
            className="w-full sm:w-72 px-2 py-2.5 text-gray-800 rounded border border-pink-400 focus:outline-none"
        />
        <button className="bg-pink-500 hover:bg-pink-600 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full mt-4 ml-1">
    Suscribirse
</button>
    </div>
</div>
        
        
          <div className="bg-pink-400 text-white flex flex-row justify-evenly items-center">
            {/* <img src={logo} alt="logo" style={{
                height: '10rem',
                width: '10rem'
            }} /> */}
            <ItemsContainer />
            <SocialIcons Icons={Icons} />
            
          </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-white text-sm pb-8 bg-pink-400  ">
          <span className="block text-white text-sm mx-auto">© 2024 PINKPANTHER. Todos los derechos reservados.</span>         
        </div>
        
      </footer>
    );
  };

export default Footer;

