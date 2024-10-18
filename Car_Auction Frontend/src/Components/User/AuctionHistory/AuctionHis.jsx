import React, { useState } from 'react';

const History = [
  { id: '123', model: 'BMW M3', status: 'Won', f_bid: '$80 000', u_bid: '$80 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '456', model: 'Tesla X', status: 'Lost', f_bid: '$100 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '789', model: 'BMW M3', status: 'Lost', f_bid: '$100 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '101', model: 'BMW M3', status: 'Won', f_bid: '$100 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '121', model: 'BMW M3', status: 'Won', f_bid: '$100 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '314', model: 'BMW M3', status: 'Lost', f_bid: '$80 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '151', model: 'BMW M3', status: 'Won', f_bid: '$80 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '161', model: 'BMW M3', status: 'Lost', f_bid: '$80 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '718', model: 'BMW M3', status: 'Won', f_bid: '$80 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' },
  { id: '192', model: 'BMW M3', status: 'Lost', f_bid: '$80 000', u_bid: '$50 000', e_date: '12/9/2024', details: 'View Details' }
];

const AuctionHis = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [statusFilter, setStatusFilter] = useState(''); // State for status dropdown
  const [dateRange, setDateRange] = useState(''); // State for date range filter

  // Filter the history based on search term, status, and date range
  const filteredHistory = History.filter((order) => {
    const matchesSearchTerm = order.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    const matchesDateRange = dateRange === '' || order.e_date === dateRange; // Simple date range filtering
    return matchesSearchTerm && matchesStatus && matchesDateRange;
  });

  return (
    <div className="flex-auto pb-1 bg-white border border-gray-300 rounded-sm">
      {/* Header for Auction History */}
      <h1 className="mt-10 mb-8 text-3xl font-bold text-center">Auction History</h1>

      <div className="flex items-center justify-between mb-4">
        {/* Left side: Search and Status dropdown */}
        <div className="flex items-center gap-x-5">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search..."
            className="p-2 mt-10 border border-gray-300 rounded-md w-1/7"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Status filter dropdown */}
          <select
            className="p-2 mt-10 text-gray-500 border border-gray-300 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status: All</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Right side: Date range dropdown */}
        <div>
          <select
            className="p-2 mt-10 text-gray-500 border border-gray-300 rounded-md"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="">Filter by Date Range</option>
            <option value="12/9/2024">12/9/2024</option>
            <option value="13/9/2024">13/9/2024</option>
            <option value="14/9/2024">14/9/2024</option>
          </select>
        </div>
      </div>

      <div className="mt-8 rounded-sm border-gray-950 border-x">
        <table className="w-full text-center text-gray-500">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2">AUCTION ID</th>
              <th className="px-2 py-2">CAR MODEL</th>
              <th className="px-2 py-2">STATUS</th>
              <th className="px-2 py-2">FINAL BID</th>
              <th className="px-2 py-2">USER'S BID</th>
              <th className="px-2 py-2">END DATE</th>
              <th className="px-2 py-2">DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-2 py-3">{order.id}</td>
                <td className="px-2 py-3">{order.model}</td>
                <td className={`px-2 py-3 ${order.status === 'Won' ? 'text-green-500' : 'text-red-500'}`}>
                  {order.status}
                </td>
                <td className="px-2 py-3">{order.f_bid}</td>
                <td className="px-2 py-3">{order.u_bid}</td>
                <td className="px-2 py-3">{order.e_date}</td>
                <td className="px-2 py-3">
                  <a href={`/details/${order.id}`} className="text-blue-500 hover:underline">
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionHis;
