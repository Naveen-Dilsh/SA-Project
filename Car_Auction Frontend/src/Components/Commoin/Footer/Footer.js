import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../Pictures/logo.png";

const Footer = () => {
  return (
    <footer className="py-10 px-8 bg-gray-200 text-black">
      <div className="container grid grid-cols-1 gap-6 mx-auto text-center md:grid-cols-4 md:text-left">
        {/*------Logo Section Left------*/}
        <div className="flex flex-col items-center md:items-start md:justify-center">
          <img
            src={logo}
            alt="Autobid Logo"
            className="w-36 mb-4 mx-auto md:ml-8"
          />
          <p className="text-black -mt-7">
            Find Your Dream Car at Auction Prices
          </p>
        </div>

        {/*------Middle Section------*/}
        <div className="flex flex-col items-start justify-center col-span-2 px-6">
          <h3 className="mb-2 text-xl font-bold text-left">
            Stay Updated with Auction News
          </h3>
          <p className="mb-4 text-sm text-left text-black">
            Subscribe to our newsletter for the latest updates on upcoming
            auctions and special deals.
          </p>
          <form className="flex items-center justify-start w-full">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full sm:max-w-sm lg:max-w-md px-4 py-2 mr-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="px-6 py-2 text-white bg-gray-900 rounded-r-lg hover:bg-gray-700">
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-left text-gray-500">
            By subscribing, you agree to our{" "}
            <a href="/terms" className="text-black underline hover:text-gray-400">
              Terms and Conditions
            </a>
            .
          </p>
        </div>

        {/*------About Us & Social Media------*/}
        <div className="grid grid-cols-2 gap-6 text-center md:gap-10 px-12">
          <div className="flex flex-col">
            <h3 className="mb-2 text-lg font-bold text-left">About Us</h3>
            <ul className="space-y-1 text-left">
              <li>
                <a
                  href="/contact"
                  className="text-black no-underline hover:text-gray-400"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="text-black no-underline hover:text-gray-400"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-black no-underline hover:text-gray-400"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-black no-underline hover:text-gray-400"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-black no-underline hover:text-gray-400"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/*------Follow us Section------*/}
          <div className="flex flex-col text-center">
            <h3 className="mb-2 text-lg font-bold text-left">Follow Us</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://www.facebook.com"
                  aria-label="Follow us on Facebook"
                  className="flex items-center space-x-3 text-black no-underline hover:text-gray-500"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  aria-label="Follow us on Instagram"
                  className="flex items-center space-x-3 text-black no-underline hover:text-gray-500"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  aria-label="Follow us on Twitter"
                  className="flex items-center space-x-3 text-black no-underline hover:text-gray-400"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  aria-label="Follow us on LinkedIn"
                  className="flex items-center space-x-3 text-black no-underline hover:text-gray-400"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  aria-label="Follow us on YouTube"
                  className="flex items-center space-x-3 text-black no-underline hover:text-gray-400"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*------Footer Bottom------*/}
      <div className="mt-10 text-sm text-center text-black">
        <p>Copyright © AUTOBID 2024 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
