import React from "react";
import { Formik, Form } from "formik";
import CreateProduct from "../formCreateProduct/CreateProduct";
import CreateProductSchema from "../formCreateProduct/CreateProduct.schema";

const EditProductModal = ({ visible, onClose, product }) => {
    
  const initialValues = {
    id: product.id,
    name: product.name,
    color: product.color,
    priceEfectivo: product.priceEfectivo,
    priceCuotas: product.priceCuotas,
    photo: product.photo,
    Categories: product.Categories,
    size: product.size,
    quantity: product.quantity,
    supplier: product.supplier,
    enable: product.enable
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${visible ? 'block' : 'hidden'}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className={`fixed inset-0 transition-opacity ${visible ? 'ease-out duration-300 opacity-100' : 'ease-in duration-200 opacity-0'}`}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>•

        <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${visible ? 'ease-out duration-300 translate-y-4 sm:translate-y-0 sm:scale-100' : 'ease-in duration-200 translate-y-20 sm:translate-y-0 sm:scale-95'}`}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Editar producto {product.name}</h3>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
                <CreateProduct initialValues={initialValues} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
