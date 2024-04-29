import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaStar } from "react-icons/fa";
import logo from "/logo.jpeg";
import { NavLink } from "react-router-dom";
import FilterModal from "./FilterModal";
import SearchBar from "./Searchbar";
import ProductList from "./ProductList";
import { useSelector, useDispatch } from "react-redux";
import getAllCategories from "../redux/actions/Category/getAllCategories";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const allCategories = useSelector(state => state.allCategories);
    console.log(allCategories);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories()); // Dispatch para obtener las categorías al montar el componente
    }, []);

    useEffect(() => {
        if (!modalOpen) {
            setSelectedCategory(null);
        }
    }, [modalOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCategoryClick = (title) => {
        setSelectedCategory(title);
        setSelectedSubcategory(null);
        setModalOpen(true); 
    };
    
    
    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleGoBackToCategory = () => {
        setSelectedSubcategory(null);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
    };

    const handleFilter = (filteredProducts) => {
        setFilteredProducts(filteredProducts);
    };

    const handleMouseEnterCategory = (title) => {
        setSelectedCategory(title);
    };

    
    // Utiliza un conjunto para eliminar duplicados de categorías
    const uniqueCategories = Array.isArray(allCategories)
    ? new Set(allCategories.map(category => category.name))
    : new Set();
  
  const navItems = [...uniqueCategories].map(title => ({
    title,
    path: title === "about us" ? "/about" : `/categories/${title.toLowerCase()}`,
    subcategories: Array.isArray(allCategories)
      ? allCategories.find(category => category.name === title).subcategories
      : [],
  }));
  
    
    







    return (
        <header className="max-w-screen-2xl xl:px-28 px-4 w-full top-0 left-0 right-0 mx-auto">
            <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
                <SearchBar onSearch={handleSearch} />
                <a href="/" className="ml-24">
                    <img src={logo} alt="" />
                </a>
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
                        {isMenuOpen ? <FaTimes className="w-6 h-6 text-black" /> : <FaBars className="w-6 h-6 text-black" />}
                    </button>
                </div>
            </nav>
            <hr />
            {searchQuery ? <ProductList searchQuery={searchQuery} /> : (
                <div className="pt-4">
                    <ul className="lg:flex items-center justify-evenly text-black hidden">
                        {navItems.map(({ title, path, subcategories }) => (
                            <li key={title} className="relative">
                                
                                <div onClick={() => handleCategoryClick(title)}>
                                    <NavLink
                                        to={path}
                                        className={selectedCategory === title ? "active" : ""}
                                        style={{ color: selectedCategory === title ? "blue" : "black" }}
                                        onMouseEnter={() => handleMouseEnterCategory(title)}
                                    >
                                        {title}
                                    </NavLink>
                                </div>
                                {selectedCategory === title && (
                                    <ul className="absolute left-0 top-full bg-white shadow-lg z-10">
                                        {subcategories &&
                                            subcategories.map((subcategory, index) => (
                                                <li key={index}>
                                                    <button onClick={() => handleSubcategoryClick(subcategory)}>
                                                        {subcategory}
                                                    </button>
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
           {modalOpen && (
    <FilterModal
        category={selectedCategory}
        subcategory={selectedSubcategory}
        onFilter={handleFilter}
        onClose={handleCloseModal}
        onGoBack={handleGoBackToCategory}
    />
            )}
        </header>
    );
};

export default Navbar;