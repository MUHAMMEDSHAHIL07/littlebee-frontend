import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/login", { email, password }, { withCredentials: true });
      navigate("/admin");
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };
   useEffect(()=>{
    axios.get("http://localhost:5000/api/user/me",{withCredentials:true})
    .then((res)=>setUserId(res.data.user))
    .catch((err)=>console.log("the fetching error",+err))
  },[])

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