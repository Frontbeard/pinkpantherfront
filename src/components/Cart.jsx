import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
//import isAuthenticated from '../Firebase/checkAuth';
import axios from 'axios';
import { productbyID } from '../redux/actions/Product/productById'
import { clearCart } from '../redux/actions/Cart/clearCart'
import { removeCart } from '../redux/actions/Cart/removeCart'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { URL_LINK } from '../URL.js'
import { v5 as uuidv5 } from 'uuid'

const Cart = () => {
  // const [cart, setCart] = useState([]);
  //const firebaseUid = useSelector(state => state.auth.firebaseUid);
  // const userData = useSelector((state) => state.userData)
  
  initMercadoPago('TEST-8652b262-1637-48f5-9a78-7d596a2f9aa9', {locale: "es-AR"} );
  //initMercadoPago('TESTUSER1808861430', {locale: "es-AR"} );
  const [cartProducts, setCartProducts] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartArray = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.userData);
  //console.log(cartArray)
  
  useEffect(() => {
  const getCartProducts = async () => {
    const newCartProducts = [];
    for ( let n = 0; n < cartArray.length; n++) {
      try {
        const idp = cartArray[n]
        //console.log(id)
        const response = await dispatch(productbyID(idp));
        const product = response.payload; // Assuming the product data is in response.payload
        newCartProducts.push(product);
        //console.log(newCartProducts)
      } catch (error) {
        console.error(`Error fetching product with ID ${idp}:`, error);
      }
    }
    setCartProducts(newCartProducts);
    const totalPrice = newCartProducts.reduce((total, product) => total + product.priceCuotas, 0);
    setTotalCarrito(totalPrice);
  };
  getCartProducts();
  //console.log('cart products:', cartProducts)
  }, [cartArray, dispatch]);
  

  const handleClearCart = () => {
    //localstore.removeitem('cart') //dispatch ya se encarga de sacarla del carrito en el localstore tambien
    dispatch(clearCart())
    navigate('/')
  };

  const handleRemoveItem = (itemId) => {
    //localstore.removeitem() //dispatch ya se encarga de sacarla del carrito en el localstore tambien
    //const newCartRemove = state.cart.filter(item => item !== payload);
    //localStorage.setItem('cart', JSON.stringify(newCartRemove));
    console.log('ID desde removeItem Function:', itemId)
    dispatch(removeCart(itemId))
    navigate('/cart')
  };
  
  const handle = async (productId, quantity) => {
  };

  
  const createPreference = async () => {
    try{
      //const idempotencykey = uuidv5(`${URL_LINK}/createPreference`, uuidv5.URL)
      const idempotencykey = '123'
      const response = await axios.post(`${URL_LINK}/payment/createPreference`, {
        title: `Carrito: ${userData.id}`,
        quantity: 1,
        price: totalCarrito,
        //currency_id: "ARS"
        }, {
          headers: {
              // Specify your headers here
              //'Content-Type': 'application/json',
              //'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
              'X-Idempotency-key': idempotencykey,
              // Add more headers as needed
          }
      })
      const { idPref } = response.data
      //console.log(idPref)
      return idPref;
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const handleCheckout = async () => {
    try {
      // if (cartArray.length === 0) {
      //   console.error('No puedes realizar el pago porque tu carrito está vacío.');
      //   alert('No puedes realizar el pago porque tu carrito está vacío.');
      //   return;
      // }
      //window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?customerId=${44}`;
      const idPref = await createPreference();
      console.log('idPref:', idPref)
      if (idPref) {
        setPreferenceId(idPref)
      }
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
              {cartProducts.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.photo}
                      alt={item.id}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a href={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                            {item.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.priceCuotas)}</p>
                        <button data-item-id={item.id} onClick={() => handleRemoveItem(item.id)}>X</button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Color: {item.color.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      <p className="mt-1 text-sm text-gray-500"> Talle: {item.size}</p>
                      <p className="mt-1 text-sm text-gray-500"> Cantidad: {item.quantity}</p>
                    </div>
{/*
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
                  */}
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
                  <dt className="text-base font-medium text-gray-900">Total de la Compra:</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalCarrito)}</dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500"></p>
            </div>
 
            <div className="mt-10">
              <button
                type="button"
                onClick={handleClearCart}
                className="w-full rounded-md border border-transparent bg-white-600 px-4 py-3 text-base font-medium text-gray shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Vaciar Carrito y volver a comprar
              </button>
            </div>
            
            <div className="mt-10">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-md border border-transparent bg-pink-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Pagar
              </button>
              {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
            </div>
            <div className="mt-6 text-center text-sm">
              <p>
                o{' '}
                <a href="/" className="font-medium text-pink-600 hover:text-indigo-500">
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
