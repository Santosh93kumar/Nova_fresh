import React from 'react';
import { useNavigate } from "react-router-dom";
import FilterIcon from "../customer/filter_image.png";

function Customer() {
  const navigate = useNavigate();
  const customers = [
    {
      name: "Samanta Legend",
      email: "samanta@mail.com",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      createdAt: "Sep 19, 2010",
      lastActivity: "May 6, 2012",
    },
  ];

  return (
    <>
        <div className="w-full h-screen p-6 bg-gray-100 overflow-auto">

{/* Sort and Filter Buttons */}
<div className="flex justify-between items-center mb-4">
<h2 className="text-2xl font-semibold mb-4">Customers</h2>
<div className="flex gap-x-2 justify-center items-center">
  <button className="px-4 py-2 bg-indigo-100 rounded-md text-black">Sort</button>
  <button className="px-4 py-2 bg-indigo-100 rounded-md">Filter 
      <img src={FilterIcon} alt="filter" className="w-5 h-5 inline-block ml-1" />
  </button>
  </div>
</div>

{/* Table */}
<div className="overflow-x-auto  rounded-lg">
  <table className="min-w-full">
    <thead className="bg-gray-100 text-gray-500 uppercase text-sm leading-normal">
      <tr>
        <th className="py-3 px-4 text-left">
          <input type="checkbox" />
        </th>
        <th className="py-3 px-4 text-left">NAME</th>
        <th className="py-3 px-4 text-left">EMAIL ADDRESS</th>
        <th className="py-3 px-4 text-left">COMPLETE ADDRESS</th>
        <th className="py-3 px-4 text-left">CREATE AT</th>
        <th className="py-3 px-4 text-left">LAST ACTIVITY</th>
        <th className="py-3 px-4 text-left">ACTION</th>
      </tr>
    </thead>
    <tbody className="text-gray-700 text-sm">
      {customers.map((customer, index) => (
        <tr key={index} className=" hover:bg-gray-50">
          <td className="py-3 px-4">
            <input type="checkbox" />
          </td>
          <td className="py-3 px-4">{customer.name}</td>
          <td className="py-3 px-4">{customer.email}</td>
          <td className="py-3 px-4">{customer.address}</td>
          <td className="py-3 px-4">{customer.createdAt}</td>
          <td className="py-3 px-4">{customer.lastActivity}</td>
          <td className="py-3 px-4 text-blue-600 cursor-pointer" onClick={() => navigate("/customer/details")}>
            Detail
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    
    </>
  )
}

export default Customer
