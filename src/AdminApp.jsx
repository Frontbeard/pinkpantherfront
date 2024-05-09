import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import isAuthenticated from "./Firebase/checkAuth";
import { useDispatch } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import logo2 from "/logo2.png";
import SideBarDashboard from "./components/SideBarDashboard";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function AdminApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    isAuthenticated(dispatch); // Check authentication on component mount
  }, []);

  return (
    <div className="max-w-screen-3xl xl:px-28 px-4 w-full top-0 left-0 right-0 mx-auto flex flex-col items-center justify-center pt-8">
      {" "}
      <a href="/admin" className="mb-8">
        <div className="w-64 relative overflow-hidden">
          <img
            src={logo2}
            alt=""
            className="w-full h-auto transition duration-300 transform hover:brightness-75"
          />
        </div>
      </a>
      <Link to="/">
        <button className="text-white bg-pink-300 hover:bg-pink-400 py-2 px-4 rounded-md">
          Home
        </button>
      </Link>
      <hr />
      <div className="flex h-screen w-full">
        <SideBarDashboard />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminApp;
