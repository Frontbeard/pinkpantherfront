import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import getProductByName from '../redux/actions/Product/getProductByName';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    navigate('/'); // Redirigir al usuario al inicio cuando hace clic en el botón de limpieza
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const trimmedTerm = searchTerm.trim();
    const filteredTerm = trimmedTerm.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (filteredTerm.length >= 3) {
      dispatch(getProductByName(filteredTerm));
      navigate(`/search/${filteredTerm}`);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchTerm('');
    }
  }, [location.pathname]);

  return (
    <div className="search-bar-container">
      <form onSubmit={handleFormSubmit} className="flex items-center border border-gray-300 rounded-md px-3 py-1">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleInputChange}
          className="outline-none border-none flex-grow px-2"
        />
        {searchTerm.length >= 1 && (
          <button type="button" onClick={handleClearSearch} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        )}
        <button type="submit" className="text-gray-500 hover:text-gray-700">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
