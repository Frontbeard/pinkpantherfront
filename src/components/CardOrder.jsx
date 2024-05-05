import React from "react";
import { Link } from "react-router-dom";

const CardOrder = ({ filteredItems }) => {
    return (
        <div className="max-w-xs mx-auto">
          {filteredItems.products.map((product) => (
            <div key={product.id}>
              <Link to={`/shop/${product.id}`}>
                <img
                  src={product.photo} 
                  alt={product.name} 
                  className="w-full h-64 object-cover hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="mt-4 px-4">
                <h4 className="text-base font-semibold mb-2">{product.name}</h4>
                <div className="flex justify-between">
                  <p className="text-black/50">{product.category}</p>
                  <p className="font-semibold">${product.priceEfectivo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };
    

export default CardOrder;
