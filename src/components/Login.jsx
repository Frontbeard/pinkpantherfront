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
import { useDispatch } from "react-redux";
import { FaFacebook, FaGoogle } from 'react-icons/fa';



const Login = () => {
    // const initialState = {
    //   name: "",
    //   password: "",
    //   image: "",
    // };
    // const [values, setValues] = useState(initialState);
    // const onChange = (e) => {
    //   const { name, value } = e.target;
    //   setValues({ ...values, [name]: value });
    // };
  
    // const dispatch = useDispatch();
  
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
              placeholder="  Ingresa tu nombre"
              size="lg"
              type="text"
              name="name"
            //   value={values.name}
            //   onChange={onChange}
            />
            <div className="mt-1">
              <Input
                placeholder="  Ingresa tu contraseña"
                size="lg"
                type="password"
                name="password"
                // value={values.password}
                // onChange={onChange}
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
            //   onClick={() => dispatch(login(values))}
            >
              Ingresar
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
            //   onClick={() => dispatch(login(values))}
            >
              <FaGoogle /> Continuar con Google
            </Button>
            <Button
              className="text-black bg-white border mt-2"
              variant="gradient"
              fullWidth
            //   onClick={() => dispatch(login(values))}
            >
              <FaFacebook /> Continuar con Facebook
            </Button>
          </CardFooter>
        </Card>
      </div>

      
    );
  };
export default Login;
