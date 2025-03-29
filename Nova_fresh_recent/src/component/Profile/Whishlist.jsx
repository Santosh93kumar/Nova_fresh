import React from "react";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from '../Home/WishlistContext';

function Wishlist() {
  const { wishlist, toggleWishlistItem } = useWishlist();

  return (
    <div className="pt-25 m-2">
      <h2 className="text-lg font-bold mb-2">Your Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500">Your wishlist is empty</p>
          <p className="text-sm text-gray-400 mt-2">Browse products and add items to your wishlist!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {wishlist.map((product, i) => (
            <div key={i} className="p-4 border rounded-md flex flex-col items-center relative">
              <FaHeart
                className="absolute top-2 right-2 text-xl cursor-pointer text-red-500"
                onClick={() => toggleWishlistItem(product)}
              />
              <img src={product.image} alt={product.name} className="h-20 w-20" />
              <p className="text-sm font-bold text-center">{product.name}</p>
              <p className="text-xs text-gray-500">{product.price} | {product.weight}</p>
              <button className="bg-green-500 text-white p-2 mt-2 text-xs rounded-md w-full">ADD</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;