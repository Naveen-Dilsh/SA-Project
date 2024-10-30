import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../SideBar/SideBar";
import { toast } from 'react-toastify';
import AuthContext from "../../../Context/AuthContext";

function Profile() {
  const {user} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    uName: "",
    uEmail: "",
    address: "",
    c_Number: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace 1 with actual user ID from your auth system
      const userId = user.Id;
      const response = await fetch(`https://localhost:7021/api/User/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const result = await response.json();
      setUserData(result.data);
    } catch (error) {
      toast.error('Error fetching user data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
     const userID = user.Id;
      const response = await fetch(`https://localhost:7021/api/User/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const result = await response.json();
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.success('profile update Succesfully');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="mb-4 text-4xl font-bold text-center">Your Profile</h1>
          <p className="mb-8 text-center">Edit your profile here</p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Username</label>
                <input
                  type="text"
                  name="uName"
                  className="w-full p-2 border border-black"
                  value={userData.uName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="uEmail"
                  className="w-full p-2 border border-black"
                  value={userData.uEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Contact Number</label>
                <input
                  type="tel"
                  name="c_Number"
                  className="w-full p-2 border border-black"
                  value={userData.c_Number}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full p-2 border border-black"
                  value={userData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button 
                type="button" 
                className="px-4 py-2 text-black bg-white border border-black"
                onClick={() => fetchUserData()}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 text-white bg-black w-28"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;