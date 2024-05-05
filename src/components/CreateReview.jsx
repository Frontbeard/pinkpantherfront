import { Link, useNavigate } from "react-router-dom"

import { Card, Button, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import validationReview from "./ValidationReview";
import postReview from "../redux/actions/Review/postReview";

export const CreateReview = () => {

    const [userData, setUserData] = useState({
        title:"",
        description:"",
        points:"",
      })
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        const errorsArray = Object.values(errors) // objeto con mensajes de error
        setIsFormValid(userData.title && userData.description && userData.points > 0 && errorsArray.every(error => !error)) // verifica que los campos tengan valor, verifica que no haya errores
    }, [userData, errors])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value
        }));
        // Update the error state for the current field only
        const fieldErrors = validationReview({ ...userData, [name]: value })
        console.log(fieldErrors);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: fieldErrors[name] || '', // Clear the error if validation passes
        }))
        // console.log(errors);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
          dispatch(postReview(userData))
          alert("review creada")
          setUserData({
            title:"",
            description:"",
            points:"",
          })
          navigate("/");
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
                Califica este producto
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Typography variant="p" color="black" className="mb-1 ">
                  Titulo
                </Typography>
                </div>
                <div className="flex flex-col">
                    <input 
                    className={errors.title ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box  border-2 rounded-lg border-gray-400 px-4 py-2" }
                     type="text" 
                     name="title"
                     value={userData.title}
                    onChange={handleChange}
                     placeholder="¿Que te parecio el producto?" 
                     />
                     <p className="text-red-500">
                {errors.title}
              </p>
                </div>
              <div className="flex flex-col gap-1">
                <Typography variant="p" color="black" className="mb-1">
                  Descripción
                </Typography>
                </div>
                <div className="flex flex-col">
                    <input 
                    className={errors.description ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box  border-2 rounded-lg border-gray-400 px-4 py-2" }
                     type="text" 
                     name="description"
                     value={userData.description}
                    onChange={handleChange}
                     placeholder="Cuentanos mas..." 
                     />
                     <p className="text-red-500">
                {errors.description}
              </p>
                </div>
                <div>
                <Typography variant="h1" color="black" className="mb-4 grid h-15 items-start mt-2 text-sm">
                Puntaje (del 1 al 5)
                </Typography>
                <div className="flex flex-col">
                    <input 
                    className={errors.points ? "input-box border-2 rounded-lg border-red-400 px-4 py-2" : "input-box  border-2 rounded-lg border-gray-400 px-4 py-2" }
                     type="number"
                     min={1}
                     max={5} 
                     name="points"
                     value={userData.points}
                    onChange={handleChange}
                     placeholder="" 
                     />
                     <p className="text-red-500">
                {errors.points}
              </p>
                </div>
                <div></div>
              </div>
            </CardBody>
            <CardFooter className="pt-0 mt-1">
               <Button onClick={handleSubmit} 
               disabled={!isFormValid}
                className="text-white bg-pink-500" variant="gradient" fullWidth> 
                Crear review
              </Button>
            </CardFooter>
          </Card>
        </div>
    )
}