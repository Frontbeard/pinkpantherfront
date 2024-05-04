import React from "react";
import { formatCurrency } from "../../utils/formatCurrent";

// se encarga de mostrar un resumen de datos relacionados con los pedidos
const Resumen = ({ allOrders }) => {
  const today = new Date();

  const todayOrders = allOrders?.filter((order) => {
    const orderDate = new Date(order.orderDate);
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-purple-600">
      <h1 className="text-2xl font-semibold">Resumen</h1>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Total de ordenes:</h2>
          <p className="text-2xl font-bold">{allOrders?.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Total recaudado:</h2>
          <p className="text-2xl font-bold">
            {formatCurrency(

              allOrders?.reduce((acc, order) => acc + Number(order.totalAmount), 0)

            )}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Ordenes de hoy:</h2>
          <p className="text-2xl font-bold">{todayOrders?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Resumen;
