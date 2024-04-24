import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const FilterModal = ({ category, subcategory, onFilter, onClose, onGoBack }) => {
  const [selectedSort, setSelectedSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isProductFound, setIsProductFound] = useState(true);

  const [allProducts] = useState([
    {
      id: 1,
      name: 'Producto 1',
      size: '1',
      color: 'verde',
      category: 'Calzas',
      subcategory: 'Biker',
      price: 25,
    },
    {
      id: 2,
      name: 'Producto 2',
      size: '2',
      color: 'gris',
      category: 'Faldapantalon',
      subcategory: 'Recta',
      price: 30,
    },
    {
      id: 3,
      name: 'Producto 3',
      size: '5',
      color: 'violeta',
      category: 'Faldapantalon',
      subcategory: 'Campana',
      price: 40,
    },
    {
        id: 4,
        name: 'Producto 4',
        size: '4',
        color: 'negra',
        category: 'Calzas',
        subcategory: 'Biker',
        price: 18,
      },
      {
        id: 5,
        name: 'Producto 5',
        size: 'U',
        color: 'violeta',
        category: 'Calzas',
        subcategory: 'Biker',
        price: 25,
      },
      {
        id: 6,
        name: 'Producto 6',
        size: 'U',
        color: 'violeta',
        category: 'Remeras',
        subcategory: 'Sudadera',
        price: 15,
      },
  ]);

  useEffect(() => {
    // Filtrar productos cuando se cambia la categoría o subcategoría
    handleFilter();
  }, [category, subcategory]);

  const handleFilter = () => {
    if (minPrice !== '' && maxPrice !== '' && parseFloat(maxPrice) < parseFloat(minPrice)) {
      setAlertMessage('El precio máximo debe ser mayor o igual al precio mínimo.');
      return;
    }
    setAlertMessage('');

    const filteredProducts = allProducts.filter(product => {
      // Filtrado por categoría y subcategoría
      const matchCategory = category === '' || product.category === category;
      const matchSubcategory = subcategory === '' || product.subcategory === subcategory;

      // Filtrado por tamaño
      const matchSize = selectedSize === '' || product.size === selectedSize;

      // Filtrado por precio
      let matchPrice = true;
      if (minPrice !== '' && maxPrice !== '') {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
          matchPrice = product.price >= min && product.price <= max;
        }
      }

      return matchCategory && matchSubcategory && matchSize && matchPrice;
    });

    // Ordenamiento
    let sortedProducts = filteredProducts;
    if (selectedSort === 'az') {
      sortedProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'za') {
      sortedProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedSort === 'higher') {
      sortedProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'lower') {
      sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(sortedProducts);
    setIsProductFound(sortedProducts.length > 0);
    onFilter(sortedProducts);
  };

  const handleClearFilter = () => {
    setSelectedSort('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedSize('');
    setAlertMessage('');
    setFilteredProducts([]);
    setIsProductFound(true); // Restaurar a true para mostrar el mensaje por defecto
    onFilter(allProducts); // Restaurar todos los productos
  };

  const handleSearch = () => {
    handleFilter(); // Realizar filtrado al hacer clic en buscar
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 w-80 bg-white z-10 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filtrar productos</h2>
        <button onClick={onClose}>
          <FaTimes className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      {/* Categoría y subcategoría activas */}
      <div className="mb-4">
        <p className="font-semibold mb-1">Categoría: {category}</p>
        <p className="font-semibold">Subcategoría: {subcategory}</p>
      </div>
      {/* Filtrado por precio */}
      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">Precio:</label>
        <div className="flex">
          <input
            type="text"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value.replace(/[^\d]/g, ''))}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mr-2"
          />
          <input
            type="text"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value.replace(/[^\d]/g, ''))}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {alertMessage && <p className="text-red-500 text-sm mt-1">{alertMessage}</p>}
      </div>
      {/* Filtrado por tamaño */}
      <div className="mb-4">
        <label htmlFor="size" className="block mb-1">Talle:</label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos los talles</option>
          <option value="1">Talle 1</option>
          <option value="2">Talle 2</option>
          <option value="3">Talle 3</option>
          <option value="4">Talle 4</option>
          <option value="5">Talle 5</option>
          <option value="U">Talle Único</option>
        </select>
      </div>
      {/* Filtrado por orden */}
      <div className="mb-4">
        <label htmlFor="sort" className="block mb-1">Ordenar por:</label>
        <select
          id="sort"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sin ordenar</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="higher">Mayor precio a menor precio</option>
          <option value="lower">Menor precio a mayor precio</option>
        </select>
      </div>
      {/* Botones para filtrar y limpiar */}
      <div className="flex justify-center mt-4">
        <button onClick={handleSearch} className="bg-pink-500 text-white px-6 py-1 rounded-sm mr-4">
          <FaSearch className="mr-2" />
          Buscar
        </button>
        <button onClick={handleClearFilter} className="bg-gray-300 text-black px-6 py-1 rounded-sm">
          <FaTimes className="mr-2" />
          Limpiar
        </button>
      </div>
      {/* Renderizado de los productos filtrados */}
      {isProductFound && (
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
      )}
      {!isProductFound && (
        <div className="flex items-center justify-center h-32">
          <p className="text-red-500">Lo sentimos, el producto que usted busca, no está disponible.</p>
        </div>
      )}
    </div>
  );
};

export default FilterModal;





