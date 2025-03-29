import React, { useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const tabs = [
  "Personal Information",
  "Password",
  "Setup Information",
  "Payment",
];
const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
  >
    {children}
  </button>
);

const UserRegistration = () => {
const navigate = useNavigate(); // Hook for navigation
  const [activeTab, setActiveTab] = useState(0);
  const handleNext = () =>
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  const handlePrev = () => setActiveTab((prev) => Math.max(prev - 1, 0));



  
  const [formData, setFormData] = useState({
    fname: "",
        lname: "",
        email: "",
        dob: "",
        country: "",
        phone_no: "",
        address: "",
        password: "",
        cpassword:"",
        store_name: "",
        store_description: "",
        store_email: "",
        weight_unit: "",
        dimension_unit: "",
        timezone: "",
        date_format: "",
        time_format: "",
        payment_details: {
          name_on_card: "",
          card_number: "",
          expiry_date: "",
          cvv: "",
        },
    profileImage: null,
  });
  
  const defaultImage = "https://www.pngall.com/wp-content/uploads/5/Profile.png";
  const [image, setImage] = useState(defaultImage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name in formData.payment_details) {
      setFormData((prev) => ({
        ...prev,
        payment_details: {
          ...prev.payment_details,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setImage(defaultImage);
    setFormData((prev) => ({
      ...prev,
      profileImage: null,
    }));
  };

  const nextTab = () => {
    setActiveTab((prev) => Math.min(prev + 1, 3));
  };

  const prevTab = () => {
    setActiveTab((prev) => Math.max(prev - 1, 0));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    // Append profile image separately if exists
    if (formData.profileImage) {
        formDataObj.append("profileImage", formData.profileImage);
    }

    // Append all other fields from formData
    Object.keys(formData).forEach((key) => {
        if (key !== "profileImage" && formData[key]) {
            if (key === "payment_details") {
                // Convert payment details object to JSON string
                Object.keys(formData[key]).forEach((subKey) => {
                    formDataObj.append(`payment_details[${subKey}]`, formData[key][subKey]);
                });
            } else {
                formDataObj.append(key, formData[key]);
            }
        }
    });

    try {
        const response = await axios.post("http://localhost:8000/user/register", formDataObj, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.status === 1) {
            alert("Registration successful!");
            toast.success("Registration successful! Redirecting...");
            setTimeout(() => {
              navigate("/login");
            }, 1500);
        } else {
            alert(response.data.msg || "Error occurred while registering.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error occurred while registering.");
    }
};


  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 0 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab(0)}
        >
          Personal Info
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab(1)}
        >
           Password
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab(2)}
        >
         Setup Information
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab(3)}
        >
         Payment
        </button>
      </div>
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {activeTab === 0 && (
          <div>
            <div className="mt-4">
              <img src={image} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              <input type="file" accept="image/*" name="profileImage" onChange={handleImageChange} className="mt-2" />
              <button type="button" className="bg-red-500 text-white px-4 py-2 rounded mt-2" onClick={handleDelete}>
                Remove Image
              </button>
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
                  <label className="block text-gray-600">Email ID</label>
                  <input
                    type="text"
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
                  <label className="block text-gray-600">Phone No.</label>
                  <input
                    type="text"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-600">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  ></input>
                </div>
              </div>
          </div>
        )}
        {activeTab === 1 && (
          <div>
                        <h2 className="text-xl font-semibold mb-4">Password</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="col-span-2">
                          <div>
                            <label className="block text-gray-600">New password</label>
                            <input
                              type="password" name="password"
                              value={formData.password} onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600">
                              Confirm password
                            </label>
                            <input
                              type="password"
                              name="cpassword"
                              value={formData.cpassword} onChange={handleChange}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          </div>
                        </div>
                      </div>
        )}
        {activeTab === 2 && (
          <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg font-sans">
            <h1 className="text-2xl font-semibold mb-6">
              Store Information
            </h1>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">Store Name</label>
              <input
                type="text"
                name="store_name" value={formData.store_name} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">
                Store Description
              </label>
              <textarea
               name="store_description" value={formData.store_description} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">Email</label>
              <input
                type="email"
                name="store_email" value={formData.store_email} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <h1 className="text-2xl font-semibold mb-6">Measurement</h1>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">
                Weight Unit
              </label>
              <input
                type="text"
                name="weight_unit" value={formData.weight_unit} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">
                Dimension Unit
              </label>
              <input
                type="text"
                name="dimension_unit" value={formData.dimension_unit} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <h1 className="text-2xl font-semibold mb-6">Date & Time</h1>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">Timezone</label>
              <input
                type="text"
                name="timezone" value={formData.timezone} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">
                Date Format
              </label>
              <input
                type="text"
                name="date_format" value={formData.date_format} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 mb-2">
                Time Format
              </label>
              <input
                type="text"
                name="time_format" value={formData.time} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          
        </div>
        )}

        {activeTab === 3 && (
            <div className="space-y-8">
             
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Name on card
                    </label>
                    <input
                      type="text"
                      name="name_on_card" value={formData.payment_details.name_on_card} onChange={handleChange}
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
                          name="card_number" value={formData.payment_details.card_number} onChange={handleChange}
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
                          name="expiry_date" value={formData.payment_details.expiry_date} onChange={handleChange}
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
                        name="cvv" value={formData.payment_details.cvv} onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

          
              <hr className="border-gray-200" />

            
              <div>
                <h2 className="text-xl font-semibold mb-6">Billing Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
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
                      className="w-full p-3 border border-gray-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
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
                    className="w-full p-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        
        <div className="flex justify-between mt-4">
          {activeTab > 0 && <button type="button" onClick={prevTab} className="px-4 py-2 bg-gray-500 text-white rounded">Previous</button>}
          {activeTab < 3 && <button type="button" onClick={nextTab} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>}
          {activeTab === 3 && <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>}
        </div>
      </form>
      <ToastContainer />
      <div className="flex justify-center mt-4">
        <p className="justify-center">Already Signup?
          <button onClick={() => navigate("/login")} className="text-blue-500">Login</button>
        </p>
      </div>
    </div>

  );
};
export default UserRegistration;
