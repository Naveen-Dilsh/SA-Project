import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Utils/PrivateRoute';

// Components
import Navbar from './Components/Commoin/Navbar/Navbar';
import Footer from './Components/Commoin/Footer/Footer';
import { Home } from './Components/Commoin/Home/Home';
import MainAdmin from './Components/MainAdmin/MainAdmin';
import AdminReq from './Components/MainAdmin/AdminReq';
import AllAdmins from './Components/MainAdmin/AllAdmins';
import RejectedAdmins from './Components/MainAdmin/RejectedAdmins';
import Profile from './Components/User/Profile/Profile';
import AuctionHis from './Components/User/AuctionHistory/AuctionHis';
import ActiveBid from './Components/User/ActiveBid/ActiveBid';
import AuctionListings from './Components/User/CarListing/Car_Listing';
import CarDetails from './Components/Commoin/CarDetails/CarDetails';
import Admin from './Components/Admin/Admin';
import AddCar from './Components/Admin/AddCar';
import AddBid from './Components/Admin/AddBid';
import NotificationPage from './Components/User/Notification/NotificationPage';
import Paymentpage from './Components/User/PaymentPage/Paymentpage';
import ThankyouPage from './Components/User/PaymentConformation/ThakyouPage';
import ContactUs from './Components/User/ContactUs/Contact_Us';
import SignInSignUp from './Components/Commoin/Loginpage/SignInSignUp';
import VerifyEmail from './Components/User/VerifyEmail/VerifyEmail';

// Layout Components
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const AdminLayout = () => (
  <>
    <Outlet />
  </>
);

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
        <Routes>
          {/* Common and User Routes - With Navbar & Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignInSignUp />} />
            <Route path="/auction-listings" element={<AuctionListings />} />
            <Route path="/bid-details/:bidId" element={<CarDetails />} />
            <Route path="/notification/:bidId" element={<NotificationPage />} />
            <Route path="/paymentpage/:bidId" element={<Paymentpage />} />
            <Route path="/thank-you" element={<ThankyouPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/auction-history" element={<AuctionHis />} />
            <Route path="/active-bids" element={<ActiveBid />} />
          </Route>

          {/* Admin Routes - Without Navbar & Footer */}
          <Route element={<AdminLayout />}>
            <Route 
              path="/admin" 
              element={
                <PrivateRoute role="Admin">
                  <Admin />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/add-car" 
              element={
                <PrivateRoute role="Admin">
                  <AddCar />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/add-bid" 
              element={
                <PrivateRoute role="Admin">
                  <AddBid />
                </PrivateRoute>
              } 
            />

            {/* Main Admin Routes */}
            <Route 
              path="/mainadmin" 
              element={
                <PrivateRoute role="MainAdmin">
                  <MainAdmin />
                </PrivateRoute>
              }
            />
            <Route 
              path="/admin-req" 
              element={
                <PrivateRoute role="MainAdmin">
                  <AdminReq />
                </PrivateRoute>
              }
            />
            <Route 
              path="/all-admins" 
              element={
                <PrivateRoute role="MainAdmin">
                  <AllAdmins />
                </PrivateRoute>
              }
            />
            <Route 
              path="/rej-admins" 
              element={
                <PrivateRoute role="MainAdmin">
                  <RejectedAdmins />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
