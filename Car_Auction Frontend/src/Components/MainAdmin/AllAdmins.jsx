import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authTokens')).accessToken;
            const response = await axios.get('https://localhost:7021/api/MainAdmin/approved-admins', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
      setAdmins(response.data);
    } catch (err) {
      setError('Failed to fetch admins');
    }
  };

  const handleRemove = async (adminId) => {
    try {
      const token =JSON.parse(localStorage.getItem('authTokens')).accessToken;
      await axios.delete(`https://localhost:7021/api/MainAdmin/remove-admin/${adminId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchAdmins(); // Refresh the list after removal
    } catch (err) {
      setError('Failed to remove admin');
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Approved Admins</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Admin ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.aId}>
                <td>{admin.aId}</td>
                <td>{admin.aName}</td>
                <td>{admin.aEmail}</td>
                <td>{admin.brand}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(admin.aId)}
                  >
                    Remove
                  </button>
                </td>
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
          .btn-sm {
            font-size: 12px;
            padding: 0.25rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AllAdmins;