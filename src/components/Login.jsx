import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const Login = () => {
    return (
      <div className="grid grid-cols-1 items-center justify-items-center h-screen mt-8">
        <Card className="w-full max-w-md">
          <CardHeader variant="gradient" color="pink" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="black">
              Inicia sesión
            </Typography>
          </CardHeader>
      
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Nombre
              </Typography>
              <input
                className="input-box border-2 rounded-lg border-gray-400 px-4 py-2"
                type="text"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Contraseña
              </Typography>
              <input
                className="input-box border-2 rounded-lg border-gray-400 px-4 py-2"

                type="password"
                placeholder="Ingresa tu contraseña"
              />
              <Typography variant="h1" color="black" className="mb-4 grid h-15 items-start mt-2 text-sm">
                ¿Olvidaste tu contraseña?
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0 mt-1">
            <Button className="text-white bg-pink-500" variant="gradient" fullWidth>
              Ingresar
            </Button>
          </CardFooter>
          <div>
            <Typography variant="h1" color="black" className="mb-4 grid h-15 place-items-center text-sm mt-0">
              <Link to="/create-account">¿Todavía no tienes cuenta? ¡Regístrate acá!</Link>
            </Typography>
          </div>
          <hr />
          <CardFooter className="pt-0 mt-5 flex flex-col gap-2">
            <Button className="text-black bg-white border flex items-center justify-center" variant="gradient" fullWidth>
              <FaGoogle className="mr-2" /> Continuar con Google
            </Button>
            <Button className="text-black bg-white border mt-2 flex items-center justify-center" variant="gradient" fullWidth>
              <FaFacebook className="mr-2" /> Continuar con Facebook
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
};

export default Login;
