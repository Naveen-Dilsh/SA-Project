import React from 'react';
import { Check, ThumbsUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankyouPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Main Content Container */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl my-8 mx-4 transform transition-all duration-500 hover:scale-105">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Check className="w-16 h-16 text-green-500 animate-bounce" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 animate-fade-in">
          Thank You For Your Bid!
        </h1>

        {/* Subheading */}
        <p className="text-lg text-center text-gray-600 mb-8">
          Your participation in our auction is greatly appreciated
        </p>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <ThumbsUp className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-blue-700">What's Next?</h3>
            </div>
            <p className="text-sm text-gray-600">
              We'll notify you about the auction status via email
            </p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Heart className="w-5 h-5 text-pink-500 mr-2" />
              <h3 className="font-semibold text-pink-700">Stay Connected</h3>
            </div>
            <p className="text-sm text-gray-600">
              Check your dashboard for bid updates
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/active-bids">
          <button href className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
            View My Bids
          </button>
          </Link>
          <Link to="/">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300">
            Back to Home
          </button>
          </Link>
        </div>
      </div>

      {/* Footer Message */}
      <p className="text-gray-500 text-center mt-4">
        Questions? Contact our support team
      </p>
    </div>
  );
};

export default ThankyouPage;