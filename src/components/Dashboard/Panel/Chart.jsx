import React from "react";
import { useSelector } from "react-redux";

//se encarga de mostrar estadísticas de ventas y cantidad de pedidos por mes
const Chart = ({ months }) => {
  const allProducts = useSelector((state) => state.allProducts);
  const allCategories = useSelector((state) => state.allCategories);

  const monthsSales = months.map((month) =>
    month.sales.reduce((acc, order) => acc + Number(order.totalAmount), 0)
  );
  const monthsOrders = months.map((month) => month.sales.length);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Venta en $</h3>
          <ul>
            {monthsSales.map((sales, index) => (
              <li key={index}>
                {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][index]}: ${sales}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Cantidad de ordenes</h3>
          <ul>
            {monthsOrders.map((orders, index) => (
              <li key={index}>
                {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][index]}: {orders}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chart;
