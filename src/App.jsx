import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import isAuthenticated from "./Firebase/checkAuth";

function App() {
  useEffect(() => {
    isAuthenticated(); // Check authentication on component mount
  }, []);
  
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar /> 
        <div className="flex-grow">
          <Outlet />
        </div>
          <Footer />
      </div>
    </div>
  );
}

export default App;
