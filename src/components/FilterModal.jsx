import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { orderProducts } from '../redux/actions/Filter/orderProducts';
import { filtByPrice } from '../redux/actions/Filter/filtByPrice';
import { filtBySize } from '../redux/actions/Filter/filtBySize';
import { filtByCategory } from '../redux/actions/Filter/filtByCategory';

const FilterModal = ({ onClose, selectedCategory }) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.allProducts);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isProductFound, setIsProductFound] = useState(true);
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    handleFilter();
  }, [selectedCategory, minPrice, maxPrice, selectedSize, selectedOrder]);

  const handleFilter = () => {
    let filteredProducts = [...allProducts];

    if (selectedCategory) {
      filteredProducts = filtByCategory(filteredProducts, selectedCategory);
    }

    if (minPrice !== '') {
      filteredProducts = filtByPrice(filteredProducts, parseFloat(minPrice), 'min');
    }

    if (maxPrice !== '') {
      filteredProducts = filtByPrice(filteredProducts, parseFloat(maxPrice), 'max');
    }

    if (selectedSize) {
      filteredProducts = filtBySize(filteredProducts, selectedSize);
    }

    if (selectedOrder) {
      dispatch(orderProducts(selectedOrder));
    }

    setFilteredProducts(filteredProducts);
    setIsProductFound(filteredProducts.length > 0);

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
    setSelectedOrder('');
    setFilteredProducts([]);
    setIsProductFound(true);
    setPriceError('');
  };

  const handleSearch = () => {
    if (isNaN(parseFloat(minPrice)) || isNaN(parseFloat(maxPrice))) {
      setPriceError('Ingrese precios válidos.');
      return;
    }

    if (parseFloat(maxPrice) <= parseFloat(minPrice)) {
      setPriceError('El precio máximo debe ser mayor que el precio mínimo.');
      return;
    }

    setPriceError('');
    handleFilter();
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value.trim();
    if (/^[0-9]*$/.test(value)) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value.trim();
    if (/^[0-9]*$/.test(value)) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-white z-10 p-6 overflow-y-auto">
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

