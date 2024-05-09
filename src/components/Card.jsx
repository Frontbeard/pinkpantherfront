import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { createCart } from "../redux/actions/Cart/createCart";
import { addCart } from "../redux/actions/Cart/addCart";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowAltCircleRight } from "react-icons/fa";
import productbyID from "../redux/actions/Product/productById";

const Card = ({ filteredItems }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1); // Estado para la  cantidad de productos
  const userCart = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Fetch product details by ID
    dispatch(productbyID(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);

  const handleOnClick = () => {
    // console.log("userCart",userCart)
    if (!userCart) {
      dispatch(createCart(filteredItems.id, quantity));
    } else {
      dispatch(addCart(filteredItems.id, quantity));
    }
    alert("Producto agregado al carrito");
    //navigate("/")
  };

  const handleOnRedireccion = () => {
    navigate("/login")
  };

  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-xl shadow dark:bg-pink-100 dark:border-pink-100">
      <Link to={`/shop/${filteredItems.id}`}>
        <img
          src={filteredItems.photo}
          alt={filteredItems.name}
          className="p-4 rounded-t-xl"
        />
      </Link>
      <div className="px-4 pb-4">
        <Link to={`/shop/${filteredItems.id}`}>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-black">
            {filteredItems.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h5>
        </Link>
        <div className="flex items-center mt-2 mb-1"></div>
        <span className="text-lg font-bold text-black dark:text-black">
          {filteredItems.priceCuotas.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
        </span>
        
        {!localStorage.getItem('firebaseUid') && (
                          <button
                            className="flex justify-center items-center gap-2 mt-3 py-2 px-3 bg-pink-500 text-white text-sm font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-pink-500"
                            title="Agregar al Carrito"
                            onClick={handleOnRedireccion}
                          >
                            <span>¡Inicie sesión para comprar!</span>
                            <FaArrowAltCircleRight />
                          </button>
                        )}
                        {localStorage.getItem('firebaseUid') && (userData.role === "ADMIN" || "CUSTOMER") && (
                          <button
                            className="flex justify-center items-center gap-2 mt-3 py-2 px-3 bg-pink-500 text-white text-sm font-bold border rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-pink-500"
                            title="Agregar al Carrito"
                            onClick={handleOnClick}
                          >
                            <span>Agregar al Carrito</span>
                            <FaArrowAltCircleRight />
                          </button>
                        )}

      </div>
    </div>
  );
};

export default Card;
