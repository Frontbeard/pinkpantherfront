import React from 'react'
import AddingImages from './AddingImages';
import axios from "axios";
import { useState, useEffect } from 'react';
const URL_PRODUCT =  "https://pinkpanther-backend-ip0f.onrender.com/product";
/* const URL_PRODUCT = "http://localhost:3001/product" */
const URL_CATEGORIES = "https://pinkpanther-backend-ip0f.onrender.com/categories";


const CreateProduct =()=>{

    const [productData, setProductData] = useState({
        name: "",
        color: "",
        priceEfectivo: 0,
        priceCuotas: 0,
        size: "",
        quantity: 0,
        photo: "",
        supplier: "",
        enable: false,
        Categories: []
    })

    const [Categories, setCategories] = useState([]);

    useEffect( () => {
        axios.get(URL_CATEGORIES)
        .then( ({ data }) => {
            setCategories(data)
        })
        .catch(error => console.error(error));
    }, []);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        /* setErrors(validation({...productData, [event.target.name]:event.target.value })) */
        setProductData({...productData, [event.target.name]:event.target.value })
    }

    const handleCategoriesChange = (event) => {
        const selectedCategories = Array.from(event.target.selectedOptions, option => option.value);
        setProductData(prevData => ({
            ...prevData,
            Categories: selectedCategories
        }));
    }

    const handleEnableChange = (event) => {
        setProductData(prevData => ({
            ...prevData,
            enable: event.target.checked
        }));
    }

    const handleNumberChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
    
        setProductData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue ? parseFloat(fieldValue) : 0 
        }));
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        if (Object.keys(errors).length > 0) {
            alert("Faltan datos");
            return;
        } 
        try{
            const response = await axios.post(URL_PRODUCT, productData)
            if (response.status === 201) {
                alert("Tu producto se guardó correctamente");
                setProductData({
                    name: "",
                    color: "",
                    priceEfectivo: 0,
                    priceCuotas: 0,
                    size: "",
                    quantity: 0,
                    photo: "",
                    supplier: "",
                    enable: false,
                    Categories: []
                })
            }else{
                throw new Error("soy el new error: Error al guardar tu producto")
            }
        }catch(error){
            console.error("soy el catch: Error al guardar tu producto: ", error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type='text' placeholder='Ingrese el nombre del producto' id='name' name='name' value={productData.name} onChange={handleChange}/> 
                </label>
                <br />
                <label>
                    Color:
                    <input type='text' placeholder='Ingrese el/los color/es' id='color' name='color' value={productData.color} onChange={handleChange}/>
                </label>
                <br />
                <label>
                    Precio efectivo:
                    <input type='number' placeholder='Ingrese el precio en efectivo' id='priceEfectivo' name='priceEfectivo' value={productData.priceEfectivo} onChange={handleNumberChange}/>
                </label>
                <br />
                <label>
                    Precio cuotas:
                    <input type='number' placeholder='Ingrese el precio en cuotas' id='priceCuotas' name='priceCuotas' value={productData.priceCuotas} onChange={handleNumberChange}/>
                </label>
                <br />
                <label>
                    Talle:
                    <input type='text' placeholder='Ingrese el/los talle/s' id='size' name='size' value={productData.size} onChange={handleChange}/> 
                </label>
                <br />
                <label>
                    Cantidad:
                    <input type='number' placeholder='Ingrese el stock disponible' id='quantity' name='quantity' value={productData.quantity} onChange={handleNumberChange}/>
                </label>
                <br />
                <label>
                    Fábrica:
                    <input type='text' placeholder='Ingrese la fábrica del producto' id='supplier' name='supplier' value={productData.supplier} onChange={handleChange}/> 
                </label>
                <br />
                <label>
                    Habilitar producto:
                    <input type='checkbox' id='enable' name='enable' checked={productData.enable} onChange={handleEnableChange}/>
                </label>
                <br />
                <label>
                    Categorías a las que pertenece:
                    <select size="5" multiple value={productData.Categories} onChange={handleCategoriesChange}>
                        {Categories.map((c) => {
                            return <option key={c.id} value={c.id}>{c.name}</option>
                        })}
                    </select>
                </label>
                <br />
                <label>
                    Imagen del producto:
                    <AddingImages setProduct={setProductData} productData={productData} />
                </label>
                
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    )
}

export default CreateProduct;