import React, { useState } from "react";
import Sidebar from "../SideBar/SideBar";


function Profile() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        
        <Sidebar/> {/* Use the new Sidebar here */}

        <div className="flex-1 p-6">
          <h1 className="mb-4 text-4xl font-bold text-center">Your Profile</h1>
          <p className="mb-8 text-center">Edit your profile here</p>

          <form className="max-w-3xl mx-auto space-y-6">

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border border-black"
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
                  className="w-full p-2 border border-black"
                  value="Naveen"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-black"
                  value="Dilshan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-black"
                  value="Naveen@gmail.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Contact Number</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-black"
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
                    className="w-full p-2 border border-black"
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
              <button className="px-4 py-2 text-black bg-white border border-black">
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
