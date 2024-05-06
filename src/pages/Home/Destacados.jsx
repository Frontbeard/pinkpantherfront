import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import  getAllCategories from "../../redux/actions/Category/getAllCategories"; // Asegúrate de importar la acción correcta


const Destacados = () => {
    const dispatch = useDispatch();
    const allCategories = useSelector(state => state.allCategories);
    useEffect(() => {
        dispatch(getAllCategories()); 
    }, [dispatch]);

    const newInCategory = Array.isArray(allCategories) ? allCategories.find(category => category.name === "new in") : null; 

    const newInProducts = newInCategory ? newInCategory.products : [];

    return (
        <div className="destacados-container">
            <h2>Productos Destacados</h2>
            <div className="card-container">
                {newInProducts.map(product => (
                    <Card key={product.id} filteredItems={product} />
                ))}
            </div>
        </div>
    );
};

export default Destacados;
