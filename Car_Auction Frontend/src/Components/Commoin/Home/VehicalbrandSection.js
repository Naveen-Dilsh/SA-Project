import React from 'react';
import audiLogo from '../Pictures/Audi Logo.jpeg';
import bentleyLogo from '../Pictures/Bentley Logo.jpeg';
import acuraLogo from '../Pictures/Acura Logo.jpeg';
import bmwLogo from '../Pictures/BMW Logo.jpeg';
import astonLogo from '../Pictures/Aston Martin logo.jpeg';
import ferrariLogo from '../Pictures/Ferrari Logo.jpeg';
import dodgeLogo from '../Pictures/Dodge Logo.jpeg';
import alfaLogo from '../Pictures/Alfa Romeo Logo.jpeg';
import cadillacLogo from '../Pictures/Cadillac Logo.jpeg';
import chevroletLogo from '../Pictures/Chevrolet Logo.jpeg';

const brands = [
  { name: 'Audi', image: audiLogo },
  { name: 'Bentley', image: bentleyLogo },
  { name: 'Acura', image: acuraLogo },
  { name: 'BMW', image: bmwLogo },
  { name: 'Aston Martin', image: astonLogo },
  { name: 'Ferrari', image: ferrariLogo },
  { name: 'Dodge', image: dodgeLogo },
  { name: 'Alfa Romeo', image: alfaLogo },
  { name: 'Cadillac', image: cadillacLogo },
  { name: 'Chevrolet', image: chevroletLogo },
];

const VehicleBrands = () => {
  return (
    <section className="py-10 px-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Vehicle Brands</h2>
          <p className="mt-2 text-gray-500">Browse new cars by brand</p>
        </div>

        {/*------Brand logos------*/}
        <div className="flex flex-wrap justify-center mt-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="w-1/2 p-4 sm:w-1/2 md:w-1/5"
            >
              <div className="flex flex-col items-center justify-center p-6 text-center transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl h-52">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="object-contain w-28 h-28 mx-auto mb-4"
                />
                <h5 className="text-base font-medium text-black">{brand.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleBrands;
