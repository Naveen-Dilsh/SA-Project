import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuctionListings = () => {
  const [filters, setFilters] = useState({
    model: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });
  const [carListings, setCarListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarListings();
    fetchUserWishlist();
  }, []);

  const fetchCarListings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://localhost:7021/api/Bid/all-bids-with-cars');
      setCarListings(response.data);
      setFilteredListings(response.data);
    } catch (error) {
      console.error('Error fetching car listings:', error);
      toast.error('Failed to fetch car listings');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserWishlist = async () => {
    try {
      const response = await axios.get('https://localhost:7021/api/User/wishlist');
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching user wishlist:', error);
      toast.error('Failed to fetch wishlist');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = carListings.filter(listing => {
      const matchModel = listing.car.model.toLowerCase().includes(filters.model.toLowerCase());
      const matchBrand = listing.car.brand.toLowerCase().includes(filters.brand.toLowerCase());
      const matchMinPrice = filters.minPrice === '' || listing.highBid >= parseFloat(filters.minPrice);
      const matchMaxPrice = filters.maxPrice === '' || listing.highBid <= parseFloat(filters.maxPrice);
      return matchModel && matchBrand && matchMinPrice && matchMaxPrice;
    });
    setFilteredListings(filtered);
  };

  const handleBidClick = (bidId) => {
    navigate(`/bid-details/${bidId}`);
  };

  const toggleWishlist = async (carId) => {
    try {
      if (wishlist.includes(carId)) {
        await axios.delete(`https://localhost:7021/api/User/wishlist/${carId}`);
        setWishlist(prev => prev.filter(id => id !== carId));
        toast.success('Removed from wishlist');
      } else {
        await axios.post('https://localhost:7021/api/User/wishlist', { carId });
        setWishlist(prev => [...prev, carId]);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-xl">Loading auctions...</p>;
    }

    if (carListings.length === 0) {
      return <p className="text-center text-xl">No auctions are currently available.</p>;
    }

    if (filteredListings.length === 0) {
      return <p className="text-center text-xl">No items match your search criteria.</p>;
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <div
            key={listing.bidId}
            className="relative p-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
            onClick={() => handleBidClick(listing.bidId)}
          >
            <FontAwesomeIcon
              icon={wishlist.includes(listing.car.id) ? faHeartSolid : faHeartOutline}
              className="absolute cursor-pointer text-red-500 top-2 right-2 text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(listing.car.id);
              }}
            />
            <img
              src={listing.car.imageUrl || `/api/placeholder/300/200`}
              alt={`${listing.car.brand} ${listing.car.model}`}
              className="object-cover w-full h-40 mb-4 rounded-md"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-bold">{listing.car.brand} {listing.car.model}</h2>
              <p className="text-gray-600">Year: {listing.car.year}</p>
              <p className="text-lg font-semibold text-green-600">Highest Bid: ${listing.highBid}</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <button
                className="w-48 px-3 py-1 mx-auto mt-4 text-black bg-gray-100 border border-black hover:bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBidClick(listing.bidId);
                }}
              >
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="container px-6 py-12 mx-auto">
      <h1 className="text-4xl font-bold text-center">Auctions</h1>
      <p className="mt-2 mb-8 text-center text-gray-600">Browse through a wide selection of auction items.</p>

      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 w-full max-w-5xl">
          <input
            type="text"
            placeholder="Model"
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-full"
          />
          <input
            type="text"
            placeholder="Brand"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-full"
          />
          <input
            type="number"
            placeholder="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-full"
          />
          <input
            type="number"
            placeholder="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-full"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center px-4 py-2 text-white bg-black rounded-full hover:bg-gray-800"
          >
            <Search className="mr-2" /> Search
          </button>
        </div>
      </div>

      {renderContent()}
    </main>
  );
};

export default AuctionListings;