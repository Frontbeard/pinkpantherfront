import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Collapse } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import OrderExpandedRow from "./OrderExpandedRow";
import UpdateOrderModal from "./UpdateOrderModal";
import { useMediaQuery } from "react-responsive";

const OrdersTable = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const allOrders = useSelector((state) => state.allOrders);
  const tableOrders = allOrders.map((order) => ({
    ...order,
    key: order.id,
  }));
  const [showEditModal, setShowEditModal] = useState(false);
  const [order, setOrder] = useState({});

  const colorStatus = (status) => {
    switch (status) {
      case "En proceso":
        return "blue";
      case "Cancelada":
        return "red";
      case "Entregada":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <div>
      {order && showEditModal && (
        <UpdateOrderModal
          order={order}
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {isMobile ? (
        tableOrders.map((order, index) => (
          <Card
            key={index}
            title={`Pedido de ${order.User?.name} ${order.User?.surname}`}
            bordered={false}
            hoverable={true}
            className="editOrderCard"
            style={{
              width: "95%",
              marginBottom: "10px",
              marginTop: "10px",
              backgroundColor: "#f5f5f5",
              padding: "20px",
            }}
          >
            <div className="editOrderTable">
              <p>ID: {order.id}</p>
              <p>
                Dirección:{" "}
                {order?.User?.address
                  ? `${order?.User?.address.calle} ${order?.User?.address.numero} ${order?.User?.address.dpto} ${order?.User?.address.entreCalles} ${order?.User?.address.localidad} ${order?.User?.address.provincia} ${order?.User?.address.codigoPostal}`
                  : "No especificada"}
              </p>
              <p>Telefono: {order.User?.phone}</p>
              <p>Total: ${order.totalAmount}</p>
              <p>Fecha: {order.orderDate}</p>
              <p>Id de pago: {order.mercadopagoTransactionId}</p>
              <p>Estado: {order.status}</p>
              <p>Cambiar estado: </p>
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => {
                  setShowEditModal(true), setOrder(order);
                }}
              />
            </div>
            <Collapse
              ghost
              style={{ width: "100%" }}
              expandIcon={({ isActive }) => (
                <PlusOutlined
                  rotate={isActive ? 45 : 0}
                  style={{
                    fontSize: "1.3em",
                    color: isActive ? "#ba338a" : "black",
                  }}
                />
              )}
            >
              <Collapse.Panel header="Lista de productos" key="1">
                <div>
                  {order.products.map((product, i) => (
                    <Card
                      key={i}
                      title={
                        <span>
                          {product.name}
                        </span>
                      }
                      bordered={false}
                      hoverable={true}
                      style={{
                        width: "100%",
                        marginBottom: "10px",
                        marginTop: "10px",
                        backgroundColor: "#f5f5f5",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      id={product.id}
                    >
                      <div className="flex justify-center gap-4">
                        <img src={product.image} alt="" className="h-32 w-auto" />
                        <div>
                          <p>Cantidad: {product.quantity}</p>
                          <p>
                            Color:{" "}
                            <div
                              style={{
                                backgroundColor: product.color,
                                height: 25,
                                width: 25,
                                borderRadius: 50,
                                textAlign: "center",
                                margin: "auto",
                              }}
                            ></div>
                          </p>
                          <p>Talla: {product.size}</p>
                          <p>Precio: ${product.price}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Collapse.Panel>
            </Collapse>
          </Card>
        ))
      ) : (
        <Table
          className="bg-gray-100"
          dataSource={tableOrders}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <OrderExpandedRow products={record.products} />
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          style={{ overflowX: "scroll" }}
        />
      )}
    </div>
  );
};

export default OrdersTable;
