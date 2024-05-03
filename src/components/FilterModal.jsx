import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const FilterModal = ({ onClose, products, onUpdateFilteredProducts }) => {
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
    const [selectedSizeInput, setSelectedSizeInput] = useState('');
    const [colorInput, setColorInput] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsFound, setProductsFound] = useState(true);
    const [originalProducts, setOriginalProducts] = useState([]);

    useEffect(() => {
        if (originalProducts.length === 0 && products && products.length > 0) {
            setOriginalProducts([...products]);
            setFilteredProducts([...products]);
        }
    }, [originalProducts, products]);

    const applyFilters = () => {
        let filtered = [];

        if (Array.isArray(products)) {
            filtered = [...products];
            
            const minPriceValue = parseInt(minPrice);
            const maxPriceValue = parseInt(maxPrice);

            if (!isNaN(minPriceValue)) {
                filtered = filtered.filter(product => parseInt(product.priceEfectivo) >= minPriceValue);
            }
            if (!isNaN(maxPriceValue)) {
                filtered = filtered.filter(product => parseInt(product.priceEfectivo) <= maxPriceValue);
            }

            if (selectedSize !== '') {
                filtered = filtered.filter(product => product.size === selectedSize);
            }

            if (colorInput !== '') {
                filtered = filtered.filter(product => product.color.toLowerCase().includes(colorInput.toLowerCase()));
            }
        }

        onUpdateFilteredProducts(filtered);
        setProductsFound(filtered.length > 0);
    };

    const clearFilters = () => {
        setMinPriceInput('');
        setMaxPriceInput('');
        setSelectedSizeInput('');
        setColorInput('');
        setSelectedSize('');
        setMinPrice('');
        setMaxPrice('');
        setProductsFound(true);
        onUpdateFilteredProducts(originalProducts);
    };

    const updateFilters = () => {
        setMinPrice(minPriceInput.replace(/[^\d]/g, ''));
        setMaxPrice(maxPriceInput.replace(/[^\d]/g, ''));
        setSelectedSize(selectedSizeInput);
        setColorInput(colorInput);
    };

    useEffect(() => {
        applyFilters();
    }, [minPrice, maxPrice, selectedSize, colorInput]);

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
                    type="text"
                    id="minPrice"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value.replace(/[^\d]/g, ''))}
                    className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="maxPrice" className="block mb-1 mt-2">Precio máximo:</label>
                <input
                    type="text"
                    id="maxPrice"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value.replace(/[^\d]/g, ''))}
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

            <div className="mb-4">
                <label htmlFor="color" className="block mb-1">Color:</label>
                <input
                    type="text"
                    id="color"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="flex justify-center mt-4">
                <button onClick={updateFilters} className="bg-pink-500 text-white px-6 py-1 rounded-sm mr-4">
                    <FaSearch className="mr-2" />
                    Buscar
                </button>
                <button onClick={clearFilters} className="bg-gray-300 text-black px-6 py-1 rounded-sm">
                    Limpiar
                </button>
            </div>

            {!productsFound && (
                <p className="text-red-500 mt-4 text-center">No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default FilterModal;
