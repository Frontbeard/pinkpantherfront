import React from 'react'
import AddingImages from './AddingImages';
import axios from "axios";
import { useState, useEffect } from 'react';
import validation from './validation';

// const URL_PRODUCT =  "https://pinkpanther-backend-ip0f.onrender.com/product";
 const URL_PRODUCT = "http://localhost:3001/product" 
const URL_CATEGORIES = "https://pinkpanther-backend-ip0f.onrender.com/categories";
/* const URL_CATEGORIES="http://localhost:3001/categories" */


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
    const [errors, setErrors] = useState({});

    useEffect( () => {
        axios.get(URL_CATEGORIES)
        .then( ({ data }) => {
            setCategories(data)
        })
        .catch(error => console.error(error));
    }, []);

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
    
        setProductData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue 
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: validation({ ...productData, [fieldName]: fieldValue })[fieldName]
        }));
    }

    const handleCategoriesChange = (event) => {
        const selectedCategories = Array.from(event.target.selectedOptions, option => option.value);
        setProductData(prevData => ({
            ...prevData,
            Categories: selectedCategories
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            Categories: validation({ ...productData, Categories: selectedCategories }).Categories
        }));
    }

    const handleEnableChange = (event) => {
        const fieldValue = event.target.checked;
        setProductData(prevData => ({
            ...prevData,
            enable: fieldValue
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            enable: validation({ ...productData, enable: fieldValue }).enable
        }));
    }

    const handleNumberChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = parseFloat(event.target.value);
    
        setProductData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue 
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: validation({ ...productData, [fieldName]: fieldValue })[fieldName]
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validation(productData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(URL_PRODUCT, productData);
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
                    });
                } else {
                    throw new Error("Error al guardar tu producto");
                }
            } catch (error) {
                console.error("Error al guardar tu producto: ", error);
            }
        } else {
            alert("Faltan datos o hay errores en el formulario");
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type='text' placeholder='Ingrese el nombre del producto' id='name' name='name' value={productData.name} onChange={handleChange}/> 
                    {errors.name && <span>{errors.name}</span>}
                </label>
                <br />
                <label>
                    Color:
                    <input type='text' placeholder='Ingrese el/los color/es' id='color' name='color' value={productData.color} onChange={handleChange}/>
                    {errors.color && <span>{errors.color}</span>}
                </label>
                <br />
                <label>
                    Precio efectivo:
                    <input type='number' placeholder='Ingrese el precio en efectivo' id='priceEfectivo' name='priceEfectivo' value={productData.priceEfectivo} onChange={handleNumberChange}/>
                    {errors.priceEfectivo && <span>{errors.priceEfectivo}</span>}
                </label>
                <br />
                <label>
                    Precio cuotas:
                    <input type='number' placeholder='Ingrese el precio en cuotas' id='priceCuotas' name='priceCuotas' value={productData.priceCuotas} onChange={handleNumberChange}/>
                    {errors.priceCuotas && <span>{errors.priceCuotas}</span>}
                </label>
                <br />
                <label>
                    Talle:
                    <input type='text' placeholder='Ingrese el/los talle/s' id='size' name='size' value={productData.size} onChange={handleChange}/> 
                    {errors.size && <span>{errors.size}</span>}
                </label>
                <br />
                <label>
                    Cantidad:
                    <input type='number' placeholder='Ingrese el stock disponible' id='quantity' name='quantity' value={productData.quantity} onChange={handleNumberChange}/>
                    {errors.quantity && <span>{errors.quantity}</span>}
                </label>
                <br />
                <label>
                    Fábrica:
                    <input type='text' placeholder='Ingrese la fábrica del producto' id='supplier' name='supplier' value={productData.supplier} onChange={handleChange}/> 
                    {errors.supplier && <span>{errors.supplier}</span>}
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
                    {errors.Categories && <span>{errors.Categories}</span>}
                </label>
                <br />
                <label>
                    Imagen del producto:
                    <AddingImages setProduct={setProductData} productData={productData} />
                    {errors.photo && <span>{errors.photo}</span>}
                </label>
                
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    )
}

export default CreateProduct;
