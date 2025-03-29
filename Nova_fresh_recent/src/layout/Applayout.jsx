import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
function Applayout() {
  return (
    <>
      <Header />
      <Outlet className="pt-44" />
      <Footer />
    </>
  );
}

export default Applayout;
