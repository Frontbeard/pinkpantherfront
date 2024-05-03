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


function CreateAccountGoogle({ onDataChange }) {
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

  const [viewPassword, setViewPassword] = useState(false)
  
  useEffect(() => {
    const errorsArray = Object.values(errors)
    setIsFormValid(userData.DNI > 0 && errorsArray.every(error => !error))
  }, [userData, errors])

  useEffect(() => {
    const fuid = localStorage.getItem('firebaseUid');
    const mail = localStorage.getItem('gmail');
    setUserData((prevUserData) => ({
      ...prevUserData,
      idfirebase: fuid || '',
      email: mail || '',
    }));
  }, []);

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


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {

     //const fuid = localStorage.getItem('firebaseUid');
     //const mail = localStorage.getItem('gmail');

      const response = await axios.post(`${URL_LINK}/customer`, {
        idfirebase: userData.idfirebase,
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

    } catch (error) {
      console.error('Error submitting the form:', error)
      alert('Error submitting the form. Please try again later.', error.message)
    }
  }

  const togglePasswordVisibility = () => {
    setViewPassword(!viewPassword);
  };

//   const handleGoogle = async (event) => {
//     event.preventDefault()
//     try {
//       const auth = getAuth();
//       const provider = new GoogleAuthProvider();
//       const userCredential = await signInWithPopup(auth, provider)
//       //const userCredential = GoogleAuthProvider.credentialFromResult(result);
//       const user = userCredential.user
//       console.log(userCredential)
//       //const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
//       if (!userCredential) {
//         throw new Error('Firebase user creation failed');
//       }
//       //const user = userCredential.user;
//       const firebaseUid = userCredential.user.uid.toString();
//       const gmail = user.email
//       console.log(firebaseUid)
//       console.log(gmail)
//       //const id = uuidv5(firebaseUid, uuidv5.DNS);

//       localStorage.setItem('firebaseUid', firebaseUid);
      
//       const response = await axios.post(`${URL_LINK}/customer`, {
//         idfirebase: firebaseUid,
//         enable: userData.enable,
//         userName: userData.firstName, 
//         role: userData.role, 
//         DNI: userData.DNI, 
//         birthdate: userData.birthdate, 
//         firstName: userData.firstName, 
//         lastName: userData.lastName, 
//         email: gmail, 
//         telephone: userData.telephone, 
//         country: userData.country, 
//         city: userData.city, 
//         street: userData.street, 
//         streetNumber: userData.streetNumber, 
//         apartmentNumber: userData.apartmentNumber, 
//         postalCode: userData.postalCode
//       });
      
//       console.log(response)
//       const data = await axios.get(`${URL_LINK}/customer/${firebaseUid}`);
//       //console.log(data)
//       dispatch(login(data));

//       //setSuccessMessage
//       if (response.data.created === true) {
//         alert('Account created successfully!')
//         onDataChange && onDataChange(response.data.userData) // Call the callback function to update state
//         setUserData({
//           name: '',
//           email: '',
//           password: ''
//         })
//         // Clear the errors state
//         setErrors({})
//       } else if (response.data.created === false) {
//         alert('Username already exists in the DataBase!')
//       }

//       navigate("/");
      
//     } catch (error) {
//       console.error('Error submitting the form:', error)
//       //alert('Error submitting the form. Please try again later.', error.message)
//     }
//   }
  
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
              <span className={userData.email  ? "text-green-600" : "text-red-600"}>
                {userData.email}
              </span>
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
            <Button onClick={handleSubmit} disabled={!isFormValid} className="text-white bg-pink-500" variant="gradient" fullWidth>
              Registrarse con Google
            </Button>
          </CardFooter>
         
          <hr />
        </Card>
      </div>
    );
};

export default CreateAccountGoogle;
