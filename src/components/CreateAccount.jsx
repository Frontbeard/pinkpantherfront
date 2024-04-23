import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { FaFacebook, FaGoogle } from 'react-icons/fa';


const CreateAccount = () => {
    
    return (
        <div className="grid grid-cols-1 items-center justify-items-center h-screen mt-8">
          <Card className="w-full max-w-md">
            <CardHeader
              variant="gradient"
              color="pink"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="black">
                Crear cuenta
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                placeholder="Ingresa tu nombre"
                size="lg"
                type="text"
                name="name"
                value={values.name}
                onChange={onChange}
              />
              <Input
                placeholder="Ingresa tu correo electrónico"
                size="lg"
                type="email"
                name="email"
                value={values.email}
                onChange={onChange}
              />
              <Input
                placeholder="Ingresa tu contraseña"
                size="lg"
                type="password"
                name="password"
                value={values.password}
                onChange={onChange}
              />
              <Input
                placeholder="Confirma tu contraseña"
                size="lg"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
              />
            </CardBody>
            <CardFooter className="pt-0 mt-5">
              <Button
                className="text-white bg-pink-500"
                variant="gradient"
                fullWidth
                // onClick={() => dispatch(register(values))}
              >
                Registrarse
              </Button>
            </CardFooter>
            <div>
              <Typography variant="h1" color="black" className="mb-4 grid h-15 place-items-center">
                ¿Todavía no tienes cuenta? ¡Registrate acá!
              </Typography>
            </div>
            <hr />
            <CardFooter className="pt-0 mt-5">
              <Button
                className="text-black bg-white border"
                variant="gradient"
                fullWidth
                // onClick={() => dispatch(registerWithGoogle())}
              >
                <FaGoogle /> Continuar con Google
              </Button>
              <Button
                className="text-black bg-white border mt-2"
                variant="gradient"
                fullWidth
                // onClick={() => dispatch(registerWithFacebook())}
              >
                <FaFacebook /> Continuar con Facebook
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    };
    
export default CreateAccount;
