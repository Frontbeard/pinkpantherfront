import React, { useState } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaStar } from "react-icons/fa";
import logo from "/logo2.png";
import { NavLink } from "react-router-dom";
import FilterModal from "./FilterModal";

const Navbar = ({ handleInputChange, query }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    option1: "",
    option2: "",
    option3: ""
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState('');
  const [modalSubcategory, setModalSubcategory] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    setActiveSubcategory(null);
  };

  const toggleSubcategory = (category, subcategory) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setModalCategory(category);
    setModalSubcategory(subcategory);
    setIsFilterModalOpen(true);
  };

  const handleFilterChange = (event, option) => {
    setFilterOptions({
      ...filterOptions,
      [option]: event.target.value
    });
  };

  const navItems = [
    { title: "NEW IN", subcategories: ["Temporada otoño-invierno 2024"] },
    { title: "Calzas", subcategories: ["Biker", "Capri", "Cortas", "Largas"] },
    { title: "Faldapantalon", subcategories: ["Campana", "Recta"] },
    { title: "Remeras", subcategories: ["Musculosa", "Remera", "Sudadera"] },
    { title: "Tops deportivos", subcategories: ["Bretel ancho", "Con Tazas", "Manga larga", "Nike"] },
    { title: "Conjuntos", subcategories: ["Cortos", "Largos"] },
    { title: "Sale", subcategories: [] }
  ];

  return (
    <header className="max-w-screen-2xl bg-gray xl:px-28 px-4 flex flex-col w-full top-0 left-0 right-0 mx-auto">
      <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3 ">
        <div className="flex flex-row gap-10 items-center">
          <NavLink to="/">
            <img src={logo} alt="" className="w-40 h-auto" />
          </NavLink>
          <div className="text-lg text-black flex items-center gap-8 hidden sm:flex">
            <NavLink to="/" className="flex items-center gap-2">
              <FaUser />
            </NavLink>
            <NavLink to="/" className="flex items-center gap-2">
              <FaStar />
            </NavLink>
            <NavLink to="/" className="flex items-center gap-2">
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
          {navItems.map(({ title, subcategories }) => (
            <li key={title} className="hover:text-pink-300">
              <div onClick={() => toggleCategory(title)}>
                {title}
              </div>
              {activeCategory === title && (
                <ul>
                  {subcategories.map((subcategory) => (
                    <li key={subcategory}>
                      <div onClick={() => toggleSubcategory(title, subcategory)}>
                        {subcategory}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className={`bg-black text-white px-4 py-2 rounded ${isMenuOpen ? "" : "hidden"}`}>
          {navItems.map(({ title }) => (
            <li key={title} className="hover:text-pink-300 my-3 cursor-pointer">
              <div onClick={toggleMenu}>
                {title}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Renderizado del modal de filtro */}
      {isFilterModalOpen && (
        <FilterModal
          category={modalCategory}
          subcategory={modalSubcategory}
          onFilter={() => console.log("Filter applied")}
          onClose={() => setIsFilterModalOpen(false)}
          onGoBack={() => setActiveSubcategory(null)} // Aquí se actualiza el estado de la subcategoría al volver
        />
      )}
    </header>
  );
};

export default Navbar;




