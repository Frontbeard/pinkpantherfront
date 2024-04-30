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
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const allCategories = useSelector(state => state.allCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    useEffect(() => {
        if (!modalOpen) {
            setSelectedCategory(null);
        }
    }, [modalOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSelectedCategory(null);
    };

    const handleFilter = (filteredProducts) => {
        setFilteredProducts(filteredProducts);
    };

    const handleMouseEnterCategory = (title) => {
        setSelectedCategory(title);
    };

    const uniqueCategories = Array.isArray(allCategories)
        ? new Set(allCategories.map(category => ({ id: category.id, name: category.name })))
        : new Set();

    const navItems = [...uniqueCategories].map(({ id, name }) => ({
        id,
        name,
        path: name === "about us" ? "/about" : `/categories/${id}`,
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
                        {navItems.map(({ id, name, path }) => (
                            <li key={id} className="relative">
                                <div onClick={() => handleCategoryClick(id)}>
                                    <NavLink
                                        to={path}
                                        className={selectedCategory === name ? "active" : ""}
                                        style={{ color: selectedCategory === name ? "blue" : "black" }}
                                        onMouseEnter={() => handleMouseEnterCategory(name)}
                                    >
                                        {name}
                                    </NavLink>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {modalOpen && (
                <FilterModal
                    category={selectedCategory}
                    onFilter={handleFilter}
                    onClose={handleCloseModal}
                />
            )}
            {filteredProducts.length > 0 && (
                <div>
                    <ul>
                        {filteredProducts.map(product => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
