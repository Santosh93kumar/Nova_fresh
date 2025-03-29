import react from 'react'
import ProductImage from './images/Category.png'

const Watchlist = () => {
  const watchlistProducts = new Array(12).fill({
    name: "Tedhe Medhe",
    price: "Rs. 10",
    weight: "250g",
    image: `${ProductImage}`
  });

  const [favorites, setFavorites] = useState(Array(12).fill(true));

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites];
      updatedFavorites[index] = !updatedFavorites[index];
      return updatedFavorites;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Your Watchlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {watchlistProducts.map((product, i) => (
          <div key={i} className="p-4 border rounded-md flex flex-col items-center relative">
            <FaHeart
              className={`absolute top-2 right-2 text-xl cursor-pointer transition-colors duration-300 ${
                favorites[i] ? "text-red-500" : "text-gray-300"
              }`}
              onClick={() => toggleFavorite(i)}
            />
            <img src={product.image} alt={product.name} className="h-20 w-20" />
            <p className="text-sm font-bold text-center">{product.name}</p>
            <p className="text-xs text-gray-500">{product.price} | {product.weight}</p>
            <button className="bg-green-500 text-white p-2 mt-2 text-xs rounded-md w-full">ADD</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
