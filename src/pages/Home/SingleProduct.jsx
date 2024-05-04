import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { productbyID } from "../../redux/actions/Product/productById";
import { ADD_TO_CART } from "../../redux/actions/actions-types";
import { addToCart } from "../../redux/actions/Cart/addingProduct";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const productDetails = useSelector(state => state.details);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad de productos
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Fetch product details by ID
    dispatch(productbyID(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);

  const { photo, name, size, priceEfectivo, priceCuotas, color, quantity: availableQuantity, Categories } = productDetails;

  // Funciones para incrementar y decrementar la cantidad de productos
  // const incrementQuantity = () => {
  //   if (quantity < availableQuantity) {
  //     setQuantity(prevQuantity => prevQuantity + 1);
  //   }
  // };

  // const decrementQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(prevQuantity => prevQuantity - 1);
  //   }
  // };

  const handleOnClick = () => {
    //dispatch(addToCart(customerId, productId, productQuantity, totalPrice, discounts)) asi entra en el reducer
    console.log('id firebase:', userData.idfirebase)
    console.log('product id:', id)
    console.log('cantidad', quantity)
    dispatch(addToCart(userData.idfirebase, id, quantity ))
    alert("Producto agregado al carrito")
    navigate("/")
  };

  const handleOnRedireccion = () => {
    navigate("/login")
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 bg-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Contenido del producto */}
          <div className="gap-2 pt-8 text-Black/50">
            <a href="/">Home / Shop</a> <a href="/shop" className="font-semibold text-black"></a>
          </div>

          <div className="p-3 max-w-7xl m-auto">
            <div className="mt-6 sm:mt-10">
              <div>
                <div>
                  <div className="grid gird-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={photo}
                        alt="Product-Image"
                        className="w-full"
                      />
                    </div>
                 
                    <div className="flex flex-col justify-between">
                      <div>
                        <h1 className="text-3xl text-black-500 font-semibold sm:text-4xl">
                          {name}
                        </h1>
                        
                        <span className="my-3 text-xl text-yellow-600 flex items-center gap-1 sm:my-4">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </span>
                        <span className="text-xl text-pink-500 font-semibold sm:text-2xl">
                          Precio Efectivo: ${priceEfectivo}
                        </span>
                        <br />
                        <span className="text-xl text-pink-500 font-semibold sm:text-2xl">
                          Precio Cuotas: ${priceCuotas}
                        </span>
                        <br />
                        <span>
                          Color: {color}
                        </span>
                        <br />
                        <span>
                          Talle: {size}
                        </span>
                        <br />
                        <span>
                          Cantidad disponible: {availableQuantity}
                        </span>
                        <br />
                      </div>
                     
                      <div className=" ">
                        <div className="text-left flex flex-col gap-2 w-full">
                          <label className="font-semibold">Cantidad:</label>
                          <div className="flex items-center">
                            
                            <input
                              className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 text-center"
                              type="number"
                              value={quantity}
                              onChange={(e) => {
                                let value = parseInt(e.target.value);
                                // Check if the entered value is greater than available quantity
                                if (value > availableQuantity) {
                                  value = availableQuantity;
                                }
                                // Check if the entered value is less than 1
                                if (value < 1) {
                                  value = 1;
                                }
                                // Update the quantity
                                setQuantity(value);
                              }}
                            />
                            
                          </div>
                        </div>
                        
                        <div className="w-full text-left my-4">
                        {!localStorage.getItem('firebaseUid') && (userData.role === "" || "GUEST") && (
                          <button
                            className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-pink-500 text-white text-md font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-pink-500 lg:m-0 md:px-6"
                            title="Agregar al Carrito"
                            onClick={handleOnRedireccion}
                          >
                            <span>¡Inicie sesión para comprar!</span>
                            <FaArrowAltCircleRight />
                          </button>
                        )}
                        {localStorage.getItem('firebaseUid') && (userData.role === "ADMIN" || "CUSTOMER") && (
                          <button
                            className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-pink-500 text-white text-md font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-pink-500 lg:m-0 md:px-6"
                            title="Agregar al Carrito"
                            onClick={handleOnClick}
                          >
                            <span>Agregar al Carrito</span>
                            <FaArrowAltCircleRight />
                          </button>
                        )}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
