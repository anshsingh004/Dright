import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Recommendations from '../components/Recommendations'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Recommendations />
      <Banner />
      <Testimonial />
      <Newsletter />
    </>
  )
}

export default Home
