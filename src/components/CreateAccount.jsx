import React, { useState, useEffect } from "react";
import { useSelector, useDispatch,  } from 'react-redux'
import login from '../redux/actions/Customer/login.js'
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import { v5 as uuidv5 } from 'uuid';
import validation from "./validation.js";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { URL_LINK } from '../URL.js'
//const URL_LINK = 'http://localhost:3001'
//const URL_LINK = 'https://pinkpanther-backend-ip0f.onrender.com'

import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';


function CreateAccount({ onDataChange }) {
  const [userData, setUserData] = useState({
    idfirebase:'',
    enable:true,
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:'CUSTOMER',
    DNI:'232',
    birthdate:'1998-03-23',
    firstName:'HOLA',
    lastName:'PRUEBA',
    telephone:'333',
    country:'Argentina',
    city:'Ciudad',
    street:'calle',
    streetNumber:'333',
    apartmentNumber:'333',
    postalCode:'333'
  })
  const[errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userDataRedux = useSelector(state => state.userData)
  const [viewPassword, setViewPassword] = useState(false)
  
  useEffect(() => {
    const errorsArray = Object.values(errors)
    setIsFormValid(userData.email && userData.password && userData.confirmPassword > 0 && errorsArray.every(error => !error))
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
  };

  const sendConfirmationEmail = async (userData) => {
    const {email, name, idfirebase, enable, userName, role} = userData
    console.log(userData.userName, userDataRedux.userName)
    try {
      // Realiza una solicitud POST al endpoint de tu servidor backend
      const response = await axios.post(`${URL_LINK}/notification/register`, {
        email, name : userDataRedux.name, idfirebase : userData.idFirebase || "dasu12h312uh32ugdsah", enable, userName: email, role 
      });
  
      // Verifica la respuesta del servidor
      if (response.status === 200) {
        // Mostrar un mensaje de éxito si el correo electrónico se envió correctamente
        alert('¡Cuenta creada exitosamente! Se ha enviado un correo electrónico de confirmación.');
      } else {
        // Mostrar un mensaje de error si el correo electrónico no se pudo enviar
        alert('¡Cuenta creada exitosamente! No se pudo enviar el correo electrónico de confirmación.');
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante el envío del correo electrónico
      console.error('Error sending confirmation email:', error);
      alert('Error al enviar el correo electrónico de confirmación. Por favor, inténtelo de nuevo más tarde.');
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      if (!userCredential) {
        throw new Error('Firebase user creation failed');
      }
      const user = userCredential.user;
      const firebaseUid = userCredential.user.uid.toString();
      setUserData({...userData, idfirebase: firebaseUid})
      console.log(firebaseUid)
      //const id = uuidv5(firebaseUid, uuidv5.DNS);

      localStorage.setItem('firebaseUid', firebaseUid);
      

      const response = await axios.post(`${URL_LINK}/customer`, {
        idfirebase: firebaseUid,
        enable: userData.enable,
        userName: userData.email, 
        role: userData.role, 
        DNI: userData.DNI, 
        birthdate: userData.birthdate, 
        firstName: userData.firstName, 
        lastName: userData.lastName, 
        email: userData.email, 
        telephone: userData.telephone, 
        country: userData.country, 
        city: userData.city, 
        street: userData.street, 
        streetNumber: userData.streetNumber, 
        apartmentNumber: userData.apartmentNumber, 
        postalCode: userData.postalCode
      });
      
      console.log(response)
      const data = await axios.get(`${URL_LINK}/customer/${firebaseUid}`);
      //console.log(data)
      dispatch(login(data));

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

      navigate("/");


      await sendConfirmationEmail(userData);

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
      const gmail = user.email
      console.log(firebaseUid)
      console.log(gmail)
      //const id = uuidv5(firebaseUid, uuidv5.DNS);

      localStorage.setItem('firebaseUid', firebaseUid);
      localStorage.setItem('gmail', gmail);
      
      
      navigate("/create-account-google");
      
    } catch (error) {
      console.error('Error submitting the form:', error)
      //alert('Error submitting the form. Please try again later.', error.message)
    }
  }
  
    return (
      <div className="grid grid-cols-1 items-center justify-items-center min-h-full mt-8">
        <Card className="w-full max-w-md">
          <CardHeader variant="gradient" color="pink" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="black">
              Crear cuenta
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Correo electrónico
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.email ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
              />
              <p className="text-red-500"> 
                {errors.name}
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
                <FaEye
                  onClick={togglePasswordVisibility}
                  color='white'
                  className='cursor-pointer absolute right-3 top-3.5'
                />
              ) : (
                <FaEyeSlash
                  onClick={togglePasswordVisibility}
                  color='white'
                  className='cursor-pointer absolute right-3 top-3.5'
                />
              )}
                </div>
              </div>
              <p className="text-red-500"> 
                {errors.password}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Confirmar contraseña
              </Typography>
              <div className="flex flex-col">
                <div className='flex flex-row items-center relative'>
                <input
                className={errors.confirmPassword ? "input-box border-2 rounded-lg border-red-400 px-4 py-2 block w-full" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2 block w-full" }
                type={viewPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
              />
              {viewPassword ? (
                <FaEye
                  onClick={togglePasswordVisibility}
                  color='white'
                  className='cursor-pointer absolute right-3 top-3.5'
                />
              ) : (
                <FaEyeSlash
                  onClick={togglePasswordVisibility}
                  color='white'
                  className='cursor-pointer absolute right-3 top-3.5'
                />
              )}
                </div>
              </div>
              <p className="text-red-500">
                {errors.confirmPassword}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                DNI
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.DNI ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="DNI"
                value={userData.DNI}
                onChange={handleChange}
                placeholder="Ingresa tu DNI"
              />
              <p className="text-red-500"> 
                {errors.DNI}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Nacimiento
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.birthdate ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleChange}
                placeholder="Ingresa tu fecha de nacimiento"
              />
              <p className="text-red-500"> 
                {errors.birthdate}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Nombre/s
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.firstName ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
              />
              <p className="text-red-500"> 
                {errors.firstName}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Apellido/s
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.lastName ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Ingresa tu Apellido"
              />
              <p className="text-red-500"> 
                {errors.lastName}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Teléfono
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.telephone ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="telephone"
                value={userData.telephone}
                onChange={handleChange}
                placeholder="Ingresa tu teléfono"
              />
              <p className="text-red-500"> 
                {errors.telephone}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Ciudad
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.city ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="city"
                value={userData.city}
                onChange={handleChange}
                placeholder="Ingresa tu ciudad"
              />
              <p className="text-red-500"> 
                {errors.city}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Calle
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.street ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="street"
                value={userData.street}
                onChange={handleChange}
                placeholder="Ingresa tu calle"
              />
              <p className="text-red-500"> 
                {errors.street}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Número de Calle
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.streetNumber ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="streetNumber"
                value={userData.streetNumber}
                onChange={handleChange}
                placeholder="Ingresa tu número de calle"
              />
              <p className="text-red-500"> 
                {errors.streetNumber}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Número de Apartamento
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.apartmentNumber ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="apartmentNumber"
                value={userData.apartmentNumber}
                onChange={handleChange}
                placeholder="Ingresa tu número de Apartamento"
              />
              <p className="text-red-500"> 
                {errors.apartmentNumber}
              </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="p" color="black" className="mb-1">
                Código Postal
              </Typography>
              <div className="flex flex-col">
              <input
                className={errors.postalCode ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box border-2 rounded-lg border-gray-400 px-4 py-2" }
                type="text"
                name="postalCode"
                value={userData.postalCode}
                onChange={handleChange}
                placeholder="Ingresa tu código postal"
              />
              <p className="text-red-500"> 
                {errors.postalCode}
              </p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0 mt-5">
            <Button onClick={handleSubmit}
            //  disabled={!isFormValid}  
             className="text-white bg-pink-500" variant="gradient" fullWidth>
              Registrarse
            </Button>
          </CardFooter>
          <div>
            <Typography variant="h1" color="black" className="mb-4 grid h-15 place-items-center text-sm mt-0">
              <Link to="/login">¿Ya tienes cuenta? ¡Inicia sesión aquí!</Link>
            </Typography>
          </div>
          <hr />
          <CardFooter  className="pt-0 mt-5 flex flex-col gap-2">
            <Button onClick={handleGoogle} className="text-black bg-white border flex items-center justify-center" variant="gradient" fullWidth>
              <FaGoogle className="mr-2" /> Registrarse con Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
};

export default CreateAccount;

