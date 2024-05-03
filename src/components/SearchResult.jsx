import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Card from './Card';

const SearchResult = () => {
  const { query } = useParams();
  const searchedProducts = useSelector(state => state.allproducts);

  // Verificar si searchedProducts es un array antes de aplicar filter
  const filteredProducts = Array.isArray(searchedProducts) ? searchedProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="search-result-container">
        <h2>Resultados de búsqueda para "{query}"</h2>
        <div className="product-list grid grid-cols-4 gap-4"> {/* Usamos grid con 4 columnas y un espacio entre ellas */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Card key={product.name} filteredItems={product} />
            ))
          ) : (
            <div className="not-found-message">No se encontraron productos</div>
          )}
        </div>
      </div>
      <Link to="/" className="btn btn-primary">Volver a la página de inicio</Link>
    </div>
  );
};

export default SearchResult;




