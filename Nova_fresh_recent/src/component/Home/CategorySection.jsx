import ProductImage from '.././images/hero.png'
import React from 'react';


  const CategorySection = ({categories}) => {
    return (
      <div className="mx-10 flex overflow-x-auto space-x-4 p-4 bg-white">
        {categories.map((category, i) => (
          <div key={i} className="flex flex-col items-center p-2">
            <img src={ProductImage} alt={category} className="h-16 w-16 mb-2" />
            <p className="text-xs font-semibold">{category}</p>
          </div>
        ))}
      </div>
    );
  };

  export default CategorySection;