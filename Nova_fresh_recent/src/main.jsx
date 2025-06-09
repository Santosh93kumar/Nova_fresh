import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishlistProvider } from "./component/Home/WishlistContext.jsx";
import { ToastContainer } from "react-toastify";
import Toast from "./component/Home/Toast";
import { ProductProvider } from "./context/ProductContext.jsx";
const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById("root")).render(
  // <StrictMode >
  <Provider store={store}>
    <AuthProvider>
      <WishlistProvider>
        <ToastContainer />
        <Toast />
        <ProductProvider>
          <App />
        </ProductProvider>
      </WishlistProvider>
    </AuthProvider>
  </Provider>
  // </StrictMode>,
);
