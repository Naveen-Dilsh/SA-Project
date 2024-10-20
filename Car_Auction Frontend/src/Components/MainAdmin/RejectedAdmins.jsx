import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RejectedAdmins = () => {
  const [rejectedAdmins, setRejectedAdmins] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRejectedAdmins();
  }, []);

  const fetchRejectedAdmins = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('authTokens')).accessToken;
        const response = await axios.get('https://localhost:7021/api/MainAdmin/Rejected-admins', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
      setRejectedAdmins(response.data);
    } catch (err) {
      setError('Failed to fetch rejected admins');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Rejected Admins</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {rejectedAdmins.map((admin) => (
              <tr key={admin.aId}>
                <td>{admin.aId}</td>
                <td>{admin.aName}</td>
                <td>{admin.aEmail}</td>
                <td>{admin.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
        }
        @media (max-width: 768px) {
          .table-responsive {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default RejectedAdmins;