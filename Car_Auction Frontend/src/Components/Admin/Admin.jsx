import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import AddCar from './AddCar';
import AddBid from './AddBid';  // Import AddBid component
import LatestAuctions from './LatestAuction';
import OngoingBids from './OngoingBids';
import AuctionHistoryPage from './AuctionHistory';
import ManageAuction from './ManageAuction';
import AuthContext from '../../Context/AuthContext';

// Mock data generator remains the same except for totalAuctions
const generateMockData = () => ({
// activeUsers: Math.floor(Math.random() * 5000),
  totalRevenue: Math.floor(Math.random() * 1000000),
  auctionsOverTime: Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    auctions: Math.floor(Math.random() * 100)
  })),
  popularBrands: [
    { brand: 'Toyota', count: Math.floor(Math.random() * 100) },
    { brand: 'Honda', count: Math.floor(Math.random() * 100) },
    { brand: 'Ford', count: Math.floor(Math.random() * 100) },
    { brand: 'BMW', count: Math.floor(Math.random() * 100) },
    { brand: 'Mercedes', count: Math.floor(Math.random() * 100) },
  ]
});

const StatCard = ({ title, value }) => (
  <Card className="h-100 shadow-sm">
    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
      <Card.Title className="text-muted mb-2">{title}</Card.Title>
      <div className="h3 mb-0 font-weight-bold">{value}</div>
    </Card.Body>
  </Card>
);

const Admin = () => {
  const { user } = useContext(AuthContext);  // Fetching user from AuthContext
  const [dashboardData, setDashboardData] = useState(generateMockData());
  const [totalAuctions, setTotalAuctions] = useState(0);  // Separate state for active auctions count
  const [showAddBid, setShowAddBid] = useState(false);
  const [selectedCarData, setSelectedCarData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetching dynamic data using axios
      try {
        const adminId = user ? user.nameid : 11; // Using hardcoded admin ID for example
        console.log(adminId);
        const activeAuctionsResponse = await axios.get(`https://localhost:7021/api/Bid/admin/${adminId}/active-auctions`);
        setTotalAuctions(activeAuctionsResponse.data);  // Setting the fetched total auctions count

        const activeUsersResponse = await axios.get(`https://localhost:7021/api/User/verified-users-count`);
        setTotalUsers(activeUsersResponse.data);
        const mockData = generateMockData();
        setDashboardData(mockData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000);  // Re-fetch every 60 seconds
    return () => clearInterval(interval);
  }, [user]);

  const handleCarAdded = (carData) => {
    setSelectedCarData(carData);
    setShowAddBid(true);
  };

  const handleBidComplete = () => {
    setShowAddBid(false);
    setSelectedCarData(null);
  };

  const renderAddCarSection = () => {
    if (showAddBid && selectedCarData) {
      return (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Add Bid for {selectedCarData.brand} {selectedCarData.model}</h4>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => setShowAddBid(false)}
            >
              Back to Add Car
            </button>
          </div>
          <AddBid 
            carData={selectedCarData}
            onBidComplete={handleBidComplete}
          />
        </div>
      );
    }
    return <AddCar onCarAdded={handleCarAdded} />;
  };

  return (
    <Container fluid className="p-4">
      <h1 className="display-4 mb-4">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col xs={12} md={4}>
          <StatCard 
            title="Total Active Auctions" 
            value={totalAuctions}  // Displaying the fetched total auctions count
          />
        </Col>
        <Col xs={12} md={4}>
          <StatCard 
            title="Active Users" 
            value={totalUsers} 
          />
        </Col>
        <Col xs={12} md={4}>
          <StatCard 
            title="Total Revenue" 
            value={`$${dashboardData.totalRevenue.toLocaleString()}`} 
          />
        </Col>
      </Row>

      {/* Tabs Section */}
      <Tab.Container defaultActiveKey="charts">
        <Row>
          <Col>
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="charts">Analytics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="addCar">Add Car & Bid</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="latestAuctions">OnGoing Bids</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="AuctionHistory">Auction History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="manageAuction">Manage Auction</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="charts">
                <Row className="g-4">
                  <Col xs={12} lg={6}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title>Auctions Over Time</Card.Title>
                        <div style={{ height: '400px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dashboardData.auctionsOverTime}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="day" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="auctions" 
                                stroke="#0d6efd" 
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title>Popular Car Brands</Card.Title>
                        <div style={{ height: '400px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dashboardData.popularBrands}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="brand" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="count" fill="#198754" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="addCar">
                {renderAddCarSection()}
              </Tab.Pane>
              <Tab.Pane eventKey="latestAuctions">
                <OngoingBids/>
              </Tab.Pane>
              <Tab.Pane eventKey="AuctionHistory">
                <AuctionHistoryPage/>
              </Tab.Pane>
              <Tab.Pane eventKey="manageAuction">
                <ManageAuction/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Admin;
