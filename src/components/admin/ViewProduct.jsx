import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ViewProduct = () => {
const {id} = useParams()
const [product,setProduct] = useState([])
const navigate=useNavigate()
useEffect(()=>{
axios.get(`http://localhost:5000/api/admin/product/${id}`, { withCredentials: true })

    .then((response)=>{setProduct(response.data.product)
     console.log(response.data);
    })
    .catch(err=>console.log(err))
},[id])
  return (
    <div className="border p-6 rounded-lg shadow-lg max-w-4xl mx-auto bg-white mt-40">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Gender:</span> {product.gender}
        </p>
        <p className="text-green-600 font-bold text-lg mt-4">
          Amount: ₹{product.price}
        </p>
      </div>
    </div>
  </div>
  )
}

export default ViewProduct
