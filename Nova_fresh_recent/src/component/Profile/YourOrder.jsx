import React from "react";
import image from "../../../src/assets/react.svg";
import { FaAngleRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function YourOrder() {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 2,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      status: "Arriving On Thursday",
      weight: "250g",
      image: image
    }
  ];
  return (
    <div className="flex flex-col">
      <div className="">
        <p className="text-lg mx-10 font-semibold">Your  Order</p>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={()=>navigate('/profile/yourOrder')}
              className="border p-4 rounded-lg shadow-md text-center w-[45%] sm:w-1/2 md:w-1/3 lg:w-1/6 flex justify-between"
            >
              <div className="w-full">
                <img src={product.image} alt={product.name} className="w-32 mx-auto" />
                <p className="mt-2 font-semibold text-green-500">{product.status}</p>
                <div className="flex justify-between">
                  <p>{product.name}</p>
                  <p>{product.weight}</p>
                </div>
              </div>

              <div className="cursor-pointer">
                <Link to="/profile/yourOrder">
                  <FaAngleRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default YourOrder
