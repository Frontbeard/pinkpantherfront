import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { getAllProducts } from "../../redux/actions/Product/getAllProducts";

const Products = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: All
  const [sortOption, setSortOption] = useState("default"); // Default sorting option
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const dispatch = useDispatch();
  const products = useSelector((state) => state.allproducts);
  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
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

  const itemsPerPage = 8;
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
      <h2 className="text-3xl font-semibold capitalize text-center my-8" >
        Nuestros productos
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
          <Card filteredItems={paginatedItems} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Products