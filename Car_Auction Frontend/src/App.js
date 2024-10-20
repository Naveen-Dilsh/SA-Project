import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Utils/PrivateRoute';

import Navbar from './Components/Commoin/Navbar/Navbar';
import Footer from './Components/Commoin/Footer/Footer';
import { Home } from './Components/Commoin/Home/Home';
import Login from './Components/Commoin/Login/Login';
import MainAdmin from './Components/MainAdmin/MainAdmin';
import AdminReq from './Components/MainAdmin/AdminReq';
import AllAdmins from './Components/MainAdmin/AllAdmins';
import RejectedAdmins from './Components/MainAdmin/RejectedAdmins';
import Profile from './Components/User/Profile/Profile';
import AuctionHis from './Components/User/AuctionHistory/AuctionHis';
import ActiveBid from './Components/User/ActiveBid/ActiveBid';
import AuctionListings from './Components/User/CarListing/Car_Listing';


function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path='/auction-listings' element={<AuctionListings/>}/>


          {/* Route for user */}
          <Route path='/user-profile' element={<Profile/>}/>
          <Route path='/auction-history' element={ <AuctionHis/>}/>
          <Route path='/active-bids' element={ <ActiveBid/>}/>
      

          {/* Route for main Admin */}
          <Route path='/mainadmin' element={<PrivateRoute role="MainAdmin"><MainAdmin/></PrivateRoute>}/>
          <Route path='/admin-req' element={<PrivateRoute role="MainAdmin"><AdminReq/></PrivateRoute>}/>
          <Route path='/all-admins' element={<PrivateRoute role="MainAdmin"><AllAdmins/></PrivateRoute>}/>
          <Route path='/rej-admins' element={<PrivateRoute role="MainAdmin"><RejectedAdmins/></PrivateRoute>}/>
        </Routes>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;