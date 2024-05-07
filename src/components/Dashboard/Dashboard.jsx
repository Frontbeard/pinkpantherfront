import { useLocation } from "react-router";
// import SideBarDashboard from "../SideBarDashboard";
import SideBarDashboard from "./../SideBarDashboard";
import UsersTable from "./UsersTable/UsersTable";
import ProductsTable from "./ProductsTable/ProductsTable";
import CreateProduct from "../formCreateProduct/CreateProduct";
import OrdersTable from "./OrderTable/OrderTable";
import Panel from "./Panel/Panel";

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <SideBarDashboard />
    
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-10">
        {location.pathname === "/admin" && <Panel/>}
        {location.pathname === "/admin/usuarios" && <UsersTable />}
        {location.pathname === "/admin/products" && <ProductsTable />}
        {location.pathname === "/admin/ordenes" && <OrdersTable/>}
        {location.pathname === "/admin/crear-producto" && <CreateProduct/>}
      </div>
    </div>
  );
};

export default Dashboard;
