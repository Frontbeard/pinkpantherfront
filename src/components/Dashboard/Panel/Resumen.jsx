import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/formatCurrent";

// se encarga de mostrar un resumen de datos relacionados con los pedidos
const Resumen = ({ allOrders }) => {
  const today = new Date();

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

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-purple-600">
      <h1 className="text-2xl font-semibold">Resumen</h1>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Total de órdenes:</h2>
          <p className="text-2xl font-bold">{totalOrdenes}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Total recaudado:</h2>
          <p className="text-2xl font-bold">{formatCurrency(totalRecaudado)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Órdenes de hoy:</h2>
          <p className="text-2xl font-bold">{totalOrdenesHoy}</p>
        </div>
      </div>
    </div>
  );
};

export default Resumen;
