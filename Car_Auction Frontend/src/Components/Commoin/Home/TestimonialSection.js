import React from 'react';
import { FaStar, FaQuoteRight } from 'react-icons/fa';
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../Pictures/img1.jpeg';
import img2 from '../Pictures/img2.jpeg';
import img3 from '../Pictures/img3.jpeg';

const testimonials = [
  {
    id: 1,
    name: 'Leslie Alexander',
    title: 'Marketing Manager, ABC Cars',
    image: img1,
    rating: 5,
    feedback: 'Our experience with the car auction website has been fantastic. We found the perfect vehicle at an amazing price.',
  },
  {
    id: 2,
    name: 'Floyd Miles',
    title: 'CEO, XYZ Motors',
    image: img2,
    rating: 5,
    feedback: "I highly recommend the car auction website. It's easy to use and offers great deals on a wide range of vehicles.",
  },
  {
    id: 3,
    name: 'Dianne Russell',
    title: 'CTO, MNO Group',
    image: img3,
    rating: 5,
    feedback: 'Our experience with the car auction website has been fantastic. We found the perfect vehicle at an amazing price.',
  },

  {
    id: 3,
    name: 'Dianne Russell',
    title: 'CTO, MNO Group',
    image: img3,
    rating: 5,
    feedback: 'Our experience with the car auction website has been fantastic. We found the perfect vehicle at an amazing price.',
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-10 px-8 bg-white">
      <div className="container mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Customer Testimonials</h2>
          <p className="mt-2 text-gray-500">Read what our satisfied customers have to say</p>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col justify-between w-full h-full max-w-sm p-6 m-4 bg-gray-100 rounded-lg">
                <div className="flex items-center justify-start mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="mr-1 text-yellow-400" />
                  ))}
                </div>
                <p className="relative flex-grow mb-6 italic text-gray-700">
                  {testimonial.feedback}
                  <FaQuoteRight className="absolute text-lg text-gray-300 right-4" />
                </p>
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-10 h-10 mr-4 rounded-full"
                  />
                  <div>
                    <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 text-center">
          <button className="px-6 py-2 text-gray-900 transition-all duration-300 border border-gray-900 rounded hover:bg-gray-900 hover:text-white">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
