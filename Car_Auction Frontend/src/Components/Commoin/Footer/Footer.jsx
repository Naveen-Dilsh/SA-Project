import React, { useState } from 'react';
import logo from '../../User/Wishlist/Images1/logo1.png';



const Footer = () => {
  return (
    <footer className="py-20 w-full bg-gray-200">
      <div className="container grid grid-cols-1 gap-6 mx-auto text-center md:grid-cols-4 md:text-left">
        
        <div className="flex flex-col items-center md:items-start md:justify-center">
          <img src={logo} alt="Autobid Logo" className="w-48 mb-4 ml-8" />
          <p className="text-black-500">Find Your Dream Car at Auction Prices</p>
        </div>

        <div className="flex flex-col items-start justify-center col-span-2 px-0">
          <h3 className="mb-2 text-xl font-bold text-left">Stay Updated with Auction News</h3>
          <p className="mb-4 text-sm text-left text-black-500">Subscribe to our newsletter for the latest updates on upcoming auctions and special deals.</p>
          <form className="flex items-center justify-start w-full">
            <input 
              type="email"  
              placeholder="Your email address"  
              className="w-full max-w-md px-4 py-2 mr-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400" 
            />
            <button className="px-6 py-2 text-white bg-gray-900 rounded-r-lg hover:bg-gray-800">Subscribe</button>
          </form>
          <p className="mt-2 text-xs text-left text-black-400">By subscribing, you agree to our <a href="#" className="underline">Terms and Conditions</a>.</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* About Us */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 text-lg font-bold">About Us</h3>
            <ul className="space-y-1 text-black-500">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">Terms</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 text-lg font-bold">Follow Us</h3>
            <ul className="space-y-1 text-black-500">
              <li>
                <a href="#" className="flex items-center space-x-3 hover:underline">
                  <i className="fab fa-facebook"></i><span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 hover:underline">
                  <i className="fab fa-instagram"></i><span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 hover:underline">
                  <i className="fab fa-twitter"></i><span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 hover:underline">
                  <i className="fab fa-linkedin"></i><span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 hover:underline">
                  <i className="fab fa-youtube"></i><span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-10 text-sm text-center text-black-400">
        <p>Copyright © Drive Bid 2024 All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
