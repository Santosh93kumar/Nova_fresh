import React from "react";
import ProfileIcon from "../customer/profile_image.png";

export default function CustomerDetails() {
  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Add Customers</h1>

      {/* Parent Container */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        {/* Customer Details Section */}
        <div className="md:w-2/3 w-full">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "First Name", value: "Kate" },
                { label: "Last Name", value: "Lau" },
                { label: "Username", value: "kateLau" },
                { label: "Email ID", value: "kateeee@mail.com" },
                { label: "Country", value: "India" },
                { label: "Phone No.", value: "+38 094-730-24-25" },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-600">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    className="w-full p-2 border border-gray-600 rounded-lg"
                    readOnly
                  />
                </div>
              ))}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-600">Address</label>
                <textarea
                  value="Random Federation 115302, Moscow ul. Varshavskaya, 15-2-178, Russia"
                  className="w-full p-2 border border-gray-600 rounded-lg"
                  rows="2"
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Receipt Name</label>
                <input
                  type="text"
                  value="Kate Lau"
                  className="w-full p-2 border border-gray-600 rounded-lg"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone No.</label>
                <input
                  type="text"
                  value="+38 094-730-24-25"
                  className="w-full p-2 border border-gray-600 rounded-lg"
                  readOnly
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-600">Address</label>
                <textarea
                  value="Random Federation 115302, Moscow ul. Varshavskaya, 15-2-178, Russia"
                  className="w-full p-2 border border-gray-600 rounded-lg"
                  rows="2"
                  readOnly
                ></textarea>
              </div>
            </div>
            <a href="#" className="text-blue-600 mt-2 block">
              Add new address
            </a>
          </div>
        </div>

        {/* Profile Image & Actions */}
        <div className="md:w-1/3 w-full max-h-44 bg-white p-4 md:p-6 rounded-xl shadow-md flex flex-col items-center md:items-start">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Profile Image</h2>
          <div className="flex items-center gap-4 mb-4">
            <img src={ProfileIcon} alt="Profile" className="w-20 h-20 rounded-lg" />
            <div className="flex flex-col">
              <p className="font-semibold text-md">Edit your photo</p>
              <div className="flex gap-2 mt-1">
                <button className="text-red-500 text-sm">Delete</button>
                <button className="text-blue-600 text-sm">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end mt-6">
        <button className="px-4 py-2 font-medium">Discard</button>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
