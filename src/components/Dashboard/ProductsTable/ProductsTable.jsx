import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilAltIcon } from "@heroicons/react/outline";
import EditProduct from "../../EditProduct/EditProduct";
import { getAllProducts } from "../../../redux/actions/Product/getAllProducts";
import { updateProduct } from "../../../redux/actions/Product/updateProduct";
import { Link } from "react-router-dom";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProductsAdmin);
  const accessToken = useSelector((state) => state.accessToken);

  useEffect(() => {
    dispatch(getAllProducts(accessToken));
  }, []);

  const sortedProducts = products?.sort((a, b) => {
    // Primero ordena por nombre
    const nameComparison = a.name.localeCompare(b.name);
    
    // Si los nombres son iguales, ordena por id
    if (nameComparison === 0) {
      return a.id.localeCompare(b.id);
    }
    
    return nameComparison;
  });
  

  const handleActive = (value, product) => {
    try {
      const response = dispatch(
        updateProduct(product.id, {
          enable: value,
        })
      );
      dispatch(getAllProducts(accessToken));
    } catch (error) {
      console.log(error);
    }
  };

  return (
<div>
  {sortedProducts.map((product, index) => (
    <div
      key={product.id}
      className="border-b-2 border-gray-200 py-4 flex items-center justify-between"
    >
      <img src={product.photo} className="w-16 h-16 mr-4" alt="Product" />
      <div className="flex flex-col flex-grow">
        <p className="font-bold text-base mb-1">{product.name}</p>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <p className="text-sm font-bold">Activar/Desactivar</p>
          <label
            htmlFor={`toggle-${product.id}`}
            className="flex items-center cursor-pointer"
          >
            <input
              id={`toggle-${product.id}`}
              type="checkbox"
              className="hidden"
              checked={product.enable}
              onClick={() => handleActive(!product.enable, product)}
            />
            <span
              className={`relative inline-block w-10 h-6 rounded-full ${
                product.enable ? "bg-pink-300" : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute inset-0 w-4 h-4 m-1 rounded-full transition-transform duration-300 ${
                  product.enable
                    ? "transform translate-x-full bg-white"
                    : "bg-white translate-x-0"
                }`}
              ></span>
            </span>
          </label>
        </div>
        <Link to={`/admin/edit-product/${product.id}`}>
          <button className="bg-pink-300 hover:bg-pink-400 text-white py-1 px-2 rounded-md flex items-center">
            <p className="text-sm font-bold">Editar</p>
            <PencilAltIcon className="h-4 w-4 ml-1" />
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>

  );
};

export default ProductsTable;
