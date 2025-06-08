import React, { useState, useEffect } from 'react';
// import edit from "../../assets/actions.png"
import { MdAdd, MdOutlineDeleteForever ,MdEdit} from "react-icons/md";
// import del from "../../assets/del.png"
import { useNavigate } from "react-router-dom";
// import i1 from '../../assets/snekar.png'
// import i2 from '../../assets/bag.png'
// import i3 from '../../assets/coat.png'
// import i4 from '../../assets/denim.png'
import DeleteProductPopup from './DeleteProduct';
import axios from 'axios';
import {toast} from 'react-toastify';

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct ] = useState([]);
  console.log("Product Object:", product);
console.log("Product ID:", product[0]?._id);

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
          
        }, [product]);

  // Sample product data based on the image
  const products = product.map((prod) => ({
    
    id: prod._id,
    category: prod.category,    
    name: prod.pname,
    image: typeof prod.images === 'string' && prod.images.startsWith("http") ? prod.images : `${import.meta.env.VITE_API_URL}/uploads/${prod.images[0]}`,
    status: prod.stock > 0 ? "In stock" : "Out of stock",
    price: prod.price
  }));
  
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
    
    const handledeleteproduct = async (productId) => {
      try {
        console.log("Deleting product with ID:", productId);
        
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/product/delete/${productId}`);;
        
        if (response.data.status === 1) {
          console.log("Product deleted successfully");
          toast.success("Product deleted successfully");
          
         
        } else {
          console.error("Error:", response.data.msg);
          toast.error("Error deleting product");
        
        }
        setIsOpen(false)
    
      } catch (err) {
        console.error("Error deleting product:", err);
       
      }
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
            {currentProducts.map((product, index) => (
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
                    <button className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center" onClick={() => navigate("/product/edit_product/" + product.id)}>
                      <MdEdit />
                    </button>
                    <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center" onClick={()=>{
                    setIsOpen(true)
                     } }>
                    <MdOutlineDeleteForever />
                    </button>
                    <DeleteProductPopup
                      isOpen={isOpen}
                      onCancel={handleCancel}
                      onDelete={handledeleteproduct}
                      productid={product.id}
                    
            
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