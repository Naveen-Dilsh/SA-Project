import React, { useContext } from "react";
import carImage from "../Pictures/Pic 3.jpg";
import AuthContext from "../../../Context/AuthContext";

const HeroSection = () => {
      const {user} = useContext(AuthContext);
  return (
    <section className="py-10 px-10 bg-white lg:py-10">
      <div className="container mx-auto">
        <div className="flex flex-col items-center lg:flex-row">
          {/*------Heading Section------*/}
          <div className="mb-10 text-center lg:w-1/2 lg:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
              Join the Excitement of <br /> Car Auctions Today
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Experience the thrill of bidding and buying your dream vehicle{" "}
              <br />
              at unbeatable auction prices.

            </p>
            <div className="-ml-10 text-center">
              <button className="px-6 py-2 mt-6 text-left text-gray-900 transition-all duration-300 border border-gray-900 rounded hover:bg-gray-900 hover:text-white">
                Learn More
              </button>
            </div>

            {/*------ Counting Section------*/}
            <div className="flex justify-center mt-8 space-x-6 lg:flex-row md:flex-row">
              <div>
                <h4 className="text-4xl font-bold">
                  100<span className="text-blue-500">+</span>
                </h4>
                <p className="text-gray-500">Members</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold">
                  10000<span className="text-blue-500">+</span>
                </h4>
                <p className="text-gray-500">Cars</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold">
                  1000<span className="text-blue-500">+</span>
                </h4>
                <p className="text-gray-500">Auctions</p>
              </div>
            </div>
          </div>

          {/*------Right Side Image Section------*/}
          <div className="text-center lg:w-auto">
            <img src={carImage} alt="Car" className="object-fill lg:h-96" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
