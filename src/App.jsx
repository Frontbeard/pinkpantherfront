import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import isAuthenticated from "./Firebase/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { AdminLinks } from "./components/AdminLinks";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    isAuthenticated(dispatch); // Check authentication on component mount
  }, []);

  const customer = useSelector(state => state.userData);
  
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar /> 
        <div className="flex-grow">
          <Outlet />
        </div>
          <Footer />
      </div>
      {localStorage.getItem('firebaseUid') && customer.role === "ADMIN" && (
        <div>
          <AdminLinks/>
        </div>
      )}
    </div>
  );  
}

export default App;
