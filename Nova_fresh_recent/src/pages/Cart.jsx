import React from "react";
import { useProduct } from "../context/ProductContext";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = ({ isCartOpen, setIsCartOpen }) => {
  const { setSelectedProduct, setAddToCart, addToCart } = useProduct();
  const navigate = useNavigate();

  const handleClick = (product) => {
    setSelectedProduct(product);
    navigate("/detail");
  };

  const removeFromCart = (product) => {
    toast.warn(`${product.name} removed from cart! 🛒`, { autoClose: 1500 })
    
    setAddToCart(addToCart.filter((item) => item.id !== product.id));
    
  };


  const increaseQuantity = (product) => {
    setAddToCart(
      addToCart.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setAddToCart(
      addToCart
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Prevents items with quantity 0
    );
  };

  const totalPrice = addToCart.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)), 0
  );


  return (
    <>
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header (Fixed) */}
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <button
            className="cursor-pointer text-3xl"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            ×
          </button>
        </div>

        {/* Scrollable Product List */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)] mt-2 scrollbar-hide">
          {addToCart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <ul>
              {addToCart.map((item, index) => (
                <div
                  key={index}
                  className="relative flex p-4 m-3 shadow-md rounded-md bg-gray-100"
                >
                  <img
                    onClick={() => {
                      handleClick(item);
                      setIsCartOpen(!isCartOpen);
                    }}
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 cursor-pointer"
                  />

                  <button
                    className="absolute top-1 right-1 cursor-pointer text-2xl"
                    onClick={() => removeFromCart(item)}
                  >
                    ×
                  </button>

                  <div className="ml-3 flex flex-col gap-y-1">
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-md">Rs.{item.price}</p>
                    <p className="text-xs text-gray-500">{item.weight}</p>
                    <div className="flex items-center">
                    <button
                      className="cursor-pointer hover:opacity-50"
                      onClick={() => decreaseQuantity(item)}
                    >
                      <FiMinusCircle />
                    </button>
                    <p className="mx-3">{item.quantity || 1}</p>
                    <button
                      className="cursor-pointer hover:opacity-50"
                      onClick={() => increaseQuantity(item)}
                    >
                      <FiPlusCircle />
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>

             {/* Total Price Section */}
        <div className="py-3 px-4 flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>{totalPrice}</span>
        </div>

        {/* Buy Now Button (Fixed) */}
        <div className="py-3  flex justify-center">
          <button onClick={()=>{
            navigate("/checkout")
            setIsCartOpen(!isCartOpen)
          }} className="bg-[#76BA1F]  px-6 py-2 rounded-md w-full">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
