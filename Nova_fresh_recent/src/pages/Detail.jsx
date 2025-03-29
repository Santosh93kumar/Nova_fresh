import React, { useState } from "react";
// import { useProduct } from "../context/ProductContext";
// import products from "../../data.json";
// import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import CategorySection from "../component/Home/CategorySection";
import ProductGrid from "../component/Home/ProductGrid";
import { toast } from "react-toastify";

const categories = [
  "Fruits & Vegetables",
  "Atta, Rice & Dal",
  "Dairy, Bread & Eggs",
  "Snacks",
  "Pharma & Wellness",
  "Home & Office Stationery",
];

const Detail = () => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (product) => {
    setWatchlist(
      (prev) =>
        prev.some((p) => p.id === product.id)
          ? prev.filter((p) => p.id !== product.id) // Remove if already added
          : [...prev, product] // Add if not present
    );
  };

  const { selectedProduct, setAddToCart } = useProduct();
  const navigate = useNavigate();
  console.log(selectedProduct);

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

  if (!selectedProduct) {
    return (
      <p className="text-center text-xl font-bold mt-10">
        No product selected.
      </p>
    );
  }
  // const relatedProducts = products.filter((p) =>p.category!==selectedProduct.category && p.id !== selectedProduct.id);

  // const category = ()=>{

  //   navigate(`/${selectedProduct.category}`)
  // }
  return (
    <>
      <div className="pt-[12vh]">
        <div className="">
          {/* Back Button */}
          <button
            onClick={() => {
              navigate("/");
            }}
            className="text-blue-500 mb-4 rounded shadow-black shadow-2xs"
          >
            &lt; Back
          </button>
        </div>

        {/* Product Details */}
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/3">
              <img
                src={selectedProduct.image} // Replace with actual image URL
                alt="image"
                className="w-full"
              />
            </div>

            {/* Product Info */}
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-600 mb-2">{selectedProduct.weight}</p>
              <p className="text-lg font-semibold text-red-600 mb-2">
                {selectedProduct.price}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    addInCart(selectedProduct)
                  }}
                  className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-600"
                >
                  ADD
                </button>
                <button
                  onClick={() => {
                    addInCart(selectedProduct)
                    navigate("/checkout");
                  }}
                  className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-600"
                >
                  BUY NOW
                </button>
              </div>

              {/* Key Features */}
              <div className="mt-4">
                <h3 className="font-bold mb-2">Product Description</h3>
                <ul className="list-disc pl-5">
                  <li>{selectedProduct.short_description}</li>
                  <li>{selectedProduct.long_description}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Carousel */}
          <div className="mt-4 flex space-x-2 overflow-x-auto">
            {[1, 2, 3, 4].map((item) => (
              <img
                key={item}
                src={selectedProduct.image} // Replace with actual image URL
                alt={`Bingo Tedhe Medhe ${item}`}
                className="w-24 h-24 object-cover"
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-100 min-h-screen">
          {categories.map((category, index) => (
            <ProductGrid
              key={index}
              category={category}
              addToWatchlist={addToWatchlist}
              watchlist={watchlist}
            />
          ))}
        </div>

        {/* <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedProducts.map((p) => (
           <ProductCard key={p.id} product={p}/>
          ))}
        </div>
        <button onClick={category}  className="flex z-50 text-blue-500 mt-4">See more</button>
      </div>  */}
      </div>
    </>
  );
};

export default Detail;
