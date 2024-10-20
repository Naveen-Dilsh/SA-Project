import React from 'react';

const ThankyouPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      
      
      <div className="bg-gray-200 p-10 rounded-md shadow-lg w-full max-w-xl my-8">
       
       
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
          Thank You!
        </h1>
        
       
        <p className="text-md text-center mb-4">Your order has been confirmed</p>
        
        {/* Car Image Container */}
        <div className="flex justify-center mb-4">
          <img
            src="src/images/a3.jpeg" 
            alt="Kia EV6"
            className="w-100 h-auto" 
          />
        </div>
        
        {/* Car Model Heading */}
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4">
          Kia EV6
        </h3>
        
        {/* Order Number */}
        <p className="text-sm text-center mb-4">Order #1234</p>
        
      </div>
      
    </div>
  );
};

export default ThankyouPage;