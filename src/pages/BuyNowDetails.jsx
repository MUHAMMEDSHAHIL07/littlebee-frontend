import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextCart } from "../App";

const BuyNowDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, setConCart } = useContext(ContextCart);

  const product = location.state?.product;

  const [paymentMethod, setPaymentMethod] = useState("cod"); 
  const [loading, setLoading] = useState(false);

  if (!product) {
    navigate("/");
    return null;
  }

  const placeOrder = async () => {
    if (!userName) {
      toast.error("Please login first");
      navigate("/login"); 
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

if (paymentMethod === "razorpay") {
  try {
    const razorpayRes = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount: product.price },
      { withCredentials: true }
    );

    const { id: order_id, amount, currency } = razorpayRes.data;

    const options = {
      key: "rzp_test_l1qT8fmcI3x6pw",
      amount,
      currency,
      name: "Little Bee",
      description: "Purchase Product",
      order_id,
      handler: async function (response) {
        
        const orderData = {
          items: [
            {
              productId: product._id,
              quantity: 1,
              price: product.price,
            },
          ],
          paymentMethod: "Razorpay",
        };

        await axios.post("http://localhost:5000/api/user/order", orderData, {
          withCredentials: true,
        });

        toast.success("Order placed !");
        navigate("/");
      },
      prefill: {
        name: userName.name,
        email: userName.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    toast.error(err.message);
  }

  return;
}


    try {
      setLoading(true);

      const orderData = {
        items: [
          {
            productId: product._id,
            quantity: 1,
            price: product.price,
          },
        ],
        paymentMethod: "cod",
        userId: userName._id,
      };

      const response = await axios.post(
        "http://localhost:5000/api/user/order",
        orderData,
        { withCredentials: true }
      );

      toast.success("Order placed!");
      setConCart((prev) => (prev > 0 ? prev - 1 : 0)); 
      navigate("/"); 

    } catch (error) {
      const msg = error.response?.data?.message || "Failed to place order";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-30">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Order</h2>

      <div className="mb-6">
        <h3 className="text-xl font-medium">{product.name}</h3>
        <p>Price: ₹{product.price}</p>
        <p>Category: {product.category}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Select Payment Method:</h4>
        <label className="inline-flex items-center mr-6 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
            className="form-radio"
          />
          <span className="ml-2">Cash on Delivery (COD)</span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="razorpay"
            checked={paymentMethod === "razorpay"}
            onChange={() => setPaymentMethod("razorpay")}
            className="form-radio"
          />
          <span className="ml-2">Razorpay</span>
        </label>
      </div>

      <button
        disabled={loading}
        onClick={placeOrder}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default BuyNowDetails;
