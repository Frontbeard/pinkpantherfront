import React from "react";
import { Link } from "react-router-dom";

const Card = ({ filteredItems }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-100 dark:border-pink-100">
      <Link to={`/shop/${filteredItems.id}`}>
        <img
          src={filteredItems.photo}
          alt={filteredItems.name}
          className="p-8 rounded-t-lg"
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/shop/${filteredItems.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{filteredItems.name}</h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-black dark:text-black">${filteredItems.priceEfectivo}</span>
          <a href="#" className="text-white bg-pink-400 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-400 dark:hover:bg-pink-300 dark:focus:ring-pink-400">Agregar al carrito</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
