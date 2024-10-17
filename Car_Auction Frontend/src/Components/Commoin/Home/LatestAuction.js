import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import car1 from "../Pictures/Pic 3.jpg";
import car2 from "../Pictures/Pic 3.jpg";
import car3 from "../Pictures/Pic 3.jpg";
import car4 from "../Pictures/Pic 3.jpg";
const auctions = [
  { id: 1, name: "Kia Niro EV", color: "Gray", price: "$39,600", image: car1 },
  {
    id: 2,
    name: "Porsche Taycan",
    color: "Green",
    price: "$111,100",
    image: car2,
  },
  { id: 3, name: "Kia EV6", color: "White", price: "$42,600", image: car3 },
  {
    id: 4,
    name: "Maserati MC20",
    color: "Blue",
    price: "$210,000",
    image: car4,
  },
  {
    id: 4,
    name: "Maserati MC20",
    color: "Blue",
    price: "$210,000",
    image: car4,
  },
  {
    id: 4,
    name: "Maserati MC20",
    color: "Blue",
    price: "$210,000",
    image: car4,
  },
];

const LatestAuctions = () => {
  return (
    <section className="py-10 px-8 bg-white">
         <div className="bg-white ">
      <div className="container mx-auto">
        {/*------Heading Section------*/}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Latest Auctions</h2>
            <p className="text-gray-500">
              Find Your Dream Car for the Best Price
            </p>
          </div>
          <button className="py-2 px-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded">
            View All
          </button>
        </div>

        {/*------Swiper and Auction Cards------*/}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {auctions.map((auction) => (
            <SwiperSlide
              key={auction.id}
              className="relative bg-white border border-gray-200 rounded-lg p-4"
            >
              {/*------Heart Icon------*/}
              <div className="absolute top-3 right-3">
                <FaRegHeart className="text-gray-400 hover:text-red-500 transition-colors" />
              </div>

              {/*------Card Images------*/}
              <img
                src={auction.image}
                alt={auction.name}
                className="w-full h-40 object-cover rounded-md mb-5 bg-gray"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{auction.name}</h3>
                <p className="text-gray-500 mb-2">
                  {auction.color} <br />
                  <strong className="text-black">{auction.price}</strong>
                </p>
                <button className="px-10 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                  Place Bid
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
    </section>
  );
};

export default LatestAuctions;
