import React from "react";

const products = [
  { 
    id: 1, 
    title: "Producto 1", 
    category: "Calzas", 
    subcategory: "Biker", 
    color: "negra",
    price: 35.00, 
    description: "Calza negra de running para mujer. Ideal para correr en verano.", 
  },
  { 
    id: 2, 
    title: "Producto 2", 
    category: "Remera", 
    subcategory: "Musculosa", 
    color: "blanco",
    price: 50.00, 
    description: "Remera musculosa, 100% algodón", 
  },
  {
    id: 3,
    title: "Producto 3",
    category: 'Faldapantalón',
    subcategory: 'Recta',
    color: 'violeta',
    price: 35.00,
    description: 'Faldapantalón recta, color violeta.',
  },
  {
    id: 4,
    title: 'Producto 4',
    category: 'Faldapantalón',
    subcategory: 'Recta',
    color: 'gris', 
    price: 30.00,
    description: 'Faldapantalón recta, color gris.',
  },
  {
    id: 5,
    title: 'Producto 5',
    category: 'Faldapantalón',
    subcategory: 'Campana',
    color: 'azul',
    price: 40.00,
    description: 'Faldapantalón campana, color azul.',
  },
  {
    id: 6,
    title: 'Producto 6',
    category: 'Calzas',
    subcategory: 'Larga',
    color: 'negra',
    price: 18,
    description: 'Calza larga negra de running para mujer.',
  }, 
];

const ProductList = ({ searchQuery }) => {
  // Filtrar productos según la búsqueda
  const filteredProducts = products.filter((product) => {
    // Buscar por categoría, subcategoría o color
    const categoryMatch = product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const subcategoryMatch = product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    const colorMatch = product.color.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch || subcategoryMatch || colorMatch;
  });

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <p>{product.category} - {product.subcategory}</p>
            <p>Color: {product.color}</p>
            <p>Precio: ${product.price}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
