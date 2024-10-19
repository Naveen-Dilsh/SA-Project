import React, { useState } from 'react';
import logo from '../../User/Wishlist/Images1/logo1.png';


import { Dashboard, Storage, WbSunny, Favorite } from '@mui/icons-material';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="w-full bg-white py-4 px-6 shadow-sm" style={{ borderBottom: '4px solid #ADD8E6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 lg:h-12 lg:w-12"
              src={logo} 
              alt="Logo"
            />
          </div>

          
          <div className="flex mx-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-1 border border-black rounded-full "
                placeholder="Search"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a7 7 0 111.414-1.414l4.292 4.293a1 1 0 01-1.414 1.414l-4.292-4.293zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          
          <div className="hidden md:flex items-center justify-between flex-1">
            <div className="flex space-x-4 lg:space-x-8 items-center">
              <a href="#" className="text-black-300 px-2 lg:px-3 py-1 lg:py-2 rounded-md text-sm lg:text-base font-medium">Home</a>
              <div className="w-48 mx-4 hidden md:block text-black">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-1 border border-black rounded-full focus:outline-none focus:ring "
                    placeholder="Search"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.9 14.32a7 7 0 111.414-1.414l4.292 4.293a1 1 0 01-1.414 1.414l-4.292-4.293zM8 14a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <a href="#" className="text-black-500 px-2 lg:px-3 py-1 lg:py-2 rounded-md text-sm lg:text-base font-medium">Browse Cars</a>
              <a href="#" className="text-black-500 px-2 lg:px-3 py-1 lg:py-2 rounded-md text-sm lg:text-base font-medium">About Us</a>
              <a href="#" className="text-black-500 px-2 lg:px-3 py-1 lg:py-2 rounded-md text-sm lg:text-base font-medium">Contact Us</a>
            </div>

            <div className="flex items-center space-x-4">
              
              <button className="relative">
                <svg
                  className="h-10 w-8 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

             
              <div className="relative">
                <button onClick={toggleDropdown} className="relative">
                  <svg
                    className="h-6 w-6 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  >
                    
                    <circle cx="12" cy="12" r="11" stroke="black" strokeWidth="2" fill="none" />
                    
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                </button>

                
        {dropdownOpen && (
          <div className="absolute right-0  w-2xl bg-white shadow-lg  z-10 p-4 border-2 border-gray-800 ">
            <div className="py-2">
              <a href="#" className="flex items-center  w-48 px-4 py-2 text-gray-800 bg-blue-100 hover:bg-blue-400 border-4 border-white">
                <Dashboard className="mr-2" /> Profile
              </a>
              <a href="#" className="flex items-center w-48 px-4 py-2 text-gray-800 bg-blue-100 hover:bg-blue-400 border-4 border-white">
                <Storage className="mr-2" /> Auction History
              </a>
              <a href="#" className="flex items-center w-48 px-4 py-2 text-gray-800 bg-blue-100 hover:bg-blue-400 border-4 border-white">
                <WbSunny className="mr-2" /> Active Bids
              </a>
              <a href="#" className="flex items-center w-48 px-4 py-2 text-gray-800 bg-blue-100 hover:bg-blue-400 border-4 border-white">
                <Favorite className="mr-2" /> Wishlist
              </a>
            </div>
          </div>
  
     )}
              </div>

              
              <a
                href="#"
                className="text-white bg-black hover:bg-gray-700 px-3 py-2 text-sm font-medium rounded-md "
              >
                Log out
              </a>
            </div>
          </div>

          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)} // Toggle menu
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        
        {menuOpen && (
          <div className="md:hidden mt-2">
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Browse Cars
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </a>
              <div className="flex space-x-2 mt-2">
                
                <a
                  href="#"
                  className="text-white bg-black hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log Out
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
