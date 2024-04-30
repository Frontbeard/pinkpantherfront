import React, { useState } from 'react'; // Agregar importación de useState desde React
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByName, getAllProducts } from '../redux/actions/Product/getProductByName'; // Asumiendo que existe una acción para obtener todos los productos

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const dispatch = useDispatch();
  const searchedProducts = useSelector(state => state.allproducts);

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
              <div key={product.id} className="product-item">
                <h3>{product.name}</h3>
              </div>
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
