import React from "react";
import { Link } from "react-router-dom";

const Card = ({ filteredItems }) => {
  return (
    <div className="max-w-xs mx-auto">
      <Link to={`/shop/${filteredItems.id}`}>
        <img
          src={filteredItems.photo} 
          alt={filteredItems.name} 
          className="w-full h-64 object-cover hover:scale-105 transition-all duration-300"
        />
      </Link>
      <div className="mt-4 px-4">
        <h4 className="text-base font-semibold mb-2">{filteredItems.name}</h4>
        <div className="flex justify-between">
          <p className="text-black/50">{filteredItems.category}</p>
          <p className="font-semibold">${filteredItems.priceEfectivo}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
