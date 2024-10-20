import React from 'react';
import backgroundImg from '../Pictures/Dream.jpeg';

const LastSection = () => {
  return (
    <section
      className="relative bg-center bg-cover h-96 py-10 px-8"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 flex flex-col h-full max-w-2xl p-8 mx-auto">
        <h1 className="mb-3 text-4xl font-bold text-white md:text-6xl">
          Find Your Dream Car Today
        </h1>
        <p className="mb-8 text-lg text-gray-300">
          Explore our wide selection of vehicles and start bidding now.
        </p>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 font-semibold text-black bg-white hover:bg-gray-200">
            Sign Up
          </button>
          <button className="px-6 py-2 font-semibold text-white bg-transparent border border-white hover:bg-gray-800">
            Start Bidding
          </button>
        </div>
      </div>
    </section>
  );
};

export default LastSection;
