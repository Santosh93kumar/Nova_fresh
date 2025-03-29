import React, { useState } from "react";
import axios from "axios";
import { useProduct } from "../context/ProductContext";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { loadStripe } from "@stripe/stripe-js";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckOutPage = () => {
  const { addToCart, setAddToCart, setSelectedProduct } = useProduct();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const handleClick = (product) => {
    setSelectedProduct(product);
    navigate("/detail");
  };

  const addToWatchlist = (product) => {
    setWatchlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromCart = (product) => {
    setAddToCart(addToCart.filter((item) => item.id !== product.id));
    alert("Product has been removed!");
  };

  const increaseQuantity = (product) => {
    setAddToCart(
      addToCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setAddToCart(
      addToCart
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = addToCart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const isWatchlisted = (product) => watchlist.some((p) => p.id === product.id);

  //payment
  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   const stripe = await stripePromise;
  //   if (!stripe) {
  //     console.error("Stripe is not initialized!");
  //     return;
  //   }

  //   const { error } = await stripe.redirectToCheckout({
  //     lineItems: addToCart.map((item) => ({
  //       price: item.stripePriceId, // Use the price ID from Stripe Dashboard
  //       quantity: item.quantity || 1,
  //     })),
  //     mode: "payment",
  //     successUrl: "http://localhost:3000/success", // Change when deployed
  //     cancelUrl: "http://localhost:3000/cancel",
  //   });

  //   if (error) {
  //     console.error("Error after await function:", error);
  //   }
  // };
  
  const handleCheckout = async (e) => {
    e.preventDefault();
  
    if (addToCart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    const orderData = {
      order_id: Math.floor(1000 + Math.random() * 9000), 
      items: addToCart.length,
      date: new Date().toISOString().split('T')[0], // Only date part
      customer_name: "Santosh Kumar", // Replace with actual user data later
      paid: "yes",
      status: "proceed",
      spent: totalPrice,
    };
  
    console.log("Order Data Before Sending:", JSON.stringify(orderData, null, 2));
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/new`,
        orderData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Response from API:", response.data);
  
      if (response.status === 201) {
        setShowCheckoutPopup(false);
        toast.success("Order details saved successfully!");
      } else {
        alert("Error in confirming order");
      }
    } catch (error) {
      console.error("Error confirming order data:", error);
    }
  };
  
  
  
  return (
    <div className="bg-[#E6F7DA] min-h-screen px-8 py-6">
      {/* Header */}
      <div className="flex justify-between mb-6 font-bold lg:mt-22 mt-30">
        <h2 className="text-3xl">Shopping Cart</h2>
        <button
          className="cursor-pointer text-5xl"
          onClick={() => navigate("/")}
        >
          ×
        </button>
      </div>
      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Cart Items (Scrollable Section) */}
        <div className="lg:col-span-2 space-y-4 lg:overflow-y-scroll lg:max-h-[calc(100vh-200px)] pr-2 lg:scrollbar-hide">
          {addToCart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            addToCart.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 bg-white rounded-lg shadow-md"
              >
                {/* Product Image */}
                <img
                  onClick={() => handleClick(item)}
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded-md cursor-pointer"
                />

                {/* Product Details */}
                <div className="ml-4 flex-1">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-md text-gray-700">Rs. {item.price}</p>
                  <p className="text-sm text-gray-500">
                    Product details: lorem ipsum dolor sit amet
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="text-xl text-gray-700 hover:text-gray-900"
                      onClick={() => decreaseQuantity(item)}
                    >
                      <FiMinusCircle />
                    </button>
                    <p className="text-lg font-semibold">
                      {item.quantity || 1}
                    </p>
                    <button
                      className="text-xl text-gray-700 hover:text-gray-900"
                      onClick={() => increaseQuantity(item)}
                    >
                      <FiPlusCircle />
                    </button>
                  </div>
                </div>

                {/* Icons */}
                <div className=" relative flex items-center space-x-4">
                  <button onClick={() => addToWatchlist(item)}>
                    {isWatchlisted(item) ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-gray-400 text-xl" />
                    )}
                  </button>
                  <button
                    className="text-xl text-red-500"
                    onClick={() => removeFromCart(item)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Delivery Address & Summary */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              Delivering to Santosh Kumar
            </h3>
            <p className="text-sm text-gray-600">
              4517 Washington Ave, Manchester, Kentucky 39495 <br />
              2118 Thornridge Cir, Syracuse, Connecticut 35624
            </p>
            <button className="mt-2 text-blue-500 text-sm font-semibold">
              Change Location
            </button>
          </div>

          {/* Order Summary */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>Rs. {totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Estimated Delivery & Handling</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Estimated Taxes</span>
              <span>Rs. 21</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs. {totalPrice + 21}</span>
            </div>

            {/* <button onClick={handlePayment}  className="mt-4 w-full bg-[#7ED321] text-white py-2 rounded-lg font-semibold hover:bg-green-700">
              Proceed to Pay
            </button> */}

            <button
              onClick={() => setShowCheckoutPopup(true)}
              className="mt-4 w-full bg-[#7ED321] text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
      {showCheckoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs px-4">
          <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowCheckoutPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <RxCross2 size={24} />
            </button>
            <p className="text-center text-gray-600 font-semibold text-lg mb-4">
              Checkout
            </p>
            {/* personal info */}
            <h3 className="text-lg font-semibold text-black">
              Delivering to Santosh Kumar
            </h3>
            <p className=" text-gray-600">
              4517 Washington Ave, Manchester, Kentucky 39495 <br />
            </p>

            {/* product info */}
              <div className="">
            <h3 className="text-lg font-semibold mt-4">Order Summary</h3>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>Rs. {totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Estimated Delivery & Handling</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Estimated Taxes</span>
              <span>Rs. 21</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs. {totalPrice + 21}</span>
            </div>

            
            </div>

            <div className="space-y-4 mt-4">
              <button onClick={handleCheckout}
              className="w-full  bg-[#7ED321] hover:bg-green-700 text-white py-2 rounded-md font-semibold">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default CheckOutPage;
