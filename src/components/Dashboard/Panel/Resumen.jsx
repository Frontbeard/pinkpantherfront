import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrent";
import { useDispatch } from "react-redux";
import getAllOrders from "../../../redux/actions/Order/getOrders";
import { useSelector } from "react-redux";
import { getMonthSales } from "../../utils/getMonthSales";

// se encarga de mostrar un resumen de datos relacionados con los pedidos
const Resumen = () => {
   const today = new Date();
  const dispatch=useDispatch()
  const accessToken = useSelector((state) => state.accessToken);
  const allOrders = useSelector((state) => state.allOrders);

  // Filtrar las órdenes de hoy
  const todayOrders = allOrders?.filter((order) => {
    const orderDate = new Date(order.orderDate);
    // Comparar solo la fecha, ignorando la hora
    return orderDate.toDateString() === today.toDateString();
  });

  // Calcular el total de órdenes
  const totalOrdenes = allOrders?.length || 0;

  // Calcular el total de órdenes de hoy
  const totalOrdenesHoy = todayOrders?.length || 0;

  // Sumar los precios de las órdenes válidas
  const [totalRecaudado, setTotalRecaudado] = useState(0);

   useEffect(() => {
     let total = 0;
     allOrders?.forEach((order) => {
       order.products?.forEach((product) => {
         total += parseFloat(product.price);
       });
     });
     setTotalRecaudado(total);
   }, [allOrders]);

  useEffect(() => {
    dispatch(getAllOrders(accessToken));
  }, []);

  return (

<div className="flex flex-col items-center justify-center gap-6 text-pink-400">
  <h1 className="text-5xl font-semibold text-center">Resumen</h1>
  <div className="flex flex-wrap justify-center gap-6 w-full">
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Total de órdenes:</h2>
      <p className="text-4xl font-bold">{totalOrdenes}</p>
    </div>
    {/* <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Total recaudado:</h2>
      <p className="text-4xl font-bold">{formatCurrency(totalRecaudado)}</p>
    </div> */}
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">Órdenes de hoy:</h2>
      <p className="text-4xl font-bold">{totalOrdenesHoy}</p>
    </div>
  </div>
</div>

  );
};

export default Resumen;
