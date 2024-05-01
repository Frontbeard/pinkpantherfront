import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { productbyID} from "../../redux/actions/Product/productById";
import Card from "../../components/Card"; // Importa tu componente de tarjeta
import { getAllProducts} from "../../redux/actions/Product/getAllProducts";


const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.details);
  const allProducts = useSelector(state => state.allproducts);

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
      
    // Fetch product details by ID
    dispatch(productbyID(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);
  
  useEffect(() => {
    dispatch(getAllProducts())
      .catch(error => console.log(error));
  }, []); // Sin dependencias, se ejecutará una vez al montar el componente
  

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Filtrar productos relacionados por categoría
  const relatedProducts = allProducts.filter(product => product.idCategory === productDetails.idCategory && product.id !== productDetails.id);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 bg-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
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
                        src={productDetails.photo}
                        alt="Product-Image"
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h1 className="text-3xl text-black-500 font-semibold sm:text-4xl">
                          {productDetails.name}
                        </h1>
                        <span className="my-3 text-xl text-yellow-600 flex items-center gap-1 sm:my-4">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </span>
                        <span className="text-xl text-pink-500 font-semibold sm:text-2xl">
                          Efectivo: ${productDetails.priceEfectivo}
                        </span>
                        <span className="text-xl text-pink-500 font-semibold sm:text-2xl">
                          Cuotas: ${productDetails.priceCuotas}
                        </span>
                        <div className="text-left flex flex-col gap-2 w-full">
                          <label className="font-semibold">Talle</label>
                          <input
                            className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500"
                            type="text"
                            value={productDetails.size}
                            readOnly
                          />
                          <label className="font-semibold">Color</label>
                          <input
                            className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500"
                            type="text"
                            value={productDetails.color}
                            readOnly
                          />
                        </div>
                        <div className="w-full text-left my-4 flex items-center justify-between">
                          <div className="form-row m-0 align-items-center">
                            <button className="text-2xl font-bold mr-2" onClick={handleDecrement}>-</button>
                            <input
                              type="text"
                              className="w-16 text-center border border-gray-300 rounded-md"
                              value={quantity}
                              readOnly
                            />
                            <button className="text-2xl font-bold ml-2" onClick={handleIncrement}>+</button>
                          </div>
                          <button
                            className="flex justify-center items-center gap-2 py-3 px-4 bg-pink-500 text-white text-md font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-pink-500 lg:m-0 md:px-6"
                            title="Añadir al carrito"
                          >
                            <span>Añadir al carrito</span>
                            <FaArrowAltCircleRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 bg-gray-100">
            <h2 className="text-2xl font-bold mt-8 mb-4">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <Card key={product.id} filteredItems={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
