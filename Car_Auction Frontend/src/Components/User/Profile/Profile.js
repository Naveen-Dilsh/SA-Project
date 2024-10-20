import React, { useState } from "react";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Profile() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        
        <div className="w-1/6 p-4 bg-white shadow-lg">
          
          <ul className="space-y-4">
          <li className="flex items-center p-2 space-x-2 bg-blue-100 text-black-700 ">
  <span><TableChartOutlinedIcon /></span>
  <a href="#" className="font-bold hover:underline">Profile</a> 
</li>

            <li className="flex items-center space-x-2">
              <span><StorageOutlinedIcon/></span>
              <a href="#" className="hover:underline">Auction History</a>
            </li>
            <li className="flex items-center space-x-2">
              <span><LightModeOutlinedIcon /></span>
              <a href="#" className="hover:underline">Active Bids</a>
            </li>
            <li className="flex items-center space-x-2">
              <span><FavoriteBorderOutlinedIcon /></span>
              <a href="#" className="hover:underline">Wishlist</a>
            </li>
          </ul>
        </div>

        
        <div className="flex-1 p-6">
       
          <h1 className="mb-4 text-4xl font-bold text-center">Your Profile</h1>
          <p className="mb-8 text-center">Edit your profile here</p>

          
          <form className="max-w-3xl mx-auto space-y-6">

  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 font-semibold">Username</label>
      <input
        type="text"
        className="w-full p-2 border border-black "
        value="NaveenDilshan"
        readOnly
      />
    </div>
  </div>

 
  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 font-semibold">First Name</label>
      <input
        type="text"
        className="w-full p-2 border border-black "
        value="Naveen"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold">Last Name</label>
      <input
        type="text"
        className="w-full p-2 border border-black "
        value="Dilshan"
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 font-semibold">Email</label>
      <input
        type="email"
        className="w-full p-2 border border-black "
        value="Naveen@gmail.com"
      />
    </div>
  </div>

  
  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 font-semibold">Contact Number</label>
      <input
        type="tel"
        className="w-full p-2 border border-black "
        value="070123456"
      />
    </div>
  </div>

  
  <div className="grid grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 font-semibold">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-2 border border-black "
          value="naveendilshan"
        />
        <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-2 top-2"
>
  {showPassword ? (
    <i className="fas fa-eye-slash"></i> 
  ) : (
    <i className="fas fa-eye"></i> 
  )}
</button>

      </div>
    </div>
  </div>

  
  <div className="flex justify-center space-x-4">
  <button className="px-4 py-2 text-black bg-white border border-black ">
    Cancel
  </button>
  <button className="px-4 py-2 text-white bg-black w-28">
    Save
  </button>
</div>

</form>

        </div>
      </div>

      
    </div>
  );
}

export default Profile;


