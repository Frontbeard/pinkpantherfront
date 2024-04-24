import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import validation from "./validation.js";
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

function CreateAccount({ onDataChange }) {
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })
  const[errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  useEffect(() => {
    const errorsArray = Object.values(errors)
    setIsFormValid(userData.name && userData.email && userData.password > 0 && errorsArray.every(error => !error))
  }, [userData, errors])

  const handleSubmit = async (evento) => {
    evento.preventDefault()
    try {
      const auth = getAuth();
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
        const user = userCredential.user;
      const response = await axios.post('http://localhost:3001/customer', {
        ...userData,
      })
          
      console.log(response.data)
      //setSuccessMessage
      if (response.data.created === true) {
        alert('Account created successfully!')
        onDataChange && onDataChange(response.data.userData) // Call the callback function to update state
        setUserData({
          name: '',
          email: '',
          password: ''
        })
        // Clear the errors state
        setErrors({})
  
      } else if (response.data.created === false) {
        alert('Username already exists in the DataBase!')
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
    }
  }
  
    
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
                placeholder="  Ingresa tu nombre"
                size="lg"
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              <Input
                placeholder="  Ingresa tu correo electrónico"
                size="lg"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              <Input
                placeholder="  Ingresa tu contraseña"
                size="lg"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <Input
                placeholder="  Confirma tu contraseña"
                size="lg"
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </CardBody>
            <CardFooter className="pt-0 mt-5">
              <Button
                className="text-white bg-pink-500"
                variant="gradient"
                fullWidth
                onClick={handleSubmit}
              >
                Registrarse
              </Button>
            </CardFooter>
            
            <hr />
            <CardFooter className="pt-0 mt-5">
              <Button
                className="text-black bg-white border"
                variant="gradient"
                fullWidth
                // onClick={() => dispatch(registerWithGoogle())}
              >
                <FaGoogle /> Registrarse con Google
              </Button>
              <Button
                className="text-black bg-white border mt-2"
                variant="gradient"
                fullWidth
                // onClick={() => dispatch(registerWithFacebook())}
              >
                <FaFacebook /> Registrarse con Facebook
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    };
    
export default CreateAccount;
