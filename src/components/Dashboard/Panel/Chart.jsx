import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

const Chart = ({ months }) => {
  const allProducts = useSelector((state) => state.allProducts);
  const allCategories = useSelector((state) => state.allCategories);

  const monthsSales = months.map((month) =>
    month.sales.reduce((acc, order) => acc + Number(order.totalAmount), 0)
  );
  const monthsOrders = months.map((month) => month.sales.length);

  const data = {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    datasets: [
      {
        label: "Venta en $",
        backgroundColor: "rgba(186, 51, 138, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 2,
        data: monthsSales,
      },
    ],
  };

  const data2 = {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],

    datasets: [
      {
        label: "Cantidad de ordenes",
        tension: 0.3,
        fill: true,

        backgroundColor: "rgba(186, 51, 138, 1)",
        borderColor: "rgba(224, 179, 211,1)",
        pointRadius: 5,
        borderWidth: 2,
        data: monthsOrders,
      },
    ],
  };

  const options = {
    maintainsAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="chartContainer">
      <div className="chart w-1/2">
        <Bar data={data} options={options} />
      </div>
      <div className="chart w-1/2">
        <Line data={data2} options={options} />
      </div>
    </div>
  );
};

export default Chart;
