import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryById } from "../redux/actions/Category/getCategoryById";
import Card from "./Card";
import { useParams } from 'react-router-dom';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.allCategories);
  console.log(categorias);
  const { categoryId } = useParams(); // Obtiene el ID de la categoría desde la URL

  useEffect(() => {
    if (categoryId) {
        dispatch(getCategoryById(categoryId));
    }
  }, []);

  const selectedCategory = categorias && Array.isArray(categorias) // Verificar que categorias sea un array
    ? categorias.find(category => category.id === categoryId)
    : null; // Obtener la categoría seleccionada

  // Filtrar productos basados en la categoría seleccionada
  const productosFiltrados = selectedCategory?.products || []; // Usar la categoría seleccionada para obtener los productos

  console.log(productosFiltrados, 'productos filtrados por categorias');

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-6 mb-5">
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap card-container">
          {productosFiltrados.length > 0 ? (
            <Card filteredItems={productosFiltrados} />
          ) : (
            <p>No hay productos disponibles para esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
