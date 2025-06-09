import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ContextCart } from '../App';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const { setUserName } = useContext(ContextCart);
  const navigate = useNavigate();
  const buttonref = useRef();

  useEffect(() => {
    buttonref.current.focus();
  }, []);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/api/user/login", values, { withCredentials: true })
        .then((response) => {
          const user = response.data.data;

          if (user.role === "admin") {
            toast.error("Use admin login");
          } else {
            

          const { _id, name, role } = res.data.data;
             localStorage.setItem("user", JSON.stringify({ _id, name, role }));
               toast.success("Login successful");
            setUserName(user);


            navigate("/");
          }
        })
        .catch((error) => {
          const msg = error.response?.data?.message || error.message;
          toast.error(msg);
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login Here</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              autoComplete="new-password"
              onChange={handleChange}
              ref={buttonref}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              autoComplete="new-password"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{' '}
          <Link to="/signup">
            <span className="text-blue-500 font-semibold hover:underline">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
