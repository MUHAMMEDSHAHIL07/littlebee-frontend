import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { PaymentValidation } from "./PaymentValidation";

const PaymentForm = () => {
  const location = useLocation();
  const totalPrice = location.state?.price || "";
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://package-0ar8.onrender.com/user/${userId}`)
      .then((response) => {
        setCart(response.data.cart || []);
        setOrder(response.data.orders || []);
      })
      .catch((err) => console.log(err, "err"));

    if (id !== "null") {
      axios.get(`https://package-0ar8.onrender.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((err) => console.log(err, "err"));
    }
  }, [id, userId]);

  const clearCart = (userId) => {
    const updatedCart = id === "null" ? [] : cart.filter((item) => item.id !== id);
    axios.patch(`https://package-0ar8.onrender.com/user/${userId}`, { cart: updatedCart })
      .then(() => console.log("Cart updated successfully."))
      .catch((err) => {
        console.error("Error clearing cart:", err);
        Swal.fire("Error", "Failed to clear cart.", "error");
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema: PaymentValidation,
    onSubmit: (values) => {
      const orderDetails = {
        userId: userId,
        item: id === "null" ? cart : product,
        price: id === "null" ? totalPrice : product?.price || 0,
      };
      axios.patch(`https://package-0ar8.onrender.com/user/${userId}`, { orders: [...(order || []), orderDetails] })
        .then(() => {
          clearCart(userId);
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your payment has been processed successfully!",
          })
          .then(()=>{
            navigate("/shop")
          });
        })
        .catch((err) => {
          console.error("Error processing payment:", err);
          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text: err.response?.data?.message || "Payment failed, please login!",
          });
        });
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mt-40">
      <h2 className="text-2xl font-semibold mb-4 text-center">Payment Form</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name on Card
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your name"
          />
          {formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded-md"
            placeholder="1234 5678 9101 1121"
          />
          {formik.errors.cardNumber && <p className="text-red-500 text-sm">{formik.errors.cardNumber}</p>}
        </div>

        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formik.values.expiryDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md"
              placeholder="MM/YY"
            />
            {formik.errors.expiryDate && <p className="text-red-500 text-sm">{formik.errors.expiryDate}</p>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formik.values.cvv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md"
              placeholder="123"
            />
            {formik.errors.cvv && <p className="text-red-500 text-sm">{formik.errors.cvv}</p>}
          </div>
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600">
          Pay Now ₹{id === "null" ? totalPrice: product && product.price}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
