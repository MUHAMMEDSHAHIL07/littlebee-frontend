import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyNow = ({ product }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = async () => {
    if (paymentMethod === "COD") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/order",
          {
            items: [{ productId: product._id, quantity: 1 }],
            paymentMethod: "Cash on Delivery",
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          alert("Order placed successfully!");
          navigate("/thank-you");
        }
      } catch (error) {
        console.error("Order placing failed:", error);
        alert("Something went wrong while placing the order.");
      }
    } else {
      alert("Online payment not implemented yet!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Buy Now</h2>

      <div className="mb-4">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
        <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-700">Price: ₹{product.price}</p>
        <p className="text-gray-600 mt-2">{product.description}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Select Payment Method:</h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={() => setPaymentMethod("Online")}
            />
            Pay with Razorpay
          </label>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default BuyNow;
