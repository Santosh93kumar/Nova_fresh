
import React, { useState, useEffect, useRef } from "react";
import logo from "../component/images/logo.png";
import { 
  Search, 
  ChevronDown, 
  ShoppingCart, 
  MapPin, 
  LocateFixed,
  Menu,
  X
} from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../context/ProductContext";
import axios from "axios";
import Cart from "../pages/Cart";
import { toast } from "react-toastify";

function Header() {
  const { user, logout } = useAuth();
  const { addToCart } = useProduct();
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationPopup, setLocationPopup] = useState(false);
  const [city, setCity] = useState("Select your location");
  const [isOpen, setIsOpen] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [logInModal, setLogInModal] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPopup, setSearchPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setMobileSearchOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("popup-overlay")) {
      setLocationPopup(false);
    }
  };

  // Handle selecting a suggestion for location
  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.display_name);
    setSuggestions([]);
    setCity(suggestion.display_name);
    setLocationPopup(false); // Clear suggestions after selection
  };

  // Handle input change and fetch suggestions for location
  const handleInputChange = (e) => {
    setLocation(e.target.value);
    fetchSuggestions(e.target.value);
  };

  // Fetch location suggestions dynamically from OpenStreetMap API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=IN`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        setIsOpen(false);
        setMobileMenuOpen(false);
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // Detect user's location using Geolocation API
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            if (data && data.address) {
              const detectedCity =
                data.address.city ||
                data.address.state_district ||
                data.address.state ||
                data.address.town ||
                data.address.village ||
                data.address.county ||
                "Unknown Location";
              setCity(detectedCity);
              toast.success(`Location detected: ${detectedCity}`, {
                position: "top-right",
              });
              setLocationPopup(false);
            }
          } catch (error) {
            toast.error("Failed to fetch location. Try again!", {
              position: "top-right",
            });
          }
        },
        () => {
          toast.error("Location access denied!", { position: "top-right" });
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.", {
        position: "top-right",
      });
    }
  };

  //Search location including suggestions
  const searchLocation = async (query) => {
    if (!query) {
      toast.error("Please enter a location to search!");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=IN`
      );
      const data = await response.json();
      if (data.length > 0) {
        const foundCity = data[0].display_name;
        toast.success(`Location found: ${foundCity}`);
        setCity(foundCity);
        setLocationPopup(false);
      } else {
        toast.error("No results found for the given location!");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search location. Try again!");
    }
  };

  //search product
  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error("Product name is required");
      return;
    }
    console.log("Searching for:", query);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/search?q=${query}`
      );
      setSearchResults(data);
      setMobileSearchOpen(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Error fetching search results. Try again!");
      }
      console.error("Error fetching search results:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close search if menu is being opened
    if (!mobileMenuOpen) {
      setMobileSearchOpen(false);
    }
  };
  
  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    // Close menu if search is being opened
    if (!mobileSearchOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <div className="relative flex w-full py-3 px-4 md:px-8 lg:px-12 items-center shadow-md z-30 bg-white">
        {/* Logo */}
        <div className="w-1/3 md:w-2/12 flex items-center">
          <Link to="/">
            <img
              src={logo}
              className="w-16 h-8 md:w-full md:h-auto object-contain flex items-center my-auto"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Mobile: Hamburger Menu and Search Icon */}
        <div className="w-2/3 md:hidden flex justify-end items-center gap-4">
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 text-[10px] bg-red-800 text-white rounded-full w-4 h-4 flex items-center justify-center">
              {addToCart.length}
            </span>
          </button>
          <Search className="cursor-pointer" onClick={toggleMobileSearch} />
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop: Search Section */}
        <div className="hidden md:flex w-6/12">
          <div className="flex w-10/12 border border-black rounded-lg m-auto">
            <div className="pl-4 py-2">
              <Search />
            </div>
            <input
              type="text"
              placeholder="Search your item"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border-none outline-none px-2 py-2 w-full"
              onFocus={() => setSearchPopup(true)}
              onBlur={() => setTimeout(() => setSearchPopup(false), 200)}
            />
          </div>
        </div>

        {/* Desktop: Location, Cart & Profile Icon */}
        <div className="hidden md:flex items-center justify-end my-auto w-4/12">
          <div className="flex md:gap-3 lg:gap-6 justify-between items-center">
            <div className="flex">
              <button onClick={() => setLocationPopup(true)}>
                <div className="flex cursor-pointer items-center">
                  <p className="text-sm lg:text-base truncate max-w-32">{city}</p>
                  <ChevronDown />
                </div>
              </button>
            </div>

            <div>
              <button onClick={() => setIsCartOpen(!isCartOpen)}>
                <div className="flex cursor-pointer relative">
                  <ShoppingCart />
                  <span className="absolute -top-2 -right-3 text-[10px] bg-red-800 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {addToCart.length}
                  </span>
                </div>
              </button>
            </div>

            <div className="cursor-pointer">
              {user ? (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s"
                  alt=""
                  className="w-8 h-8 rounded-full"
                  onClick={() => setIsOpen(true)}
                />
              ) : (
                <CgProfile
                  className="text-2xl"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-full left-0 right-0 bg-white z-50 shadow-lg rounded-b-lg p-4 border-t"
          >
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <button onClick={() => setLocationPopup(true)} className="flex items-center gap-1">
                <MapPin size={18} />
                <p className="text-sm truncate max-w-40">{city}</p>
                <ChevronDown size={16} />
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <Link to="/profile/order" className="py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                    Your Orders
                  </Link>
                  <Link to="/profile/whishlist" className="py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                    Your Wish List
                  </Link>
                  <Link to="/profile/recommendation" className="py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                    Your Recommendation
                  </Link>
                  <Link to="/profile" className="py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <button className="text-left py-2 border-b text-red-600" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="py-2 border-b"
                    onClick={() => {
                      setLogInModal(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="py-2 border-b"
                    onClick={() => {
                      setSignUpModal(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Signin
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div 
            ref={searchRef}
            className="absolute top-full left-0 right-0 bg-white z-50 shadow-lg p-3 border-t"
          >
            <div className="flex border border-gray-300 rounded-lg">
              <div className="pl-3 py-2">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search your item"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setMobileSearchOpen(false);
                  }
                }}
                className="border-none outline-none px-2 py-2 w-full"
                autoFocus
              />
              <button 
                onClick={() => {
                  handleSearch();
                  setMobileSearchOpen(false);
                }}
                className="bg-gray-100 px-3 rounded-r-lg"
              >
                Search
              </button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => {
                      setQuery(result.pname);
                      setSearchResults([]);
                      setMobileSearchOpen(false);
                    }}
                  >
                    {result.pname}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Popup Modal */}
        {isOpen && (
          <div
            className="absolute z-40 right-5 top-14 bg-white rounded-lg w-52 shadow-xl p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg w-full">
              <div className="flex justify-between p-2">
                <div className="flex flex-col gap-y-2">
                  {user && (
                    <Link to="/profile/order" className="hover:bg-gray-100 p-1 rounded">
                      Your Orders
                    </Link>
                  )}

                  {user && (
                    <Link to="/profile/whishlist" className="hover:bg-gray-100 p-1 rounded">
                      Your Wish List
                    </Link>
                  )}
                  
                  {user && (
                    <Link to="/profile/recommendation" className="hover:bg-gray-100 p-1 rounded">
                      Your Recommendation
                    </Link>
                  )}

                  {user && (
                    <Link to="/profile" className="hover:bg-gray-100 p-1 rounded">
                      Profile
                    </Link>
                  )}

                  {user ? (
                    <button 
                      className="text-left hover:bg-gray-100 p-1 rounded text-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        className="text-left hover:bg-gray-100 p-1 rounded"
                        onClick={() => {
                          setLogInModal(true);
                          setIsOpen(false);
                        }}
                      >
                        Login
                      </button>
                      <button
                        className="text-left hover:bg-gray-100 p-1 rounded"
                        onClick={() => {
                          setSignUpModal(true);
                          setIsOpen(false);
                        }}
                      >
                        Signin
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  <RxCross2 className="cursor-pointer text-lg text-gray-600 hover:text-black" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Component */}
        {isCartOpen && (
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}
      </div>

      {/* Location Popup */}
      {locationPopup && (
        <div
          className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center popup-overlay bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-96 overflow-y-auto">
            <div className="flex border border-gray-300 rounded-lg bg-white mb-4 md:mb-6">
              <div className="pl-4 py-2">
                <Search className="text-gray-500" />
              </div>
              <input
                type="text"
                value={location}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchLocation(location);
                }}
                placeholder="Search delivery location"
                className="border-none outline-none px-2 py-2 w-full"
              />
            </div>

            <div className="flex flex-col md:flex-row md:justify-end gap-3 items-center">
              <p className="text-center md:text-right text-sm md:text-base md:mr-4">
                Give us your exact location for seamless delivery
              </p>
              <button
                className="bg-lime-600 text-black px-4 py-2 rounded flex items-center gap-1 whitespace-nowrap"
                onClick={() => {
                  if (!location) {
                    detectLocation();
                  } else {
                    searchLocation(location);
                  }
                }}
              >
                <LocateFixed className="w-5 h-5" /> Detect my Location
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="mt-4 rounded-lg bg-white">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-300"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <MapPin className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                    <span className="flex-1 truncate">{suggestion.display_name}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setLocationPopup(false)}
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded w-full md:w-auto md:float-right"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Desktop Search Results Dropdown */}
      {searchPopup && searchResults.length > 0 && !mobileSearchOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-5/12 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-40">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => {
                setQuery(result.pname);
                setSearchResults([]);
              }}
            >
              {result.pname}
            </div>
          ))}
        </div>
      )}

      {/* Signup Popup Modal */}
      {signUpModal && (
        <Signup setSignUpModal={setSignUpModal} setLogInModal={setLogInModal} />
      )}

      {/* Login Popup Modal */}
      {logInModal && (
        <Login setSignUpModal={setSignUpModal} setLogInModal={setLogInModal} />
      )}
    </>
  );
}

export default Header;