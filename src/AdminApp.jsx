import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import isAuthenticated from "./Firebase/checkAuth";
import { useDispatch } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import logo2 from "/logo2.png";
import SideBarDashboard from "./components/SideBarDashboard";

function AdminApp() {
  const dispatch = useDispatch()

  useEffect(() => {
    isAuthenticated(dispatch); // Check authentication on component mount
  }, []);
  
  return (
   
    <div className="max-w-screen-2xl xl:px-28 px-4 w-full top-0 left-0 right-0 mx-auto">
         <a href="/admin" >
            <img src={logo2} alt="" width="300px"/>
        </a>
        <Typography variant="h2" color="black">
            [Sección administrativa]
        </Typography>
        <hr/>
        <br />
        <div className="flex h-screen">
      {/* Barra lateral */}
      <SideBarDashboard />
    
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-10">
        <Outlet />
      </div>
    </div>
    </div>
  );
}

export default AdminApp;