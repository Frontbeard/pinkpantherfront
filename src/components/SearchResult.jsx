import React from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams
import { useSelector } from 'react-redux';
import SearchCard from './SearchCard'; // Importar el componente Card

const SearchResult = () => {
  const { query } = useParams(); // Obtener el parámetro de búsqueda de la URL
  const searchedProducts = useSelector(state => state.allproducts);

  // Filtrar los productos que coincidan con el término de búsqueda
  const filteredProducts = searchedProducts.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="search-result-container">
        <h2>Resultados de búsqueda para "{query}"</h2>
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <SearchCard key={product.name} filteredItems={product} /> // Renderizar los productos en forma de tarjetas
            ))
          ) : (
            <div className="not-found-message">No se encontraron productos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
