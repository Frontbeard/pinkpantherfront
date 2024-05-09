import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import login from '../redux/actions/Customer/login.js'
import axios from 'axios';
import validation from "./validation.js";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { URL_LINK } from '../URL.js'
import logout from '../redux/actions/Customer/logout.js'

const MiPerfilEdit = () => {
  const userDataOld = useSelector((state) => state.userData)
  const [userData, setUserData] = useState({
    idfirebase:userDataOld.idfirebase,
    enable:userDataOld.enable,
    name: userDataOld.name,
    email: userDataOld.email,
    //password:'',
    //confirmPassword:'',
    DNI: userDataOld.DNI, 
    birthdate: userDataOld.birthdate, 
    firstName: userDataOld.firstName, 
    lastName: userDataOld.lastName, 
    email: userDataOld.email, 
    telephone: userDataOld.telephone, 
    country: userDataOld.country, 
    city: userDataOld.city, 
    street: userDataOld.street, 
    streetNumber: userDataOld.streetNumber, 
    apartmentNumber: userDataOld.apartmentNumber, 
    postalCode: userDataOld.postalCode
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const errorsArray = Object.values(errors)
    setIsFormValid(userData.DNI && userData.birthdate && userData.firstName && userData.lastName && userData.telephone && userData.city && userData.street && userData.streetNumber > 0 && errorsArray.every(error => !error))
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

  const handleSubmit = async () => {
    console.log('Editando perfil...');
    
    const response = await axios.put(`${URL_LINK}/customer/${userData.idfirebase}`, {
      //idfirebase: firebaseUid,
      enable: userData.enable,
      userName: userData.email, 
      role: userData.role, 
      DNI: userData.DNI, 
      birthdate: userData.birthdate, 
      firstName: userData.firstName, 
      lastName: userData.lastName, 
      email: userData.email, 
      telephone: userData.telephone, 
      //country: userData.country, 
      city: userData.city, 
      street: userData.street, 
      streetNumber: userData.streetNumber, 
      apartmentNumber: userData.apartmentNumber, 
      postalCode: userData.postalCode
    });
    console.log(response)
    
    navigate("/perfil")
};

const handleBaja = async () => {
  console.log('Usuario dado de baja');

  const response = await axios.put(`${URL_LINK}/customer/${userData.idfirebase}`, {
    //idfirebase: firebaseUid,
    enable: false,
    userName: userData.email, 
    role: userData.role, 
    DNI: userData.DNI, 
    birthdate: userData.birthdate, 
    firstName: userData.firstName, 
    lastName: userData.lastName, 
    email: userData.email, 
    telephone: userData.telephone, 
    //country: userData.country, 
    city: userData.city, 
    street: userData.street, 
    streetNumber: userData.streetNumber, 
    apartmentNumber: userData.apartmentNumber, 
    postalCode: userData.postalCode
  });
  console.log(response)
  alert('Perfil dado de baja');
  dispatch(logout());
  navigate("/")
};


  return (
    <div className="grid grid-cols-1 items-center justify-items-center min-h-full mt-8">
        <Card className="w-full max-w-md">
          <CardHeader variant="gradient" color="pink" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="black">
              Editar Perfil
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
              <p className="text-red-500"> 
                {errors.name}
              </p>
              </div>
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
              Confirmar Nuevos Datos
            </Button>
          </CardFooter>
          <hr />
{/*   
          <CardFooter  className="pt-0 mt-5 flex flex-col gap-2">
            <Button onClick={handleBaja} className="text-black bg-white border flex items-center justify-center" variant="gradient" fullWidth>
               Dar de baja el perfil
            </Button>
          </CardFooter>
*/}  
        </Card>
      </div>
  );
};

export default MiPerfilEdit;