import React from "react";
import image from "../../../src/assets/react.svg";


const OrderStatus = () => {
  return (
    <div className="h-[80vh] flex items-center">
      <div className="w-[70%] mx-auto p-6 rounded-lg">
        {/* Order Info */}
        <div className="flex items-start space-x-6 border-b pb-4">
          <img
            src={image}
            alt="Bingo Tedhe Medhe"
            className="w-20 h-20 rounded"
          />
          <div>
            <h2 className="text-xl font-semibold">Order Status</h2>
            <p className="text-gray-600">Order Id: #123456789</p>
            <p className="text-green-600 font-semibold">Delivered on 1 March</p>
            <p className="text-lg font-bold">Rs. 564</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between items-center my-6">
          {['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'].map((status, index) => (
            <div key={index} className="text-center">
              <div className={`w-6 h-6 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className="text-sm mt-2">{status}</p>
              <p className="text-xs text-gray-500">On 1 March</p>
            </div>
          ))}
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-3 gap-6 border-t pt-4">
          <div>
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <p className="text-gray-600">Santosh</p>
            <p className="text-gray-600">2749 Thomas Street</p>
            <p className="text-gray-600">Shimla Bypass, Dehradun</p>
            <p className="text-gray-600">Dehradun, Uttarakhand</p>
            <p className="text-gray-600">Zip code: 606061</p>
            <p className="text-gray-600">State: Dehradun</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <p className="text-gray-600">Cash on Delivery</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <p className="text-gray-600">Subtotal: ₹783.35</p>
            <p className="text-gray-600">Tax & Fees: ₹2.35</p>
            <p className="text-gray-600">Shipping Charges: ₹20.00</p>
            <p className="font-bold">Total: ₹783.35</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
