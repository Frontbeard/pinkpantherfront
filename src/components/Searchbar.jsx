import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Importar Link desde react-router-dom
import getProductByName from "../redux/actions/Product/getProductByName";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    navigate("/"); // Redirigir al usuario al inicio cuando hace clic en el botón de limpieza
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const trimmedTerm = searchTerm.trim();
    const filteredTerm = trimmedTerm.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (filteredTerm.length >= 3) {
      dispatch(getProductByName(filteredTerm));
      navigate(`/search/${filteredTerm}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  return (
    <div className="search-bar-container">
      <form onSubmit={handleFormSubmit} className="flex items-center border border-gray-300 rounded-md px-3 py-1">
        <input
          type="text"
          placeholder="BUSCAR"
          value={searchTerm}
          onChange={handleInputChange}
          className="relative m-0 -me-0.5 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out placeholder-black focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-black dark:placeholder-text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
        />
        {searchTerm.length >= 1 && (
          <button type="button" onClick={handleClearSearch} className="text-black hover:text-pink-400 ml-4">
            <FaTimes />
          </button>
        )}
        <button type="submit" className="text-black hover:text-pink-400 ml-4">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
