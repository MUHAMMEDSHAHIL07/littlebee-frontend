import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "../../pages/Notfound";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


    const handleLogout = () => {
    axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true })
      .then(() => {
        setUserName(null);
        navigate("/admin-login");
      })
      .catch(() => {
        setUserName(null);
        navigate("/admin-login");
      });
  };



  return (
    <div>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-20 p-3 bg-blue-600 rounded-full shadow-lg focus:outline-none xl:hidden"
          onClick={toggleMenu}
        >
        <FaBars className="text-2xl text-white" />
        </button>
      )}
      <div
        className={`bg-gray-900 text-white flex flex-col p-6 h-screen w-64 fixed top-0 left-0 z-10 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl xl:hidden"
          onClick={toggleMenu}
        >
          <FaTimes />
        </button>

        <div className="text-2xl font-bold text-gray-100 mt-10 ml-9" ><p className="text-3xl font-serif italic text-white-700">Little Bee</p></div>
        <nav className="mt-10 w-full text-center">
          <ul className="text-lg font-semibold space-y-6">
            <li className="hover:text-blue-400 transition-all cursor-pointer" onClick={() => navigate("/admin")}>Dashboard</li>
            <li className="hover:text-blue-400 transition-all cursor-pointer" onClick={() => navigate("/productlist")}>Products</li>
            <li className="hover:text-blue-400 transition-all cursor-pointer" onClick={() => navigate("/user")}>Users</li>
            <li
              className="bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition-all cursor-pointer"
              onClick={() => {
                 handleLogout();
                navigate("/admin-login");
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;