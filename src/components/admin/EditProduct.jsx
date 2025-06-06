import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    gender: ""
  })
  useEffect(() => {
    axios.get(`http://localhost:5000/api/admin/product/${id}`, { withCredentials: true })
      .then((response) => setProduct(response.data.product))
      .catch(err => {
        console.log(err)
        toast.error("Failed to load product")
      })
  }, [id])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:5000/api/admin/editproduct/${id}`, product, { withCredentials: true })
      .then((response) => {
        toast.success("Successfully edited")
        navigate(`/admin/product/${id}`)
      })
      .catch(err => {
        console.log(err)
        toast.error("Edit failed")
      })
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Product</h2>
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
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-semibold">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          >
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
          >
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditProduct
