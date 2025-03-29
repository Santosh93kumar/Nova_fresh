import "./App.css";
import React from "react";
import Vieworder from "./Pages/order/Vieworder";
import Orderdetail from "./Pages/order/Orderdetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Orderlayout from "./Components/Orderlayout";
import DashboardLayout from "./Components/DashboardLayout";
import Productlayout from "./Components/Productlayout";
import Product from "./Pages/product/Product";
import Paymentlayout from "./Components/Paymentlayout";
import Payment from "./Pages/payment/payment";
import Paymentdetail from "./Pages/payment/Paymentdetail";
import Customerlayout from "./Components/Customerlayout";
import Customer from "./Pages/customer/customer";
import CustomerDetails from "./Pages/customer/CustomerDetails";
import Settinglayout from "./Components/Settinglayout";
import Setting from "./Pages/setting/Setting";
import AddProduct from "./Pages/product/AddProduct";
import UserRegistration from "./Components/UserRegistration";
import Login from "../src/Pages/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserRegistration />,

    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [{
        
          path: "/dashboard",
          element: <Dashboard />,

      }]
    },
    // {
    //   path: "/signup",
    //   element: <UserRegistration />,
    // },

    {
      path: "/login",
      element: <Login />,
    },

    //order
    {
      path: "/order", // No leading slash
      element: <Orderlayout />,
      children: [
        {
          path: "/order", // Nested route without leading slash
          element: <Vieworder />,
        },
        {
          path: "/order/order_detail", // Nested route without leading slash
          element: <Orderdetail />,
        },
      ],
    },
    //product
    {
      path: "/product",
      element: <Productlayout />,
      children: [
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "add_product",
          element: <AddProduct />,
        },
      ],
    },
    //payment
    {
      path: "/payment",
      element: <Paymentlayout />,
      children: [
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "payment_detail",
          element: <Paymentdetail />
        }
      ],
    },
    //customer
    {
      path: "/customer",
      element: <Customerlayout />,
      children: [
        {
          path: "/customer",
          element: <Customer />,
        },
        { 
          path:"/customer/details",
          element:<CustomerDetails />
        }
      ],
    },
    //setting
    {
      path: "/setting",
      element: <Settinglayout />,
      children: [
        {
          path: "/setting",
          element: <Setting />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
