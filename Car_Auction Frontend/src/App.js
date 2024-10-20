import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
        
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
