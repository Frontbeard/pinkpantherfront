import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import Card from "../../components/Card";

const Products = () => {
  const [jsonData, setJsonData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: All
  const [sortOption, setSortOption] = useState("default"); // Default sorting option

  useEffect(() => {
    // Fetch data desde el backend ????????????????????
    const fetchData = async () => {
      try {
        const response = await fetch("products.json");
        const data = await response.json();
        setJsonData(data);
        setFilteredItems(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? jsonData
        : jsonData.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
  };

  const showAll = () => {
    setFilteredItems(jsonData);
    setSelectedCategory("all");
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Sorting segun la opcion seleccionada
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
        // aclaracionnnnnnn: no hacer nada para el caso de "defauuult"
        break;
    }

    setFilteredItems(sortedItems);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="text-3xl font-semibold capitalize text-center my-8">
        Destacados
      </h2>

      {/* cards para los productos REVISARRRRRRRRRRRRR*/}
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
        <div className="bg-black p-2 ">
        <FaFilter className="text-white h-4 w-4"/>
        </div>
          <select
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className="bg-black text-white px-2 py-1 rounded-sm" 
          >
            <option value="default"> Sin filtros aplicados</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Menor precio a mayor precio</option>
            <option value="high-to-low">Mayor precio a mayor precio</option>
          </select>
        </div>
        </div>

        {/* card para los productos */}
        <Card filteredItems={filteredItems}/>
      </div>
    </div>
  );
};

export default Products;
