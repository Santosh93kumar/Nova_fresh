import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom'
import ProductImage from '../component/images/Category.png'
import { useProduct } from "../context/ProductContext";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";
import { useWishlist  } from "../component/Home/WishlistContext";
import axios from "axios";
function Category() {
    const {category}= useParams()
    const [product , setproduct] = useState([]);
    const decodedCategory = decodeURIComponent(category);
    const navigate = useNavigate();
    const { toggleWishlistItem, isInWishlist } = useWishlist();
    const { setSelectedProduct, setAddToCart, addToCart } = useProduct();

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/`);
          const product = response.data; // The full response object
          
          console.log("Full API Response:", product);
      
          // Extract the 'products' array
          const productList = product.products; 
      
          console.log("Extracted Products Array:", productList);
          
      
          // Ensure 'productList' is an array before filtering
          const prod = Array.isArray(productList) 
              ? productList.filter((prod) => prod.category === category) 
              : [];
      
          console.log("Filtered Products:", prod);
          setproduct(prod)
      
      } catch (error) {
          console.error("Error fetching products:", error);
      }
      
      };
  
      fetchProducts();
      console.log(fetchProducts)
    }, []);

     const addInCart = (product) => {
        setAddToCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.id === product.id);
    
          if (existingProduct) {
            toast.success(`${product.name} quantity updated! 🛒`, {
              autoClose: 1500,
            });
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            toast.success(`${product.name} added to cart! ✅`, { autoClose: 1500 });
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      };
    
    
  return (
    <div>
      <div className='mx-10 text-lg font-semibold'> {decodedCategory}</div>
      <div className='' >
        {/* {
            product.map((item, index)=>{
              
            })
        } */}
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {product.map((product) => {
                
                  return (
                    <div
                      key={product.id}
                      className="p-4 border rounded-md flex flex-col items-center relative"
                    >
                      <img
                        onClick={() => handleClick(product)}
                        src={`https://nova-fresh-backend.onrender.com/uploads/${product.images}`}
                        alt={product.name}
                        className="h-20 w-20 cursor-pointer"
                      />
                      con
        
                      <button
                        className="absolute top-2 right-2 text-xl"
                        onClick={() => toggleWishlistItem(product)}
                      >
                        {isInWishlist(product.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-400" />
                        )}
                      </button>
        
                    
        
                      <p className="text-lg font-bold text-center">{product.name}</p>
                      <p className="text-sm text-gray-700">
                        Rs.{product.price} | {product.weight}
                      </p>
        
                        <button
                          onClick={() => addInCart(product)}
                          className="bg-green-500 cursor-pointer text-white p-2 mt-2 text-xs rounded-md w-full"
                        >
                          ADD
                        </button>
                    </div>
                  );
                })}
              </div>
      </div>
       
    </div>  )
}

export default Category
