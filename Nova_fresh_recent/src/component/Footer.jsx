import React from "react";
import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
import logo from "./images/logo.png";

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row px-6 md:px-10 py-6 bg-gray-100 w-full">
      {/* Left Section: Logo & Social Links */}
      <div className="w-full md:w-6/12 flex flex-col justify-center md:justify-start items-center md:items-start text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-2">
          <img src={logo} alt="Logo" className="w-24 md:w-32" />
        </div>
        <p className="text-base py-1.5 text-gray-500 max-w-xs mx-auto md:mx-0">
          © Novafresh Private Limited
        </p>
        <div className="flex space-x-4 pt-2 justify-center md:justify-start">
          <Linkedin className="cursor-pointer hover:text-blue-500 transition" />
          <Instagram className="cursor-pointer hover:text-pink-500 transition" />
          <Twitter className="cursor-pointer hover:text-blue-400 transition" />
          <Facebook className="cursor-pointer hover:text-blue-600 transition" />
        </div>
      </div>

      {/* Right Section: Navigation Links */}
      <div className="w-full md:w-6/12 mt-6 md:mt-0">
        <div className="flex flex-col sm:flex-row justify-between">
          {/* Company Section */}
          <div className="w-full sm:w-4/12 text-center sm:text-left">
            <h3 className="font-semibold text-lg lg:text-xl">Company</h3>
            <ul className="flex flex-col mt-2 text-base text-gray-500 font-medium space-y-1">
              <li>About</li>
              <li>Contact</li>
              <li>Blog</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="w-full sm:w-4/12 text-center sm:text-left mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg lg:text-xl">Legal</h3>
            <ul className="flex flex-col mt-2 text-base text-gray-500 font-medium space-y-1">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookies</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-4/12 text-center sm:text-left mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg lg:text-xl">Contact Us</h3>
            <ul className="flex flex-col mt-2 text-base text-gray-500 font-medium space-y-1">
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
