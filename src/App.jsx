import React, { createContext, useEffect, useState } from "react";
import {BrowserRouter as Router,Routes,Route,useLocation,Navigate} from "react-router-dom";
import axios from "axios";
import Home from "./components/Home/Home";
import BestSellers from "./components/BestSell/BestSellers";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Productpage from "./pages/Productpage";
import Cart from "./pages/Cart";
import PaymentForm from "./pages/PaymentForm";
import OrderList from "./pages/orderlist";
import BuyNowDetails from "./pages/BuyNowDetails";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./pages/adminLogin";
import ProductList from "./components/admin/ProductList";
import Dashboard from "./components/admin/Dashboard";
import ViewProduct from "./components/admin/ViewProduct";
import EditProduct from "./components/admin/EditProduct";
import ProductAdd from "./components/admin/ProductAdd";
import ViewUser from "./components/admin/ViewUser";
import Notfound from "./pages/Notfound";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/Notfound";

export const ContextCart = createContext();

const AppContent = () => {
  const location = useLocation();
  const [conCart, setConCart] = useState(0);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/me", { withCredentials: true })
      .then(res => {
        const user = res.data.data;
        setUserName(user);
        return axios.get("http://localhost:5000/api/user/cartcount", { withCredentials: true });
      })
      .then(res => setConCart(res.data.count))
      .catch(() => {
        setUserName(null);
        setConCart(0);
      });
  }, []);

  const providerValue = { conCart, setConCart, userName, setUserName };

  const hideNavbarPaths = ["/admin", "/productlist", "/user", "/add","/*"];
  const hideFooterPaths = [
    "/signup", "/login", "/cart", "/OrderList",
    "/admin", "/error", "/shop", "/productlist",
    "/user", "/add", "/buynowdetails",
  ];

  return (
    <ContextCart.Provider value={providerValue}>
      {!hideNavbarPaths.some(path => location.pathname.includes(path)) &&
        !location.pathname.startsWith("/payment") &&
        <Navbar />}
      
      <Routes>
        {/* Home route – admin redirected */}
        <Route
          path="/"
          element={
            userName?.role === "admin" ? (
              <Notfound />
            ) : (
              <>
                <Home />
                <BestSellers />
              </>
            )
          }
        />

        {/* Shop route – admin redirected */}
        <Route
          path="/shop"
          element={
            userName?.role === "admin" ? (
              <NotFound />
            ) : (
              <Shop />
            )
          }
        />

        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Productpage />} />

        {/* User-only protected routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <PaymentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/OrderList"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buynowdetails"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <BuyNowDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/productlist"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ViewUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ProductAdd />
            </ProtectedRoute>
          }
        />

        {/* Not found */}
        <Route path="*" element={<Notfound />} />
      </Routes>

      <ToastContainer />
      {!hideFooterPaths.some(path => location.pathname.includes(path)) &&
        !location.pathname.startsWith("/payment") &&
        <Footer />}
    </ContextCart.Provider>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
