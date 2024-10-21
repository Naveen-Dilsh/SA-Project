import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../../../Context/AuthContext';

const NotificationPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { bidId } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7021/api/Bid/${bidId}/car`);
        setCarDetails(response.data);
        setLoading(false);
        toast.success('Congratulations! You won the auction!');
      } catch (err) {
        toast.error('Failed to load car details');
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [bidId]);

  const handlePayNow = async () => {
    try {
      console.log(bidId, user.Id);
      const response = await axios.post(
        `https://localhost:7021/api/Payment/${bidId}/${user.Id}/AddPayment`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        toast.success('Payment initiated successfully!');
        navigate(`/paymentpage/${bidId}`);
      }
    } catch (err) {
      console.error('Payment creation failed:', err);
      toast.error(err.response?.data?.message || 'Failed to process payment');
    }
  };

  const handleCancel = () => {
    toast.info('Payment cancelled');
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="bg-gray-200 p-10 rounded-md shadow-lg w-full max-w-xl my-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center mb-4">
            𝒞𝑜𝓃𝑔𝓇𝒶𝓉𝓊𝓁𝒶𝓉𝒾𝑜𝓃𝓈
          </h1>
          
          {carDetails && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{carDetails.model}</h2>
              <img
                src={carDetails.imageUrl}
                alt={carDetails.model}
                className="w-full max-w-md mb-4 rounded-lg"
              />
              <div className="space-y-2">
                <p><span className="font-semibold">Brand:</span> {carDetails.brand}</p>
                <p><span className="font-semibold">Year:</span> {carDetails.year}</p>
                <p><span className="font-semibold">Description:</span> {carDetails.description}</p>
              </div>
              
              <div className="mt-6 space-x-4">
                <button
                  onClick={handlePayNow}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!user}
                >
                  Pay Now with PayPal
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;