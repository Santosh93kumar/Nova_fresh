import React, { useState, useEffect } from "react";
import PersonalIcon from "../../Components/images/personal.png";
import DropIcon from "../../Components/images/drop.png";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";


import axios from "axios";

export default function SettingsPage() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    country: "",
    phone_no: "",
    address: "",
    password: "",
    cpassword: "",
    store_name: "",
    store_description: "",
    store_email: "",
    weight_unit: "",
    dimension_unit: "",
    timezone: "",
    date_format: "",
    time_format: "",
    enableReviews: false,
    enableRatings: false,
    profileImage: null,
    payment_details: {
      name_on_card: "",
      card_number: "",
      expiry_date: "",
      cvv: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/details", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setFormData((prevState) => ({
          ...prevState,
          ...response.data.user,
          payment_details: {
            ...prevState.payment_details,
            ...response.data.user?.payment_details,
          },
        }));
        console.log("Formdata:", response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.put("http://localhost:8000/user/update", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  const imageUrl = formData.profileImage?.startsWith("http")
    ? user.profileImage
    : `http://localhost:8000/uploads/${formData.profileImage}`;


  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <div className="flex flex-row gap-6">
        <div className="w-1/4 h-1/2 bg-white p-4 rounded-lg shadow-md">
          <ul className="space-y-2">
            <li
              className={`p-2 rounded-lg cursor-pointer text-gray-600 ${
                activeTab === "personalInfo"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("personalInfo")}
            >
              <img
                src={PersonalIcon}
                className="w-4 h-4 mr-2 inline"
                alt="icon"
              />
              Personal Information
              <img
                src={DropIcon}
                className="w-2 h-4 ml-15 inline"
                alt="dropdown"
              />
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer text-gray-600 ${
                activeTab === "password"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("password")}
            >
              <img
                src={PersonalIcon}
                className="w-4 h-4 mr-2 inline"
                alt="icon"
              />
              Password
              <img
                src={DropIcon}
                className="w-2 h-4 ml-15 inline"
                alt="dropdown"
              />
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer text-gray-600 ${
                activeTab === "storeInfo"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("storeInfo")}
            >
              <img
                src={PersonalIcon}
                className="w-4 h-4 mr-2 inline"
                alt="icon"
              />
              Store Information
              <img
                src={DropIcon}
                className="w-2 h-4 ml-15 inline"
                alt="dropdown"
              />
            </li>
            <li
              className={`p-2 rounded-lg cursor-pointer text-gray-600 ${
                activeTab === "payment"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("payment")}
            >
              <img
                src={PersonalIcon}
                className="w-4 h-4 mr-2 inline"
                alt="icon"
              />
              Payment
              <img
                src={DropIcon}
                className="w-2 h-4 ml-15 inline"
                alt="dropdown"
              />
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-3/4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {activeTab === "storeInfo" ? (
              <>
                <h2 className="text-xl font-bold mb-4">Store Information</h2>

                <label className="block mb-2">Store Name:</label>
                <input
                  type="text"
                  name="store_name"
                  value={formData.store_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />

                <label className="block mb-2">Store Description:</label>
                <textarea
                  name="store_description"
                  value={formData.store_description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />

                <label className="block mb-2">Email:</label>
                <input
                  type="email"
                  name="store_email"
                  value={formData.store_email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />

                <h3 className="text-lg font-semibold mb-3">
                  Measurement Units
                </h3>
                <label className="block mb-2">Weight Unit:</label>
                <select
                  name="weight_unit"
                  value={formData.weight_unit}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {/* Option from backend */}
                  {formData.weight_unit &&
                    !["kg", "lb", "g", "oz"].includes(formData.weight_unit) && (
                      <option value={formData.weight_unit}>
                        {formData.weight_unit}
                      </option>
                    )}

                  {/* Default options */}
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lb">Pounds (lb)</option>
                  <option value="g">Grams (g)</option>
                  <option value="oz">Ounces (oz)</option>
                </select>

                <label className="block mb-2">Dimension Unit:</label>
                <select
                  name="dimension_unit"
                  value={formData.dimension_unit}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {/* Option from backend if not in predefined options */}
                  {formData.dimension_unit &&
                    !["m", "cm", "in", "ft"].includes(
                      formData.dimension_unit
                    ) && (
                      <option value={formData.dimension_unit}>
                        {formData.dimension_unit}
                      </option>
                    )}

                  {/* Default options */}
                  <option value="m">Meters (m)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="in">Inches (in)</option>
                  <option value="ft">Feet (ft)</option>
                </select>

                <h3 className="text-lg font-semibold mb-3">
                  Date & Time Settings
                </h3>
                <label className="block mb-2">Timezone:</label>
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />

                <label className="block mb-2">Date Format:</label>
                <select
                  name="date_format"
                  value={formData.date_format}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {/* Option from backend if not in predefined options */}
                  {formData.date_format &&
                    !["YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY"].includes(
                      formData.date_format
                    ) && (
                      <option value={formData.date_format}>
                        {formData.date_format}
                      </option>
                    )}

                  {/* Default options */}
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                </select>

                <label className="block mb-2">Time Format:</label>
                <select
                  name="time_format"
                  value={formData.time_format}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {/* Option from backend if not in predefined options */}
                  {formData.time_format &&
                    !["HH:mm:ss", "hh:mm:ss a"].includes(
                      formData.time_format
                    ) && (
                      <option value={formData.time_format}>
                        {formData.time_format}
                      </option>
                    )}

                  {/* Default options */}
                  <option value="HH:mm:ss">24-hour (HH:mm:ss)</option>
                  <option value="hh:mm:ss a">12-hour (hh:mm:ss a)</option>
                </select>

                <h3 className="text-lg font-semibold mb-3">
                  Store Preferences
                </h3>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="enableReviews"
                    checked={formData.enableReviews}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Enable Reviews
                </label>

                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="enableRatings"
                    checked={formData.enableRatings}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Enable Star Ratings
                </label>
              </>
            ) : activeTab === "personalInfo" ? (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="">
                  <label className="block text-gray-600">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profileImage"
                  />
                  <label
                    htmlFor="profileImage"
                    className="flex items-center gap-2 cursor-pointer"
                  />
                  <img
                    src= {imageUrl}
                    alt="Profile"
                    accept = "image/*"
                    className="w-20 h-20 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600">First Name</label>
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Last Name</label>
                    <input
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Phone Number</label>
                    <input
                      type="text"
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </>
            ) : activeTab === "password" ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Password</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-gray-600">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-600">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      value={formData.cpassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </>
            ) : activeTab === "payment" ? (
              <>
                <h2 className="text-xl font-semibold mb-6">Payment</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Name on card
                    </label>
                    <input
                      type="text"
                      name="name_on_card"
                      value={formData.payment_details.name_on_card}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm text-gray-500 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                      <div className="absolute top-3 left-3">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80 relative right-1"></div>
                          </div>
                        </div>
                        <input
                          type="text"
                          name="card_number"
                          value={formData.payment_details.card_number}
                          onChange={handleChange}
                          className="w-full p-3 pl-12 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        Exp Date
                      </label>
                      <div className="relative">
                      <div className="absolute top-3 left-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="expiry_date"
                          value={formData.payment_details.expiry_date}
                          onChange={handleChange}
                          className="w-full p-3 pl-12 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        CVV Number
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.payment_details.cvv}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <hr className="border-gray-200 my-4" />
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-6">
                    Billing Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="billingFirstName"
                        value={formData.fname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="billingLastName"
                        value={formData.lname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="billingCountry"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="billingPhone"
                        value={formData.phone_no}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm text-gray-500 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
              </>
            ) : null}
            <div className="flex justify-end gap-4 mt-4">
              <button type="button" className="px-4 py-2 font-medium"
              onClick={() => navigate('/dashboard')}>
              Discard
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
