import HeroSection from './Components/Commoin/Home/HeroSection';
import Howtoplacebid from './Components/Commoin/Home/Howtoplacebid';
import LatestAuctions from './Components/Commoin/Home/LatestAuction';
import TestimonialSection from './Components/Commoin/Home/TestimonialSection';
import FourthSection from './Components/Commoin/Home/FourthSection';
import VehicalbrandSection from './Components/Commoin/Home/VehicalbrandSection';
import LastSection from './Components/Commoin/Home/LastSection';
import Navbar from './Components/Commoin/Navbar/Navbar';
import Footer from './Components/Commoin/Footer/Footer';
import Profile from './Components/User/Profile/Profile';
import Contact_Us from './Components/User/ContactUs/Contact_Us';
import Car_Listing from './Components/User/CarListing/Car_Listing';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <HeroSection/>
      <VehicalbrandSection/>
      <LatestAuctions/>
      <FourthSection/>
      <TestimonialSection/>
      <Howtoplacebid/>
      <LastSection/>
      <Profile/>
      <Contact_Us/>
      <Car_Listing/>
      <Footer/>

    </div>
  );
}

export default App;
