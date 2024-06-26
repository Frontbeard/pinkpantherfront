import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import axios from "axios";
import getAllOrders from "../../../redux/actions/Order/getOrders";
import { URL_LINK } from "../../../URL";

const UpdateOrderModal = ({ visible, onClose, order }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);

  const statusOptions = [
    { value: "En proceso", label: "En proceso" },
    { value: "Cancelada", label: "Cancelada" },
    { value: "Entregada", label: "Entregada" },
  ];

  const handleUpdateOrder = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${URL_LINK}/order/${order.id}`,
        {  status: status },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (data) {
        setSuccessMessage("¡Orden actualizada correctamente!");
        dispatch(getAllOrders()); // Actualiza el estado de las órdenes en Redux
        onClose();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${visible ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg w-96 p-6">
          <h3 className="text-lg font-semibold mb-4">Cambiar estado de orden {order.id}</h3>
          <div className="flex flex-col gap-4">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ButtonPrimary
              disabled={loading}
              title="Confirmar"
              type="button"
              onClick={handleUpdateOrder}
            />
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
