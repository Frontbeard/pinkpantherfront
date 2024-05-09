import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import OrderExpandedRow from "./OrderExpandedRow";
import UpdateOrderModal from "./UpdateOrderModal";
import { ChevronDownIcon } from '@heroicons/react/solid';
import { PencilAltIcon } from '@heroicons/react/outline';
import getAllOrders from "../../../redux/actions/Order/getOrders";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";


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

  const dispatch =useDispatch()

  const handleActive = (value, order) => {
    value = !order.enable; // Cambia el valor de activación
    try {
      const response = dispatch( // Se despacha la acción para actualizar el producto
        putOrder(
          product.id,
          {
            enable: value,
          }
        )
      );
      dispatch(getAllProducts(accessToken)); // Se despacha la acción para obtener todos los productos después de actualizar
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = async ( order) => {
    try {
      const response = await dispatch( order);
      if (response) {
        dispatch(getAllOrders());
        message.success("Orden actualizado correctamente", [2], onClose());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

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
          <div key={index}  className="border-b-2 border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">Pedido de {order.firstName} {order.lastName}</h3>
              <p>ID: {order.id}</p>
              {/* <p>Dirección: {order ? `${order?.street} ${order?.streetNumber} ${order?.apartmentNumber}  ${order?.country} ${order?.city} ${order?.postalCode}` : "No especificada"}</p> */}
              <p>Telefono: {order.telephone}</p>
              <p>Total: ${order.totalPrice}</p>
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
                  <td>{order.firstName} {order.lastName}</td>
                  <td>{order?.address ? `${order?.street} ${order?.streetNumber} ${order?.apartmentNumber} ${order?.city} ${order?.country} ${order?.postalCode}` : "No especificada"}</td>
                  <td>{order.telephone}</td>
                  <td>${order.totalPrice}</td>
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
