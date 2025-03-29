import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Get wishlist from localStorage on initial load
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // State for toast notification
  // const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Function to show toast notification
  const showToast = (message, type = 'success') => {
    toast.success(`${product.name} added to wishlist`, 'success');

    // Auto hide toast after 3 seconds
    // setTimeout(() => {
    //   // setToast({ show: false, message: '', type: '' });
    // }, 3000);
  };

  // Function to toggle items in wishlist
  const toggleWishlistItem = (product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      
      if (isInWishlist) {
        // Remove from wishlist and show toast
        toast.warn(`${product.name} removed from wishlist`, 'error');
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        // Add to wishlist and show toast
        toast.success(`${product.name} added to wishlist`, 'success');
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlistItem, isInWishlist, toast }}>
      {children}
    </WishlistContext.Provider>
  
  );
};

export const useWishlist = () => useContext(WishlistContext);