import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import banner from "./../../../public/banner.jpg"



const Banner = () => {
  return (
    <div className="bg-gray-100 py-12 xl:px-28 px-4 flex justify-center items-center border shadow-sm border-t border-b mt-5 relative">
      <img src={banner} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="max-w-4xl w-full z-10">
        <div className="py-28 flex flex-col md:flex-row-reverse justify-center items-center gap-14">
          <div className="md:w-1/2 w-full text-center">
            <h1 className="text-9xl font-light mb-5 text-pink-400">Colección</h1>
            <h1 className="text-9xl font-light mb-5 text-pink-400">2024</h1>
            <p className="text-xl mb-7 text-pink-400">
              ¡Potencia tu estilo, libera tu fuerza! Descubrí nuestra colección de indumentaria deportiva para brillar en cada movimiento.
            </p>
            <button className="bg-black hover:bg-pink-400 px-6 py-2 text-white font-semibold flex gap-2 items-center rounded-sm mx-auto">
              <FaShoppingBag className="inline-flex" /> Ver ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;