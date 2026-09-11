import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Testimonial = () => {

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      image: assets.testimonial_image_3,
      rating: 5,
      role: "Verified Renter",
      testimonial: "Booking with a professional chauffeur through Dright was effortless. The driver arrived 10 minutes early, navigated peak traffic with ease, and the luxury SUV was in pristine showroom condition."
    },
    {
      name: "Johnathan Smith",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      rating: 5,
      role: "Business Traveler",
      testimonial: "Selected the home delivery option for a weekend trip from Manhattan. The car was brought right to my doorstep spotless with a full tank. No queues, no counter delays—pure convenience."
    },
    {
      name: "Rohan Mehta",
      location: "Bengaluru, India",
      image: assets.testimonial_image_6,
      rating: 5,
      role: "Verified Renter",
      testimonial: "The car was impeccably clean, sanitized, and drove smoothly. Transparent pricing with zero surprise charges makes Dright my go-to platform for every regional and business trip."
    },
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      rating: 5,
      role: "Vacation Renter",
      testimonial: "The owner communication was warm and prompt. Key handover took under two minutes, and the vehicle drove beautifully along the coast. Exceptional customer care from start to finish."
    },
    {
      name: "David Vance",
      location: "Chicago, USA",
      image: assets.testimonial_image_4,
      rating: 5,
      role: "Verified Renter",
      testimonial: "The real-time availability calendar worked flawlessly during a high-demand holiday weekend when traditional agencies were completely sold out. Great value and hassle-free return."
    },
    {
      name: "Ananya Deshmukh",
      location: "Delhi NCR, India",
      image: assets.testimonial_image_5,
      rating: 5,
      role: "Corporate Executive",
      testimonial: "Opted for the Car + Driver package for client meetings across Gurgaon and Delhi. The chauffeur was punctual, courteous, and highly professional. Dright has redefined short-term rentals."
    }
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

      <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose Dright for their luxury transportation needs around the world." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}

            key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">

            <div className="flex items-center gap-3">
              <img className="w-12 h-12 rounded-full object-cover shadow-sm" src={testimonial.image} alt={testimonial.name} />
              <div>
                <p className="text-lg font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.location} • <span className='text-primary font-medium'>{testimonial.role}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {Array(testimonial.rating).fill(0).map((_, i) => (
                <img key={i} src={assets.star_icon} alt="star-icon" className='w-4 h-4' />
              ))}
            </div>
            <p className="text-gray-600 mt-4 text-sm font-light leading-relaxed">"{testimonial.testimonial}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
