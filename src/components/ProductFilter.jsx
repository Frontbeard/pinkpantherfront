import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const ProductFilter = ({ products }) => {
  const handleProductClick = (productId) => {
    window.location.href = `/shop/${productId}`;
  };

  if (products && products.length > 0) {
    return (
      <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-6 mb-5">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap card-container">
            {products.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product.id)}>
                <Link to={`/shop/${product.id}`}>
                  <Card filteredItems={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductFilter;

