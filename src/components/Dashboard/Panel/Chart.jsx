import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  LineElement,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ months }) => {
  const options = {
    maintainsAspectRatio: false,
    responsive: true,
  };

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

  return (
    <div className="min-h-20 w-full flex justify-center items-center space-x-4 mt-20 gap-20">
      <div className="w-96">
        <Bar data={data} options={options} />
      </div>
      <div className="w-96">
        <Line data={data2} options={options} />
      </div>
    </div>
  );
};

export default Chart;
