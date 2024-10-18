import React, { startTransition, useState } from 'react'; 
import logo from './Images/logo.png';
import financeIcon from './Images/finance-icon.png';
import carIcon from './Images/car-icon.png';
import pricingIcon from './Images/pricing-icon.png';
import serviceIcon from './Images/service-icon.png';
import ArrowUp from './Images/assest.jpg';
export default function AboutUs() {
  return (
    <>
      <Welcome />
      <WhyChooseUs />
      <FAQ />
    </>
  );
}


function Welcome() {
  return (
    <section className="text-center py-8">
      <h1 className="text-5xl font-bold mb-6">Welcome</h1>
      <img src={logo} alt="AutoBid Logo" className="mx-auto w-56 mb-9" />
      <p class="compact-text">
    Discover the best deals on vehicles at our car auction website. Our mission is<br/>
    to provide customers with a seamless and transparent platform to buy their<br/>
    dream vehicles at auction prices. With our advanced filtering options, you can<br/>
    easily find the vehicle that matches your preferences. Join us today and start<br/>
    bidding!
  </p>
    </section>
  );
}


function WhyChooseUs() {
  const features = [
    { icon: financeIcon, title: 'Special Financing Offers', description: 'Our stress-free finance department can find financial solutions to save you money.' },
    { icon: carIcon, title: 'Trusted Car Dealership', description: 'Our trusted team finds you the best vehicles and deals.' },
    { icon: pricingIcon, title: 'Transparent Pricing', description: 'No hidden fees. Full transparency in vehicle prices and auction fees.' },
    { icon: serviceIcon, title: 'Expert Car Service', description: 'Our experts ensure every car auction runs smoothly with top-quality service.' }
  ];

  return (
    <section className="py-16 bg-white text-center">
      <h1 className="text-5xl font-bold mb-8">Why Choose Us?</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-md md:max-w-3xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-200 p-6 rounded-lg shadow-md h-[250px]"
          >
            <img src={feature.icon} alt={`${feature.title} icon`} className="w-12 h-auto mx-auto mb-4" /> 
            <h3 className="text-2xl font-semibold mb-6">{feature.title}</h3>
            <p className="text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}





   function FAQ() {
    return (
      <div className="faq-container w-2/5 mx-auto my-16">
        <h1 className="text-5xl font-bold text-center mb-8">FAQs</h1>
        <p className="text-center mb-8">Find answers to commonly asked questions about the auction process and specific vehicles</p>
        <hr className="mb-8" />
        <FAQItem question="How does bidding work?"
        answer="Bidding is a simple process where customers place their desired bid on a vehicle. The highest bidder at the 
        end of the auction wins the vehicle." />
        <FAQItem question="Can I inspect the vehicles?" answer="Yes, you can schedule an appointment to inspect the vehicles before placing a bid. We encourage all customers to thoroughly inspect the vehicles to ensure they meet their requirements" />
        <FAQItem question="What happens if I win the auction?" answer="If you win the auction, you will be contacted by our team to arrange the payment and vehicle pickup. Please make sure to review the auction terms and conditions for further details." />
        <FAQItem question="Is financing available?" answer="Yes, we offer financing options for gualified buyers, Please contact our finance department for more information." />
        <FAQItem question="Are there any auction fees?" answer="The auction fees vary depending on the vehicle and other factors. Please refer to the auction listing for the specific fees associated with each vehicle." />
      </div>
    );
  }
  
  function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-gray-300 py-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <h3 className="font-bold mr-2 text-xl">{question}</h3>
          <img 
          src={ArrowUp} 
          alt="arrow" 
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          style={{ width: '16px', height: '16px' }} 
        />
        </div>
        {isOpen && <p className="mt-2 mb-4 text-lg">{answer}</p>}
      </div>
    );
  }



