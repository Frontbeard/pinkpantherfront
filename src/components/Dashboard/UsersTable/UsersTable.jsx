import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import CreateAccount from "../../CreateAccount";
import axios from "axios"; // Importa Axios para realizar solicitudes HTTP
import { URL_LINK } from "../../../URL";

const UsersTable = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Función para obtener los usuarios al cargar el componente
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_LINK}/customer`);
        console.log("Datos de usuarios recibidos:", response.data);
    
        // Actualiza el estado con los usuarios obtenidos
        setAllUsers(response.data.customer);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchData(); // Llama a la función fetchData al montar el componente
  }, []);

  // Función para manejar el cambio de estado de userBan
  const handleUserActivation = async (userId) => {
    try {
      await axios.get(`${URL_LINK}/customer/${userId}`, { enable: true });

      console.log("Usuario activado correctamente para el ID:", userId);

      // Actualiza el estado local con el nuevo estado del usuario
      const updatedUsers = allUsers.map(user =>
        user.id === userId ? { ...user, enable: true } : user
      );
      setAllUsers(updatedUsers);
    } catch (error) {
      console.error("Error al activar usuario con ID:", userId, error);
    }
  };

  const handleUserDeactivation = async (userId) => {
    try {
      await axios.get(`${URL_LINK}/customer/${userId}`, { enable: false });

      console.log("Usuario desactivado correctamente para el ID:", userId);

      // Actualiza el estado local con el nuevo estado del usuario
      const updatedUsers = allUsers.map(user =>
        user.id === userId ? { ...user, enable: false } : user
      );
      setAllUsers(updatedUsers);
    } catch (error) {
      console.error("Error al desactivar usuario con ID:", userId, error);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Mostrar modal de edición si hay un usuario seleccionado para editar */}
      {userToEdit && showEditModal && (
        <CreateAccount
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          isEditing={true}
          user={userToEdit}
        />
      )}

      <div className="my-8">
        {/* Iterar sobre todos los usuarios */}
        {allUsers.map((user, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-6 mb-6">
            {/* Mostrar información del usuario */}
            <h2 className="text-lg font-semibold mb-2">{`Usuario ${user.firstName} ${user.lastName}`}</h2>
            <p className="font-medium">Email: {user.email}</p>
            <p className="font-medium">Telefono: {user.telephone || "No definido"}</p>
            <p className="font-medium">Rol: {user.role}</p>
            <p className="font-medium">Dirección: {`${user.street} ${user.streetNumber} ${user.apartmentNumber}  ${user.city} ${user.country} ${user.postalCode}` || "No especificada"}</p>

            <div className="flex items-center mt-4">
              {/* Botón para activar el usuario */}
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => handleUserActivation(user.id)}
              >
                Activar
              </button>

              {/* Botón para desactivar el usuario */}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleUserDeactivation(user.id)}
              >
                Desactivar
              </button>

              {/* Botón para editar el usuario */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => {
                  setShowEditModal(true);
                  setUserToEdit(user);
                }}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;