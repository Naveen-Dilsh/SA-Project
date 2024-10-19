import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Dashboard, Storage, WbSunny, Favorite } from '@mui/icons-material';
import Navbar from '../../Commoin/Navbar/Navbar';
import Footer from '../../Commoin/Footer/Footer';
import { useState } from 'react';

import fiat500e from './Images1/2nd Car.png';
import kiaEV6 from './Images1/3rd Car.png';
import bmwI7 from './Images1/4th Car.png';
import bmwI4 from './Images1/5th Car.png';

export default function Wishlist() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Header />
          <WishlistContent />
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <section className="text-center py-8">
      <h1 className="text-5xl font-bold mb-6">Your Wishlist</h1>
      <p className="compact-text">Don't pass up your opportunity to put the last offer!</p>
    </section>
  );
}

function Sidebar() {
  return (
    <div className="w-64 h-auto bg-white shadow-lg flex flex-col" style={{ boxShadow: '4px 0 10px -2px rgba(0, 0, 0, 0.1)' }}>
      <div className="py-8 px-6">
        <nav className="space-y-4">
          <NavItem icon={<Dashboard />} label="Profile" active={false} />
          <NavItem icon={<Storage />} label="Auction History" active={false} />
          <NavItem icon={<WbSunny />} label="Active Bids" active={false} />
          <NavItem icon={<Favorite />} label="Wishlist" active={true} />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 ${
        active ? 'bg-blue-100 text-blue-500' : ''
      }`}
    >
      <span className="mr-4">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

function WishlistContent() {
  return (
    <div className="flex justify-center mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <WishlistItem name="FIAT 500e" color="Red" price="$32,500" image={fiat500e} />
        <WishlistItem name="Kia EV6" color="White" price="$42,600" image={kiaEV6} />
        <WishlistItem name="BMW i7" color="White" price="$105,700" image={bmwI7} />
        <WishlistItem name="BMW i4 Gran Coupe" color="Black" price="$52,200" image={bmwI4} />
      </div>
    </div>
  );
}

function WishlistItem({ name, color, price, image }) {
  
  const [isLiked, setIsLiked] = useState(true);


  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative border  p-4 shadow-sm w-82 h-90 bg-gray-100 flex flex-col items-center justify-between">
      
      <Favorite
        className={`absolute top-2 right-2 cursor-pointer ${isLiked ? 'text-black' : 'text-gray-400'}`}
        onClick={toggleHeart}
      />
      <img src={image} alt={name} className="w-full h-26 object-cover mb-0" />
      <div className="text-center flex flex-col items-center">
        <h3 className="text-lg font-bold mb-0">{name}</h3>
        <p className="text-black text-sm mb-0">{color}</p>
        <p className="text-lg font-semibold">{price}</p>
      </div>
      <button className="border border-black bg-gray-100 text-black text-sm w-60 px-2 py-1 self-center">
        Place Bid
      </button>
    </div>
  );
}
