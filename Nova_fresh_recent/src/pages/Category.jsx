import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom'
import ProductImage from '../component/images/Category.png'
import { useProduct } from "../context/ProductContext";
import { toast } from "react-toastify";

function Category() {

  const {setSelectedProduct, setAddToCart, product} = useProduct();
  const navigate = useNavigate();

  const handleClick = (product)=>{
    setSelectedProduct(product);
    navigate("/detail");
  }

  // const products = product.map((product, index) => ({
  //   id: `${index}`,
  //   name: product.pname,
  //   price: product.price,
  //   short_description: product.short_description,
  //   long_description: product.long_description,
  //   weight: "100g",
  //   image: `http://localhost:8000/uploads/${product.images}`
  // }));

  const watchlistProducts = new Array(12).fill({
    name: "",
    price: "Rs. 10",
    weight: "250g",
    image: `${ProductImage}`
  });
    const {category}= useParams()
    const decodedCategory = decodeURIComponent(category);


     const [favorites, setFavorites] = useState(Array(12).fill(true));
      
        const toggleFavorite = (index) => {
          setFavorites((prevFavorites) => {
            const updatedFavorites = [...prevFavorites];
            updatedFavorites[index] = !updatedFavorites[index];
            return updatedFavorites;
          });
        };
        
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
       {decodedCategory}
        <div className="grid grid-cols-2 md:grid-cols-4 pt-[15vh] lg:grid-cols-6 gap-4">
                 {product.map((item, i) => (
                   <div key={i} className="p-4 border rounded-md flex flex-col items-center relative">
                     <FaHeart
                       className={`absolute top-2 right-2 text-xl cursor-pointer transition-colors duration-300 ${
                         favorites[i] ?"text-gray-300":"text-red-500"
                       }`}
                       onClick={() => toggleFavorite(i)}
                     />
                     <img onClick={()=>handleClick(item)} src={`${import.meta.env.VITE_API_URL}/uploads/${item.images}`} alt={item.pname} className="h-20 w-20" />
                     <p className="text-sm font-bold text-center">{item.pname}</p>
                     <p className="text-xs text-gray-500">{item.price} | {item.weight}</p>
                     <button 
                  onClick={() => addInCart(item)}
                  className="bg-green-500 text-white cursor-pointer p-2 mt-2 text-xs rounded-md w-full">ADD</button>
                   </div>
                 ))}
               </div>
       
    </div>  )
}

export default Category
