import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isAuthenticated from '../Firebase/checkAuth';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const firebaseUid = useSelector(state => state.auth.firebaseUid);
  const userCart = useSelector((state) => state.Cart) 
  const userData = useSelector((state) => state.userData)

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/cart/${firebaseUid}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error al obtener el carrito del usuario:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post('/cart/create', { customerId: firebaseUid, productId });
      fetchCart();
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/${firebaseUid}/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await axios.put('/cart/update', { customerId: firebaseUid, productId, quantity });
      fetchCart();
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    }
  };

  useEffect(() => {
    isAuthenticated(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (firebaseUid) {
      fetchCart();
    }
  }, [firebaseUid]);

  const handleCheckout = async () => {
    try {
      if (cart.length === 0) {
        console.error('No puedes realizar el pago porque tu carrito está vacío.');
        return;
      }

      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?customerId=${firebaseUid}`;
    } catch (error) {
      console.error('Error realizando el pago:', error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mi carrito de compras</h2>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h3 id="cart-heading" className="sr-only">Items en tu carrito de compras</h3>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a href={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                            {item.name}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <div className="flex items-center space-x-2">
                        <button type="button" onClick={() => updateCartItem(item.id, item.quantity + 1)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500" disabled={!item.inStock}>
                          <span>+</span>
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateCartItem(item.id, item.quantity - 1)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500" disabled={!item.inStock || item.quantity === 1}>
                          <span>-</span>
                        </button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="ml-4 text-sm font-medium text-red-600 hover:text-red-500">
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="summary-heading" className="mt-10">
            <h3 id="summary-heading" className="sr-only">Resumen del pedido</h3>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">${cart.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2)}</dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">Los gastos de envío y los impuestos se calcularán en el momento de pagar.</p>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Pagar
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>
                o{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continuar comprando
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Cart;
