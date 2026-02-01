
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import axios from 'axios'; // Make sure Axios is installed and imported
import { useNavigate } from 'react-router-dom'; // For navigation

const LatestAuctions = () => {
  const [auctions, setAuctions] = useState([]); // State to hold auction data
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get('/api/Bid/car-details'); // Adjust the endpoint as needed
        setAuctions(response.data); // Assuming your API returns an array of auction objects
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []); // Empty dependency array means this runs once after the initial render

  // Handle navigation to BidDetails with the bidId
  const handleNavigate = (bidId) => {
    navigate(`/bid-details/${bidId}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <section className="py-10 px-8 bg-white">
      <div className="bg-white">
        <div className="container mx-auto">
          {/*------Heading Section------*/}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Latest Auctions</h2>
              <p className="text-gray-500">Find Your Dream Car for the Best Price</p>
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
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {auctions.map((auction) => (
              <SwiperSlide
                key={auction.bidId}
                className="relative bg-white border border-gray-200 rounded-lg p-4"
              >
                {/*------Heart Icon------*/}
                <div className="absolute top-3 right-3">
                  <FaRegHeart className="text-gray-400 hover:text-red-500 transition-colors" />
                </div>

                {/*------Card Images------*/}
                <img
                  src={auction?.imageUrl}
                  alt={auction?.model || 'Car image'}
                  className="w-full h-40 object-cover rounded-md mb-5"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{auction?.model || 'Unknown Model'}</h3>
                  <p className="text-gray-500 mb-2">
                    {auction?.brand || 'Unknown Brand'} <br />
                    <strong className="text-black">{auction?.year || 'Unknown Year'}</strong>
                  </p>
                  <button
                    onClick={() => handleNavigate(auction.bidId)}
                    className="px-10 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
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
