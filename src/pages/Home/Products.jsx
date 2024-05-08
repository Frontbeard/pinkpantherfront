import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { getAllProducts } from "../../redux/actions/Product/getAllProducts";
import getAllCategories from "../../redux/actions/Category/getAllCategories";
import filtBySize from "../../redux/actions/Filter/filtBySize";
import filtByPrice from "../../redux/actions/Filter/filtByPrice";
import orderProducts from "../../redux/actions/Filter/orderProducts";

const Products = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCriterion, setSelectedCriterion] = useState(""); // Criterio seleccionado
  const [criteriaOptions, setCriteriaOptions] = useState([]); // Opciones de filtro por producto
  const [selectedSize, setSelectedSize] = useState("all"); // Default: All
  const [priceRange, setPriceRange] = useState({ min: "", max: "" }); // Price range filter
  const [sortOption, setSortOption] = useState("default"); // Default sorting option
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [error, setError] = useState(""); // Error message
  const [isFilterHovered, setIsFilterHovered] = useState(false); // Estado para el hover del botón Filtrar
  const [isClearHovered, setIsClearHovered] = useState(false); // Estado para el hover del botón Limpiar

  const dispatch = useDispatch();
  const products = useSelector((state) => state.allproducts);
  const categories = useSelector((state) => state.allcategories); // Obtener las categorías desde el estado

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories()); // Obtener todas las categorías al cargar el componente

    // Obtener las opciones únicas de criterio de los productos
    const uniqueCriteriaOptions = [...new Set(products.map(product => product.name))];
    setCriteriaOptions(uniqueCriteriaOptions);
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredItems(products);
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    }
  }, [products]);

  useEffect(() => {
    // Cuando cambia el criterio de ordenamiento, aplicar el filtro nuevamente
    applyFilters();
  }, [sortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  if (!Array.isArray(paginatedItems)) {
    return null;
  }

  const applyFilters = () => {
    let filteredProducts = [...products];

    // Filtrar por nombre del producto
    if (selectedCriterion !== "") {
      // Convertir términos en plural a singular
      const singularCriterion = selectedCriterion.endsWith("s") ? selectedCriterion.slice(0, -1) : selectedCriterion;
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(singularCriterion.toLowerCase())
      );
    }

    // Filtrar por tamaño
    if (selectedSize !== "all") {
      filteredProducts = filteredProducts.filter(product => product.size === selectedSize);
    }

    // Validar precios
    if (priceRange.min !== "" && priceRange.max !== "") {
      const minPrice = parseFloat(priceRange.min);
      const maxPrice = parseFloat(priceRange.max);
      if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < 0 || minPrice >= maxPrice) {
        setError("El precio máximo debe ser superior al mínimo.");
        return;
      }
      setError("");
      filteredProducts = filteredProducts.filter(product => product.priceEfectivo >= minPrice && product.priceEfectivo <= maxPrice);
    }

    // Ordenar productos
    let sortedItems = [...filteredProducts];
    switch (sortOption) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Lowest Price":
        sortedItems.sort((a, b) => a.priceEfectivo - b.priceEfectivo);
        break;
      case "Highest Price":
        sortedItems.sort((a, b) => b.priceEfectivo - a.priceEfectivo);
        break;
      default:
        // No hacer nada para el caso de "default"
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
    setTotalPages(Math.ceil(sortedItems.length / itemsPerPage));
  };

  const clearFilters = () => {
    setSelectedCriterion("");
    setSelectedSize("all");
    setPriceRange({ min: "", max: "" });
    setSortOption("default"); // Establecer la opción de ordenamiento de nuevo a "Por defecto"
    setFilteredItems(products);
    setCurrentPage(1);
    setTotalPages(Math.ceil(products.length / itemsPerPage));
    setError("");
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="text-3xl font-semibold capitalize text-center my-8">
        NUESTROS PRODUCTOS
      </h2>
      <div className="flex justify-between items-center mb-4">
        <div style={{ marginRight: '20px' }}>
          <label htmlFor="criterionFilter">Producto:</label>
          <input
            type="text"
            id="criterionFilter"
            placeholder="Ingrese el producto"
            value={selectedCriterion}
            onChange={(e) => setSelectedCriterion(e.target.value.replace(/\s/g, '').replace(/[^a-zA-Z]/g, ''))}
            style={{ margin: '5px', borderRadius: '5px', border: '1px solid #000', paddingLeft: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="sizeFilter" style={{ marginRight: '10px' }}>Talle:</label>
          <select
            id="sizeFilter"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{ marginRight: '10px', borderRadius: '5px', border: '1px solid #000' }}
          >
            <option value="all">Todos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="unico">Único</option>
            {/* Agrega más opciones según tus tamaños disponibles */}
          </select>
        </div>
        <div>
          <label htmlFor="minPrice">Precio Mínimo:</label>
          <input
            type="text"
            id="minPrice"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value.replace(/[^0-9]/g, '') })
            }
            style={{ margin: '5px', borderRadius: '5px', border: '1px solid #000', paddingLeft: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Precio Máximo:</label>
          <input
            type="text"
            id="maxPrice"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value.replace(/[^0-9]/g, '') })
            }
            style={{ margin: '5px', borderRadius: '5px', border: '1px solid #000', paddingLeft: '10px' }}
          />
        </div>
        <button
          className={`bg-pink-500 text-white px-6 py-2 rounded-md mr-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-pink-500 border border-pink-500 font-bold`}
          onClick={applyFilters}
          onMouseEnter={() => setIsFilterHovered(true)}
          onMouseLeave={() => setIsFilterHovered(false)}
        >
          Filtrar
        </button>
        <button
          className={`bg-gray-300 text-black px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black border border-gray-300 font-bold`}
          onClick={clearFilters}
          onMouseEnter={() => setIsClearHovered(true)}
          onMouseLeave={() => setIsClearHovered(false)}
        >
          Limpiar
        </button>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="sortOptions" style={{ marginRight: '10px' }}>Ordenar por:</label>
          <select
            id="sortOptions"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ marginRight: '10px', borderRadius: '5px', border: '1px solid #000' }}
          >
            <option value="default">Por defecto</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Lowest Price">Menor Precio</option>
            <option value="Highest Price">Mayor Precio</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((product) => (
            <Card key={product.id} filteredItems={product} />
          ))
        ) : (
          <div className="text-red-500 text-center font-semibold">Producto no disponible</div>
        )}
      </div>
      {!error && filteredItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Products;
