import React from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
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

const Login = () => {
    return (
      <div className="grid grid-cols-1 items-center justify-items-center h-screen mt-8">
        <Card className="w-full max-w-md">
          <CardHeader
            variant="gradient"
            color="pink"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="black">
              Inicia sesión
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              placeholder="  Ingresa tu usuario"
              size="lg"
              type="text"
              name="name"
            />
            <div className="mt-1">
              <Input
                placeholder="  Ingresa tu contraseña"
                size="lg"
                type="password"
                name="password"
              />
              <Typography variant="h1" color="black" className="mb-4 grid h-15 items-start mt-2">
              ¿Olvidaste tu contraseña?
            </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0 mt-5">
            <Button
              className="text-white bg-pink-500"
              variant="gradient"
              fullWidth
            >
              Ingresar
            </Button>
          </CardFooter>
          <div>
            {/* Utiliza Link para redirigir al componente de creación de cuenta */}
            <Typography variant="h1" color="black" className="mb-4 grid h-15 place-items-center">
            <Link to="/create-account">  ¿Todavía no tienes cuenta? ¡Registrate acá!</Link>
            </Typography>
          </div>
          <hr />
          <CardFooter className="pt-0 mt-5 flex flex-col gap-2">
           <Button
             className="text-black bg-white border flex items-center justify-center"
             variant="gradient"
             fullWidth>
             <FaGoogle className="mr-2" /> Continuar con Google
           </Button>
           <Button
            className="text-black bg-white border mt-2 flex items-center justify-center"
            variant="gradient"
             fullWidth
  >
    <FaFacebook className="mr-2" /> Continuar con Facebook
  </Button>
</CardFooter>
        </Card>
      </div>
    );
};

export default Login;