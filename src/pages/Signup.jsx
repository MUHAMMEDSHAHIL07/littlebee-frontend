import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { SignupSchema } from '../Schema';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialValues = {
  name: '',
  email: '',
  password: '',
  cpassword: '',
  isActive:true
};

const Signup = () => {
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/api/user/register", values)
        .then((response) => {
          console.log(response);
          toast.success('User registered successfully! Please login'); 
        })
        .catch((error) => {
          const msg = error.response?.data?.message || err.message
          toast.error(msg);   
        });
      navigate('/login');
      console.log('Form Submitted:', values);
    },
  });
  const buttonref = useRef()
  useEffect(()=>{
     buttonref.current.focus()
  },[])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Create an Account</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              ref={buttonref}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              autoComplete='new-password'
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              name="cpassword"
              value={values.cpassword}
              autoComplete='new-password'
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.cpassword && <p className="text-red-500 text-sm">{errors.cpassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?
          <Link to="/login">
            <span className="text-blue-500 font-semibold hover:underline"> Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
