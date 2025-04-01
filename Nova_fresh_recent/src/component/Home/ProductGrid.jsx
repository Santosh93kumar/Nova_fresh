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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/product/");
  //       const data = await response.json();
  //       console.log(data);

  //       if (data.status == 1 && data.products) {
  //         setProduct(data.products);
  //       } else {
  //         console.log("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const products = Array.from({ length: 6 }, (_, i) => ({
  //   id: `${category}-${i}`,
  //   name: `${product.pname}`,
  //   price: 10,
  //   weight: "250g",
  //   image: ProductImage,
  //   quantity: 1,
  //   stripePriceId: "price_1R1iAFHPZ4xir96rq1dM15F6",
  // }));
  console.log("Comment",products);
    const productsView = products.slice(0, 6).map((product, index) => ({
      // id: `${index}`,
      id: product._id,
      name: product.pname,
      price: product.price,
      short_description: product.short_description,
      long_description: product.long_description,
      weight: "100g",
      image: `http://localhost:8000/uploads/${product.images}`
    }));
  
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

  const handleClick = (product) => {
    setSelectedProduct(product);
    navigate("/detail");
  };

  return (
    <div className="p-4">
      {/* Product Grid */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {product.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-md flex flex-col items-center relative"
          >
            {product.images && (
              <img
                src={`http://localhost:8000/uploads/${product.images}`}
                alt="Product Image"
                className="h-20 w-20 object-cover"
              />
            )}
            <p className="text-center font-bold">{product.pname}</p>
            <p className="text-sm text-gray-700">Rs.{product.price}</p>
          </div>
        ))}
      </div> */}

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
              className="p-4 border rounded-md flex flex-col items-center relative"
            >
              <img
                onClick={() => handleClick(product)}
                src={product.image}
                alt={product.name}
                className="h-20 w-20 cursor-pointer"
              />

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
  );
};

export default ProductGrid;
