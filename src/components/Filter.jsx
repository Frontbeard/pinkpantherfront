import React, { useState } from 'react';

const Filter = ({ onFilter, allProducts }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceMin, setSelectedPriceMin] = useState('');
  const [selectedPriceMax, setSelectedPriceMax] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const handleFilter = () => {
    const filteredProducts = allProducts.filter(product => {
      let matchSize = true;
      let matchColor = true;
      let matchPrice = true;

      // Filtrado por tamaño
      if (selectedSize !== '') {
        matchSize = product.size === selectedSize;
      }

      // Filtrado por color
      if (selectedColor !== '') {
        matchColor = product.color === selectedColor;
      }

      // Filtrado por precio
      if (selectedPriceMin !== '' && selectedPriceMax !== '') {
        matchPrice = product.price >= parseInt(selectedPriceMin) && product.price <= parseInt(selectedPriceMax);
      }

      return matchSize && matchColor && matchPrice;
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Filtrar productos</h2>
      <div className="mb-4">
        <label htmlFor="size" className="block mb-1">Tamaño:</label>
        {/* Botones para seleccionar el tamaño */}
        <div className="flex">
          <button
            className={`mr-2 p-2 rounded-full border border-gray-300 ${selectedSize === 'small' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedSize('small')}
          >
            S
          </button>
          <button
            className={`mr-2 p-2 rounded-full border border-gray-300 ${selectedSize === 'medium' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedSize('medium')}
          >
            M
          </button>
          <button
            className={`mr-2 p-2 rounded-full border border-gray-300 ${selectedSize === 'large' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedSize('large')}
          >
            L
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block mb-1">Color:</label>
        {/* Botones para seleccionar el color */}
        <div className="flex">
          <button
            className={`mr-2 p-2 rounded-full border border-gray-300 ${selectedColor === 'red' ? 'bg-red-500' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedColor('red')}
          >
            Rojo
          </button>
          <button
            className={`mr-2 p-2 rounded-full border border-gray-300 ${selectedColor === 'blue' ? 'bg-blue-500' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedColor('blue')}
          >
            Azul
          </button>
          <button
            className={`mr-2 p-2 rounded-full border border-gray-300 ${selectedColor === 'green' ? 'bg-green-500' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedColor('green')}
          >
            Verde
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">Precio:</label>
        <div className="flex">
          <input
            type="number"
            placeholder="Mínimo"
            value={selectedPriceMin}
            onChange={(e) => setSelectedPriceMin(e.target.value)}
            className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 flex-grow mr-2"
          />
          <input
            type="number"
            placeholder="Máximo"
            value={selectedPriceMax}
            onChange={(e) => setSelectedPriceMax(e.target.value)}
            className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 flex-grow mr-2"
          />
        </div>
      </div>
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
      <div className="flex justify-end">
        <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md">Filtrar</button>
      </div>
    </div>
  );
};

export default Filter;

