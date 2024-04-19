import React, { useState } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaStar } from "react-icons/fa";
import logo from "/logo.jpeg";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    
  const navItems = [
    { title: "NEW IN", path: "/" },
    { title: "Calzas", path: "/" },
    { title: "Shorts", path: "/" },
    { title: "Pantalones", path: "/" },
    { title: "Tops", path: "/" },
    { title: "Remeras", path: "/" },
    { title: "SALE", path: "/" },
    { title: "About Us", path: "/" },
  ];
  return (
    <header className="max-w-screen-2xl xl:px-28 px-4 absolute top-0 left-0 right-0 mx-auto">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
        <FaSearch className="text-Black w-6 h-6 cursor-pointer hidden md:block" />
        <a href="/" className="ml-24">
          <img src={logo} alt="" />
        </a>

        {/* botonesss de carrito, favorito y cuenta */}
        <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
          <a href="/" className="flex items-center gap-2 ">
            <FaUser /> Cuenta
          </a>
          <a href="/" className="flex items-center gap-2 ">
            <FaStar /> Favorito
          </a>
          <a href="/" className="flex items-center gap-2 container">
            <FaShoppingBag /> Mi carrito
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
      {/* nav items */}
      <div className="pt-4">
        <ul className="lg:flex items-center justify-between text-black hidden">
          {navItems.map(({ title, path}) => (
            <li key={title} className=" hover:text-pink-300">
              <NavLink
                to={path}
                className={({ isActive}) => isActive ? "active" : ""}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* items menu para el chelularrrrr*/}
      <div>
        <ul className={`bg-black text-white px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`}>
          {navItems.map(({ title, path }) => (
            <li key={title} className=" hover:text-pink-300 my-3 cursor-pointer">
              <Link
                to={path}
                onClick={toggleMenu}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        </div>
      
    </header>
  );
};

export default Navbar;
