import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get("https://littlebee-backend.onrender.com/api/admin/getAllOrder", { withCredentials: true })
      .then(res => {
        setAllOrders(res.data.Orders || []);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://littlebee-backend.onrender.com/api/admin/me", { withCredentials: true })
      .then((res) => {
        if (res.data.data.role == "admin") {
          navigate("/admin");
        }
      })
      .catch(() => {
        navigate("/")
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://littlebee-backend.onrender.com/api/admin/allproduct", { withCredentials: true })
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => console.log(error));

  }, []);

  useEffect(() => {
    axios
      .get("https://littlebee-backend.onrender.com/api/admin/users", { withCredentials: true })
      .then((response) => {
        setUsers(response.data.data)

      }
      )
      .catch((error) => console.log(error));
  }, []);

  const totalOrders = allOrders.reduce(
    (acc, orderDoc) => acc + (orderDoc.orders?.length || 0),
    0
  );

  const totalRevenue = allOrders.reduce((acc, item) => {
    return acc + item.orders.reduce((orderAcc, order) => orderAcc + order.total, 0)
  }, 0);


  const boysProducts = products.filter((item) => item.gender === "Boys").length;
  const girlsProducts = products.filter((item) => item.gender === "Girls").length;
  const productsData = [
    { name: "Boys", value: boysProducts },
    { name: "Girls", value: girlsProducts },
  ];

  const activeUsers = users.filter((item) => item.isActive === true).length;
  const blockedUsers = users.filter((item) => item.isActive === false).length;
  const usersData = [
    { name: "Active", value: activeUsers },
    { name: "Blocked", value: blockedUsers },
  ];

  const COLORS = ["#4CAF50", "#FF5733"];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className={`fixed inset-y-0 left-0 text-white z-20 transform ${sidebarOpen} md:relative md:w-64 `}>
        <Dashboard />
      </div>
      <div className="flex-1 p-4 md:p-6 lg:p-10 mt-16 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-center bg-blue-600 p-5 rounded-xl text-white mb-8 shadow-md">
          <div className="flex items-center gap-3">
            <FaUserCircle size={30} />
            <span className="text-lg font-medium">ADMIN</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center w-full">
            <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
            <span className="text-3xl font-bold text-blue-600">{totalOrders}</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center w-full">
            <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
            <span className="text-3xl font-bold text-green-600">₹{totalRevenue.toFixed()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Total Products: {products.length}</h2>
            <PieChart width={300} height={250}>
              <Pie data={productsData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {productsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Total Users: {users.length}</h2>
            <PieChart width={300} height={250}>
              <Pie data={usersData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {usersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;