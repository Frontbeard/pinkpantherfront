import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { productbyID } from "../../redux/actions/Product/productById";

/* const demoText = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elited scelerisque turpis posuere. Mauris in felis id eros dapibus tristique. Sed vehicula vestibulum vehicula. Donec vestibulum purus non vestibulum fringilla.",
  highlights: [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt",
    "Ut labore et dolore magna aliqua",
  ],
  details:
    "Lorem ipsum dolor sitnec rutuismod, mauris sit amet rutrum tempor, odio lectus facilisis nisi, a scelerisque sem orci vel nunc. Fusce scelerisque eros a sem fermentum, ac convallis nisi dictum. Vivamus sit amet pretium eros.",
}; */

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.details);
  console.log(productDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Fetch product details by ID
    dispatch(productbyID(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);

  const { photo, name, size, priceEfectivo, priceCuotas, color, quantity, supplier, enable, Categories } = productDetails;

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
                      

                       {/*  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                          {demoText.description}
                        </p> */}
                        


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
                          Fábrica: {supplier}
                        </span>
                        <br />
                        <span>
                          Cantidad disponible: {quantity}
                        </span>
                        <br />
                        <span>
                          Pertenece a la categoría: {Categories.name}
                        </span>


                      </div>
                     
                      <div className=" ">
                        <div className="text-left flex flex-col gap-2 w-full">
                         
                          <label className="font-semibold">Tamaño</label>
                       
                          <input
                            className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500"
                            type="text"
                            value={size}
                            readOnly
                          />
                        </div>
                        
                        <div className="w-full text-left my-4">
                          <button
                            className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-pink-500 text-white text-md font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-pink-500 lg:m-0 md:px-6"
                            title="Confirm Order"
                          >
                            <span>Confirmar Orden</span>
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

          {/* product details */}
         {/*  <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">Detalles</h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">
                {demoText.details}
              </p>
            </div>
          </div> */}

         {/*  <div className="mt-4">
            <h2 className="text-sm font-medium text-gray-900">Descripción</h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">
                {demoText.description}
              </p>
            </div>
          </div> */}

          {/* <div className="mt-4">
            <h2 className="text-sm font-medium text-gray-900">Características</h2>
            <div className="mt-4 space-y-4">
              <li className="text-sm text-gray-600">
                {demoText.highlights[0]}
              </li>
              <li className="text-sm text-gray-600">
                {demoText.highlights[1]}
              </li>
              <li className="text-sm text-gray-600">
                {demoText.highlights[2]}
              </li>
              <li className="text-sm text-gray-600">
                {demoText.highlights[3]}
              </li>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
