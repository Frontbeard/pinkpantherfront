import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByName } from '../redux/actions/Product/getProductByName';
import { productbyID } from '../redux/actions/Product/productById';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const searchedProducts = useSelector(state => state.allproducts); // Obtener los productos filtrados del estado global
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Realizar búsqueda cuando searchTerm cambia
    const search = async () => {
      if (searchTerm.length >= 3) {
        setIsLoading(true);
        await dispatch(getProductByName(searchTerm));
        setIsLoading(false);
      } else {
        // Limpiar los resultados si no hay suficientes letras para la búsqueda
        setIsLoading(false);
        setShowResults(false);
      }
    };

    search();
  }, [searchTerm, dispatch]);

  useEffect(() => {
    // Mostrar resultados solo si se realiza una búsqueda y hay resultados
    setShowResults(searchTerm.length >= 3 && searchedProducts && searchedProducts.length > 0);
  }, [searchTerm, searchedProducts]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedProduct(null); // Limpiar el producto seleccionado al cambiar el término de búsqueda
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedProduct(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
  };

  const handleProductSelect = async (product) => {
    setSelectedProduct(product);
    // Obtener detalles del producto seleccionado
    await dispatch(productbyID(product.id));
  };

  return (
    <div className="search-bar-container">
      <form className="flex items-center border border-gray-300 rounded-md px-3 py-1" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleInputChange}
          className="outline-none border-none flex-grow px-2"
        />
        <button type="button" onClick={handleClearSearch} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
        <button type="submit" className="text-gray-500 hover:text-gray-700">
          <FaSearch />
        </button>
      </form>

      {isLoading && <p>Cargando...</p>}

      {showResults && (
        <div className="product-list">
          {searchedProducts.map(product => (
            <div key={product.id} onClick={() => handleProductSelect(product)} className="product-item">
              <h3>{product.name}</h3>
              {/* Renderizar más detalles del producto si es necesario */}
            </div>
          ))}
        </div>
      )}

      {/* Mostrar detalles del producto seleccionado */}
      {selectedProduct && (
        <div className="selected-product-details">
          <h3>{selectedProduct.name}</h3>
          {/* Renderizar más detalles del producto seleccionado si es necesario */}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
