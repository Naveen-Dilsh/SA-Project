
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import bmwImage from './Images2/5th Car.png';
import downArrow from './Images2/downArrow1.jpg';
import upArrow from './Images2/upArrow1.jpg';
import "./carDetailes.css";
import AuthContext from '../../../Context/AuthContext';

const calculateRemainingTime = (endTime) => {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const difference = end - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, total: difference };
};

export default function CarDetails() {
  let { user } = useContext(AuthContext);
  const { bidId } = useParams();
  const [bidData, setBidData] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [newBid, setNewBid] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isSuspensionOpen, setIsSuspensionOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchBidStatus = async () => {
    try {
      const response = await axios.get(`https://localhost:7021/api/BidSub/finalize/${bidId}`);
      const { status, winningBid } = response.data;
      setAuctionEnded(status === 'Closed' || status === 'Sold');
      if (winningBid) {
        setWinner(winningBid);
      }
    } catch (error) {
      console.error('Error fetching bid status:', error);
    }
  };

  useEffect(() => {
    const fetchBidDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7021/api/Bid/Bid-details/${bidId}`);
        setBidData(response.data);
        
        const highestBidResponse = await axios.get(`https://localhost:7021/api/BidSub/highest-bid/${bidId}`);
        setHighestBid(highestBidResponse.data.highestBid);
        
        await fetchBidStatus();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bid details:', error);
        toast.error('Error loading bid details');
      }
    };

    fetchBidDetails();

    const interval = setInterval(() => {
      if (bidData?.endTime) {
        const time = calculateRemainingTime(bidData.endTime);
        setRemainingTime(time);
        
        if (time.total <= 0) {
          setAuctionEnded(true);
          fetchBidStatus();
          clearInterval(interval);
        }
      }
    }, 1000);

    const statusInterval = setInterval(() => {
      if (!auctionEnded) {
        fetchBidStatus();
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [bidId, bidData?.endTime, auctionEnded]);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };



  const toggleEngine = () => setIsEngineOpen(!isEngineOpen);
  const toggleSuspension = () => setIsSuspensionOpen(!isSuspensionOpen);


  const handleBidSubmit = async () => {
    const bidAmount = parseFloat(newBid);
    if (bidAmount <= highestBid) {
      toast.error(`Your bid must be higher than the current highest bid of $${highestBid}`);
      setShowConfirmModal(false);
      return;
    }

    try {
      await axios.post(`https://localhost:7021/api/BidSub`, {
        bidID: bidId,
        amount: bidAmount,
        userId: user.Id,
        reservationPrice: 20.0,
      });
      
      toast.success('Your bid has been placed successfully!');
      setNewBid('');
      setShowConfirmModal(false);

      const highestBidResponse = await axios.get(`https://localhost:7021/api/BidSub/highest-bid/${bidId}`);
      setHighestBid(highestBidResponse.data.highestBid);
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error('Error submitting your bid');
      setShowConfirmModal(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Change this value to adjust position
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place a bid of ${newBid}?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleBidSubmit}
          >
            Confirm Bid
          </button>
        </Modal.Footer>
      </Modal>

      <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div style={{ height: '300px' }}>
          <div className="flex justify-center h-full">
            <img
              src={bidData.imageUrl || bmwImage}
              alt={`${bidData.brand} ${bidData.model}`}

  
              className="object-contain h-full w-full"
              style={{ border: 'none' }}
            />
          </div>


          <h2 className="text-lg text-center mb-2">Auction ends in:</h2>
          <div className="mt-2 bg-white p-2 border max-w-[300px] mx-auto border-black">
            <div className="flex justify-between space-x-2 text-center">
              <div className="flex-1">
                <p className="text-4xl font-bold border-r border-black">
                  {remainingTime?.days.toString().padStart(2, '0') ?? '00'}


                </p>
                <p className="text-sm">Days</p>
              </div>
              <div className="flex-1">
                <p className="text-4xl font-bold border-r border-black">

                  {remainingTime?.hours.toString().padStart(2, '0') ?? '00'}

                </p>
                <p className="text-sm">Hours</p>
              </div>
              <div className="flex-1">
                <p className="text-4xl font-bold border-r border-black">

                  {remainingTime?.minutes.toString().padStart(2, '0') ?? '00'}
                </p>
                <p className="text-sm">Mins</p>
              </div>
              <div className="flex-1">
                <p className="text-4xl font-bold">
                  {remainingTime?.seconds.toString().padStart(2, '0') ?? '00'}

                </p>
                <p className="text-sm">Secs</p>
              </div>
            </div>
          </div>
        </div>


        <div>
          <div className="bg-gray-200 p-6 rounded-lg" style={{ height: '380px', overflow: 'auto' }}>
            <h1 className="text-3xl font-bold mb-2">{bidData.brand} {bidData.model}</h1>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">Starting bid:</p>
                <p className="text-3xl font-semibold">${bidData.openingBid}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current highest bid:</p>
                <p className="text-4xl font-bold text-green-600">${highestBid}</p>
              </div>
            </div>

            {!auctionEnded && remainingTime && remainingTime.total > 0 ? (
              <div className="mb-4">
                <label htmlFor="bidAmount" className="block mb-2">Set your own bid</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="bidAmount"
                    value={newBid}
                    onChange={(e) => setNewBid(e.target.value)}
                    placeholder={`$${highestBid + 100} or above`}
                    className="border border-black bg-gray-200 p-2 w-2/3"
                  />
                  <button 
                    onClick={() => setShowConfirmModal(true)} 
                    className="bg-white text-black px-2 py-1 text-sm border border-black"
                  >
                    Place bid
                  </button>
                  <button className="bg-black text-white px-2 py-1 text-sm">Set max bid</button>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-red-500 font-bold">Auction ended</p>
                {winner && (
                  <p className="text-green-500 mt-2">
                    Winning bid: ${winner.amount} by {winner.userId === user.Id ? 'you' : 'another user'}
                  </p>
                )}
              </div>
            )}

            {!auctionEnded && (
              <div className="flex space-x-2 mt-4">
                <button 
                  onClick={() => setNewBid((highestBid + 100).toString())} 
                  className="border border-gray-300 px-6 py-1 text-gray-600 hover:bg-gray-100 transition duration-300"
                >
                  ${highestBid + 100}
                </button>
                <button 
                  onClick={() => setNewBid((highestBid + 200).toString())} 
                  className="border border-gray-300 px-6 py-1 text-gray-600 hover:bg-gray-100 transition duration-300"
                >
                  ${highestBid + 200}
                </button>
              </div>
            )}

            <div className="mt-4">
              <button onClick={toggleWishlist} className="flex flex-col items-start mt-1">
                <span className="text-black text-sm">Add to wishlist</span>
                <span className="text-black text-3xl">{isWishlisted ? '♥' : '♡'}</span>
              </button>

            </div>
          </div>
        </div>


        <div className="lg:col-start-2 lg:row-start-2 bg-white p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Notable features</h2>
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

                className="w-4 h-4"

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

