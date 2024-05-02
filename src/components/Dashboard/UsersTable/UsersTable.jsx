import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllUsers from "../../../redux/actions/User/getAllUsers";
import { Switch } from "@headlessui/react";
// import { EditIcon } from '@heroicons/react/solid';
import CreateAccount from "../../CreateAccount";
import userBan from "../../../redux/actions/User/userBan";

//es una tabla que muestra una lista de usuarios y proporciona la funcionalidad de editar y cambiar el estado de bloqueo de un usuario
const UsersTable = () => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState({});
  const accessToken = useSelector((state) => state.accessToken);
  const allUsers = useSelector((state) => state.allUsers);

  const onChange = async (value, user) => {
    try {
      const response = await dispatch(userBan(value, user, accessToken));
      if (response) {
        dispatch(getAllUsers(accessToken));
        message.success("Usuario actualizado correctamente", [2], onClose());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getAllUsers(accessToken));
  }, []);

  return (
    <div className="container mx-auto">
      {user && showEditModal && (
        <CreateAccount
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          isEditing={true}
          user={user}
        />
      )}

      <div className="my-8">
        {allUsers.map((user, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">{`Usuario ${user.name} ${user.surname}`}</h2>
            <p className="font-medium">Email: {user.email}</p>
            <p className="font-medium">Telefono: {user.phone || "No definido"}</p>
            <p className="font-medium">Rol: {user.typeUser}</p>
            <p className="font-medium">Dirección: {`${user?.address?.calle} ${user?.address?.numero} ${user?.address?.dpto} ${user?.address?.entreCalles} ${user?.address?.localidad} ${user?.address?.provincia} ${user?.address?.codigoPostal}` || "No especificada"}</p>

            <div className="flex items-center mt-4">
              <Switch
                checked={user.userBan}
                onChange={() => onChange(!user.userBan, user)}
                className={`${
                  user.userBan ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span
                  className={`${
                    user.userBan ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={() => {
                  setShowEditModal(true);
                  setUser(user);
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
