import React from "react";
import Card from "./Card";

const ProductFilter = ({ products }) => {
  console.log(products, "productos filtrados en ProductFilter"); // Verifica si los productos están llegando correctamente

  if (products && products.length > 0) {
    console.log("Productos disponibles:", products); // Verifica los productos disponibles
    return (
      <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-6 mb-5">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap card-container">
            {products.map((product) => (
              <Card key={product.id} filteredItems={product} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    // Si no hay productos disponibles, no se renderiza nada
    return null;
  }
};

export default ProductFilter;
