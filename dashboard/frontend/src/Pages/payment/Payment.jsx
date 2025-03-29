import React from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const paymentsData = [
    { transactionNo: "2012938013", customerName: "Shubham Sharma", product: "Women's Clothing Azure", totalProduct: "02", paymentDetails: "$300", status: "Arrived" },
    { transactionNo: "2012938444", customerName: "Shubham Sharma", product: "Oversized Long Coat", totalProduct: "04", paymentDetails: "$3500", status: "Packing" },
    { transactionNo: "0985645617", customerName: "Shubham Sharma", product: "Women's Turtleneck Sweater", totalProduct: "05", paymentDetails: "$2000", status: "Failed" },
    { transactionNo: "2012938014", customerName: "Shubham Sharma", product: "Women's Clothing Azure", totalProduct: "02", paymentDetails: "$350", status: "Sent" },
  ];

  const statusColors = {
    Arrived: "bg-green-100 text-green-700",
    Packing: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    Sent: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">Payments</h2>
      <div className=" bg-white rounded-lg">
        <table className=" border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-500">
              <th className="p-4 text-left">Transaction No.</th>
              <th className="p-4 text-left">Customer Name</th>
              <th className="p-4 text-left">Purchase Product</th>
              <th className="p-4 text-left">Total Product</th>
              <th className="p-4 text-left">Payment Details</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((payment, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{payment.transactionNo}</td>
                <td className="p-4">{payment.customerName}</td>
                <td className="p-4">{payment.product}</td>
                <td className="p-4">{payment.totalProduct}</td>
                <td className="p-4">{payment.paymentDetails}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${statusColors[payment.status]}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="p-4">
                  <a href="#" onClick={()=>navigate('/payment/payment_detail')} className="text-blue-500 font-medium hover:underline">Detail</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-600 text-sm">Page 1 of 2</p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md text-gray-700 bg-gray-200 cursor-pointer" aria-label="Page 1">1</button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-200 cursor-pointer" aria-label="Page 2">2</button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-200 cursor-pointer" aria-label="More pages">...</button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-200 cursor-pointer" aria-label="Page 10">10</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;