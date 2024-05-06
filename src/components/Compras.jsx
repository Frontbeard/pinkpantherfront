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

  const itemsPerPage = 4;
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
      <p onClick={() => console.log(ordersById)}>ordersById</p>
      <p onClick={() => console.log(customer)}>customers</p>
      <br /><br />
      {filteredItems.length > 0 && (
      <div>
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
        {paginatedItems.map((order, index) => (
          <div key={index}>
            <p className="font-semibold">{order.status}</p>
            <p className="font-semibold">{order.orderDate}</p>
            <CardOrder filteredItems={order} orderId={order.id}/>
          </div>
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

