import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CountContext } from "../Context/MAinContext";

function Login() {
let Data = useContext(CountContext)
let {token,setToken}=Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, formData);
      
      if (response.data.success) {
        toast.success("Login successful! Redirecting...");

        // Store JWT token in localStorage
        localStorage.setItem("token", response.data.jwtToken);
        setToken(response.data.jwtToken)
        // Redirect to homepage after 1.5s
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error(response.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Login
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;

// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; 
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { CountContext } from "../Context/MainContext"; // FIXED: Correct import path

// function Login() {
//   const { token, setToken } = useContext(CountContext); // FIXED: Access from context

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate(); 

//   // Handle Input Changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/user/login", formData);
      
//       if (response.data.success) {
//         toast.success("Login successful! Redirecting...");
//         setToken(response.data.jwtToken); // FIXED: Store token in context
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1500);
//       } else {
//         toast.error(response.data.message || "Invalid credentials.");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast.error("Invalid email or password.");
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//           <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//               Login
//             </button>
//           </form>
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
