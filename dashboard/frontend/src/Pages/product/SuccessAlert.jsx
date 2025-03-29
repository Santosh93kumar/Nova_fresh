import React, {  useEffect } from 'react';
import del from "../../assets/del.png"

const SuccessAlert = ({ isOpen, onClose }) => {
  // Auto-close timer
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); 
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-6 right-6 left-6 mx-auto max-w-md z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex">
        
        <div className="w-2 bg-red-500 flex-shrink-0"></div>
        
        <div className="flex-grow p-4 flex items-start">
          {/* Trash icon */}
          <div className="mr-3 mt-1 text-red-500">
            <img src={del} alt="trash" />
          </div>
          
          {/* Alert content */}
          <div className="flex-grow">
            <p className="text-gray-900 font-medium mb-1">Product has been deleted</p>
            <p className="text-gray-500 text-sm">Product which already deleted can not be recovered.</p>
          </div>
          
          {/* Close button */}
          <button onClick={onClose} className="ml-3 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SuccessAlert;