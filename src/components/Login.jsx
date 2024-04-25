import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import validation from "./validation.js";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
const URL_LINK = 'http://localhost:3001/customer'
//const URL_LINK = 'https://pinkpanther-backend-ip0f.onrender.com/'

function Login() {
  const [userData, setUserData] = useState({
    email:'',
    password:'',
  })
  const[errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    const fieldName = event.target.name
    let fieldValue = event.target.value
    setUserData({
      ...userData,
      [name]: value
    });
    const fieldErrors = validation({ ...userData, [fieldName]: fieldValue })
      
    // Update the error state for the current field only
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: fieldErrors[fieldName] || '', // Clear the error if validation passes
    }))
  };

  useEffect(() => {
    const errorsArray = Object.values(errors)
    setIsFormValid(userData.email && userData.password > 0 && errorsArray.every(error => !error))
  }, [userData, errors])

  const handleSubmit = async (evento) => {
    evento.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password)
      if (!userCredential) {
        throw new Error('Firebase login failed');
      }
      const user = userCredential.user;
      const firebaseUid = userCredential.user.uid.toString();
      console.log(firebaseUid)
      //const id = uuidv5(firebaseUid, uuidv5.DNS);
      
      localStorage.setItem('firebaseUid', firebaseUid);

    } catch (error) {
      console.error('Error submitting the form:', error)
      alert('Error submitting the form. Please try again later.', error.message)
    }
  }

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
                email
              </Typography>
              <input
                className={errors.email ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Contraseña
              </Typography>
              <input
                className={errors.password ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
              />
              <Typography variant="h1" color="black" className="mb-4 grid h-15 items-start mt-2 text-sm">
                ¿Olvidaste tu contraseña?
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0 mt-1">
            <Button onClick={handleSubmit} disabled={!isFormValid} className="text-white bg-pink-500" variant="gradient" fullWidth>
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
