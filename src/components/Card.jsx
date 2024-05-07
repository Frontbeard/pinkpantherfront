import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCart } from "../redux/actions/Cart/createCart";
import { addCart } from "../redux/actions/Cart/addCart";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowAltCircleRight} from "react-icons/fa";
import productbyID from "../redux/actions/Product/productById";

const Card = ({ filteredItems }) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1); // Estado para la  cantidad de productos
  const userCart = useSelector((state) => state.cart)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Fetch product details by ID
    dispatch(productbyID(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);

  const handleOnClick = () => {
    // console.log("userCart",userCart)
    if (!userCart) {
      dispatch(createCart( filteredItems.id, quantity ))
    } else {
      dispatch(addCart( filteredItems.id, quantity ))
    }
    alert("Producto agregado al carrito")
    //navigate("/")
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-100 dark:border-pink-100">
      <Link to={`/shop/${filteredItems.id}`}>
        <img
          src={filteredItems.photo}
          alt={filteredItems.name}
          className="p-8 rounded-t-lg"
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/shop/${filteredItems.id}`}>
          {/* <h5>id producto?   {filteredItems.id}</h5> */}
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{filteredItems.name}</h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-black dark:text-black">${filteredItems.priceEfectivo}</span>
          <button
          className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-pink-500 text-white text-md font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-pink-500 lg:m-0 md:px-6"
          title="Agregar al Carrito"
          onClick={handleOnClick}
          >
            <span>Agregar al Carrito</span>
            <FaArrowAltCircleRight />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
