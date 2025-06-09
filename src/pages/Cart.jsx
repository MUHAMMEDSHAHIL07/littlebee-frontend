import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextCart } from '../App';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { setConCart } = useContext(ContextCart);
  const [paymentMethod, setPaymentMethod] = useState('cod'); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://littlebee-backend.onrender.com/api/user/getCart', { withCredentials: true })
      .then(res => {
        setCart(res.data.cart);
        setConCart(res.data.count);
      })
      .catch(() => {
        setCart([]);
        setConCart(0);
      });
  }, []);


  const remove = productId => {
    axios
      .delete(`https://littlebee-backend.onrender.com/api/user/removeItem/${productId}`, { withCredentials: true })
      .then(() => {
        const updatedCart = cart.filter(item => item.Product._id !== productId);
        setCart(updatedCart);
        setConCart(updatedCart.length);
      });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;

    const updated = cart.map(item =>
      item.Product._id === productId ? { ...item, quantity: newQty } : item
    );
    setCart(updated);

    axios
      .patch(
        `https://littlebee-backend.onrender.com/api/user/updateQuantity/${productId}`,
        { quantity: newQty },
        { withCredentials: true }
      )
      .catch(console.error);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.Product.price * item.quantity, 0);

const placeOrder = async () => {
  if (cart.length === 0) {
    toast.info('Your cart is empty.');
    return;
  }

  if (paymentMethod === 'Razorpay') {
    try {
      // Calculate total amount
      const totalAmount = cart.reduce(
        (sum, item) => sum + item.Product.price * item.quantity,
        0
      );

      // 1. Create Razorpay order from backend
      const razorpayRes = await axios.post(
        'https://littlebee-backend.onrender.com/api/payment/create-order',
        { amount: totalAmount },
        { withCredentials: true }
      );

      const { id: order_id, amount, currency } = razorpayRes.data;

      // 2. Configure Razorpay Options
      const options = {
        key: "rzp_test_l1qT8fmcI3x6pw", // Use your actual Razorpay key
        amount,
        currency,
        name: "Little Bee",
        description: "Cart Purchase",
        order_id,
        handler: async function (response) {
          try {
            const res = await axios.post(
              'https://littlebee-backend.onrender.com/api/user/buyFromCart',
              { paymentMethod: "Razorpay" },
              { withCredentials: true }
            );
            toast.success("order placed!");
            setCart([]);
            setConCart(0);
            navigate("/");
          } catch (err) {
            toast.error("Order failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Razorpay payment failed");
    }

    return;
  }

  // 🧾 COD Flow
  try {
    const res = await axios.post(
      'https://littlebee-backend.onrender.com/api/user/buyFromCart',
      { paymentMethod: "cod" },
      { withCredentials: true }
    );
    toast.success(res.data.message);
    setCart([]);
    setConCart(0);
    navigate('/');
  } catch (error) {
   toast.error(error.response?.data?.message || "Something went wrong")

  }
};




  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
          {cart.map(item => (
            <div key={item._id} className="flex items-center border-b pb-4 mb-4">
              <img
                src={item.Product.image}
                alt={item.Product.name}
                className="w-28 h-28 object-cover rounded-md"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold">{item.Product.name}</h3>
                <p className="text-sm text-gray-500">{item.Product.category}</p>
                <p className="text-sm mt-2">{item.Product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-bold text-red-500">
                    ₹{item.Product.price * item.quantity}
                  </p>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.Product._id, item.quantity - 1)}
                      className="px-3 py-1"
                    >
                      -
                    </button>
                    <p className="px-4 py-1">{item.quantity}</p>
                    <button
                      onClick={() => updateQuantity(item.Product._id, item.quantity + 1)}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => remove(item.Product._id)}
                  className="mt-3 text-sm text-blue-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center border-b pb-4">
          <p className="text-xl font-semibold">Subtotal</p>
          <p className="text-xl font-bold text-red-500">₹{totalPrice}</p>
        </div>

       
        {cart.length > 0 && (
          <div className="mt-4">
            <label className="mr-4 font-semibold">Payment Method:</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="Razorpay">Razorpay</option>
              
            </select>
          </div>
        )}

       
        {cart.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
             className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
              onClick={placeOrder}
            >
             Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
