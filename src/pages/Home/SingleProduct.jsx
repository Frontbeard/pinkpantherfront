import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { productbyID } from "../../redux/actions/Product/productById";
import { createCart } from "../../redux/actions/Cart/createCart";
import { addCart } from "../../redux/actions/Cart/addCart";
import getProductReview from "../../redux/actions/Review/getProductReview";
import Pagination from "../../components/Pagination";
import CardReview from "../../components/CardReview";
const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad de productos
  const productDetails = useSelector(state => state.details);
  const userData = useSelector((state) => state.userData)
  const userCart = useSelector((state) => state.cart)
  const productReview = useSelector((state) => state.productReview)
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Fetch product details by ID
    dispatch(productbyID(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
      if(id){
        dispatch(getProductReview(id))
      }
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
    //navigate("/")
  };
  // const handleOnClick = () => {
  //   //dispatch(addToCart(customerId, productId, productQuantity, totalPrice, discounts)) asi entra en el reducer
  //   console.log(userCart)
  //   if (!userCart) {
  //     dispatch(createCart(userData.id, id, quantity ))
  //   } else {
  //     dispatch(addCart(userCart.id, id, quantity ))
  //   }
  //   alert("Producto agregado al carrito")
  //   //navigate("/")
  // };
  const handleOnRedireccion = () => {
    navigate("/login")
  };
  useEffect(() => {
    if (productReview.length > 0) {
      setFilteredItems(productReview);
      setTotalPages(Math.ceil(productReview.length / itemsPerPage));
    }
  }, [productReview]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  if (!Array.isArray(paginatedItems)) {
    return null; // o maneja el error de manera adecuada
  }
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 bg-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Contenido del producto */}
          <div className="gap-2 pt-8 text-Black/50">
            {/*<a href="/">Home / Shop</a> <a href="/shop" className="font-semibold text-black"></a> */}
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
                        <br />
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
                        {!localStorage.getItem('firebaseUid') && (
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
                        {filteredItems.length > 0 && (
                            <div className="flex flex-col flex-wrap md:justify-between items-center space-y-3 mb-8">
                              <div className="flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-100 dark:border-pink-100">
                                {paginatedItems.map((review, index) => (
                                  <div key={index}>
                                    <CardReview filteredItem={review} />
                                  </div>
                                ))}
                              </div>
                                <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                />
                            </div>
                              )}
                              <br />
                          <p onClick={() => console.log(productReview)}>getProductReview</p>
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