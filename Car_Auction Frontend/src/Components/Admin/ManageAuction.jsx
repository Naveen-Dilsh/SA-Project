import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Image, Container, Badge, Button, Modal } from 'react-bootstrap';
import AuthContext from '../../Context/AuthContext';

const ManageAuction = () => {
  const [auctionHistory, setAuctionHistory] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAuctionId, setSelectedAuctionId] = useState(null);

  useEffect(() => {
    const fetchAuctionHistory = async () => {
      try {
        const adminId = user?.nameid;
        if (!adminId) {
          throw new Error('Admin ID not available');
        }
        const response = await fetch(`https://localhost:7021/api/Admin/GetManage/${adminId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch auction history');
        }
        const data = await response.json();
        setAuctionHistory(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching auction history:', error);
        setError(error.message);
        setAuctionHistory([]);
      }
    };

    fetchAuctionHistory();
  }, [user]);

  const handleEndAuction = (auctionId) => {
    setSelectedAuctionId(auctionId);
    setShowConfirmModal(true);
  };

  const confirmEndAuction = async () => {
    try {
        console.log(selectedAuctionId);
      const response = await fetch(`https://localhost:7021/api/Admin/EndAuction?adminId=${user.nameid}&bidId=${selectedAuctionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers, like authorization
        },
      });

      if (!response.ok) {
        throw new Error('Failed to end auction');
      }

      const data = await response.json();
      console.log(data.message);

      // Update the local state to reflect the ended auction
      setAuctionHistory(prevHistory =>
        prevHistory.map(auction =>
          auction.bidId === selectedAuctionId
            ? { ...auction, status: 'Closed', endTime: new Date().toISOString() }
            : auction
        )
      );

      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error ending auction:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (auctionHistory.length === 0) {
    return <div>No auction history available.</div>;
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'sold':
        return 'success';
      case 'closed':
        return 'danger';
      case 'ongoing':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Auction History</h2>
      {auctionHistory.map((auction) => (
        <Card key={auction.bidId} className="mb-4">
          <Card.Body>
            <Row>
              {/* Left Column */}
              <Col md={4}>
                <h4>Bid ID: {auction.bidId}</h4>
                {auction.car.imageUrl && (
                  <Image 
                    src={auction.car.imageUrl} 
                    alt="Car" 
                    fluid 
                    className="mb-3" 
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
                  />
                )}
                <p><strong>Model:</strong> {auction.car.brand} {auction.car.model}</p>
                <p><strong>Year:</strong> {auction.car.year}</p>
                <Button 
                  variant="danger" 
                  size="lg" 
                  className="w-100 mb-3"
                  onClick={() => handleEndAuction(auction.bidId)}
                >
                  End Auction
                </Button>
              </Col>

              {/* Right Column */}
              <Col md={8}>
                <h5>Bid Submissions</h5>
                {auction.bidSubmissions && auction.bidSubmissions.length > 0 ? (
                  auction.bidSubmissions.map((submission, index) => (
                    <Card key={index} className="mb-2">
                      <Card.Body>
                        <Row>
                          <Col sm={6}>
                            <p><strong>User:</strong> {submission.user.username}</p>
                            <p><strong>Amount:</strong> ${submission.amount}</p>
                          </Col>
                          <Col sm={6}>
                            <p><strong>Reservation Price:</strong> ${submission.reservationPrice}</p>
                            <p>
                              <strong>Status:</strong>{' '}
                              <Badge bg={getStatusColor(submission.status)}>
                                {submission.status}
                              </Badge>
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>No bid submissions for this auction.</p>
                )}
                <div className="mt-3">
                  <p><strong>Opening Bid:</strong> ${auction.openingBid}</p>
                  <p><strong>Highest Bid:</strong> ${auction.highestBid}</p>
                  <p><strong>Start Time:</strong> {new Date(auction.startTime).toLocaleString()}</p>
                  <p><strong>End Time:</strong> {new Date(auction.endTime).toLocaleString()}</p>
                  <p>
                    <strong>Auction Status:</strong>{' '}
                    <Badge bg={getStatusColor(auction.status)}>
                      {auction.status}
                    </Badge>
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm End Auction</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to end this auction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={confirmEndAuction}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAuction;