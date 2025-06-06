import React, { createContext,useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import BestSellers from "./components/BestSell/BestSellers";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Productpage from "./pages/Productpage";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import PaymentForm from "./pages/PaymentForm";
import OrderList from "./pages/orderlist";
import AdminDashboard from "./components/admin/AdminDashboard";
import Notfound from "./pages/Notfound";
import ProductList from "./components/admin/ProductList";
import Dashboard from "./components/admin/Dashboard";
import ViewProduct from "./components/admin/ViewProduct";
import EditProduct from "./components/admin/EditProduct";
import ProductAdd from "./components/admin/ProductAdd";
import ViewUser from "./components/admin/ViewUser";
// import UserOrder from "./components/admin/UserOrder";
import axios from "axios";
import AdminLogin from "./pages/adminLogin";
import BuyNowDetails from "./pages/BuyNowDetails";

export const ContextCart = createContext()

const AppContent = () => {
  const location = useLocation();
  const [conCart,setConCart]=useState(0)
  const [userName,setUserName]=useState(null)
  
useEffect(() => {
  axios.get("http://localhost:5000/api/user/me", { withCredentials: true })
    .then((res) => {
      const user = res.data.data;
      setUserName(user);
      axios.get("http://localhost:5000/api/user/cartcount", { withCredentials: true })
        .then((res) => {
          setConCart(res.data.count);
        })
        .catch((err) => {
          setConCart(0); 
        });
    })
    .catch((err) => {
      setUserName(null); 
      setConCart(0);      
    });
}, []);

  const providerValue={conCart,setConCart,userName,setUserName}
  const hidenavbarPaths = ["/admin", "/productlist", "/user", "/add"];
  const hideFooterPaths = ["/signup", "/login", "/cart", "/OrderList", "/admin", "error", "shop", "/productlist", "/user", "/add","/buynowdetails"];

  return (
    <>
    <ContextCart.Provider value={providerValue}>
      {!hidenavbarPaths.some(path => location.pathname.includes(path)) &&
        !location.pathname.startsWith("/payment") && <Navbar />}
        <Routes>
          <Route path="/" element={<><Home /><BestSellers /></>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment/:id" element={<PaymentForm />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/buynowdetails" element={<BuyNowDetails  />} />

                     {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/product/:id" element={<ViewProduct />} />
          <Route path="/admin/product/edit/:id" element={<EditProduct />} />
          <Route path="/user" element={<ViewUser />} />
          {/* <Route path="userorder/:id" element={<UserOrder />} /> */}
          <Route path="/add" element={<ProductAdd />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </ContextCart.Provider>

      <ToastContainer />
      {!hideFooterPaths.some(path => location.pathname.includes(path)) &&
        !location.pathname.startsWith("/payment") && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
