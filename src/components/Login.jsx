import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import login from '../redux/actions/Customer/login.js'
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import validation from "./validation.js";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash  } from 'react-icons/fa';
import { URL_LINK } from '../URL.js'
//const URL_LINK = 'http://localhost:3001'
//const URL_LINK = 'https://pinkpanther-backend-ip0f.onrender.com'



function Login() {
  const [userData, setUserData] = useState({
    idfirebase:'',
    enable:true,
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:'CUSTOMER',
    DNI:'',
    birthdate:'',
    firstName:'',
    lastName:'',
    telephone:'',
    country:'',
    city:'',
    street:'',
    streetNumber:'',
    apartmentNumber:'',
    postalCode:''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const [isFormValid, setIsFormValid] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  
  useEffect(() => {
    const errorsArray = Object.values(errors) // objeto con mensajes de error
    setIsFormValid(userData.email && userData.password > 0 && errorsArray.every(error => !error)) // verifica que los campos tengan valor, verifica que no haya errores
  }, [userData, errors])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
    // Update the error state for the current field only
    const fieldErrors = validation({ ...userData, [name]: value })
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name] || '', // Clear the error if validation passes
    }))
    // console.log(errors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("1");
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
      const data = await axios.get(`${URL_LINK}/customer/${firebaseUid}`);
      //console.log(data)
      dispatch(login(data));
      
      navigate("/");

    } catch (error) {
      console.error('Error submitting the form:', error)
      alert('Error submitting the form. Please try again later.', error.message)
    }
  }

  const togglePasswordVisibility = () => {
    setViewPassword(!viewPassword);
  };

  const handleGoogle = async (event) => {
    event.preventDefault()
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider)
      //const userCredential = GoogleAuthProvider.credentialFromResult(result);
      const user = userCredential.user
      console.log(userCredential)
      //const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      if (!userCredential) {
        throw new Error('Firebase user creation failed');
      }
      //const user = userCredential.user;
      const firebaseUid = userCredential.user.uid.toString();
      //const gmail = user.email
      console.log(firebaseUid)
      //console.log(gmail)
      //const id = uuidv5(firebaseUid, uuidv5.DNS);

      localStorage.setItem('firebaseUid', firebaseUid);
      
      const data = await axios.get(`${URL_LINK}/customer/${firebaseUid}`);
      //console.log(data)
      dispatch(login(data));

      //setSuccessMessage
      // if (response.data.created === true) {
      //   alert('Account created successfully!')
      //   onDataChange && onDataChange(response.data.userData) // Call the callback function to update state
      //   setUserData({
      //     name: '',
      //     email: '',
      //     password: ''
      //   })
      //   // Clear the errors state
      //   setErrors({})
      // } else if (response.data.created === false) {
      //   alert('Username already exists in the DataBase!')
      // }

      navigate("/");
      
    } catch (error) {
      console.error('Error submitting the form:', error)
      //alert('Error submitting the form. Please try again later.', error.message)
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
                Email
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.email ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
              />
              <p className="text-red-500">
                {errors.email}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Contraseña
              </Typography>
              <div className="flex flex-col">
                <div className='flex flex-row items-center relative'>
                <input 
                className={errors.password ? "input-box border-2 rounded-lg border-red-400 px-4 py-2 block w-full" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2 block w-full" }
                type={viewPassword ? 'text' : 'password'}
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
              />
              {viewPassword ? (
                <FaRegEye
                  onClick={togglePasswordVisibility}
                  color='black'
                  className='cursor-pointer absolute right-3 top-3.5'
                />
              ) : (
                <FaRegEyeSlash
                  onClick={togglePasswordVisibility}
                  color='black'
                  className='cursor-pointer absolute right-3 top-3.5'
                />
              )}
                </div>
              <p className="text-red-500"> 
                {errors.password}
              </p>
              </div>
              <Typography variant="h1" color="black" className="mb-4 grid h-15 items-start mt-2 text-sm">
                ¿Olvidaste tu contraseña?
              </Typography>
            </div>
          </CardBody>
          <CardFooter className="pt-0 mt-1">
            <Button onClick={handleSubmit} 
            // disabled={!isFormValid} 
            className="text-white bg-pink-500" variant="gradient" fullWidth>
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
            <Button onClick={handleGoogle} className="text-black bg-white border flex items-center justify-center" variant="gradient" fullWidth>
              <FaGoogle className="mr-2" /> Continuar con Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
};

export default Login;
