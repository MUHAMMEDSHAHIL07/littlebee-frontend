import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ContextCart } from "../../App";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const {conCart,userName,setUserName}=useContext(ContextCart)
  
  useEffect(() => {
    if (userName) {
      axios
        .get("http://localhost:5000/api/user/me",{ withCredentials: true })
        .then((response) => {
          setUserName(response.data.data)
        })
        .catch((error) => console.log(error));
    }
  }, [userName?._id, setUserName]);

const handleLogout = () => {
  axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true })
    .then(() => {
      setUserName(null);
      localStorage.removeItem("role");
      navigate("/login");
    })
    .catch(() => {
      setUserName(null);
      localStorage.removeItem("role");
      navigate("/login");
    });
};



  return (
    <nav className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section (Logo & Menu Button) */}
        <div className="flex items-center w-full md:w-auto justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 text-2xl focus:outline-none md:hidden mr-3"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            <p className="text-2xl font-serif italic text-blue-700 hover:text-blue-800 transition-colors duration-200 font-bold">
              Little Bee
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-gray-700 font-semibold">
          <li className="hover:text-blue-500 transition-colors duration-200">
            <Link to="/">HOME</Link>
          </li>
          <li 
            className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/shop", { state: { value: "Boys" } })}
          >
            BOYS
          </li>
          <li 
            className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/shop", { state: { value: "Girls" } })}
          >
            GIRLS
          </li>
          <li 
            className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/shop", { state: { value: "Toys" } })}
          >
            TOYS
          </li>
          <li 
            className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/shop")}
          >
            ALL PRODUCTS
          </li>
        </ul>

        {/* User Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {userName ? (
            <>
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors duration-200"
                >
                  <FaUser />
                  <span className="font-semibold">{userName.name}</span> {/* Always show username */}
                  <FaCaretDown className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <Link 
                      to="/OrderList"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Order Details
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-500 transition-colors duration-200"
                      onClick={() => {
                        handleLogout();
                        navigate("/login");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-gray-700 text-xl sm:text-2xl hover:text-blue-500 transition-colors duration-200" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full px-1.5 py-0.5">
                  {conCart}
                </span>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <span className="text-white font-semibold bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base">
                Login/Register
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md mt-4 py-4 absolute left-0 w-full z-10">
          <ul className="flex flex-col items-center space-y-4 text-gray-700 font-semibold">
            <li className="hover:text-blue-500 transition-colors duration-200">
              <Link to="/" onClick={() => setIsOpen(false)}>HOME</Link>
            </li>
            <li 
              className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                navigate("/shop", { state: { value: "Boys" } });
                setIsOpen(false);
              }}
            >
              BOYS
            </li>
            <li 
              className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                navigate("/shop", { state: { value: "Girls" } });
                setIsOpen(false);
              }}
            >
              GIRLS
            </li>
            <li 
              className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                navigate("/shop", { state: { value: "Toys" } });
                setIsOpen(false);
              }}
            >
              TOYS
            </li>
            <li 
              className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                navigate("/shop");
                setIsOpen(false);
              }}
            >
              ALL PRODUCTS
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
