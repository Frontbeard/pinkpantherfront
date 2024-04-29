import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { filtByCategory } from '../redux/actions/Filter/filtByCategory';
import { filtBySize } from '../redux/actions/Filter/filtBySize';

const FilterModal = ({ category, subcategory, onClose, onGoBack }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.allproducts);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isProductFound, setIsProductFound] = useState(true);
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    handleFilter();
  }, [category, subcategory, minPrice, maxPrice, selectedSize]);

  const handleFilter = () => {
    let filteredProducts = [...allProducts];

    // Filtrar por categoría
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
      dispatch(filtByCategory(category));
    }

    // Filtrar por precio mínimo
    if (minPrice !== '') {
      filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
    }

    // Filtrar por precio máximo
    if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
    }

    // Filtrar por tamaño
    if (selectedSize) {
      filteredProducts = filteredProducts.filter(product => product.size === selectedSize);
      dispatch(filtBySize(selectedSize));
    }

    // Actualizar los productos filtrados
    setFilteredProducts(filteredProducts);
    setIsProductFound(filteredProducts.length > 0);

    // Validar que el precio máximo sea mayor que el mínimo y mostrar el mensaje de error si es necesario
    if (parseFloat(maxPrice) <= parseFloat(minPrice)) {
      setPriceError('El precio máximo debe ser mayor que el precio mínimo.');
    } else {
      setPriceError('');
    }
  };

  const handleClearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedSize('');
    setFilteredProducts([]);
    setIsProductFound(true);
    setPriceError('');
  };

  const handleSearch = () => {
    // Validar que los precios sean números válidos
    if (isNaN(parseFloat(minPrice)) || isNaN(parseFloat(maxPrice))) {
      setPriceError('Ingrese precios válidos.');
      return;
    }

    // Validar que el precio máximo sea mayor que el mínimo
    if (parseFloat(maxPrice) <= parseFloat(minPrice)) {
      setPriceError('El precio máximo debe ser mayor que el precio mínimo.');
      return;
    }

    setPriceError('');
    handleFilter();
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value.trim(); // Eliminar espacios en blanco al inicio y al final

    // Validar que solo se ingresen números y que no se permitan caracteres especiales
    if (/^[0-9]*$/.test(value)) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value.trim(); // Eliminar espacios en blanco al inicio y al final

    // Validar que solo se ingresen números y que no se permitan caracteres especiales
    if (/^[0-9]*$/.test(value)) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-10 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filtrar productos</h2>
        <button onClick={onClose}>
          <FaTimes className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="minPrice" className="block mb-1">Precio mínimo:</label>
        <input
          type="text"
          id="minPrice"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />

        <label htmlFor="maxPrice" className="block mb-1 mt-2">Precio máximo:</label>
        <input
          type="text"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {priceError && (
        <div className="text-red-500 mb-4">{priceError}</div>
      )}

      <div className="mb-4">
        <label htmlFor="size" className="block mb-1">Talle:</label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos los talles</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="U">U</option>
        </select>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={handleSearch} className="bg-pink-500 text-white px-6 py-1 rounded-sm mr-4">
          <FaSearch className="mr-2" />
          Buscar
        </button>
        <button onClick={handleClearFilter} className="bg-gray-300 text-black px-6 py-1 rounded-sm">
          Limpiar
        </button>
      </div>
      
      {isProductFound ? (
        <div className="mt-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="border border-gray-300 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>Tamaño: {product.size}</p>
              <p>Categoría: {product.category}</p>
              <p>Subcategoría: {product.subcategory}</p>
              <p>Precio: ${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-red-500">Lo sentimos, el producto que busca no está disponible.</p>
        </div>
      )}
    </div>
  );
};

export default FilterModal;


