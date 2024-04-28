import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from "../../src/redux/actions/Product/getAllProducts";
import Card from "./Card";

const ProductFilter = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.allproducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-12">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12">
        <Card filteredItems={allProducts} />
      </div>
    </div>
  );
};

export default ProductFilter;
