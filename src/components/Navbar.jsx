import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaStar } from "react-icons/fa";
import logo2 from "/logo2.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
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
            const enabledProducts = filtered.filter(
                (product) => product.enable === true
            );
            setFilteredProducts(enabledProducts);
        } else {
            setShowFilterModal(false); // Agregamos esta línea para cerrar el modal al hacer clic en "about us"
            setFilteredProducts([]); // Limpiamos los productos filtrados
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
        navigate(`/search/${query}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('firebaseUid');
        localStorage.removeItem('gmail');
        navigate('/')
        dispatch(logout());
        console.log('Has cerrado sesión');
        alert('Has cerrado sesión');
    };

    const handleMisCompras = () => {
        console.log('Has hecho click');
        alert('Has hecho click');
           //navigate("/miscompras") // ???
           navigate("/compras") // ???
        };
    

    const handleMiPerfil = () => {
        console.log('Has hecho click');
         //alert('Has hecho click');
         navigate("/perfil")
        };
    

    const handleDashboard = () => {
        console.log('Has hecho click');
         //alert('Has hecho click');
         navigate("/admin")
        };

    // Ordenar las categorías según tu preferencia
    const orderedCategories = [
      "New In",
      "Calzas",
      "Tops",
      "Remeras",
      "Falda Pantalon",
      "Conjuntos",
      "Sale",
    ];

    const orderedFilteredCategories = orderedCategories.map(categoryName =>
        allCategories.find(category => category.name.toLowerCase() === categoryName.toLowerCase())
    );
    const handleUpdateFilteredProducts = (filteredProducts) => {
        setFilteredProducts(filteredProducts);
    };

    return (
        <header className="max-w-screen-2xl xl:px-28 px-4 w-full top-0 left-0 right-0 mx-auto">
            <nav className="flex justify-between items-center container md:py-4 pt-6 pb-3">
                <SearchBar onSearch={handleSearch} />
                <a href="/" className="ml-24 w-64 relative overflow-hidden">
                    <img src={logo2} alt="" className="w-full h-auto transition duration-300 transform hover:brightness-75" />
                </a>
                <div className="text-lg text-Black sm:flex items-center gap-4 hidden truncate">
                    <a href="/login" className="flex items-center gap-2 ">
                        <FaUser />
                    </a>
                    {(!localStorage.getItem('firebaseUid'))  && (
                        <span>
                            ¡Inicie sesión!
                        </span>
                    )}

                    {localStorage.getItem('firebaseUid') && customer.role === "CUSTOMER" && (
                        <span>
                            Logueado como: {customer.userName}
                            <br />
                            <button onClick={handleLogout}>Logout</button>
                            <br />
                            <button onClick={handleMiPerfil}>Mi perfil</button>
                        </span>
                    )}

                    {localStorage.getItem('firebaseUid') && customer.role === "ADMIN" && (
                        <span>
                            Logueado como: {customer.userName}
                            <br />
                            <button onClick={handleLogout}>Logout</button>
                            <br />
                            <button onClick={handleDashboard}>Dashboard</button>
                            <br />
                            <button onClick={handleMiPerfil}>Mi perfil</button>
                        </span>
                    )}

                    <a href="/cart" className="flex items-center gap-2 container">
                        <FaShoppingBag />
                    </a>

                    <a href="/compras" className="flex items-center gap-2">
                        Mis compras
                    </a>
                    {/* {localStorage.getItem('firebaseUid') && customer.role === "CUSTOMER" && (
                        <span>
                            Cantidad Carrito: {}
                        </span>
                    )} */}
                </div>
                <div className="sm:hidden">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes className="w-6 h-6 text-black" /> : <FaBars className="w-6 h-6 text-black" />}
                    </button>
                </div>
            </nav>
            <hr />
            {!searchQuery && (
                <div className="pt-4">
                    <ul className="lg:flex items-center justify-evenly text-black hidden">
                        {orderedFilteredCategories.map(category => (
                            category && (
                                <li key={category.id} className="relative">
                                    <div onClick={() => handleCategoryClick(category.id, category.name)}>
                                        <NavLink
                                            to={`/categories/${category.id}`}
                                            className={selectedCategory === category.id ? "active" : ""}
                                            style={{ color: selectedCategory === category.id ? "blue" : "black" }}
                                        >
                                            {category.name}
                                        </NavLink>
                                    </div>
                                </li>
                            )
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
