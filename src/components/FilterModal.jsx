import { AiFillCloseCircle } from "react-icons/ai";
import React, { useState, useEffect } from 'react';

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
    const [isClearHovered, setIsClearHovered] = useState(false);

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

    const resetProducts = () => {
        onUpdateFilteredProducts(originalProducts);
    };

    return (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-white z-10 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filtrar productos</h2>
                <button onClick={() => {
                    onClose();
                    resetProducts(); // Llama a la función de reseteo al cerrar el modal
                }}>
                    <AiFillCloseCircle className="text-gray-500 cursor-pointer" />
                </button>
            </div>

            <div className="mb-4 border border-gray-300 rounded-md">
                <label htmlFor="minPrice" className="block mb-1" style={{ paddingLeft: '0.5rem' }}>Precio mínimo:</label>
                <input
                    type="text"
                    id="minPrice"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value.replace(/[^\d]/g, ''))}
                    onBlur={(e) => e.target.classList.remove('focus:border-blue-500')}
                    onFocus={(e) => e.target.classList.add('focus:border-blue-500')}
                    className="w-full border-none focus:outline-none p-2 focus:border-blue-500"
                    placeholder="Ingrese el precio mínimo"
                />
            </div>

            <div className="mb-4 border border-gray-300 rounded-md">
                <label htmlFor="maxPrice" className="block mb-1 mt-2" style={{ paddingLeft: '0.5rem' }}>Precio máximo:</label>
                <input
                    type="text"
                    id="maxPrice"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value.replace(/[^\d]/g, ''))}
                    onBlur={(e) => e.target.classList.remove('focus:border-blue-500')}
                    onFocus={(e) => e.target.classList.add('focus:border-blue-500')}
                    className="w-full border-none focus:outline-none p-2 focus:border-blue-500"
                    placeholder="Ingrese el precio máximo"
                />
                {parseInt(maxPriceInput) < parseInt(minPriceInput) && maxPriceInput.trim() !== '' && (
                    <p className="text-red-500 text-sm">El precio máximo ingresado debe ser superior al precio mínimo.</p>
                )}
            </div>

            <div className="mb-4 border border-gray-300 rounded-md">
                <label className="block mb-1" style={{ paddingLeft: '0.5rem' }}>Talle:</label>
                <select
                    value={selectedSizeInput}
                    onChange={(e) => setSelectedSizeInput(e.target.value)}
                    onBlur={(e) => e.target.classList.remove('focus:border-blue-500')}
                    onFocus={(e) => e.target.classList.add('focus:border-blue-500')}
                    className="w-full border-none focus:outline-none p-2 focus:border-blue-500"
                >
                    <option value="">Todos los talles</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="unico">unico</option>
                </select>
            </div>

            <div className="mb-4 border border-gray-300 rounded-md">
                <label htmlFor="color" className="block mb-1" style={{ paddingLeft: '0.5rem' }}>Color:</label>
                <input
                    type="text"
                    id="color"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onBlur={(e) => e.target.classList.remove('focus:border-blue-500')}
                    onFocus={(e) => e.target.classList.add('focus:border-blue-500')}
                    className="w-full border-none focus:outline-none p-2 focus:border-blue-500"
                    placeholder="Ingrese el color"
                />
            </div>

            <div className="flex justify-center mt-4">
                <button 
                    onClick={updateFilters} 
                    className={`bg-pink-500 text-white px-6 py-2 rounded-md mr-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-pink-500 border border-pink-500 font-bold`}
                >
                    Buscar
                </button>
                <button 
                    onClick={clearFilters} 
                    className={`bg-gray-300 text-black px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black border border-gray-300 font-bold ${isClearHovered ? 'font-bold' : ''}`}
                    onMouseEnter={() => setIsClearHovered(true)}
                    onMouseLeave={() => setIsClearHovered(false)}
                >
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

