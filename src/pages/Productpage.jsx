import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; 
import { ContextCart } from "../App";
const Productpage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const {userName,setConCart}=useContext(ContextCart)


  useEffect(() => {
    axios
      .get(`https://littlebee-backend.onrender.com/api/user/product/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [id]);
  
  const addToCart = () => {
     if(!userName){
     toast.error("please login")
     navigate("/login")
     }
  const cartData = {
    userId: userName._id,
    Productid: data._id,
  }
  axios.post("https://littlebee-backend.onrender.com/api/user/addtocart",cartData,{withCredentials:true})
   .then((response) => {
      toast.success("Product added to cart")
      setConCart((prev) => prev + 1);
    })
     .catch((error) => {
      const msg = error.response?.data?.message || "Failed to add to cart";
      toast.error(msg);
    });
   ;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-6 shadow-lg rounded-2xl bg-white flex flex-col md:flex-row items-center gap-6">
        <img
          src={data.image}
          alt="Product"
          className="w-full md:w-80 h-80 object-cover rounded-lg"
        />
        
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{data.name}</h2>
          <p className="text-lg font-medium text-gray-600">Gender: {data.gender}</p>
          <p className="text-lg font-medium text-gray-600">Category: {data.category}</p>
          <p className="text-xl font-bold text-red-600">Amount: ₹{data.price}</p>
          
          <button
            className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
            onClick={addToCart}
          >
            Add to Cart 
          </button>
      <button 
  className="w-full md:w-auto bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-300 transition-all"
  onClick={() => navigate("/buynowdetails", { state: { product: data } })}
>
  Buy Now
</button>

        </div>
      </div>
    </div>
  );
};

export default Productpage;
