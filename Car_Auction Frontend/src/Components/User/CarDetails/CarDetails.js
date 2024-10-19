import React, { useState, useEffect } from 'react';
import bmwImage from './Images2/5th Car.png';
import downArrow from './Images2/downArrow1.jpg';  
import upArrow from './Images2/upArrow1.jpg';      
import Navbar from '../../Commoin/Navbar/Navbar';
import Footer from '../../Commoin/Footer/Footer';

export default function CarDetails() {
  return (
    <div className="min-h-screen flex flex-col"> 
      <Navbar /> 
      <Header />
      <Footer /> 
    </div>
  );
}

function Header() {
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 12,
    minutes: 44,
    seconds: 29,
  });

  
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

 
  useEffect(() => {
    const countdown = setInterval(() => {
      
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isSuspensionOpen, setIsSuspensionOpen] = useState(false);

  const toggleEngine = () => setIsEngineOpen(!isEngineOpen);
  const toggleSuspension = () => setIsSuspensionOpen(!isSuspensionOpen);

  return (
    <div className="min-h-screen bg-white">
      
      <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
       
        <div style={{ height: '300px' }}> 
       
          <div className="flex justify-center h-full"> 
            <img
              src={bmwImage}
              alt="BMW i7"
              className="object-contain h-full w-full"
              style={{ border: 'none' }}
            />
          </div>

          
          <h2 className="text-lg  text-center mb-2">Countdown</h2>
          <div className="mt-2 bg-white p-2 border max-w-[300px] max-h-[100px] mx-auto border-black">
            <div className="flex justify-between space-x-2 text-center">
              <div className="flex-1">
                <p className="text-4xl font-bold border-r border-black">
                  {timeLeft.days.toString().padStart(2, '0')}
                </p>
                <p className="text-sm">Days</p>
              </div>
              <div className="flex-1">
                <p className="text-4xl font-bold border-r border-black">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </p>
                <p className="text-sm">Hours</p>
              </div>
              <div className="flex-1">
                <p className="text-4xl font-bold border-r border-black">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </p>
                <p className="text-sm">Mins</p>
              </div>
              <div className="flex-1">
                <p className="text-4xl font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </p>
                <p className="text-sm">Secs</p>
              </div>
            </div>
          </div>
        </div>

        
        <div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg" style={{ height: '360px', overflow: 'auto' }}>
            <h1 className="text-3xl font-bold mb-2">BMW i7</h1>
            <p className="text-sm text-gray-400 mb-1">
              Starting bid:
              </p>
              <p>
               <span className="font-bold mb-4">$105,700</span>
            </p>

            <div className="mb-4">
  <label htmlFor="bidAmount" className="block mb-2 mt-4">Set your own bid</label>
  <div className="flex space-x-2"> 
    <input
      type="number"
      id="bidAmount"
      placeholder="$105,800 or above"
      className="border border-black bg-gray-200  p-2 w-2/3"
    />
    <button className="bg-white text-black px-2 py-1 text-sm border border-black">Place bid</button>
    <button className="bg-black text-white px-2 py-1 text-sm">Set max bid</button>
  </div>
</div>
<div className="flex space-x-2 mt-4">
      
      <button className="border border-gray-300  px-6 py-1 text-gray-400 hover:bg-gray-100 transition duration-300">
        $105,800
      </button>
      <button className="border border-gray-300 px-6 py-1 text-gray-400 hover:bg-gray-100 transition duration-300">
        $105,900
      </button>
    </div>


            
            <div className="mt-4">
            <button onClick={toggleWishlist} className="flex flex-col items-start  mt-1">
  <span className="text-black text-sm">Add to wishlist</span>
  <span className="text-black text-3xl">♡</span> 
</button>



            </div>
          </div>
        </div>

        
        <div className="lg:col-start-2 lg:row-start-2 bg-white p-4">
          <h2 className="text-2xl font-bold mb-4">Notable features</h2>
          <div className="border-t border-black pt-4 text-sm mb-6">
            <p>New trim levels for 2024</p>
            <p>Five-seat, full-size electric luxury sedan</p>
            <p>449, 536 or 650 horsepower</p>
            <p>Rear or all-wheel drive</p>
            <p>Up to 321-mile estimated range</p>
          </div>
          <hr className="border-black" /> 

          
          <div className="mt-4">
            <button
              className="font-semibold flex items-center justify-between w-full bg-white p-2 rounded-md"
              onClick={toggleEngine}
            >
              <span>Engine</span>
              <img
                src={isEngineOpen ? upArrow : downArrow}
                alt="toggle"
                className="w-4 h-4 "
              />
            </button>
            {isEngineOpen && (
              <div className="pl-2 mt-0 text-sm mb-6">
                <p>449 SAE Net Horsepower @ RPM</p>
                <p>Electric Engine Type</p>
                <p>549 SAE Net Torque @ RPM</p>
              </div>
            )}
          </div>
          <hr className="border-black" /> 

          
          <div className="mt-4 bg-white">
            <button
              className="font-semibold flex items-center justify-between w-full bg-white p-2 rounded-md"
              onClick={toggleSuspension}
            >
              <span>Suspension</span>
              <img
                src={isSuspensionOpen ? upArrow : downArrow}
                alt="toggle"
                className="w-4 h-4 bg-white"
              />
            </button>
            {isSuspensionOpen && (
              <ul className="list pl-2 mt-0 text-sm mb-6 text-sm">
                <li>Double Wishbone Suspension Type - Front (Cont.)</li>
                <li>Multi-Link Suspension Type - Rear (Cont.)</li>
              </ul>
            )}
          </div>
          <hr className="border-black" /> 
        </div>
      </div>
    </div>
  );
}
