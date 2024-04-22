import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Filter = ({ onFilter }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isProductFound, setIsProductFound] = useState(true);

  const [allProducts, setAllProducts] = useState([
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
      category: 'Shorts',
      subcategory: 'Rectos',
      price: 30,
    },
    {
      id: 3,
      name: 'Producto 3',
      size: '5',
      color: 'violeta',
      category: 'Pantalones',
      subcategory: 'Con cierre',
      price: 40,
    },
    // Agrega más productos aquí según sea necesario
  ]);

  const handleFilter = () => {
    if (minPrice !== '' && maxPrice !== '' && parseFloat(maxPrice) < parseFloat(minPrice)) {
      setAlertMessage('El precio máximo debe ser mayor o igual al precio mínimo.');
      return;
    }
    setAlertMessage('');
    
    const filteredProducts = allProducts.filter(product => {
      // Filtrado por tamaño
      const matchSize = selectedSize === '' || product.size === selectedSize;

      // Filtrado por color
      const matchColor = selectedColor === '' || product.color === selectedColor;

      // Filtrado por categoría
      const matchCategory = selectedCategory === '' || product.category === selectedCategory;

      // Filtrado por subcategoría
      const matchSubcategory = selectedSubcategory === '' || product.subcategory === selectedSubcategory;

      // Filtrado por precio
      let matchPrice = true;
      if (minPrice !== '' && maxPrice !== '') {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
          matchPrice = product.price >= min && product.price <= max;
        }
      }

      return matchSize && matchColor && matchCategory && matchSubcategory && matchPrice;
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
    setSelectedSize('');
    setSelectedColor('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedSort('');
    setMinPrice('');
    setMaxPrice('');
    setAlertMessage('');
    setFilteredProducts([]);
    setIsProductFound(true); // Restaurar a true para mostrar el mensaje por defecto
    onFilter(allProducts); // Restaurar todos los productos
  };

  const handleSearch = () => {
    handleFilter(); // Realizar filtrado al hacer clic en buscar
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Filtrar productos</h2>
      <div className="flex flex-wrap -mx-2">
        {/* Filtrado por categoría */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
          <label htmlFor="category" className="block mb-1">Categoría:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('');
            }}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas</option>
            <option value="Calzas">Calzas</option>
            <option value="Shorts">Shorts</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Tops">Tops</option>
            <option value="Remeras">Remeras</option>
            <option value="Destacados">Destacados</option>
            <option value="Sale">Sale</option>
          </select>
        </div>
        {/* Filtrado por subcategoría */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
          <label htmlFor="subcategory" className="block mb-1">Subcategoría:</label>
          <select
            id="subcategory"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas</option>
            {/* Opciones de subcategoría dependiendo de la categoría seleccionada */}
            {selectedCategory === 'Calzas' && (
              <>
                <option value="Biker">Biker</option>
                <option value="Capri">Capri</option>
                <option value="Cortas">Cortas</option>
                <option value="Largas">Largas</option>
              </>
            )}
            {selectedCategory === 'Shorts' && (
              <>
                <option value="Rectos">Rectos</option>
                <option value="Campana">Campana</option>
              </>
            )}
            {selectedCategory === 'Pantalones' && (
              <>
                <option value="Con cierre">Con cierre</option>
                <option value="Recto">Recto</option>
              </>
            )}
            {selectedCategory === 'Tops' && (
              <>
                <option value="Bretel ancho">Bretel ancho</option>
                <option value="Deportivo">Deportivo</option>
                <option value="Nike">Nike</option>
              </>
            )}
            {selectedCategory === 'Remeras' && (
              <>
                <option value="Musculosas">Musculosas</option>
                <option value="Remeras">Remeras</option>
                <option value="Sudaderas">Sudaderas</option>
                <option value="Vestidos">Vestidos</option>
              </>
            )}
            {selectedCategory === 'Destacados' && (
              <>
                <option value="Calzas">Calzas</option>
                <option value="Shorts">Shorts</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Tops">Tops</option>
                <option value="Remeras">Remeras</option>
              </>
            )}
            {selectedCategory === 'Sale' && (
              <>
                <option value="Calzas">Calzas</option>
                <option value="Shorts">Shorts</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Tops">Tops</option>
                <option value="Remeras">Remeras</option>
              </>
            )}
          </select>
        </div>
        {/* Filtrado por tamaño */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
          <label htmlFor="size" className="block mb-1">Tamaño:</label>
          <select
            id="size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        {/* Filtrado por color */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
          <label htmlFor="color" className="block mb-1">Color:</label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="verde">Verde</option>
            <option value="gris">Gris</option>
            <option value="violeta">Violeta</option>
          </select>
        </div>
        {/* Filtrado por precio */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
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
        {/* Filtrado por orden */}
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
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
              <p>Color: {product.color}</p>
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

export default Filter;
