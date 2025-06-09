import React, { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./Notfound";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
    const [userId,setUserId]=useState(null)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/getOrder", { withCredentials: true }) 
      .then((response) => {
        setOrders(response.data.orders || []);
      })
      .catch((error) => {
             const msg = error.response?.data?.message || error.message;
             console.log(msg);  
           });
  }, []);


 useEffect(()=>{
    axios.get("http://localhost:5000/api/user/me",{withCredentials:true})
    .then((res)=>setUserId(res.data.user))
    .catch((err)=>console.log("the fetching error",+err))
  },[])



  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Your Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Total Price</th>
                <th className="px-4 py-2 border-b">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orderGroup, groupIndex) =>
                orderGroup.orders.map((order, orderIndex) => (
                  <tr key={`${groupIndex}-${orderIndex}`} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-center font-semibold">
                      {orderIndex + 1}
                    </td>
                    <td className="px-4 py-2 text-center font-semibold text-green-600">
                      ₹{order.total}
                    </td>
                    <td className="px-4 py-2">
                      {order.items.map((product, idx) => (
                        <div key={idx} className="flex items-center space-x-4 py-2">
                          <img
                            src={product.image || "/placeholder.jpg"}
                            alt={product.name || "Product"}
                            className="w-16 h-16 object-cover rounded-lg shadow"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{product.name || "N/A"}</p>
                            <p className="text-sm text-gray-600">
                              ₹{product.price} <br />
                              Quantity: {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
