import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReq = () => {
    const [pendingAdmins, setPendingAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchPendingAdmins();
    }, []);

    const fetchPendingAdmins = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('authTokens')).accessToken;
            const response = await axios.get('/api/MainAdmin/pending-admins', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPendingAdmins(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch pending admins');
            setLoading(false);
        }
    };

    const handleApprove = async (adminId) => {
        try {
            const token = JSON.parse(localStorage.getItem('authTokens')).accessToken;
            await axios.post(`/api/MainAdmin/approve/${adminId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccessMessage('Admin approved successfully');
            fetchPendingAdmins(); // Refresh the list
        } catch (err) {
            setError('Failed to approve admin');
        }
    };

    const handleReject = async (adminId) => {
        try {
            const token = JSON.parse(localStorage.getItem('authTokens')).accessToken;
            await axios.post(`/api/MainAdmin/reject-admin/${adminId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccessMessage('Admin rejected successfully');
            fetchPendingAdmins(); // Refresh the list
        } catch (err) {
            setError('Failed to reject admin');
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <h2 className="text-center mb-4">Pending Admin Requests</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Admin ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingAdmins.map((admin) => (
                            <tr key={admin.aId} className="admin-row">
                                <td>{admin.aId}</td>
                                <td>{admin.aName}</td>
                                <td>{admin.aEmail}</td>
                                <td>{admin.brand}</td>
                                <td>
                                    <button 
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => handleApprove(admin.aId)}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleReject(admin.aId)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pendingAdmins.length === 0 && (
                <p className="text-center mt-4">No pending admin requests.</p>
            )}
            <style>{`
                .table-responsive {
                    background-color: #f8f9fa;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .table {
                    margin-bottom: 0;
                }
                .thead-dark th {
                    background-color: #343a40;
                    color: white;
                }
                .admin-row:hover {
                    background-color: #e9ecef;
                }
                .btn {
                    transition: all 0.3s;
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }
                .alert {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                    min-width: 200px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};

export default AdminReq;
