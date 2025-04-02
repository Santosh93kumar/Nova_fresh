import ProductImage from '.././images/hero.png'
import React from 'react';


  const CategorySection = ({categories}) => {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 bg-white px-8 sm:px-10 md:px-12">
  {categories.map((category, i) => (
    <div key={i} className="flex flex-col items-center bg-gray-100 p-2">
      <img src={ProductImage} alt={category} className="h-16 w-16 object-cover rounded-xl  shadow-md" />
      <p className="text-xs font-semibold text-center mt-2">{category}</p>
    </div>
  ))}
</div>
    );
  };

  export default CategorySection;