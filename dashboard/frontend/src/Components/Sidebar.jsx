import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  ShoppingBasket, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  Settings, 
  LogOut
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid size={20} />, path: "/dashboard" },
    { id: 'products', label: 'Products', icon: <ShoppingBasket size={20} />, path: "/product" },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} />, path: "/order" },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} />, path: "/payment" },
    { id: 'customers', label: 'Customers', icon: <Users size={20} />, path: "/customer" },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: "/setting" },
    { id: 'logout', label: 'Logout', icon: <LogOut size={20} />, path: "/logout" }
  ];
  
  
  const [activePage, setActivePage] = useState('dashboard');
  
  
  useEffect(() => {
    
    if (location.pathname === '/') {
      // setActivePage('dashboard');
      return;
    }
    
    // Remove leading slash and find matching menu item
    const path = location.pathname.slice(1);
    const matchingItem = menuItems.find(item => item.path === `/${path}`);
    
    if (matchingItem) {
      setActivePage(matchingItem.id);
    }
  }, [location.pathname]);
  
  const handleNavigation = (item) => {
    setActivePage(item.id);
    navigate(item.path);
    
   
    // console.log('Active page set to:', item.id);
  };
  
  return (
    <div className="flex h-auto border-r border-gray-200 shadow-xl rounded-lg">
    
      <div className="bg-white w-16 md:w-64 shadow-sm h-full transition-all duration-300 ease-in-out">
      
        <div className="p-4 flex items-center justify-center md:justify-start cursor-pointer" onClick={() => handleNavigation(menuItems[0])}>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <span className="font-bold">C</span>
          </div>
          <h1 className="ml-2 text-lg font-medium hidden md:block">NexaBoard</h1>
        </div>
        

        <nav className="mt-6">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="px-2 py-2">
                <button
                  onClick={() => handleNavigation(item)}
                  className={`flex items-center text-center w-full px-3 py-2 rounded-md transition-colors ${
                    activePage === item.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex justify-center md:mr-3">{item.icon}</span>
                  <span className="hidden md:block">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;