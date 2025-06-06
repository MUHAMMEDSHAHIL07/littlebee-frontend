import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductAdd = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    gender: "",
    stock: "",
    description: ""
  });

  const [imageFile, setImageFile] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("gender", product.gender);
    formData.append("stock", product.stock);
    formData.append("image", imageFile); // image file for Cloudinary

    axios
      .post("http://localhost:5000/api/admin/products", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        toast.success("Product added successfully!");
        navigate("/admin");
      })
      .catch((error) => {
        const msg = error.response?.data?.message || error.message;
        toast.error(msg);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>
      <form onSubmit={submit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter price"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          >
            <option value="">Select Category</option>
            <option value="Clothes">Clothes</option>
            <option value="Caps">Caps</option>
            <option value="Toys">Toys</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Gender:</label>
          <select
            name="gender"
            value={product.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          >
            <option value="">Select Gender</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Stock</label>
          <input
            type="text"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter the stock"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
