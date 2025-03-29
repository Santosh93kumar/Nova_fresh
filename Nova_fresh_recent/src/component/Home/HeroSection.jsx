
import Hero from '../images/hero.png' 
import React from "react";
const HomeImage = () => {
  return (
    <section className="w-full flex justify-center">
      <img src={Hero} alt="Dashboard Preview" className="w-full max-w-8xl rounded-lg" />
    </section>
  );
};

export default HomeImage;
