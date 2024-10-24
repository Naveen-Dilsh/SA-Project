
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../SideBar/SideBar';
import { Search, Calendar, Filter } from "lucide-react";
import AuthContext from '../../../Context/AuthContext';

const AuctionHis = () => {
  const {user} = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [auctionHistory, setAuctionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctionHistory = async () => {
      try {
        const userId = user.Id;
        const response = await fetch(`https://localhost:7021/api/User/${userId}/auction-history`);
        const result = await response.json();
        
        if (response.ok) {
          setAuctionHistory(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch auction history');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionHistory();
  }, []);

  const filteredHistory = auctionHistory.filter((auction) => {
    const carModel = `${auction.carDetails.brand} ${auction.carDetails.model}`;
    const matchesSearchTerm = carModel.toLowerCase().includes(searchTerm.toLowerCase());
    const status = auction.bidAmount >= auction.bidDetails.highestBid ? 'Won' : 'Lost';
    const matchesStatus = statusFilter === '' || status === statusFilter;
    const matchesDateRange = dateRange === '' || new Date(auction.bidDetails.endTime).toLocaleDateString() === dateRange;
    return matchesSearchTerm && matchesStatus && matchesDateRange;
  });

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
            <h1 className="text-center mb-4 fw-bold fs-2">Auction History</h1>

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
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
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
                    {[...new Set(auctionHistory.map(auction => 
                      new Date(auction.bidDetails.endTime).toLocaleDateString()
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
                    <th>FINAL BID</th>
                    <th>USER'S BID</th>
                    <th>END DATE</th>
                    <th>DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((auction) => {
                    const status = auction.bidAmount >= auction.bidDetails.highestBid ? 'Won' : 'Lost';
                    return (
                      <tr key={auction.submissionId}>
                        <td>{auction.submissionId}</td>
                        <td className="fw-medium">
                          {`${auction.carDetails.brand} ${auction.carDetails.model}`}
                        </td>
                        <td>
                          <span className={`badge ${status === 'Won' ? 'bg-success' : 'bg-danger'}`}>
                            {status}
                          </span>
                        </td>
                        <td>${auction.bidDetails.highestBid.toLocaleString()}</td>
                        <td>${auction.bidAmount.toLocaleString()}</td>
                        <td>{new Date(auction.bidDetails.endTime).toLocaleDateString()}</td>
                        <td>
                          <a href={`/details/${auction.submissionId}`} 
                             className="text-primary text-decoration-none">
                            View Details
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


export default AuctionHis;

