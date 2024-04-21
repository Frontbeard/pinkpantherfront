import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const Filter = ({ onFilter, allProducts }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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
      const matchSubcategory =
        selectedSubcategory === '' || product.subcategory === selectedSubcategory;

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
    onFilter(allProducts); // Restaurar todos los productos
  };

  const handleSearch = () => {
    handleFilter(); // Realizar filtrado al hacer clic en buscar
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-72">
      <h2 className="text-xl font-semibold mb-4">Filtrar productos</h2>
      {/* Filtrado por categoría */}
      <div className="mb-4">
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
      <div className="mb-4">
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
      {/* Resto de los filtros */}
      <div className="mb-4">
        {/* Filtrado por tamaño */}
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
      <div className="mb-4">
        {/* Filtrado por color */}
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
      <div className="mb-4">
        {/* Filtrado por precio */}
        <label htmlFor="price" className="block mb-1">Precio:</label>
        <div className="flex">
          <input
            type="text" // Cambiar el tipo de input a texto para poder manejar la validación correctamente
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value.replace(/[^\d]/g, ''))}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 mr-2"
          />
          <input
            type="text" // Cambiar el tipo de input a texto para poder manejar la validación correctamente
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value.replace(/[^\d]/g, ''))}
            className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {alertMessage && <p className="text-red-500 text-sm mt-1">{alertMessage}</p>}
      </div>
      <div className="mb-4">
        {/* Filtrado por orden */}
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
      <div className="flex justify-between">
        <button onClick={handleSearch} className="bg-pink-500 text-white px-6 py-1 rounded-sm">
          <FaSearch className="mr-2" />
          Buscar
        </button>
        <button onClick={handleClearFilter} className="bg-gray-300 text-black px-6 py-1 rounded-sm">
          <FaTimes className="mr-2" />
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default Filter;

