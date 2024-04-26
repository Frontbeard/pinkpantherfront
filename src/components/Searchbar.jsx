
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState(""); // Estado para almacenar el valor del input de búsqueda
    const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error
    const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de la búsqueda

    // Función que maneja el cambio en el input de búsqueda
    const handleChange = (e) => {
        let inputValue = e.target.value;
        // Eliminar espacios al inicio de la cadena
        inputValue = inputValue.trimStart();
        // Convertir la entrada a minúsculas y quitar acentos para comparación sin distinción de mayúsculas/minúsculas ni acentos
        const normalizedInput = inputValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // Expresión regular para permitir solo letras y espacios en blanco
        if (/^[a-z\s]*$/.test(normalizedInput)) {
            setQuery(inputValue);
            setErrorMessage(""); // Borra el mensaje de error si es válido
            // Activar la búsqueda si se ingresan al menos tres caracteres
            if (inputValue.length >= 3) {
                onSearch(inputValue, (results) => {
                    setSearchResults(results);
                });
            } else {
                setSearchResults([]);
            }
        } else {
            setErrorMessage("Solo se permiten letras y espacios."); // Mensaje de error si hay caracteres no válidos
        }
    };

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Verifica que la consulta no esté vacía antes de llamar a la función onSearch
        if (query.trim() !== "") {
            onSearch(query.trim(), (results) => {
                setSearchResults(results);
            });
        }
    };

    // Función que maneja el evento de limpiar la búsqueda
    const handleClearSearch = () => {
        setQuery(""); // Limpiar la consulta de búsqueda
        setErrorMessage(""); // Limpiar el mensaje de error
        setSearchResults([]); // Limpiar los resultados de la búsqueda
        onSearch(""); // Limpiar la búsqueda enviando una cadena vacía
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center border border-gray-300 rounded-lg px-3 py-1">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Buscar..."
                className="outline-none border-none flex-grow px-2"
            />
            <button type="submit" className="text-gray-500 hover:text-gray-700">
                <FaSearch />
            </button>
            {/* Botón para limpiar la búsqueda */}
            {query && (
                <button type="button" onClick={handleClearSearch} className="text-gray-500 hover:text-gray-700">
                    <FaTimes />
                </button>
            )}
            {/* Muestra el mensaje de error si existe */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {/* Renderizar los resultados de la búsqueda */}
            {searchResults.length > 0 && (
                <div className="ml-4 flex flex-wrap overflow-x-auto">
                    {searchResults.map((result, index) => (
                        <div key={index} className="mr-4 mb-4">
                            <p>Producto: {result.name}</p>
                            <p>Color: {result.color}</p>
                            <p>Precio: ${result.price}</p>
                            <p>{result.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
};

export default SearchBar;


