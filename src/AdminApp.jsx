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
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

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
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Link to='/'>
          <Button className="text-white bg-pink-500" variant="gradient">
            Volver a la página principal
          </Button>
        </Link>
        </div>
        <hr/>
        <br />
        <div className="flex h-screen">
      <SideBarDashboard />
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-10">
        <Outlet />
      </div>
    </div>
    </div>
  );
}

export default AdminApp;