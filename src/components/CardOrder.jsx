import { Button, CardFooter } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

const CardOrder = ({ filteredItems }) => {
  const navigate = useNavigate()
  const handleSubmit = async (productId) => {

    navigate(`/create-review/${productId}`);
  }
    return (
        <div className="flex flex-col ">
          {filteredItems.products.map((product) => (
            <div key={product.id} className="flex flex-row items-center bg-white border border-b-0 border-gray-200 shadow dark:bg-pink-100 dark:border-pink-100 ">
              <Link to={`/shop/${product.id}`}>
                <img
                  src={product.photo} 
                  alt={product.name} 
                  className="p-1 w-full h-72 object-cover hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="flex flex-row items-center mt-4 px-4">
                <div className="flex mt-2.5 mb-5">
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <p className="text-black/50">Cantidad:{product.quantity}</p>
                  <p className="font-semibold">${product.priceEfectivo}</p>
                </div>
              </div>
              <CardFooter className="flex flex-1 pt-0 mt-1 flex-col">
            <Button onClick={() =>handleSubmit(product.id)} className="text-white bg-pink-500" variant="gradient" fullWidth>
              Calificar
            </Button>
          </CardFooter>
            </div>
          ))}
        </div>
      );
    };
    

export default CardOrder;
