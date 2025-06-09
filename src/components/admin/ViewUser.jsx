import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Dashboard from "./Dashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "../../pages/Notfound";

const ViewUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const [userId,setUserId]=useState(null) 
  const [postPerPage] = useState(5);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("https://littlebee-backend.onrender.com/api/admin/users",{withCredentials:true})
      .then((res) => {
        setUser(res.data.data)
        setUserId(req.data.user)
        console.log(res.data);
        
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
  axios
    .get("https://littlebee-backend.onrender.com/api/admin/users", { withCredentials: true })
    .then((res) => {
      const nonAdminUsers = res.data.data.filter(user => user.role !== "admin");
      setUser(nonAdminUsers);
    })
    .catch((error) => console.log(error));
}, []);


const Blockuser = (id) => {
  axios
    .patch(`https://littlebee-backend.onrender.com/api/admin/user/block/${id}`, { isActive: false }, { withCredentials: true })
    .then(() => {
      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isActive: false } : user
        )
      );
      toast.success("User blocked successfully!");
    })
    .catch((error) => {
      console.error(error.message);
      toast.error("Failed to block user");
    });
};


const Unblockuser = (id) => {
  axios
    .patch(`https://littlebee-backend.onrender.com/api/admin/user/block/${id}`, { isActive: true }, { withCredentials: true })
    .then(() => {
      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isActive: true } : user
        )
      );
      toast.success("User unblocked successfully!");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to unblock user");
    });
};


  const filteredUsers = user.filter((users) =>
    users.name.toLowerCase().includes(search.toLowerCase()) ||
    users.email.toLowerCase().includes(search.toLowerCase())
  );

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentUsers = filteredUsers.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(filteredUsers.length / postPerPage);
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="absolute top-4 left-4 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars size={20} />
      </button>
      <div
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white z-20 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-64 transition-transform duration-300 ease-in-out`}
      >
        <Dashboard />
      </div>
      <div className="flex-1 p-4 w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border rounded mb-4 mt-15"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto max-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Orders</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((users, index) => (
                  !users.isAdmin&&
                <tr key={index} className="border-t">
                  <td className="p-2">{users.name}</td>
                  <td className="p-2">{users.email}</td>
                  <td
                    className={`p-2 font-semibold ${
                      users.isActive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {users.isActive ? "Active" : "Blocked"}
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`/userorder/${users.id}`)}
                    >
                      Orders
                    </button>
                  </td>
                  <td className="p-2">
                    {users.isActive ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => Blockuser(users._id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => Unblockuser(users._id)}
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {pages.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`mx-1 px-3 py-1 rounded-lg text-sm ${
                  currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
