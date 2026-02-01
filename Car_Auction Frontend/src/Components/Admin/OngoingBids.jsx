import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaHeart, FaClock, FaCarSide } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../Context/AuthContext';


const OngoingBids = () => {
 const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const adminId = user.nameid ;
        console.log(adminId);
        const response = await axios.get(`/api/Admin/${adminId}/car-bid-details`);
        setBids(response.data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="ongoing-bids py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 text-primary">Ongoing Bids</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
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
          className="mySwiper"
        >
          {bids.map((bid) => (
            <SwiperSlide key={bid.bidId}>
              <div className="card h-100 shadow-sm">
                <img src={bid.carDetails.imageUrl} className="card-img-top" alt={bid.carDetails.model} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{bid.carDetails.brand} {bid.carDetails.model}</h5>
                  <p className="card-text">
                    <FaCarSide className="me-2 text-info" />
                    Year: {bid.carDetails.year}
                  </p>
                  <p className="card-text">
                    <FaClock className="me-2 text-warning" />
                    Highest Bid: ${bid.highestBid}
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <small className="text-muted">Status: {bid.carDetails.cStatus}</small>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OngoingBids;
