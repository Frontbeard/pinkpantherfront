import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaStar } from "react-icons/fa";
import logo2 from "/logo2.png";
import { NavLink, useNavigate } from "react-router-dom";
import FilterModal from "./FilterModal";
import SearchBar from "./Searchbar";
import { useSelector, useDispatch } from "react-redux";
import getAllCategories from "../redux/actions/Category/getAllCategories";
import logout from "../redux/actions/Customer/logout";
import ProductFilter from "./ProductFilter";
import selectCategory from "../redux/actions/Category/selectCategory"; 
import isAuthenticated from "../Firebase/checkAuth";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const allCategories = useSelector(state => state.allCategories);

    const customer = useSelector(state => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        isAuthenticated(dispatch);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCategoryClick = (categoryId, categoryName) => {
        setSelectedCategory(categoryId);
        if (categoryName !== "about us") {
            setShowFilterModal(true);
            dispatch(selectCategory(categoryId));
            const selectedCategoryObj = allCategories.find(category => category.id === categoryId);
            const filtered = selectedCategoryObj ? selectedCategoryObj.products : [];
            setFilteredProducts(filtered);
        }
    };

    const handleCloseModal = () => {
        setShowFilterModal(false);
        setSelectedCategory(null);
        setFilteredProducts([]); // Limpiar productos filtrados al cerrar el modal
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSelectedCategory(null);
        setFilteredProducts([]); // Limpiar productos filtrados al realizar una nueva búsqueda
    };

    const handleLogout = () => {
        localStorage.removeItem('firebaseUid');
        localStorage.removeItem('gmail');
        dispatch(logout());
        console.log('Has cerrado sesión');
        alert('Has cerrado sesión');
    };

    const handleMisCompras = () => {
        console.log('Has hecho click');
        alert('Has hecho click');
        navigate("/miscompras")
    };

    const handleMiPerfil = () => {
        console.log('Has hecho click');
        alert('Has hecho click');
        navigate("/perfil")
    };

    const handleDashboard = () => {
        console.log('Has hecho click');
        alert('Has hecho click');
        navigate("/admin")
    };

    const navItems = allCategories.map(({ id, name, products }) => ({
        id,
        name,
        path: name === "about us" ? "/about" : `/categories/${id}`,
    }));

    const handleUpdateFilteredProducts = (filteredProducts) => {
        setFilteredProducts(filteredProducts);
    };

    
    return (
        <header className="max-w-screen-2xl xl:px-28 px-4 w-full top-0 left-0 right-0 mx-auto">
            <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
                <SearchBar onSearch={handleSearch} />
                <a href="/" className="ml-24 w-64">
                <img src={logo2} alt="" />
                </a>
                <div className="text-lg text-Black sm:flex items-center gap-4 hidden">
                    <a href="/login" className="flex items-center gap-2 ">
                        <FaUser />
                    </a>

                    {customer.role === "CUSTOMER" && localStorage.getItem('firebaseUid') && (
                        <span>
                            Logueado como: {customer.userName}
                            <button onClick={handleLogout}>Logout</button>
                            <button onClick={handleMisCompras}>Mis compras</button>
                            <button onClick={handleMiPerfil}>Mi perfil</button>
                        </span>
                    )}

                    {customer.role === "ADMIN" && localStorage.getItem('firebaseUid') && (
                        <span>
                            Logueado como: {customer.userName}
                            <button onClick={handleLogout}>Logout</button>
                            <button onClick={handleDashboard}>Dashboard</button>
                            <button onClick={handleMiPerfil}>Mi perfil</button>
                        </span>
                    )}
                    <a href="/favorites" className="flex items-center gap-2 ">
                        <FaStar />
                    </a>
                    <a href="/cart" className="flex items-center gap-2 container">
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
            {searchQuery ? null : (
                <div className="pt-4">
                    <ul className="lg:flex items-center justify-evenly text-black hidden">
                        {navItems.map(({ id, name, path }) => (
                            <li key={id} className="relative">
                                <div onClick={() => handleCategoryClick(id, name)}>
                                    <NavLink
                                        to={path}
                                        className={selectedCategory === id ? "active" : ""}
                                        style={{ color: selectedCategory === id ? "blue" : "black" }}
                                    >
                                        {name}
                                    </NavLink>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {showFilterModal && (
                <FilterModal
                    category={selectedCategory}
                    onClose={handleCloseModal}
                    products={filteredProducts}
                    onUpdateFilteredProducts={handleUpdateFilteredProducts}
                />
            )}
           {filteredProducts && filteredProducts.length > 0 && (
    <ProductFilter products={filteredProducts} />
)}

        </header>
    );
};

export default Navbar;
