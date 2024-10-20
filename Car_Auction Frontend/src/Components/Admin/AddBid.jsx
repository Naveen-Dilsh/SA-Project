import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { formatDistance, format } from 'date-fns';
import AuthContext from '../../Context/AuthContext';

const AddBid = ({ carData, onBidComplete }) => {
    let { user } = useContext(AuthContext);
    console.log(carData.carId);
    const [bidData, setBidData] = useState({
        openingBid: '',
        startTime: new Date(),
        endTime: '',
        adminId: user?.nameid || '',
        carId: carData?.carId || '',
    });

    const [remainingTime, setRemainingTime] = useState('');

    useEffect(() => {
        if (carData?.carId) {
            setBidData(prev => ({
                ...prev,
                carId: carData.carId
            }));
        }
    }, [carData]);

    useEffect(() => {
        if (bidData.endTime) {
            const endDate = new Date(bidData.endTime);
            const now = new Date();
            const diff = formatDistance(endDate, now);
            setRemainingTime(diff);
        }
    }, [bidData.endTime]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBidData({
            ...bidData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!carData?.carId) {
                throw new Error('Car ID is missing');
            }

            const formattedBidData = {
                openingBid: bidData.openingBid,
                startTime: bidData.startTime.toISOString(),
                endTime: bidData.endTime,
                adminId: bidData.adminId,
                carId: carData.carId  // Explicitly include carId from carData
            };
            
            console.log('Submitting bid data:', formattedBidData);
            await axios.post('https://localhost:7021/api/Bid', formattedBidData);
            alert('Bid added successfully!');
            if (onBidComplete) {
                onBidComplete();
            }
        } catch (error) {
            console.error('Error adding bid:', error);
            alert(error.message || 'Error adding bid. Please try again.');
        }
    };

    // Rest of the component remains the same
    return (
        <div className="container mt-5">
            <div className="mb-4">
                <h2 className="text-center text-primary">Add a Bid</h2>
                {carData && (
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Selected Car Details</h5>
                                    <p className="card-text">
                                        <strong>Model:</strong> {carData.model}<br />
                                        <strong>Brand:</strong> {carData.brand}<br />
                                        <strong>Year:</strong> {carData.year}<br />
                                        <strong>Car ID:</strong> {carData.carId} {/* Added to verify carId */}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {carData.imageUrl ? (
                                    <img
                                        src={carData.imageUrl}
                                        className="img-fluid rounded-end h-100 object-fit-cover"
                                        alt={`${carData.brand} ${carData.model}`}
                                        style={{ maxHeight: '200px' }}
                                    />
                                ) : (
                                    <img
                                        src="/api/placeholder/400/300"
                                        className="img-fluid rounded-end h-100 object-fit-cover"
                                        alt="Car placeholder"
                                        style={{ maxHeight: '200px' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Opening Bid:</label>
                    <input
                        type="number"
                        name="openingBid"
                        className="form-control"
                        value={bidData.openingBid}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Start Time:</label>
                    <input
                        type="text"
                        name="startTime"
                        className="form-control"
                        value={format(bidData.startTime, 'dd/MM/yyyy HH:mm:ss')}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">End Time:</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        className="form-control"
                        value={bidData.endTime}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {bidData.endTime && (
                    <div className="mb-3">
                        <label className="form-label">Remaining Time:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={remainingTime}
                            readOnly
                        />
                    </div>
                )}

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">Submit Bid</button>
                </div>
            </form>
        </div>
    );
};

export default AddBid;