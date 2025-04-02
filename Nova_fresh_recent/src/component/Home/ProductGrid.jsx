import React, { useState, useEffect } from "react";
import ProductImage from "../images/Category.png";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "./WishlistContext";
import { useProduct } from "../../context/ProductContext";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductGrid = ({ category, addToWatchlist, watchlist, products }) => {
  const navigate = useNavigate();
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  const { setSelectedProduct, setAddToCart, addToCart } = useProduct();


 
  console.log("Comment",products);
    const productsView = products.slice(0, 6).map((product, index) => ({
      // id: `${index}`,
      id: product._id,
      name: product.pname,
      price: product.price,
      short_description: product.short_description,
      long_description: product.long_description,
      weight: "100g",
      image: `${import.meta.env.VITE_API_URL}/uploads/${product.images}`
    }));
    console.log("hello",productsView)
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
              toast.success(`${product.pname} added to cart! ✅`, { autoClose: 1500 });
              return [...prevCart, { ...product, quantity: 1 }];
            }
          });
        };
  const handleClick = (product) => {
    setSelectedProduct(product);
    navigate("/detail");
  };

  return (
    <div className="px-8 sm:px-10 md:px-12">
      

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{category}</h2>
        <a
          onClick={() => navigate(`/${category}`)}
          className="text-sm text-blue-500 cursor-pointer"
        >
          See more &gt;
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {productsView.map((product) => {
          const isWatchlisted = watchlist?.some((p) => p.id === product.id);
          return (
            <div
              key={product.id}
              className="p-4 border rounded-md flex flex-col relative bg-gray-100"
            >
             <div className='h-4/5 flex justify-center items-center'>
             <img
                onClick={() => handleClick(product)}
                src={product.image}
                alt={product.name}
                className=" cursor-pointer h-20 w-24"
              />
             </div>

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

              {/* <button
                className="absolute top-2 left-2 text-red-500 text-xl"
                onClick={() => addToWatchlist(product)}
              >
                {isWatchlisted ? "❤️" : "🤍"}
              </button> */}

              <p className="text-lg font-bold   ">{product.name}</p>
              <div className="text-sm flex justify-between items-center text-gray-700 w-full">
              <span className="font-medium">Rs.{product.price}</span>
              <span>{product.weight}</span>
            </div>


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
  );
};

export default ProductGrid;
