import { Button, CardFooter } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

const CardOrder = ({ filteredItems, orderId }) => {
  const navigate = useNavigate()
  const handleSubmit = async (orderId) => {

    navigate(`/create-review/${orderId}`);
  }
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
                  <p className="text-black/50">{product.quantity}</p>
                  <p className="font-semibold">${product.priceEfectivo}</p>
                </div>
              </div>
              <CardFooter className="pt-0 mt-1">
            <Button onClick={() =>handleSubmit(orderId)} className="text-white bg-pink-500" variant="gradient" fullWidth>
              Calificar
            </Button>
          </CardFooter>
            </div>
          ))}
        </div>
      );
    };
    

export default CardOrder;
