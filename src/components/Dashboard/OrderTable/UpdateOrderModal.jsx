

//es un modal que se utiliza para actualizar el estado de una orden

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import getAllOrders from "../../../redux/actions/Order/getAllOrders";


const UpdateOrderModal = ({ visible, onClose, order }) => {
  const API_URL_BASE = "https://pinkpantherfront.vercel.app/"
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);

  const statusOptions = [
    { value: "En proceso", label: "En proceso" },
    { value: "Cancelada", label: "Cancelada" },
    { value: "Entregada", label: "Entregada" },
  ];

  const handleUpdateOrder = async (order, status) => {  
    setLoading(true);
    const { data } = await axios.put(
      `${API_URL_BASE}/order/update`,
      { id: order.id, status: status },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (data) {
      // Aquí puedes usar tus propios métodos para mostrar mensajes
      console.log("Orden actualizada correctamente");
      dispatch(getAllOrders(accessToken));
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50 ${visible ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg p-8 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Cambiar estado de orden {order.id}</h2>
        <select
          className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="">Seleccionar estado</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
          onClick={() => handleUpdateOrder(order, status)}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default UpdateOrderModal;