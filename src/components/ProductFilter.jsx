import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Hubo un error al cargar este componente.</div>;
    }

    return this.props.children;
  }
}

const ProductFilter = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage when products change
  }, [products]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = Array.isArray(products)
    ? products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  const handleProductClick = (productId) => {
    // Redirigir al usuario a la página de detalle del producto
    window.location.href = `/shop/${productId}`;
  };

  return (
    <ErrorBoundary>
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
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ProductFilter;
