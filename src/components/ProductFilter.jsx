import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";

const ProductFilter = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = Array.isArray(products) ? products : [];

  const handleProductClick = (productId) => {
    // Redirigir al usuario a la página de detalle del producto
    window.location.href = `/shop/${productId}`;
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-6 mb-5">
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap card-container">
          {paginatedProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)}>
              <Link to={`/shop/${product.id}`}>
                <Card filteredItems={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(paginatedProducts.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductFilter;
