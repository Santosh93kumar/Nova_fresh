import React from 'react'
import image from "../images/Category.png"
function Recommendation() {
  const products = [
    {
      id: 1,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 2,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 3,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 4,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 5,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 6,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 7,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 8,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 9,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 10,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 11,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
    {
      id: 12,
      name: "Tedhe Medhe",
      price: 10,
      weight: "250g",
      image
    },
  ];
  return (
    <>
     
      
      
      
      
          <div className="p-4">
            <p className=" mb-4">Recommendation</p>
            <div className="flex flex-wrap justify-center gap-4 ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow-md text-center w-[50%] sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <img src={product.image} alt={product.name} className="w-32 mx-auto" />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="flex justify-between">
                    <p>Rs. {product.price}</p>
                    <p>{product.weight}</p>
                  </div>
                  <button className="w-full mt-2 px-4 py-1 border rounded-[8px]">ADD</button>
                </div>
              ))}
            </div>
          </div>
       
      
     
      
      
      
    
    </>
  )
}

export default Recommendation
