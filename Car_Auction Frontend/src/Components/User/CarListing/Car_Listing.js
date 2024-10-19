import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'; 
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const cars = [
  { id: 1, name: "Kia Niro EV", color: "Gray", price: "$39,600", image: "/images/1st Car.png" },
  { id: 2, name: "FIAT 500e", color: "Red", price: "$32,500", image: "/images/2nd Car.png" },
  { id: 3, name: "Kia EV6", color: "White", price: "$42,600", image: "/images/3rd Car.png" },
  { id: 4, name: "Honda Prologue", color: "Black", price: "$47,400", image: "/images/4th Car.png" },
  { id: 5, name: "BMW i7", color: "White", price: "$105,700", image: "/images/5th Car.png" },
  { id: 6, name: "BMW i4 Gran Coupe", color: "Black", price: "$52,200", image: "/images/6th Car.png" },
  { id: 7, name: "Maserati Grecale Folgore", color: "Blue", price: "$109,000", image: "/images/7th Car.png" },
  { id: 8, name: "Porsche Taycan Cross Turismo", color: "Green", price: "$111,100", image: "/images/8th Car.png" },
  { id: 9, name: "Tesla Model 3", color: "Black", price: "$38,990", image: "/images/9th Car.png" },
  { id: 10, name: "Tesla Cybertruck", color: "Gray", price: "$99,990", image: "/images/10th Car.png" },
  { id: 11, name: "Lexus RZ 300e", color: "White", price: "$54,000", image: "/images/11th Car.png" },
  { id: 12, name: "Tesla Model Y", color: "Red", price: "$42,990", image: "/images/12th Car.png" },
];

const AuctionListings = () => {
  return (
    <main className="container px-6 py-12 mx-auto">
      <h1 className="text-4xl font-bold text-center">Auctions</h1>
      <p className="mt-2 mb-8 text-center text-gray-600">Browse through a wide selection of auction items.</p>

      
      <div className="flex justify-center mb-8">
        <div className="flex w-full max-w-5xl px-16 py-3 bg-gray-300 rounded-full">
          <button className="flex items-center w-32 px-3 py-2 mr-4 text-gray-800 bg-gray-200 border border-gray-300 rounded-full">
            Model <ArrowDropDownIcon className="ml-1" />
          </button>
          <button className="flex items-center w-32 px-3 py-2 mr-4 text-gray-800 bg-gray-200 border border-gray-300 rounded-full">
            Year <ArrowDropDownIcon className="ml-1" />
          </button>
          <button className="flex items-center px-3 py-2 mr-4 text-gray-800 bg-gray-200 border border-gray-300 rounded-full w-34">
            Lowest Price <ArrowDropDownIcon className="ml-1" />
          </button>
          <button className="flex items-center px-3 py-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-full w-34">
            Highest Price <ArrowDropDownIcon className="ml-1" />
          </button>
          <div className="flex-grow" />
          <button className="w-32 px-4 py-1 text-white bg-black">Search</button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div key={car.id} className="relative p-4 bg-gray-100 border border-gray-300 rounded-lg">
            
            <FontAwesomeIcon
              icon={faHeartOutline}
              className="absolute cursor-pointer text-black-500 top-2 right-2"
            />
            <img src={car.image} alt={car.name} className="object-cover w-full h-40 mb-4 rounded-md" />
           
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-bold">{car.name}</h2>
              <p className="text-black-600">{car.color}</p>
              <p className="text-lg font-semibold">{car.price}</p>
            </div>
            <div class="flex flex-col items-center justify-center text-center">
            <button className="w-48 px-3 py-1 mx-auto mt-4 text-black bg-gray-100 border border-black hover:bg-gray-300">
      Place Bid
    </button>
            </div>
              

          </div>
        ))}
      </div>
    </main>
  );
};

export default AuctionListings;




