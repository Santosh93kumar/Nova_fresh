import React, { useState } from "react";
import logo from "../component/images/logo.png";
import { RxCross2 } from "react-icons/rx";

function Signup({ setSignUpModal, setLogInModal }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    password: "",
    repeatPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
   console.log("signup formData: ",formData)
    // Email validation
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    // Password matching validation
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = { ...formData }; // Use formData to create the payload

    try {
      console.log("payload: ", payload);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(import.meta.env.VITE_API_URL)

      if (!response.ok) throw new Error("Failed to register user");

      const data = await response.json();
      console.log("Signup successful:", data);

      // Clear form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        password: "",
        repeatPassword: "",
      });

      setSignUpModal(false);
      setLogInModal(true);
    } catch (error) {
      console.error("Error sending signup data:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setSignUpModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
        >
          <RxCross2 className="text-2xl" />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} className="w-50" alt="Logo" />
        </div>

        <p className="text-center text-gray-600 mb-4">Create your account</p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleOnSubmit}>
          <input
            className="w-full border border-gray-300 bg-green-50 text-gray-700 p-3 rounded-lg"
            placeholder="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleOnChange}
          />
          <input
            className="w-full border border-gray-300 bg-green-50 text-gray-700 p-3 rounded-lg"
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleOnChange}
          />
          <input
            className="w-full border border-gray-300 bg-green-50 text-gray-700 p-3 rounded-lg"
            placeholder="Contact"
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleOnChange}
          />
          <input
            className="w-full border border-gray-300 bg-green-50 text-gray-700 p-3 rounded-lg"
            placeholder="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
          />
          <input
            className="w-full border border-gray-300 bg-green-50 text-gray-700 p-3 rounded-lg"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
          />
          <input
            className="w-full border border-gray-300 bg-green-50 text-gray-700 p-3 rounded-lg"
            placeholder="Repeat Password"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleOnChange}
          />

          {/* Submit Button */}
          <button
            className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 mt-4">
          Have an account?{" "}
          <span
            className="text-green-700 cursor-pointer"
            onClick={() => {
              setSignUpModal(false);
              setLogInModal(true);
            }}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;