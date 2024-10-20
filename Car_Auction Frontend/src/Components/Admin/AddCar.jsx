import React, { useState } from 'react';
import app from '../../Services/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';

const AddCar = ({ onCarAdded }) => {
    const [carData, setCarData] = useState({
        model: '',
        brand: '',
        year: '',
        description: '',
        imageUrl: '',
    });
    const [uploading, setUploading] = useState(false);
    const [imageURL, setImageURL] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData({
            ...carData,
            [name]: value
        });
    };

    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        if (image) {
            try {
                setUploading(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, 'images/' + image.name);
                await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(storageRef);
                setImageURL(downloadURL);
                setCarData({ ...carData, imageUrl: downloadURL });
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7021/api/Car/Add Car', carData);
            alert('Car added Successfully');
            
            // Pass the complete car data to parent component
            if (onCarAdded) {
                onCarAdded({
                    ...response.data,
                    model: carData.model,
                    brand: carData.brand,
                    year: carData.year,
                    description: carData.description,
                    imageUrl: carData.imageUrl
                });
            }
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };
    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">Add a New Car</h1>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Car Model:</label>
                    <input
                        type="text"
                        name="model"
                        value={carData.model}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter car model"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Brand:</label>
                    <select
                        name="brand"
                        value={carData.brand}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select a brand</option>
                        <option value="Audi">Audi</option>
                        <option value="Bentley">Bentley</option>
                        <option value="BMW">BMW</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="Dodge">Dodge</option>
                        <option value="Alfa">Alfa</option>
                        <option value="Aston Martin">Aston Martin</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Porsche">Porsche</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Manufacture Year:</label>
                    <input
                        type="number"
                        name="year"
                        value={carData.year}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter manufacture year"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        name="description"
                        value={carData.description}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="3"
                        placeholder="Enter car description"
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Car Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                        required
                    />
                    {uploading && <div className="mt-2 text-warning">Uploading...</div>}
                    {imageURL && <img src={imageURL} alt="Car" className="img-thumbnail mt-3" style={{ maxWidth: '150px' }} />}
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit Car
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;
