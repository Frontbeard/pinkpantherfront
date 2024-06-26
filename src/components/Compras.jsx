import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardOrder from "./CardOrder";
import Pagination from "./Pagination";
import getAllOrdersById from "../redux/actions/Order/getOrdersById";
import { Navigate } from "react-router-dom";

export const Compras = ( {redirecTo="/login"}) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const dispatch = useDispatch();
  const ordersById = useSelector((state) => state.ordersUser)
  const customer = useSelector(state => state.userData);

  if(!localStorage.getItem('firebaseUid')) {
    return <Navigate to={redirecTo} />
}

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

  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

 
  if (!Array.isArray(paginatedItems)) {
    return null; // o maneja el error de manera adecuada
  }

  

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <h2 className="text-3xl font-semibold capitalize text-center my-8">
        Tus compras
      </h2>
        { /* <p onClick={() => console.log(ordersById)}>ordersById</p> */}
      {/* <p onClick={() => console.log(customer)}>customers</p> */}
      <br /><br />
      {filteredItems.length === 0 && (
        <div>
          <h2>Parece que no tienes compras</h2>
        </div>
      )}
      {filteredItems.length > 0 && (
      <div className="flex flex-row flex-wrap md:justify-between space-y-3 mb-6">
        <div className="p-5 w-full bg-white border border-b-0 border-gray-200 rounded-lg shadow dark:bg-pink-100 dark:border-pink-100">
        {paginatedItems.map((order, index) => (
          <article className="flex flex-col text-xl pb-6 bg-white border border-b-0 border-gray-200 rounded-2xl shadow dark:bg-pink-100 dark:border-pink-100" key={index}>
            <div className="flex flex-col font-semibold m-2 ">
            <p>Fecha de orden:{order.orderDate}</p>
            <p>Status:{order.status}</p>
            </div>
            <CardOrder filteredItems={order} orderId={order.id}/>
          </article>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      )}
    </div>
  );
};

