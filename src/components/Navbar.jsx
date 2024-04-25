import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaStar } from "react-icons/fa";
import logo from "/logo.jpeg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { allcategories } from "../redux/actions/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  console.log(categories);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(allcategories());
  }, [dispatch]);




  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="max-w-screen-2xl xl:px-28 px-4 w-full top-0 left-0 right-0 mx-auto">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
        <FaSearch className="text-Black w-6 h-6 cursor-pointer hidden md:block" />
        <a href="/" className="ml-24">
          <img src={logo} alt="" />
        </a>

        {/* Botones de carrito, favorito y cuenta */}
        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          <a href="/login" className="flex items-center gap-2 ">
            <FaUser /> 
          </a>
          <a href="/" className="flex items-center gap-2 ">
            <FaStar /> 
          </a>
          <a href="/" className="flex items-center gap-2 container">
            <FaShoppingBag /> 
          </a>
        </div>

        <div className="sm:hidden">
            <button onClick={toggleMenu}>
                {
                    isMenuOpen ? <FaTimes className="w-6 h-6 text-black"/> : <FaBars className="w-6 h-6 text-black"/>
                }
            </button>
        </div>
      </nav>
      <hr />
      {/* Nav items */}
      <div className={`pt-4 ${isMenuOpen ? "block" : "hidden"} sm:block`}>
        <ul className="lg:flex items-center justify-evenly text-black">
          {categories.map(({ id, name}) => (
            <li key={id} className="hover:text-pink-300">
              <NavLink
                to={`/products/${id}`}
                activeClassName="active"
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
    </header>
  );
};

export default Navbar;
