import React, { useState } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaStar } from "react-icons/fa";
import logo from "/logo2.png";
import { NavLink } from "react-router-dom";

const Navbar = ({ handleInputChange, query }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { title: "NEW IN", path: "/" },
    { title: "Calzas", path: "/" },
    { title: "Shorts", path: "/" },
    { title: "Pantalones", path: "/" },
    { title: "Tops", path: "/" },
    { title: "Remeras", path: "/" },
    { title: "SALE", path: "/" },
  ];

  return (
    <header className="max-w-screen-2xl bg-gray xl:px-28 px-4 flex flex-col w-full top-0 left-0 right-0 mx-auto" onChange={handleInputChange} value={query}>
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3 ">
        <div className="flex flex-row gap-10">
          <NavLink to="/">
            <img src={logo} alt="" className="w-40 h-auto" />
          </NavLink>
          <div className="text-lg text-black sm:flex items-center gap-8 hidden">
            <NavLink to="/" className="flex items-center gap-2">
              <FaUser />
            </NavLink>
            <NavLink to="/" className="flex items-center gap-2">
              <FaStar />
            </NavLink>
            <NavLink to="/" className="flex items-center gap-2 container">
              <FaShoppingBag />
            </NavLink>
            <NavLink to="/about" className="flex flex-row gap-2">
              <span>About</span>
              <span>PINKPANTHER</span>
            </NavLink>
          </div>
        </div>
        <FaSearch className="text-black w-6 h-6 cursor-pointer hidden md:block" />
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes className="w-6 h-6 text-black" /> : <FaBars className="w-6 h-6 text-black" />}
          </button>
        </div>
      </nav>
      <hr />
      <div className="pt-4">
        <ul className="lg:flex items-center justify-between text-black hidden">
          {navItems.map(({ title, path }) => (
            <li key={title} className="hover:text-pink-300">
              <NavLink to={path} activeClassName="active">
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className={`bg-black text-white px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`}>
          {navItems.map(({ title, path }) => (
            <li key={title} className="hover:text-pink-300 my-3 cursor-pointer">
              <NavLink to={path} onClick={toggleMenu}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
