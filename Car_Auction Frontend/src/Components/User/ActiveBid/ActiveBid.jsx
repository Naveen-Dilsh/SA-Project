
import React, { useState, useEffect } from 'react';
import Sidebar from '../SideBar/SideBar';
import { Search, Calendar, Filter } from "lucide-react";

const ActiveBid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [activeBids, setActiveBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchActiveBids = async () => {
      try {
        const userId = 29;
        const response = await fetch(`https://localhost:7021/api/User/${userId}/ActiveAuction`);
        const result = await response.json();
        
        if (response.ok) {
          setActiveBids(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch active bids');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBids();
  }, []);

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1000 milliseconds = 1 second

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const filteredBids = activeBids.filter((bid) => {
    const carModel = `${bid.carDetails.brand} ${bid.carDetails.model}`;
    const matchesSearchTerm = carModel.toLowerCase().includes(searchTerm.toLowerCase());
    const status = bid.bidAmount >= bid.bidDetails.highestBid ? 'Leading' : 'Outbid';
    const matchesStatus = statusFilter === '' || status === statusFilter;
    const matchesDateRange = dateRange === '' || new Date(bid.bidDetails.endTime).toLocaleDateString() === dateRange;
    return matchesSearchTerm && matchesStatus && matchesDateRange;
  });

  const calculateTimeRemaining = (endTime) => {
    const timeRemaining = new Date(endTime) - currentTime;
    if (timeRemaining <= 0) {
      return "Auction Ended";
    }
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
  };

  if (loading) return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        <div className="d-flex justify-content-center mt-5">Loading...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        <div className="d-flex justify-content-center mt-5 text-danger">{error}</div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <div style={{ marginLeft: '250px', flexGrow: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="text-center mb-4 fw-bold fs-2">Active Bids</h1>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search size={20} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by car model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Filter size={20} />
                  </span>
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="Leading">Leading</option>
                    <option value="Outbid">Outbid</option>
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Calendar size={20} />
                  </span>
                  <select
                    className="form-select"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="">All Dates</option>
                    {[...new Set(activeBids.map(bid => 
                      new Date(bid.bidDetails.endTime).toLocaleDateString()
                    ))].map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>AUCTION ID</th>
                    <th>CAR MODEL</th>
                    <th>STATUS</th>
                    <th>CURRENT BID</th>
                    <th>YOUR HIGHEST BID</th>
                    <th>TIME REMAINING</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBids.map((bid) => {
                    const status = bid.bidAmount >= bid.bidDetails.highestBid ? 'Leading' : 'Outbid';
                    return (
                      <tr key={bid.submissionId}>
                        <td>{bid.submissionId}</td>
                        <td className="fw-medium">
                          {`${bid.carDetails.brand} ${bid.carDetails.model}`}
                        </td>
                        <td>
                          <span className={`badge ${status === 'Leading' ? 'bg-success' : 'bg-danger'}`}>
                            {status}
                          </span>
                        </td>
                        <td>${bid.bidDetails.highestBid.toLocaleString()}</td>
                        <td>${bid.bidAmount.toLocaleString()}</td>
                        <td>{calculateTimeRemaining(bid.bidDetails.endTime)}</td>
                        <td>
                          <a href={`/place-bid/${bid.submissionId}`} 
                             className="text-primary text-decoration-none">
                            Place a bid
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ActiveBid;

