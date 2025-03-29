import React, { useState, useEffect } from 'react';
// import edit from "../../assets/actions.png"
import { MdAdd, MdOutlineDeleteForever } from "react-icons/md";
// import del from "../../assets/del.png"
import { useNavigate } from "react-router-dom";
// import i1 from '../../assets/snekar.png'
// import i2 from '../../assets/bag.png'
// import i3 from '../../assets/coat.png'
// import i4 from '../../assets/denim.png'
import DeleteProductPopup from './DeleteProduct';
import axios from 'axios';

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct ] = useState([]);
  console.log(product)
  const productsPerPage = 10;
  const navigate = useNavigate();
  
  useEffect(() => {
          const fetchData = async () => {
            try{
              const response = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
              console.log("hello",import.meta.env.VITE_API_URL)
              console.log("abc",response)
              const productData = response.data.products;
              console.log("hey",productData)

              setProduct(productData);
              console.log(productData);
          }
          catch(error){
            console.log("Error fetching product",error);

          }
          };
          fetchData();
        }, []);

  // Sample product data based on the image
  const products = product.map((prod) => ({
    
    id: prod._id,
    category: prod.category,    
    name: prod.pname,
    image: typeof prod.images === 'string' && prod.images.startsWith("http") ? prod.images : `${import.meta.env.VITE_API_URL}/uploads/${prod.images}`,
    status: prod.stock > 0 ? "In stock" : "Out of stock",
    price: prod.price
  }));
  // const products = [
  //   { id: 1, name: "Nike Air Force 1 '07 LV8", category: "Shoes", status: "In stock", price: "$122.27" ,image: i1},
  //   { id: 2, name: "Nike Sportswear Lightweight Future", category: "Caps", status: "Out of stock", price: "$15.95",image: i2 },
  //   { id: 3, name: "Nike Air Max Penny", category: "Shoes", status: "In stock", price: "$132.50",image: i3},
  //   { id: 4, name: "Nike Windrunner SYX-E", category: "Tracksuit", status: "Out of stock", price: "$102.43",image: i1 },
  //   { id: 5, name: "Nike Storm-FIT x Theory", category: "Tracksuit", status: "In stock", price: "$9.54" ,image: i3},
  //   { id: 6, name: "Nike Everyday Plus Cushioned", category: "Socks", status: "Out of stock", price: "$122.27",image: i4 },
  //   { id: 7, name: "Nike Everyday Lightweight", category: "Socks", status: "In stock", price: "$14.87" ,image: i1},
  //   { id: 8, name: "NikeCourt Dri-FIT Advantage", category: "T-Shirt", status: "Out of stock", price: "$39.85" ,image: i2},
  //   { id: 9, name: "Nike Dri-FIT Academy", category: "T-Shirt", status: "In stock", price: "$23.64",image: i2},
  //   { id: 10, name: "Nike Dri-FIT Academy", category: "T-Shirt", status: "Out of stock", price: "$27.48",image: i4 },
  //   { id: 11, name: "Nike Dri-FIT Academy", category: "T-Shirt", status: "In stock", price: "$27.48",image: i3 },
  // ];
  
  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Generate the page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const [isOpen, setIsOpen] = useState(false);

  

    
    const handleCancel = () => {
      setIsOpen(false);
    };
    
    const handleDelete = () => {
      console.log("Product deleted!");
      setIsOpen(false);
  
    };
  
  return (
    <div className="p-6 bg-white h-full shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-[#445FE8] text-white px-4 py-2 rounded-md font-semibold">
          Products
        </div>
        <button className="bg-[#445FE8] text-white px-4 py-2 rounded-md flex items-center"  onClick={() => navigate("/product/add_product")}>
          <span className="mr-1">+</span> Add product
        </button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500 uppercase text-xs">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-t border-gray-100">
                <td className="py-4 px-4 flex items-center">
                  <div className="w-10 h-10 mr-3 bg-gray-200 rounded-md flex items-center justify-center">
                  <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-md shadow-md"
                    />
                  </div>
                  <span className="font-medium text-sm">{product.name}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    product.category === "Shoes" ? "bg-blue-100 text-blue-700" :
                    product.category === "Caps" ? "bg-blue-100 text-blue-700" :
                    product.category === "Tracksuit" ? "bg-purple-100 text-purple-700" :
                    product.category === "Socks" ? "bg-blue-100 text-blue-700" :
                    "bg-purple-100 text-purple-700"
                  }`}>
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    product.status === "In stock" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-medium">{product.price}</td>
                <td className="py-4 px-4">
                  <div className="flex justify-center space-x-2">
                    <button className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center" onClick={() => navigate("/product/add_product")}>
                      <MdAdd />
                    </button>
                    <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center" onClick={() => setIsOpen(true)}>
                    <MdOutlineDeleteForever />
                    </button>
                    <DeleteProductPopup
                      isOpen={isOpen}
                      onCancel={handleCancel}
                      onDelete={handleDelete}
            
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-gray-500">
          Showing 1 to {Math.min(productsPerPage, products.length)} of {products.length} entries
        </div>
        <div className="flex items-center">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md mr-1 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {pageNumbers.map(number => (
            <button 
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 mx-1 border rounded-md ${currentPage === number ? 'bg-[#445FE8] text-white' : ''}`}
            >
              {number}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md ml-1 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
       
        </div>
      </div>
    </div>
  );
};

export default Product;