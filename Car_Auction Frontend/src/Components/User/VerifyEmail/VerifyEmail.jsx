import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      verifyEmail(token);
    } else {
      setVerificationStatus('Invalid verification link.');
      toast.error('Invalid verification link.');
    }
  }, [location]);

  const verifyEmail = async (token) => {
    try {
      const response = await axios.get(`/api/Auth/verify-email?token=${token}`);
      console.log('Verification response:', response);
      setVerificationStatus(response.data.Message);
      
      // Show success toast
      toast.success(response.data.Message || 'Email verified successfully!');
      
      // Optionally redirect to login page after successful verification
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error('Verification error:', error);
      
      // Log detailed error information
      if (error.response) {
        console.error('Error response:', error.response);
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      // Set error message and show error toast
      const errorMessage = error.response?.data?.Message || 'Email verification failed.';
      setVerificationStatus(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Email Verification</h2>
        <p className="text-center text-gray-700">{verificationStatus}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
