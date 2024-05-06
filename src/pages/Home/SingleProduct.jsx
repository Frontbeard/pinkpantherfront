import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { productbyID } from "../../redux/actions/Product/productById";
import { createCart } from "../../redux/actions/Cart/createCart";
import { addCart } from "../../redux/actions/Cart/addCart";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const productDetails = useSelector(state => state.details);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); 
  const userData = useSelector((state) => state.userData)
  const userCart = useSelector((state) => state.cart)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    dispatch(productbyID(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);

  const { photo, name, size, priceEfectivo, priceCuotas, color, quantity: availableQuantity, Categories } = productDetails;

  const handleOnClick = () => {
    console.log(userCart)
    if (!userCart) { 
      dispatch(createCart( id, quantity ))
    } else {
      dispatch(addCart( id, quantity ))
    }
    alert("Producto agregado al carrito")
  };

  const handleOnRedireccion = () => {
    navigate("/login")
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-black dark:bg-pink-400 mb-4">
                <img className="w-full h-full object-cover" src={photo} alt="Product Image" />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-black mb-2">{name}</h2>
              <p className="text-black dark:text-black text-lg mb-4">
                Color: {color}<br />
                Talle: {size}<br />
                Cantidad disponible: {availableQuantity}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-pink-400 text-lg">Precio Efectivo: </span>
                  <span className="text-black dark:text-black text-lg">${priceEfectivo}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-pink-400 text-lg">Precio Cuotas: </span>
                  <span className="text-black dark:text-black text-lg">${priceCuotas}</span>
                </div>
              </div>
              <div>
                <button className="bg-gray-900 dark:bg-black text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-pink-400 dark:hover:bg-pink-400" onClick={handleOnClick}>Agregar al Carrito</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

