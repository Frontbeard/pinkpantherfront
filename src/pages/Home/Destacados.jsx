import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import getAllCategories from "../../redux/actions/Category/getAllCategories"; // Asegúrate de importar la acción correcta

const Destacados = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.allCategories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const newInCategory = Array.isArray(allCategories)
    ? allCategories.find((category) => category.name === "new in")
    : null;

  const newInProducts = newInCategory ? newInCategory.products : [];

  return (
<div className="destacados-container mt-8 flex flex-col items-center">
    <h2 className="text-2xl font-bold mb-4">Productos destacados</h2>
    <div className="grid grid-cols-3 gap-4 justify-center items-center">
        {newInProducts.map(product => (
            <div key={product.id} className="flex justify-center">
                <Card filteredItems={product} />
            </div>
        ))}
    </div>
</div>

  );
};

export default Destacados;
