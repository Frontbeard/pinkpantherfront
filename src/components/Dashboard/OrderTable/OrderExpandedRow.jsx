import React from 'react'

//muestra los detalles de los productos en una orden expandida
const OrderExpandedRow = ({ products }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Productos</h3>
      <div>
        {products.map((product) => (
          <div className="border border-gray-200 rounded-lg p-4 mb-4" key={product.id}>
            <div className="flex items-center mb-2">
              <div className="flex-1 mr-4">
                <p className="font-bold">Nombre</p>
                <p>{product.name}</p>
              </div>
              <div>
                <img alt={product.name} src={product.photo} className="w-20 h-auto" />
              </div>
            </div>
            <div className="flex items-center mb-2">
             
              <div className="mr-4">
                <p className="font-bold">Cant.</p>
                <p>{product.quantity}</p>
              </div>
              <div className="mr-4">
                <p className="font-bold">Precio x unidad</p>
                <p>${product.price}</p>
              </div>
              <div>
                <p className="font-bold">Total</p>
                <p>${product.price * product.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderExpandedRow;
