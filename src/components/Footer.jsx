import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";

const Footer = () => {
    return (
      <footer className="bg-white text-black mt-auto">
        {/* Utilizamos flexbox para alinear el contenido verticalmente */}
        <div className="flex justify-between items-center px-4 py-7 md:px-12 bg-[#ffffff19]">
          <h1 className="text-3xl md:text-4xl font-semibold leading-normal lg:w-2/5 mb-6">
            <span className="text-pink-400">¡Destaca</span> tu estilo con nuestra moda femenina!
          </h1>
          <div>
            <input
              type="text"
              placeholder="Ingresa tu correo electrónico"
              className="w-full sm:w-72 px-2 py-2.5 text-gray-800 rounded focus:outline-none"
            />
            <button className="bg-pink-400 hover:bg-pink-600 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full mt-4">
              Suscribirse
            </button>
          </div>
        </div>
        <div>
          <ItemsContainer/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
          <span>© 2024 Appy. Todos los derechos reservados.</span>
          <span>Términos · Política de privacidad</span>
          <SocialIcons Icons={Icons}/>
        </div>
      </footer>
    );
  };
  
  
export default Footer;