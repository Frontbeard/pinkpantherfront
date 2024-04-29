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
    dispatch(getCategoryById(categoryId)); // Pasa el ID de la categoría a la acción
  }, [dispatch, categoryId]); // Agrega categoryId como dependencia

  // Filtrar productos basados en la categoría seleccionada
  // Filtrar productos basados en la categoría seleccionada
const productosFiltrados = categorias && categorias.length > 0
? categorias.find(categoria => categoria.name === categoryId)?.products || []
: [];


  console.log(productosFiltrados, 'productos filtrados por categorias');

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12">
        <Card filteredItems={productosFiltrados} />
      </div>
    </div>
  );
};

export default ProductFilter;
