import React, { useState } from 'react';

const History = [
  { id: 1, model: 'BMW M3', c_bid: '$50 000', h_bid: '$50 000', status: 'Leading', remaining: '2h', action: 'Place a bid' },
  { id: 2, model: 'Tesla X', c_bid: '$40 000', h_bid: '$30 000', status: 'Outbid', remaining: '10h', action: 'Place a bid' },
  { id: 3, model: 'BMW M3', c_bid: '$100 000', h_bid: '$50 000', status: 'Outbid', remaining: '2h', action: 'Place a bid' },
  { id: 4, model: 'BMW M3', c_bid: '$100 000', h_bid: '$50 000', status: 'Leading', remaining: '3h', action: 'Place a bid' },
  { id: 5, model: 'BMW M3', c_bid: '$100 000', h_bid: '$50 000', status: 'Leading', remaining: '4h', action: 'Place a bid' },
  { id: 6, model: 'BMW M3', c_bid: '$80 000', h_bid: '$50 000', status: 'Outbid', remaining: '3h', action: 'Place a bid' },
  { id: 7, model: 'BMW M3', c_bid: '$80 000', h_bid: '$50 000', status: 'Leading', remaining: '2h', action: 'Place a bid' },
  { id: 8, model: 'BMW M3', c_bid: '$80 000', h_bid: '$50 000', status: 'Outbid', remaining: '5h', action: 'Place a bid' },
  { id: 9, model: 'BMW M3', c_bid: '$80 000', h_bid: '$50 000', status: 'Leading', remaining: '7h', action: 'Place a bid' },
  { id: 10, model: 'BMW M3', c_bid: '$80 000', h_bid: '$50 000', status: 'Outbid', remaining: '3h', action: 'Place a bid' },
];

const ActiveBid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState('');

  // Filter the history based on search term, status, and date range
  const filteredHistory = History.filter((order) => {
    const matchesSearchTerm = order.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    const matchesDateRange = true; // Temporary true, replace with date logic when available
    return matchesSearchTerm && matchesStatus && matchesDateRange;
  });

  return (
    <div className="flex-auto pb-1 bg-white border border-gray-300 rounded-sm">
      {/* Header for Auction History */}
      <h1 className="mt-10 mb-8 text-4xl font-bold text-center">Active Bids</h1>
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
            <option value="Leading">Leading</option>
            <option value="Outbid">Outbid</option>
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

      <div className="mt-8 rounded-sm border-gray-950 border-x">
        <table className="w-full text-lg text-center text-gray-500">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-6 text-xl">CAR MODEL</th>
              <th className="px-4 py-6 text-xl">CURRENT BID</th>
              <th className="px-4 py-6 text-xl">YOUR HIGHEST BID</th>
              <th className="px-4 py-6 text-xl">STATUS</th>
              <th className="px-4 py-6 text-xl">TIME REMAINING</th>
              <th className="px-4 py-6 text-xl">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-6 text-lg">{order.model}</td>
                <td className="px-4 py-6 text-lg">{order.c_bid}</td>
                <td className="px-4 py-6 text-lg">{order.h_bid}</td>
                <td className={`px-4 py-6 text-lg ${order.status === 'Leading' ? 'text-green-500' : 'text-red-500'}`}>
                  {order.status}
                </td>
                <td className="px-4 py-6 text-lg">{order.remaining}</td>
                <td className="px-4 py-6 text-lg">
                  <a href={`/action/${order.id}`} className="text-blue-500 hover:underline">
                    {order.action}
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

export default ActiveBid;
