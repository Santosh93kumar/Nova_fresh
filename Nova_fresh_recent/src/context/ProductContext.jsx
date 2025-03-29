import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const ProductContext = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState([]);

  
  // Load cart from localStorage on component mount
  const [addToCart, setAddToCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(addToCart));
  }, [addToCart]);

  return (
    <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, addToCart, setAddToCart, product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook for using Product Context
export const useProduct = () => useContext(ProductContext);
