import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateOrderModal from "./UpdateOrderModal";
import { useMediaQuery } from "react-responsive";

//es una representación visual de la lista de pedidos de la tienda
const OrdersTable = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const allOrders = useSelector((state) => state.allOrders);
  const [showEditModal, setShowEditModal] = useState(false);
  const [order, setOrder] = useState({});

  const tableOrders = allOrders.map((order) => ({
    ...order,
    key: order.id,
  }));

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
          <div key={index} className="border-b-2 border-gray-200 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Pedido de {order.User?.name} {order.User?.surname}
              </h2>
              <button
                className="text-purple-600 hover:text-purple-800 focus:outline-none"
                onClick={() => {
                  setShowEditModal(true);
                  setOrder(order);
                }}
              >
                Editar
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {order.products.map((product, i) => (
                <div key={i} className="border border-gray-200 rounded-md p-4 flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p>Cantidad: {product.quantity}</p>
                    <p>Talla: {product.size}</p>
                    <p>Precio: ${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comprador</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección de envío</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de compra</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID de pago</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cambiar estado</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableOrders.map((order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.User?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.User?.address ? `${order?.User?.address.calle} ${order?.User?.address.numero} ${order?.User?.address.dpto} ${order?.User?.address.entreCalles} ${order?.User?.address.localidad} ${order?.User?.address.provincia} ${order?.User?.address.codigoPostal}` : "No especificada"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.User?.phone || "No especificado"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.User?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.mercadopagoTransactionId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-purple-600 hover:text-purple-800 focus:outline-none"
                    onClick={() => {
                      setShowEditModal(true);
                      setOrder(order);
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersTable;
