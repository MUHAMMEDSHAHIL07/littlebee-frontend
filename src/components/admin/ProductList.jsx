import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
   const [userId,setUserId]=useState(null) 
  const navigate=useNavigate()

  const [postPerPage] = useState(7);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/allproduct",{withCredentials:true})
      .then((response) => {
        setProducts(response.data.products)
        setUserId(response.data.user)
      }
      )
      .catch((err) => console.log(err));
  }, []);



  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/admin/delete/${id}`,{ withCredentials: true })
      .then(() => {
        toast.success("Item deleted");
        setProducts(products.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())||
    item.gender.toLowerCase().includes(search.toLowerCase())
  );

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(filteredProducts.length / postPerPage);
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Dashboard />
      <div className="flex-1 p-4 sm:p-6 lg:ml-64 overflow-x-hidden">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 w-full mt-10">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => navigate("/add")}
              >
                Add Product
              </button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Name</th>
                  <th className="text-left p-3 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Category</th>
                  <th className="p-3 text-xs sm:text-sm font-semibold text-gray-700 text-center whitespace-nowrap">View</th>
                  <th className="p-3 text-xs sm:text-sm font-semibold text-gray-700 text-center whitespace-nowrap">Edit</th>
                  <th className="p-3 text-xs sm:text-sm font-semibold text-gray-700 text-center whitespace-nowrap">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-100 transition-colors">
                      <td className="p-3 text-xs sm:text-sm text-gray-800 truncate max-w-[150px] sm:max-w-[200px]">{product.name}</td>
                      <td className="p-3 text-xs sm:text-sm text-gray-800 truncate max-w-[100px] sm:max-w-[150px]">{product.category}</td>
                      <td className="p-3">
                        <button
                          className="w-full bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm"
                          onClick={() => navigate(`/admin/product/${product._id}`)}
                        >
                          View
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          className="w-full bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-xs sm:text-sm"
                          onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          className="w-full bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500 text-xs sm:text-sm">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
    </div>
  );
};

export default ProductList;
