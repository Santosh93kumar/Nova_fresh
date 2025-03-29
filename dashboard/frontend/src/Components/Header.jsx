import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const currentDate = new Date();
  
  
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  const navigate = useNavigate();

  return (
    <div className="w-full p-2 bg-white">
      <div className="flex items-center justify-between max-w-full mx-auto">
        
        <div className="relative w-64 sm:w-72 md:w-80">
          <div className="border border-gray-400 rounded-md p-1 flex items-center">
            <Search className="h-5 w-5 text-gray-400 ml-1" />
            <input
              type="text"
              placeholder="Search something here..."
              className="w-full px-2 py-1 outline-none text-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        
        {/* Right Section  */}
        <div className="flex items-center gap-2">
          {/* Date */}
          <div className="flex items-center p-2">
            <Calendar className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-sm hidden sm:inline">{formattedDate}</span>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold">
              SS
            </div>
            <div className="hidden md:block cursor-pointer">
              <p className="text-sm font-semibold">Shubham Sharma</p>
              <p className="text-xs text-gray-500">webdesignshubham@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;