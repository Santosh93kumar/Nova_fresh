// File: YourOrder.jsx
import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Keep your existing import for the placeholder image
import image from "../../../src/assets/react.svg";
import { useAuth } from "../../context/AuthContext";

function YourOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuth();
  console.log("user: ", user)

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        // Get user ID from localStorage or context
        // This depends on how you store user data after login
        // const userData = JSON.parse(localStorage.getItem("user"));
        // Or if you're using the JWT token from cookies:
        // const response = await axios.get("/api/auth/verify", { withCredentials: true });
        // const userData = response.data.user;
        
        if (!user || !user._id) {
          throw new Error("User not authenticated");
        }
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order/user/${user._id}`, {
          withCredentials: true // Important for sending cookies
        });
        console.log("response: ", response.data);
        if (response.data.status === 1) {
          setOrders(response.data.orders);
        } else {
          throw new Error(response.data.msg || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="">
        <p className="text-lg mx-10 font-semibold">Your Orders</p>
        
        {orders.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/products')} 
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
          {console.log("orders: ", orders)}
            {orders.map((order, index) => (
              <div
                key={order.orderId || index}
                onClick={() => navigate(`/profile/yourOrder/${order.orderId}`)}
                className="border p-4 rounded-lg shadow-md text-center w-[45%] sm:w-1/2 md:w-1/3 lg:w-1/6 flex justify-between"
              >
                <div className="w-full">
                  <img 
                    src={order.product?.image || image} 
                    alt={order.product?.name || "Product"} 
                    className="w-32 mx-auto"
                    onError={(e) => {
                      e.target.src = image; // Fallback to default image
                    }}
                  />
                  <p className={`mt-2 font-semibold ${
                    order.status?.toLowerCase() === 'delivered' ? 'text-green-500' : 
                    order.status?.toLowerCase() === 'shipped' ? 'text-blue-500' : 'text-yellow-500'
                  }`}>
                    {order.status || "Processing"}
                  </p>
                  <div className="flex justify-between">
                    <p>{order.product?.name || "Product"}</p>
                    <p>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="cursor-pointer">
                  <FaAngleRight />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default YourOrder;