import React from "react";
import Mastercard from "./Pictures/Mastercard.png";
import Paypal from "./Pictures/PayPal.png";
import Googlepay from "./Pictures/GooglePay.png";
import Carimage from "./Pictures/Carimg.png";

const Paymentpage = () => {
  return (
    <div className="flex flex-col p-5 mx-auto max-w-7xl md:flex-row">
      {/*------Left Section Payment Form------*/}
      <div className="flex-initial p-5 px-10 py-12 bg-white lg:mr-20">
        <h2 className="mb-4 text-xl font-bold">Payment</h2>
        <div className="mb-4 border-t">
          <label className="block mt-5 mb-1 text-sm font-medium text-gray-700">
            Payment methods
          </label>

          {/*------Payment Methods images------*/}
          <div className="flex space-x-4">
            <button className="flex items-center justify-center px-4 py-2 ">
              <img src={Mastercard} alt="PayPal" className="w-full mr-2" />
            </button>
            <button className="flex items-center justify-center px-4 py-2">
              <img src={Paypal} alt="PayPal" className="w-full mr-2 " />
            </button>

            <button className="flex items-center justify-center px-4 py-2 ">
              <img src={Googlepay} alt="Google Pay" className="w-full mr-2" />
            </button>
          </div>
        </div>

        <div className="flex mb-4 space-x-3 text-nowrap">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Pay With:
          </label>
          <div className="flex items-center mb-2 text-black">
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              className="mr-2"
            />
            <label htmlFor="credit-card" className="text-sm text-gray-700">
              Credit Card
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="paypal"
              name="payment-method"
              className="mr-2"
            />
            <label htmlFor="paypal" className="text-sm text-gray-700">
              PayPal
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="google-pay"
              name="payment-method"
              className="mr-2"
            />
            <label htmlFor="google-pay" className="text-sm text-gray-700">
              Google Pay
            </label>
          </div>
        </div>


        {/*------Form Section Left------*/}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="1234 5678 9101 1121"
          />
        </div>
        <div className="flex mb-4 space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Expiration Date
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="123"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-10 py-2 mt-6 text-left text-gray-900 transition-all duration-300 border border-gray-900 rounded hover:bg-gray-900 hover:text-white">
            Pay Now
          </button>
        </div>
      </div>

      <div className="border-l"></div>

      {/*------Right Section Payment Summary------*/}
      <div className="justify-center flex-auto px-10 py-12 bg-white lg:ml-16 md:mt-0">
        <h2 className="mb-4 text-xl font-bold ">Payment Summary</h2>
        <div className="flex items-center px-4 py-2 mb-4 border-t">
          <img src={Carimage} alt="Kia EV6" className="w-auto h-20 mt-5 mr-4" />
          <div className="ml-5">
            <h3 className="flex mt-5 text-lg font-medium">Kia EV6</h3>
            <span className="justify-between font-bold">$42,600</span>
            <p className="text-gray-600">White</p>
          </div>
        </div>

        <div className="flex justify-between mt-5 text-gray-800 border-t">
          <span className="mt-3">Subtotal</span>
          <span className="mt-3">$42,600</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>$700</span>
        </div>
        <div className="pt-4 border-t border-gray-300 mt-36">
          <div className="flex justify-between mb-2">
            <span className="mt-1 font-bold">Total</span>
            <span className="text-3xl font-bold">$44,300</span>
          </div>
          <p className="text-sm text-gray-600">including $700 in taxes</p>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;
