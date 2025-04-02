import {
  createBrowserRouter,
  isRouteErrorResponse,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import React from "react";
import OrderStatus from "./component/Profile/OrderStatus";
import Applayout from "./layout/Applayout";
import Homepage from "./pages/Homepage";
import Detail from "./pages/Detail";
import Category from "./pages/Category";
import Whishlist from "./component/Profile/Whishlist";
import Profilelayout from "./layout/Profilelayout";
import Youraccount from "./component/Profile/Youraccount";
import YourOrder from "./component/Profile/YourOrder";
import Recommendation from "./component/Profile/Recommendation";
import ProtectedRoute from "./component/protectedRoute/ProtectedRoute";
import CheckOutPage from "./pages/CheckOutPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/:category",
          element: <Category />,
        },
        {
          path: "/detail",
          element: <Detail />,
        },{
          path:'/checkoutpage',
          element:<CheckOutPage/>
        }
      ],
    },
    {
      path: "/profile",
      element: <Profilelayout />,
      children: [
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Youraccount />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/order",
          element: (
            <ProtectedRoute>
              <YourOrder />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/whishlist",
          element: (
            <ProtectedRoute>
              <Whishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/recommendation",
          element: (
            <ProtectedRoute>
              <Recommendation />
            </ProtectedRoute>
          ),
        },{
          path: "/profile/yourOrder",
          element: (
            <ProtectedRoute>
              <OrderStatus />
            </ProtectedRoute>
          ),
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;