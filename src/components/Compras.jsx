import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";
import getAllOrdersById from "../redux/actions/Order/getOrdersById";
import { Button, CardFooter } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";

export const Compras = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const ordersById = useSelector((state) => state.ordersUser)
  // const products = useSelector((state) => state.allproducts);
  const customer = useSelector(state => state.userData);

  useEffect(() => {
    if(customer.id){
      dispatch(getAllOrdersById(customer.id))
    }
  }, [dispatch, customer] );

  useEffect(() => {
    if (ordersById.length > 0) {
      setFilteredItems(ordersById);
      setTotalPages(Math.ceil(ordersById.length / itemsPerPage));
    }
  }, [ordersById]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

 
  if (!Array.isArray(paginatedItems)) {
    return null; // o maneja el error de manera adecuada
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    navigate("/create-review");
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="text-3xl font-semibold capitalize text-center my-8">
        Tus compras
      </h2>
      <p onClick={() => console.log(ordersById)}>ordersById</p>
      <p onClick={() => console.log(customer)}>customers</p>
      <br /><br />
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
      {paginatedItems.map((product) => (
          <Card key={product.id} filteredItems={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CardFooter className="pt-0 mt-1">
            <Button onClick={handleSubmit} className="text-white bg-pink-500" variant="gradient" fullWidth>
              Calificar
            </Button>
          </CardFooter>
    </div>
  );
};

