import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("/assets/background.png")`,
      }}
    >
      <div className="text-center">
        <motion.h1
          className="text-5xl font-bold text-blue-600 drop-shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 3, ease: "easeOut" }} 
        >
          Welcome to{" "}
          <span className="text-black italic font-extrabold">Little Bee</span>
        </motion.h1>


        <motion.button
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 20 }} 
          transition={{ duration: 3, ease: "easeOut" }} 
          onClick={() => navigate("/shop")}
        >
          Shop Now
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
