import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const FilterModal = ({ onClose, products, onUpdateFilteredProducts, originalProducts }) => {
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
    const [selectedSizeInput, setSelectedSizeInput] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [productsFound, setProductsFound] = useState(true); // Estado para controlar si se encontraron productos

    // Función para aplicar los filtros
    const applyFilters = () => {
        let filtered = [...products];

        const minPriceValue = parseFloat(minPrice);
        const maxPriceValue = parseFloat(maxPrice);

        if (!isNaN(minPriceValue)) {
            filtered = filtered.filter(product => parseFloat(product.priceEfectivo) >= minPriceValue);
        }
        if (!isNaN(maxPriceValue)) {
            filtered = filtered.filter(product => parseFloat(product.priceEfectivo) <= maxPriceValue);
        }

        if (selectedSize !== '') {
            filtered = filtered.filter(product => product.size === selectedSize);
        }

        onUpdateFilteredProducts(filtered); // Pasar los productos filtrados al componente padre

        // Verificar si se encontraron productos después de aplicar los filtros
        setProductsFound(filtered.length > 0);
    };

    // Función para limpiar los filtros y cerrar el modal
    const clearFiltersAndClose = () => {
        setMinPriceInput('');
        setMaxPriceInput('');
        setSelectedSizeInput('');
        setSelectedSize('');
        setMinPrice('');
        setMaxPrice('');
        onUpdateFilteredProducts(originalProducts); // Restablecer los productos originales
        setProductsFound(true); // Restablecer el estado de productos encontrados
        onClose(); // Cerrar el modal
    };

    // Actualizar valores de precio y tamaño al hacer clic en el botón de búsqueda
    const updateFilters = () => {
        setMinPrice(minPriceInput);
        setMaxPrice(maxPriceInput);
        setSelectedSize(selectedSizeInput);
    };

    useEffect(() => {
        applyFilters();
    }, [minPrice, maxPrice, selectedSize]);

    return (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white z-10 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filtrar productos</h2>
                <button onClick={onClose}>
                    <FaTimes className="w-6 h-6 text-gray-500 cursor-pointer" />
                </button>
            </div>

            <div className="mb-4">
                <label htmlFor="minPrice" className="block mb-1">Precio mínimo:</label>
                <input
                    type="number"
                    id="minPrice"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="maxPrice" className="block mb-1 mt-2">Precio máximo:</label>
                <input
                    type="number"
                    id="maxPrice"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Tamaño:</label>
                <select
                    value={selectedSizeInput}
                    onChange={(e) => setSelectedSizeInput(e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Todos los tamaños</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="unico">unico</option>
                </select>
            </div>

            <div className="flex justify-center mt-4">
                <button onClick={updateFilters} className="bg-pink-500 text-white px-6 py-1 rounded-sm mr-4">
                    <FaSearch className="mr-2" />
                    Buscar
                </button>
                <button onClick={clearFiltersAndClose} className="bg-gray-300 text-black px-6 py-1 rounded-sm">
                    Limpiar
                </button>
            </div>

            {/* Mostrar mensaje si no se encontraron productos */}
            {!productsFound && (
                <p className="text-red-500 mt-4 text-center">No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default FilterModal;




