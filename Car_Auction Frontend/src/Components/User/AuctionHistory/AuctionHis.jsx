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
      <h1 className="mt-10 mb-8 text-4xl font-bold text-center">Auction History</h1>

      {/* Wrapper to align search bar, dropdowns, and table */}
      <div className="w-10/12 mx-auto">
        <div className="flex items-center justify-between mb-4">
          {/* Left side: Search and Status dropdown */}
          <div className="flex items-center gap-x-5">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search..."
              className="p-3 mt-10 text-lg border border-gray-300 rounded-md w-80" // Increased padding and text size
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Status filter dropdown */}
            <select
              className="w-48 p-3 mt-10 text-lg text-gray-500 border border-gray-300 rounded-md" // Increased padding and text size
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
              className="w-48 p-3 mt-10 text-lg text-gray-500 border border-gray-300 rounded-md" // Increased padding and text size
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

        {/* Wrapper for table */}
        <div className="mt-8 rounded-sm border-gray-950 border-x">
          <table className="w-full text-lg text-center text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-6 text-xl">AUCTION ID</th>
                <th className="px-4 py-6 text-xl">CAR MODEL</th>
                <th className="px-4 py-6 text-xl">STATUS</th>
                <th className="px-4 py-6 text-xl">FINAL BID</th>
                <th className="px-4 py-6 text-xl">USER'S BID</th>
                <th className="px-4 py-6 text-xl">END DATE</th>
                <th className="px-4 py-6 text-xl">DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-6 text-lg">{order.id}</td>
                  <td className="px-4 py-6 text-lg">{order.model}</td>
                  <td className={`px-4 py-6 text-lg ${order.status === 'Won' ? 'text-green-500' : 'text-red-500'}`}>
                    {order.status}
                  </td>
                  <td className="px-4 py-6 text-lg">{order.f_bid}</td>
                  <td className="px-4 py-6 text-lg">{order.u_bid}</td>
                  <td className="px-4 py-6 text-lg">{order.e_date}</td>
                  <td className="px-4 py-6 text-lg">
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
    </div>
  );
};

export default AuctionHis;

