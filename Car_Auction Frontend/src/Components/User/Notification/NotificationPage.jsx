import React from 'react';

const NotificationPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      
      
      <div className="bg-gray-200 p-10 rounded-md shadow-lg w-full max-w-xl my-8">
       
        <h1 className="text-3xl md:text-4xl lg:text-5xl  text-center mb-4">
          𝒞𝑜𝓃𝑔𝓇𝒶𝓉𝓊𝓁𝒶𝓉𝒾𝑜𝓃
        </h1>
        
        {/* Background Image  */}
        <div
          className="relative w-auto h-80 bg-cover bg-center flex justify-center items-center mb-5 mr-4 ml-5"
          style={{ 
            backgroundImage: 'url("src/images/a2.png")', 
          }}
        >
          {/* Car Image */}
          <img
            src="src/images/a3.jpeg" 
            alt="Kia EV6"
            className="w-80 h-auto bg-cover bg-center" 
          />
        </div>
        
       
        <p className="text-lg text-center mb-4">You have won</p>
        
        {/* Car Model  */}
        <h3 className="text-xl font-semibold text-center mb-4">Kia EV6</h3>
      </div>
      
      
      <p className="text-md text-center mb-6">Pay now and make this your car</p>
      
      
      <div className="flex justify-center space-x-4">
        <button className="bg-transparent text-black px-6 py-2 rounded-md shadow-md hover:bg-black hover:text-white transition">
          Pay Now
        </button>
        <button className="bg-transparent text-black px-6 py-2 rounded-md shadow-md hover:bg-black hover:text-white transition">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;