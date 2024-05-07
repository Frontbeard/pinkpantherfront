import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import CreateProduct from './formCreateProduct/CreateProduct';

import Resumen from './Dashboard/Panel/Resumen';
import ProductsTable from './Dashboard/ProductsTable/ProductsTable';
import OrdersTable from './Dashboard/OrderTable/OrderTable';
import UsersTable from './Dashboard/UsersTable/UsersTable';


const SideBarDashboard = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isLatop = useMediaQuery({ minWidth: 769 });
  
    const items = [
      {
        key: '1',
        icon: '👤',
        label: 'Usuarios',
        path: '/admin/user',
        element: <UsersTable/>,
      },
      {
        key: '2',
        icon: '🛒',
        label: 'Productos',
        path: '/admin/products',
        element: <ProductsTable/>
      },
      {
        key: '3',
        icon: '🛍️',
        label: 'Ordenes de compra',
        path: '/admin/orders',
        element: <OrdersTable/>,
      },
      {
        key: '4',
        icon: '➕',
        label: 'Crear producto',
        onClick: () => navigate('/admin/create-product'), // Redirigir al hacer clic en "Crear producto"
        element: <CreateProduct/>
      },
      {
        key: '5',
        icon: '📊',
        label: 'Resumen',
        path: '/admin/resumen',
        onClick:()=>navigate('/admin/resumen'),
        element: <Resumen/>

      },
    ];
  
    const handleMenu = (path) => {
      navigate(path);
    };
  
    return (
      <div className="flex flex-col items-center">
        <Menu as="div" className="w-64">
          <div className="px-2 py-3 space-y-1">
            {items.map((item) => (
              <Menu.Item key={item.key}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                    } flex justify-start items-center w-full px-2 py-2 text-sm font-medium rounded-md`}
                    onClick={() => (item.onClick ? item.onClick() : handleMenu(item.path))}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu>
        {!isMobile && (
          <div className="fixed bottom-4 right-4">
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-700"
              onClick={() => handleMenu('/admin')}
            >
              📊
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default SideBarDashboard;
