import React from "react";
import i1 from '../../assets/snekar.png'
import i2 from '../../assets/bag.png'
import i3 from '../../assets/coat.png'
import i4 from '../../assets/denim.png'
// import CheckLogin from "../Login";
function Dashboard() {
  return (
   <>
   

{/* <CheckLogin /> */}

    <div className="overflow-x-hidden w-full max-w-screen p-4 md:p-6 xl:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-lg md:text-xl font-semibold my-3 ">DashBoard</h1>
        {/* Dashboard Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        <div className="flex items-center justify-between bg-white px-4 rounded-lg shadow">
          <div>
            <h3 className="text-gray-900 font-semibold py-4">Sales Total</h3>
            <p className="text-base md:text-lg font-semibold">$33,799</p>
          </div>
          <div>
            <p className="text-sm text-green-500 ml-20 py-4">↑ 25%</p>
            <p className="text-xs md:text-sm text-gray-700">compared to Dec 2024</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow">
          <div>
            <h3 className="text-gray-900 font-semibold py-4">Avg Order Value</h3>
            <p className="text-base md:text-lg font-semibold">$339,90</p>
          </div>
          <div>
            <p className="text-sm text-red-500 ml-20 py-4">↓ 15%</p>
            <p className="text-xs md:text-sm text-gray-700">compared to Dec 2024</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white px-4 rounded-lg shadow">
          <div>
            <h3 className="text-gray-900 font-semibold py-4">Total Orders</h3>
            <p className="text-base md:text-lg mb-2 font-semibold">564</p>
          </div>
          <div>
            <p className="text-sm text-green-500 ml-20 py-4">↑ 5%</p>
            <p className="text-xs md:text-sm text-gray-700">compared to Dec 2024</p>
          </div>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div className=" w-full mt-6 ">
        <div className="flex flex-col lg:flex-row gap-6">
         
          <div className="bg-white w-8/12 p-6 rounded-lg shadow flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Revenue Analytics</h3>
              <select className="p-2 rounded cursor-pointer">
                <option>Yearly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="w-full md:w-full xl:w-150 h-64 mt-4 rounded-lg flex items-center justify-center">
              <span >[Chart Placeholder]</span>
            </div>
          </div>

         
          <div className="p-6 rounded-lg w-4/12  bg-white shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Most Selling Products</h3>
              <select className="border px-2 rounded cursor-pointer">
                <option>Yearly</option>
                <option>Monthly</option>
              </select>
            </div>

            <ul className="mt-4 divide-y rounded-lg overflow-x-auto">
              {[
                { name: "Snicker Vento", id: "#244NV", sales: 400, image: i1 },
                { name: "Bag Pack", id: "#244MC", sales: 200, image: i2 },
                { name: "Full Coat", id: "#244XO", sales: 150, image: i3 },
                { name: "Denim Jeans", id: "#244AB", sales: 120, image: i4 },
              ].map((product, index) => (
                <li
                  key={index}
                  className="flex items-center w-full md:w-[95%] justify-between py-3 my-4 bg-white shadow hover:bg-gray-300 px-2 rounded-lg transition"
                >
               
                  <div className="flex cursor-pointer items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-3xl shadow-md"
                    />
                    <span className="text-xs md:text-base">
                      <strong>{product.name}</strong>
                      <small className="text-gray-500 ml-2">{product.id}</small>
                    </span>
                  </div>

                
                  <span className="border border-gray-300 px-1 py-1 rounded-full text-xs md:text-sm">
                    {product.sales} sales
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full  bg-white rounded-lg mt-4 shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-semibold  px-3">Recent Ordering</h2>
          <select className="border border-gray-300 rounded  md:py-2">
            <option>Today</option>
            <option>Monthly</option>
          </select>
        </div>
        <div className="w-full px-3   bg-white  rounded-lg">
          <ul className="flex md:gap-8 xl:gap-12 cursor-pointer  text-gray-500 md:text-sm xl:text-md">
            <li>Order ID</li>
            <li>Date</li>
            <li>Customer Name</li>
            <li>Email ID</li>
            <li>Contact Number</li>
            <li>Product</li>
            <li>Brand</li>
            <li>Qty</li>
            <li>Status</li>
          </ul>

          <ul className="w-full flex md:gap-8 xl:gap-12  cursor-pointer py-2 px-1 mt-6 text-gray-900 md:text-xs xl:text-xs ">
            <li>#2345GL</li>
            <li>19-02-25</li>
            <li>Shubham S.</li>
            <li>1234@gmail.com</li>
            <li>+91 7017148769</li>
            <li>Ripped Jeans</li>
            <li>Levis</li>
            <li>1 pc</li>
            <li><button className="px-4 py-1  lg:-ml-5  md:ml-5 cursor-pointer hover:bg-green-500 hover:text-green-900 rounded-xl bg-green-300 text-green-700">Done</button>
            </li>
          </ul>
        </div>

      </div>

    </div>



   
   </>
  )
}

export default Dashboard
