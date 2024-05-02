import React from "react";
import { Card } from "antd";
import {formatCurrent } from "./../../utils/formatCurrent"

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
    <div>
      <div className="flex flex-col justify-around w-full h-full text-purple-600">
        <h1>Resumen</h1>
      </div>
      <div className="flex items-center justify-center flex-wrap w-full gap-35 text-purple-600">
        <Card
          title="Total de ordenes :"
          className="CardResumen"
          hoverable={true}
          bordered={false}
          headStyle={{ backgroundColor: "#F5F5F5" }}
          bodyStyle={{ backgroundColor: "#F5F5F5" }}
        >
          <div className="flex justify-center w-full h-full text-2xl font-bold">
            <p className="m-0">{allOrders?.length}</p>
          </div>
        </Card>

        <Card
          title="Total recaudado :"
          className="CardResumen"
          hoverable={true}
          bordered={false}
          headStyle={{ backgroundColor: "#F5F5F5" }}
          bodyStyle={{ backgroundColor: "#F5F5F5" }}
        >
          <div className="flex justify-center w-full h-full text-2xl font-bold">
            <p className="m-0">
              {formatCurrency(
                allOrders.reduce((acc, order) => acc + Number(order.totalAmount), 0)
              )}
            </p>
          </div>
        </Card>
        <Card
          title="Ordenes de hoy :"
          className="CardResumen"
          hoverable={true}
          bordered={false}
          headStyle={{ backgroundColor: "#F5F5F5" }}
          bodyStyle={{ backgroundColor: "#F5F5F5" }}
        >
          <div className="flex justify-center w-full h-full text-2xl font-bold">
            <p className="m-0">{todayOrders?.length}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resumen;