import React from 'react';
import { getColorName } from '../../utils/getColorName';
import { URL_LINK } from '../../../URL'

//se encarga de mostrar los detalles de los productos asociados a una orden.
const OrderExpandedRow = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL_LINK}/product`); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h3 className="mb-4 text-xl">Productos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-4">
              <p className="text-center font-bold mb-2">Nombre</p>
              <p className="text-center">{product.name}</p>
            </div>
            <div className="p-4">
              <div className="flex justify-center">
                <img
                  alt={product.name}
                  src={product.photo && product.photo}
                  className="w-20 h-20 object-cover"
                />
              </div>
            </div>
            <div className="p-4">
              <p className="text-center font-bold mb-2">Color</p>
              <p className="text-center">{getColorName(product.color)}</p>
            </div>
            <div className="p-4">
              <p className="text-center font-bold mb-2">Cant.</p>
              <p className="text-center">{product.quantity}</p>
            </div>
            <div className="p-4">
              <p className="text-center font-bold mb-2">Precio x unidad</p>
              <p className="text-center">${product.price}</p>
            </div>
            <div className="p-4">
              <p className="text-center font-bold mb-2">Total</p>
              <p className="text-center">${product.price * product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderExpandedRow;
