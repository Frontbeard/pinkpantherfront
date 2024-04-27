import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Artwork Tee',
    href: '#',
    price: '$32.00',
    color: 'Mint',
    size: 'Medium',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg',
    imageAlt: 'Front side of mint cotton t-shirt with wavey lines pattern.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Charcoal',
    inStock: false,
    leadTime: '7-8 years',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: 'Front side of charcoal cotton t-shirt.',
  },
  // More products...
];

export default function Example() {
  const [cart, setCart] = useState(products.map(product => ({ ...product, quantity: 1 })));

  const incrementQuantity = (productId) => {
    setCart(cart.map(item => item.id === productId ? { ...item, quantity: Math.min(item.quantity + 1, item.inStock ? Infinity : 1) } : item));
  };

  const decrementQuantity = (productId) => {
    setCart(cart.map(item => item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item));
  };

  const removeProduct = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mi carrito de compras</h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items en tu carrito de compras
            </h2>

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
                        <button type="button" onClick={() => decrementQuantity(item.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500" disabled={!item.inStock || item.quantity === 1}>
                          <span>-</span>
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => incrementQuantity(item.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500" disabled={!item.inStock || item.quantity === 1}>
                          <span>+</span>
                        </button>
                      </div>
                      <button type="button" onClick={() => removeProduct(item.id)} className="ml-4 text-sm font-medium text-red-600 hover:text-red-500">
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Resúmen del pedido
            </h2>

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
                type="submit"
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
  )
}
