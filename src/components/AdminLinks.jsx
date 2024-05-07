import React from "react";
import { useNavigate } from "react-router-dom";
import logout from "../redux/actions/Customer/logout";
import { useDispatch } from "react-redux";

export const AdminLinks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('firebaseUid');
        localStorage.removeItem('gmail');
        navigate('/')
        dispatch(logout());
        console.log('Has cerrado sesión');
        alert('Has cerrado sesión');
    };

    return (
        <div className="fixed left-0 bottom-0 w-80 bg-white z-10 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
            <a href="/" className="flex items-center gap-2 ">Home</a>
            </div>
            <div className="mb-4">
            <a href="/login" className="flex items-center gap-2 ">Login/Iniciar sesion</a>
            </div>
            <div className="mb-4">
            <a href="/create-account" className="flex items-center gap-2 ">Crear cuenta</a>
            </div>
            <div className="mb-4">
            <a href="/admin" className="flex items-center gap-2 "></a>
            <button onClick={handleLogout}>Logout/Cerrar sesion</button>
            </div>
            <div className="mb-4">
            <a href="/perfil" className="flex items-center gap-2 ">Mi perfil</a>
            </div>
            <div className="mb-4">
            <a href="/perfil-edit" className="flex items-center gap-2 ">Editar perfil</a>
            </div>
            <div className="mb-4">
            <a href="/compras" className="flex items-center gap-2 ">Mis compras</a>
            </div>
            <div className="mb-4">
            <a href="/about" className="flex items-center gap-2 ">About us</a>
            </div>
            <div className="mb-4">
            <a href="/cart" className="flex items-center gap-2 ">Carrito</a>
            </div>
            <div className="mb-4">
            <a href="/admin" className="flex items-center gap-2 ">Dashboard</a>
            </div>
            <div className="flex justify-center mt-4"> 
            </div>
        </div>
    );
};
