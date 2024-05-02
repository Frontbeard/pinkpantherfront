import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PencilAltIcon } from '@heroicons/react/outline';
import EditProductModal from '../../EditProductModal/EditProductModal';
import  { getAllProducts } from "../../../redux/actions/Product/getAllProducts"
import { updateProduct } from '../../../redux/actions/Product/updateProduct';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProductsAdmin);
  const accessToken = useSelector((state) => state.accessToken);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productUpdate, setProductUpdate] = useState({});

  useEffect(() => {
    dispatch(getAllProducts(accessToken));
  }, [dispatch, accessToken]);


  const sortedProducts = products?.sort((a, b) => a.name.localeCompare(b.name));

  const handleActive = async (value, product) => {
    try {
      const response = await dispatch(
        updateProduct(
          {
            id: product.id,
            name: product.name,
            priceEfectivo: product.priceEfectivo,
            priceCuotas: product.priceCuotas || product.priceEfectivo,
            photo: product.photo,
            category: product.category,
            stock: product.stock,
            estado: value,
          },
          accessToken
        )
      );
      if (response && response.message === 'Producto editado correctamente') {
        dispatch(getAllProducts(accessToken));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {productUpdate && showEditModal && (
        <EditProductModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          product={productUpdate}
        />
      )}
      {sortedProducts.map((product, index) => (
        <div key={index} className="border-b-2 border-gray-200 py-4 flex items-center">
          <img src={product.image} className="w-16 h-16 mr-4" alt="Product" />
          <div className="flex flex-col flex-grow">
            <p className="font-bold text-lg mb-1">{product.name}</p>
            <p className="text-sm">Unidades Vendidas: {product.unitsSold}</p>
          </div>
          <div className="flex items-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2"
              onClick={() => {
                setShowEditModal(true), setProductUpdate(product);
              }}
            >
              <PencilAltIcon className="h-4 w-4" />
            </button>
            <label htmlFor={`toggle-${product.id}`} className="flex items-center cursor-pointer">
              <input
                id={`toggle-${product.id}`}
                type="checkbox"
                className="hidden"
                checked={product.active}
                onChange={() => handleActive(!product.active, product)}
              />
              <span className={`relative inline-block w-10 h-6 rounded-full ${product.active ? 'bg-green-500' : 'bg-gray-400'}`}>
                <span
                  className={`absolute inset-0 w-4 h-4 m-1 rounded-full transition-transform duration-300 ${
                    product.active ? 'transform translate-x-full bg-white' : 'bg-white translate-x-0'
                  }`}
                ></span>
              </span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsTable;
