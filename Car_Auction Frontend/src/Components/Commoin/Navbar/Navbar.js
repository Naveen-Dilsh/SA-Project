import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from '../Pictures/logo.png';
import AuthContext from '../../../Context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const SearchBar = () => (
    <div className="relative">
      <input
        type="text"
        className="w-full px-3 py-1 border border-black rounded-full"
        placeholder="Search"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="w-5 h-5 text-gray-500"
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
  );

  const AuthButtons = () => (
    <>
      {!user ? (
        <>
          <button className="px-3 py-2 text-sm font-medium text-black no-underline border border-black hover:bg-gray-100">
            Sign in
          </button>
          <Link to="/login">
            <button className="px-3 py-2 text-sm font-medium text-white no-underline bg-black hover:bg-gray-700">
              Log in
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/user-profile">
            <button className="px-3 py-2 text-sm font-medium text-black no-underline border border-black hover:bg-gray-100">
              User
            </button>
          </Link>
          <button 
            onClick={handleLogout} 
            className="px-3 py-2 text-sm font-medium text-white no-underline bg-black hover:bg-gray-700"
          >
            Log out
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="container px-14 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img className="w-12 h-12" src={logo} alt="Logo" />
          </div>

          {/* Search Bar for Mobile View */}
          <div className="flex mx-4 md:hidden">
            <SearchBar />
          </div>

          {/* Full Menu for Large Screens */}
          <div className="items-center justify-between flex-1 hidden md:flex">
            <div className="flex items-center space-x-4 lg:space-x-8">
              {/* Navigation Links */}
              <Link to="/">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 no-underline">
                  Home
                </button>
              </Link>

              {/* Search Bar for Desktop */}
              <div className="relative hidden w-48 md:block">
                <SearchBar />
              </div>

              <Link to="/auction-listings">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 no-underline">
                Browse Cars
              </button>
              </Link>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 no-underline">
                About Us
              </button>
              <Link to ="/contact-us">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 no-underline">
                Contact Us
              </button>
              </Link>
            </div>

            {/* Authentication Buttons */}
            <div className="flex space-x-4">
              <AuthButtons />
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-2 space-y-2 md:hidden">
            {/* Search Bar for Mobile Menu */}
            <SearchBar />

            {/* Navigation Links for Mobile Menu */}
            <Link to="/">
              <button className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-md">
                Home
              </button>
            </Link>
            <button className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-md">
              Browse Cars
            </button>
            <button className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-md">
              About Us
            </button>
            <button className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-md">
              Contact Us
            </button>
            <div className="flex px-3 py-2 space-x-2">
              <AuthButtons />
            </div>
          </div>
        )}
      </div>

      <hr className="shadow-md" />
    </nav>
  );
};

export default Navbar;
