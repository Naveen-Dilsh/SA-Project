import React from 'react';



const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white rounded-md shadow-md">

{/* Hero Section */} 

<main className="container px-4 mx-auto mt-10">
  <section className="mb-10 text-center">
    <h2 className="mb-4 text-5xl font-bold">Find Your Dream</h2>
    <p className="max-w-2xl mx-auto mt-8">
      Welcome to our website! We are here to help you find the perfect vehicle at <br />
      an unbeatable price. Start your car buying journey today.
    </p>
  </section>
</main>






<section className="p-10 py-10 mb-10 bg-gray-200">
  <div className="flex flex-col items-center justify-center md:flex-row md:mx-8">
    <div className="mb-8 text-center md:w-1/2 md:text-left md:mb-0 md:px-4">
      <h3 className="mb-4 text-4xl font-bold">Get in Touch</h3>
      <p className="mb-6 text-gray-600">Have any questions or need assistance? Feel free to reach out to us.</p>
    </div>

  
    <div className="space-y-6 text-center md:w-1/2 md:text-left md:px-4">
    <div className="flex items-center justify-center md:justify-start">
      {/* Email Icon */}
      <i className="mr-4 text-xl fas fa-envelope"></i>
      <div>
        <p className="font-semibold">Email</p>
        <p className="text-blue-600 hover:underline">autobid@gmail.com</p>
      </div>
    </div>

    <div className="flex items-center justify-center md:justify-start">
      {/* Phone Icon */}
      <i className="mr-4 text-xl fas fa-phone"></i>
      <div>
        <p className="font-semibold">Phone</p>
        <p className="text-blue-600 hover:underline">+9470123456</p>
      </div>
    </div>

    <div className="flex items-center justify-center md:justify-start">
      {/* Office Icon */}
      <i className="mr-4 text-xl fas fa-map-marker-alt"></i>
      <div>
        <p className="font-semibold">Office</p>
        <p>No 123, Temple Road, Homagama, Sri Lanka</p>
      </div>
    </div>
    </div>
  </div>
</section>




<main className="container px-4 mx-auto mt-10">
  <section className="max-w-4xl p-6 mx-auto mb-10 bg-white rounded-md shadow-md"> 
    <h3 className="mb-4 text-xl font-bold">Please fill out the form below to get in touch with us.</h3>

    <form className="grid grid-cols-2 gap-6">
  <div>
    <label className="block mb-2 font-semibold">First Name</label>
    <input
      type="text"
      className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
    />
  </div>
  <div>
    <label className="block mb-2 font-semibold">Last Name</label>
    <input
      type="text"
      className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
    />
  </div>
  <div>
    <label className="block mb-2 font-semibold">Email</label>
    <input
      type="email"
      className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
    />
  </div>
  <div>
    <label className="block mb-2 font-semibold">Phone Number</label>
    <input
      type="tel"
      className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
    />
  </div>
  <div className="col-span-2">
    <label className="block mb-2 font-semibold">Message</label>
    <textarea
      className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
      rows="5"
    ></textarea>
  </div>
  <div className="flex items-center col-span-2">
    <input type="checkbox" className="mr-2" />
    <span>I agree to the Terms</span>
  </div>
  <div className="col-span-2">
    <button className="px-4 py-2 text-white bg-black rounded-md">Submit</button>
  </div>
</form>

  </section>
</main>


</div>
  );
};

export default ContactUs;
