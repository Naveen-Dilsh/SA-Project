import React from 'react';
import { FaTachometerAlt } from 'react-icons/fa';

const steps = [
  {
    id: 1,
    title: 'Step 1: Create an Account',
    description: 'Sign up for a free account on our website.',
  },
  {
    id: 2,
    title: 'Step 2: Browse and Filter Vehicles',
    description: 'Explore our wide selection of vehicles and use our advanced filters to find the perfect one for you.',
  },
  {
    id: 3,
    title: 'Step 3: Place Bids',
    description: 'Once you’ve found a vehicle you’re interested in, place your bid and compete with other buyers.',
  },
];

const Howtoplacebid= () => {
  return (
    <section className="py-10 px8 text-center bg-gray-50">
      <div className="container px-4 mx-auto">
        <h3 className="text-sm font-medium text-gray-600 uppercase">Discover</h3>
        <h2 className="mb-6 text-4xl font-bold text-gray-900">How to Place Bids and Buy Vehicles</h2>
        <p className="mb-12 text-lg text-gray-500">Follow these simple steps to get started.</p>

        <div className="flex flex-col justify-center space-y-8 md:flex-row md:space-y-0 md:space-x-16">
          {steps.map((step) => (
            <div key={step.id} className="md:w-1/3">
              <div className="flex justify-center mb-4">
                <FaTachometerAlt className="text-4xl text-gray-700" />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Howtoplacebid;
