import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { allproduct } from "../../redux/actions/actions";

const Products = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: All
  const [sortOption, setSortOption] = useState("default"); // Default sorting option
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const dispatch = useDispatch();
  const products = useSelector(state => state.allproducts);
  console.log(products);

  useEffect(() => {
    dispatch(allproduct());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      // Set initial filtered items and total pages
      setFilteredItems(products);
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    }
  }, [products]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const showAll = () => {
    setFilteredItems(products);
    setSelectedCategory("all");
    setCurrentPage(1);
    setTotalPages(Math.ceil(products.length / itemsPerPage));
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="text-3xl font-semibold capitalize text-center my-8">
        Destacados
      </h2>

      <div>
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              Todos los productos
            </button>
            <button
              onClick={() => filterItems("Calza")}
              className={selectedCategory === "Calza" ? "active" : ""}
            >
              Calza
            </button>
            <button
              onClick={() => filterItems("Pantalones")}
              className={selectedCategory === "Pantalones" ? "active" : ""}
            >
              Pantalones
            </button>
            <button
              onClick={() => filterItems("Tops")}
              className={selectedCategory === "Tops" ? "active" : ""}
            >
              Tops
            </button>
          </div>

          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Sin filtros aplicados</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Menor precio a mayor precio</option>
              <option value="high-to-low">Mayor precio a menor precio</option>
            </select>
          </div>
        </div>

        <Card filteredItems={paginatedItems} />
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
