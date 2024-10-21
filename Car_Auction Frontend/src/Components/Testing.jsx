import React, { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Mastercard from "../../Pictures/Mastercard.png";
import Paypal from "../../Pictures/PayPal.png";
import Googlepay from "../../Pictures/GooglePay.png";
import Carimage from "../../Pictures/Carimg.png";

const Paymentpage = () => {
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState({ bidId: null, paymentAmount: 0 });
  const [carDetails, setCarDetails] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('paypal');
  const navigate = useNavigate();
  const { bidId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await axios.get(`https://localhost:7021/api/Bid/${bidId}/car`);
        setCarDetails(carResponse.data);
        
        const amountResponse = await axios.get(`https://localhost:7021/api/Payment/amount/${bidId}`);
        setAmount(amountResponse.data);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      }
    };

    fetchData();
  }, [bidId]);

  const initialOptions = {
    "client-id": "AaVUbuK518cVMPTtOpPK3hMrG7UmLjQMp43gPnWIuJNot2B0NJTbBMUchdWBI4TwQadHpZOEXpHqnHIy",
    currency: "USD",
    intent: "capture"
  };

  const createOrder = async () => {
    try {
      const response = await fetch("https://localhost:7021/api/CheckOut/CreateOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount.paymentAmount })
      });

      const orderData = await response.json();
      if (!orderData.id) {
        throw new Error("Failed to create PayPal order");
      }
      return orderData.id;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await fetch("https://localhost:7021/api/CheckOut/CompleteOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID })
      });

      if (!response.ok) {
        throw new Error("Error completing PayPal order");
      }

      const details = await response.json();

      if (details === "success") {
        alert(`Transaction completed successfully!`);
        setTimeout(() => {
          if (window.paypal && window.paypal.closeFlow) {
            window.paypal.closeFlow();
          }
          navigate('/thank-you');
        }, 3000);
      } else {
        alert("Transaction was not completed.");
      }
    } catch (error) {
      setError("Error during PayPal order approval: " + error.message);
    }
  };
  const onError = (err) => {
    console.error('PayPal Checkout onError', err);
    setError('There was an error processing your payment. Please try again.');
  };

  const onCancel = (data) => {
    console.log('PayPal Checkout Cancelled', data);
    setError('Payment cancelled. You can try again when youre ready.');
  };

  const PaymentMethodButton = ({ method, icon, label, image }) => (
    <button
      onClick={() => setSelectedMethod(method)}
      className={`flex items-center justify-center p-4 rounded-lg border-2 w-full transition-all duration-200 ${
        selectedMethod === method
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200'
      }`}
    >
      {image ? (
        <img src={image} alt={label} className="h-8 mr-2" />
      ) : (
        <i className={`bi ${icon} me-2`}></i>
      )}
      <span className="font-medium">{label}</span>
    </button>
  );


  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  if (!carDetails) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="row g-4">
          {/* Left Section - Payment Form */}
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded-3 shadow p-4 p-lg-5">
              <h2 className="h3 mb-4">
                <i className="bi bi-credit-card-fill me-2"></i>
                Payment Method
              </h2>
              
              <div className="mb-4">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <PaymentMethodButton
                      method="card"
                      image={Mastercard}
                      label="Credit Card"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <PaymentMethodButton
                      method="paypal"
                      image={Paypal}
                      label="PayPal"
                    />
                  </div>
                </div>

                {selectedMethod === 'paypal' && (
                  <div className="mt-4 bg-light p-4 rounded">
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        onCancel={onCancel}
                        style={{
                          layout: "vertical",
                          color: "blue",
                          shape: "rect",
                          label: "checkout"
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}

                {selectedMethod === 'card' && (
                  <div className="mt-4">
                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-credit-card"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">CVC</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="123"
                          />
                          <span className="input-group-text">
                            <i className="bi bi-question-circle"
                               data-bs-toggle="tooltip"
                               title="3-digit security code"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary w-100 py-2">
                      <i className="bi bi-lock-fill me-2"></i>
                      Pay ${amount.paymentAmount.toFixed(2)}
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 bg-light rounded p-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-shield-lock-fill text-success fs-4 me-2"></i>
                  <div>
                    <h5 className="mb-1">Secure Payment</h5>
                    <p className="small text-muted mb-0">
                      Your payment information is encrypted and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded-3 shadow p-4 p-lg-5">
              <h2 className="h3 mb-4">
                <i className="bi bi-receipt me-2"></i>
                Order Summary
              </h2>
              
              <div className="border-top pt-4">
                <div className="d-flex align-items-center">
                  <img 
                    src={Carimage}
                    alt={carDetails.model}
                    className="rounded me-3"
                    style={{ width: '120px', height: '80px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 className="h5 mb-1">{carDetails.brand} {carDetails.model}</h4>
                    <p className="text-muted mb-0">{carDetails.year}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>${amount.paymentAmount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-top mt-3 pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="h5 mb-0">Total</span>
                      <span className="h3 mb-0 text-primary">
                        ${amount.paymentAmount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-muted small mb-0">Including $0.00 in taxes</p>
                  </div>
                </div>

                <div className="alert alert-info mt-4 mb-0">
                  <div className="d-flex">
                    <i className="bi bi-info-circle-fill me-2 fs-5"></i>
                    <div>
                      <h5 className="alert-heading h6 mb-1">Secure Transaction</h5>
                      <p className="small mb-0">
                        Your payment is protected by our secure payment system.
                        All transactions are encrypted and processed securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 d-flex align-items-center justify-content-center gap-3">
                <img src={Mastercard} alt="Mastercard" height="30" />
                <img src={Paypal} alt="PayPal" height="30" />
                <img src={Googlepay} alt="Google Pay" height="30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;