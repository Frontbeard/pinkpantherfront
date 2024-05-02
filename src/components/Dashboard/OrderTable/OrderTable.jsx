import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import OrderExpandedRow from "./OrderExpandedRow";
import UpdateOrderModal from "./UpdateOrderModal";
import { ChevronDownIcon } from '@heroicons/react/solid';
import { PencilAltIcon, PlusIcon } from '@heroicons/react/outline';

//se encarga de mostrar una tabla de pedidos
const OrdersTable = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const allOrders = useSelector((state) => state.allOrders);
  const tableOrders = allOrders.map((order) => ({
    ...order,
    key: order.id,
  }));
  const [showEditModal, setShowEditModal] = useState(false);
  const [order, setOrder] = useState({});

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
          <div key={index} className="border-b-2 border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">Pedido de {order.User?.name} {order.User?.surname}</h3>
              <p>ID: {order.id}</p>
              <p>Dirección: {order?.User?.address ? `${order?.User?.address.calle} ${order?.User?.address.numero} ${order?.User?.address.dpto} ${order?.User?.address.entreCalles} ${order?.User?.address.localidad} ${order?.User?.address.provincia} ${order?.User?.address.codigoPostal}` : "No especificada"}</p>
              <p>Telefono: {order.User?.telephone}</p>
              <p>Total: ${order.totalAmount}</p>
              <p>Fecha: {order.orderDate}</p>
              <p>Id de pago: {order.mercadopagoTransactionId}</p>
              <p>Estado: {order.status}</p>
              <Button
                type="primary"
                className="inline-flex items-center px-2 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                onClick={() => {
                  setShowEditModal(true), setOrder(order);
                }}
              >
                <PencilAltIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Editar
              </Button>
            </div>
            <div className="p-4">
              <Collapse
                className="border-t border-gray-200"
                expandIcon={({ isActive }) => (
                  <ChevronDownIcon
                    className={`${isActive ? '-rotate-180' : 'rotate-0'} w-5 h-5 text-gray-400`}
                  />
                )}
              >
                <Collapse.Panel header="Lista de productos">
                  {order.products.map((product, i) => (
                    <div key={i} className="border-b border-gray-200 p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={product.image} alt="" className="h-16 w-auto mr-4" />
                        <div>
                          <p className="text-gray-800">{product.name}</p>
                          <p className="text-gray-500">Cantidad: {product.quantity}</p>
                          <p className="text-gray-500">Talla: {product.size}</p>
                          <p className="text-gray-500">Precio: ${product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Collapse.Panel>
              </Collapse>
            </div>
          </div>
        ))
      ) : (
        <div className="overflow-x-scroll">
          <table className="min-w-full bg-gray-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Telefono</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Id de pago</th>
                <th>Estado</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {tableOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.User?.name} {order.User?.surname}</td>
                  <td>{order?.User?.address ? `${order?.User?.address.calle} ${order?.User?.address.numero} ${order?.User?.address.dpto} ${order?.User?.address.entreCalles} ${order?.User?.address.localidad} ${order?.User?.address.provincia} ${order?.User?.address.codigoPostal}` : "No especificada"}</td>
                  <td>{order.User?.phone}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.mercadopagoTransactionId}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => {
                        setShowEditModal(true), setOrder(order);
                      }}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
