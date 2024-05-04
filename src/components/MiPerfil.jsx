import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import login from '../redux/actions/Customer/login.js'
import axios from 'axios';
import validation from "./validation.js";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { URL_LINK } from '../URL.js'

const MiPerfil = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)

    const handleSubmit = () => {
        console.log('Has hecho click');
        //alert('Puedes editar los datos de tu perfil si lo deseas');
        navigate("/perfil-edit")
    };

    const handle = () => {
        console.log('Has hecho click');
       
    };

  return (
    <div className="grid grid-cols-1 items-center justify-items-center min-h-full mt-8">
        <Card className="w-full max-w-md">
          <CardHeader variant="gradient" color="pink" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="black">
              Mi Perfil
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Correo electrónico
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.email}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                DNI
              </Typography>
              <div className="flex flex-col">
              <span>
               {userData.DNI}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Nacimiento
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.birthdate}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Nombre/s
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.firstName}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Apellido/s
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.lastName}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Teléfono
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.telephone}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Ciudad
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.city}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Calle
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.street}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Número de Calle
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.streetNumber}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Número de Apartamento
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.apartmentNumber}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Código Postal
              </Typography>
              <div className="flex flex-col">
              <span>
                {userData.postalCode}
              </span>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0 mt-5">
            <Button onClick={handleSubmit} className="text-white bg-pink-500" variant="gradient" fullWidth>
              Editar Datos
            </Button>
          </CardFooter>   
        </Card>
      </div>
  );
};

export default MiPerfil;