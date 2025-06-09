import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextCart } from "../App";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserName } = useContext(ContextCart);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      setUserName({ role: "admin" });


      toast.success("Admin login successful");
      navigate("/admin");
    } catch (err) {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-6 font-bold text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
