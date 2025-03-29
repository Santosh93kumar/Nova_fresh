import React, { useState, useEffect } from "react";
import CategorySection from "../component/Home/CategorySection";
import HeroSection from "../component/Home/HeroSection";
import ProductGrid from "../component/Home/ProductGrid";
import axios from "axios";
import { ProductProvider } from "../context/ProductContext";

const Homepage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]);

  const addToWatchlist = (product) => {
    setWatchlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/`);
        console.log("Full API Response:", response.data);

        const fetchedProducts = response.data.products;

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts); 
          console.log(fetchedProducts)

          const uniqueCategories = [
            ...new Set(
              fetchedProducts
                .map((product) => product.category)
                .filter((category) => category) 
            ),
          ];
          setCategories(uniqueCategories);
          console.log(uniqueCategories)
        } else {
          console.error("API response does not contain an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
  }, []);

  // const filteredProducts = categories
  //   ? products.filter((product) => product.category === categories)
  //   : products
    


  return (
    <ProductProvider>
    <div className="bg-gray-100 pt-16 lg:pt-[4rem]">
      <HeroSection />
      <CategorySection categories={categories} />
      {categories.map((category, index) => {
        const filteredProducts = products.filter((product) => product.category === category);
        return (
         
              <ProductGrid
              key={ index}
            category={category}
            products={filteredProducts}
            addToWatchlist={addToWatchlist}
            watchlist={watchlist}
          />

         
        );
      })}
    </div>
    </ProductProvider>
  );
};

export default Homepage;
