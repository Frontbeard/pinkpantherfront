import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Select, message } from "antd";
import ButtonPrimary from "../../../components/ButtonPrimary/ButtonPrimary";
import axios from "axios";
import getAllOrders from "../../../redux/actions/Order/getOrders";

const UpdateOrderModal = ({ visible, onClose, order }) => {
  const API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE;
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
    try {
      const { data } = await axios.put(
        `${API_URL_BASE}/order/update`,
        { id: order.id, status: status },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (data) {
        message.success("Orden actualizada correctamente", [2], onClose());
        dispatch(getAllOrders(accessToken));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
    onClose();
  };

  return (
    <Modal
      title={`Cambiar estado de orden ${order.id}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="flex flex-col gap-4">
        <Select
          options={statusOptions}
          onChange={(value) => setStatus(value)}
          style={{ width: "100%" }}
        />
        <ButtonPrimary
          disabled={loading}
          title="Confirmar"
          type="button"
          onClick={() => handleUpdateOrder(order, status)}
        />
      </div>
    </Modal>
  );
};

export default UpdateOrderModal;
