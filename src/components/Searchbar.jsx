import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import getProductByName from '../redux/actions/Product/getProductByName';
import getAllProducts from '../redux/actions/Product/getAllProducts';
import { useParams } from 'react-router-dom'; // Importar useParams
import SearchCard from './SearchCard'; // Importar el componente Card

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const dispatch = useDispatch();
  const searchedProducts = useSelector(state => state.allproducts);
  const { query } = useParams(); // Obtener el parámetro de búsqueda de la URL

  useEffect(() => {
    if (query && query.trim() !== '') {
      setSearchTerm(query.trim()); // Actualizar el estado searchTerm con el valor del parámetro query
      handleSearch(query.trim()); // Realizar la búsqueda al cargar la página con el parámetro de búsqueda
    }
  }, [query]);

  const handleInputChange = event => {
    const value = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
      setSearchTerm(value.toLowerCase());
      setShowResults(false);
      setNotFound(false);
      setInvalidInput(false);
      if (value === '') {
        dispatch(getAllProducts());
      }
    } else {
      setInvalidInput(true);
    }

    // Realizar la búsqueda automáticamente cuando se ingresen al menos tres caracteres
    if (value.length >= 3) {
      handleSearch(value.substring(0, 3)); // Pasar solo las primeras tres letras para la búsqueda
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    setNotFound(false);
    setInvalidInput(false);
    dispatch(getAllProducts()); // Despacha una acción para obtener todos los productos nuevamente
  };

  const handleSearch = async (query) => {
    if (query.trim() !== '') {
      await dispatch(getProductByName(query.trim()));
      if (searchedProducts.length === 0) {
        setNotFound(true);
      } else {
        setShowResults(true);
      }

      // Redirigir a la página de resultados de búsqueda con el término de búsqueda en la URL
      window.history.pushState({}, '', '/search/' + query);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault(); // Evitar el envío predeterminado del formulario
    handleSearch(searchTerm); // Realizar la búsqueda al presionar Enter
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleFormSubmit} className="flex items-center border border-gray-300 rounded-md px-3 py-1">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleInputChange}
          className={`outline-none border-none flex-grow px-2 ${invalidInput ? 'invalid-input' : ''}`}
        />
        {searchTerm && (
          <button type="button" onClick={handleClearSearch} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        )}
        <button type="submit" className="text-gray-500 hover:text-gray-700">
          <FaSearch />
        </button>
      </form>

      {showResults && (
        <div className="product-list">
          {searchedProducts.length > 0 ? (
            searchedProducts.map(product => (
              <SearchCard key={product.name} filteredItems={product} /> // Renderizar los productos en forma de tarjetas
            ))
          ) : (
            <div className="not-found-message">Ese producto no está disponible</div>
          )}
        </div>
      )}
      {invalidInput && <div className="invalid-input-message">Sólo se admiten letras y espacios</div>}
    </div>
  );
};

export default SearchBar;
