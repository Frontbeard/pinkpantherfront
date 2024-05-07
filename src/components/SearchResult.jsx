import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination'; // Importar tu componente Pagination

const SearchResult = () => {
  const { query } = useParams();
  const searchedProducts = useSelector(state => state.allproducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2; // Número de productos por página

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(searchedProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="search-result-container">
        <h2>Resultados de búsqueda para "{query}"</h2>
        <div className="product-list grid grid-cols-4 gap-4">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <Card key={product.name} filteredItems={product} />
            ))
          ) : (
            <div className="not-found-message">No se encontraron productos</div>
          )}
        </div>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
      <Link to="/" className="btn btn-primary">Volver a la página de inicio</Link>
    </div>
  );
};

export default SearchResult;




