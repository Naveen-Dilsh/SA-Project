import React from "react";
import Successimg from "../Pictures/Pic 4.jpeg";

const FourthSection = () => {
  return (
    <section>
      <div className="py-10 px-8 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Left Side Image */}
          <div className="md:w-1/2 text-center">
            <img src={Successimg} alt="Auction Success" className="rounded" />
          </div>
          {/* Right Side Content */}
          <div className="md:w-1/2 mt-8 md:mt-0 md:ml-12">
            <h6 className="uppercase text-gray-500">Discover</h6>
            <h2 className="text-3xl font-bold">
              The Success of Our Auction Site
            </h2>
            <p className="text-gray-600 mt-4">
              At our auction site, we have achieved impressive numbers. With a
              large number of auctions held, vehicles sold, and registered
              users, we are proud to be a leading platform in the industry.
            </p>
            {/* Percentage Statistics content */}
            <div className="flex mt-12">
              <div className="w-1/2 text-center">
                <h3 className="text-2xl font-bold">50%</h3>
                <p className="text-gray-600">Total Auctions Held</p>
              </div>
              <div className="w-1/2 text-center">
                <h3 className="text-2xl font-bold">50%</h3>
                <p className="text-gray-600">Vehicles Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
