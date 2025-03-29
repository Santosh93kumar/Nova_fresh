import React, { useState } from 'react';

const DeleteProduct= ({ 
  isOpen, 
  onCancel, 
  onDelete, 
 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-5"></div>

      {/* Popup container */}
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md mx-4">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Delete product item</h3>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this product? Item which deleted cannot be recovered.
          </p>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-[#445FE8] rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;