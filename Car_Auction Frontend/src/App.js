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
      <Footer/>
    </div>
  );
}

export default App;
