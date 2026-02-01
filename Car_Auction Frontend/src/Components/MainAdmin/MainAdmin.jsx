import React from 'react';

const MainAdmin = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome, Main Admin!</h1>
            <div className="row">
                <div className="col-md-4 col-lg-4 mb-4">
                    <div className="card h-100 bg-primary text-white admin-card">
                        <div className="card-body">
                            <h5 className="card-title">Admin Requests</h5>
                            <p className="card-text">View and manage incoming admin requests.</p>
                            <a href="/admin-req" className="btn btn-light">Go to Requests</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 mb-4">
                    <div className="card h-100 bg-success text-white admin-card">
                        <div className="card-body">
                            <h5 className="card-title">Admin Management</h5>
                            <p className="card-text">Manage existing admin accounts and permissions.</p>
                            <a href="/all-admins" className="btn btn-light">Manage Admins</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 mb-4">
                    <div className="card h-100 bg-danger text-white admin-card">
                        <div className="card-body">
                            <h5 className="card-title">Rejected Admins</h5>
                            <p className="card-text">Review and manage rejected admin applications.</p>
                            <a href="/rej-admins" className="btn btn-light">View Rejected</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 mb-4">
                    <div className="card h-100 bg-info text-white admin-card">
                        <div className="card-body">
                            <h5 className="card-title">Admin Analytics</h5>
                            <p className="card-text">View statistics and performance metrics for admin activities.</p>
                            <a href="#" className="btn btn-light">View Analytics</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 mb-4">
                    <div className="card h-100 bg-secondary text-white admin-card">
                        <div className="card-body">
                            <h5 className="card-title">System Settings</h5>
                            <p className="card-text">Configure and manage system-wide settings and preferences.</p>
                            <a href="#" className="btn btn-light">Manage Settings</a>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .admin-card {
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                }
                .admin-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                .card-body {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                }
                .btn-light:hover {
                    background-color: #f8f9fa;
                    color: #212529;
                }
            `}</style>
        </div>
    );
}

export default MainAdmin;
