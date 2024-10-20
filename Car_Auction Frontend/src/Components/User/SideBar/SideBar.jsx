import React from 'react';
import { BiLayout } from "react-icons/bi";
import { BsDatabase, BsBrightnessHigh } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='fixed w-64 h-full px-4 py-2 bg-white shadow-lg'>
      <ul className='mt-5 text-l text-gray-500'>
        <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-100'> 
          <Link to="/user-profile" className='px-3'>
            <BiLayout className='inline-block w-6 h-6 mr-2 -mt-2' />
            Profile
          </Link>
        </li>

        <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-100'> 
          <Link to="/auction-history" className='px-3'>
            <BsDatabase className='inline-block w-6 h-6 mr-2 -mt-2' />
            Auction History
          </Link>
        </li>

        <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-100'> 
          <Link to="/active-bids" className='px-3'>
            <BsBrightnessHigh className='inline-block w-6 h-6 mr-2 -mt-2' />
            Active Bids
          </Link>
        </li>

        <li className='py-2 mb-2 rounded hover:shadow hover:bg-blue-100'> 
          <Link to="/wishlist" className='px-3'>
            <CiHeart className='inline-block w-6 h-6 mr-2 -mt-2' />
            Wishlist
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
