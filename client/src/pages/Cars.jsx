import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, cityList } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {

  // getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')
  const [selectedCity, setSelectedCity] = useState(pickupLocation || '')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = async () => {
    let filtered = cars.slice();

    if (selectedCity) {
      filtered = filtered.filter(car => car.location && car.location.toLowerCase() === selectedCity.toLowerCase());
    }

    if (input.trim() !== '') {
      const q = input.toLowerCase();
      filtered = filtered.filter((car) => {
        return car.brand.toLowerCase().includes(q)
          || car.model.toLowerCase().includes(q)
          || car.category.toLowerCase().includes(q)
          || car.transmission.toLowerCase().includes(q)
          || (car.location && car.location.toLowerCase().includes(q))
      });
    }

    setFilteredCars(filtered);
  }

  const searchCarAvailablity = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', { location: pickupLocation, pickupDate, returnDate })
      if (data.success) {
        setFilteredCars(data.availableCars)
        if (data.availableCars.length === 0) {
          toast('No cars available for the selected dates and location')
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isSearchData && searchCarAvailablity()
  }, [])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [input, selectedCity, cars])

  return (
    <div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}

        className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selection of premium vehicles available for your next adventure' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}

          className='flex flex-col sm:flex-row items-center gap-2 bg-white p-2 sm:px-4 mt-6 max-w-xl w-full rounded-2xl sm:rounded-full shadow'>
          <div className='flex items-center flex-1 w-full h-11 px-2'>
            <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2 opacity-60' />
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features' className='w-full h-full outline-none text-gray-600 text-sm' />
          </div>

          <div className='flex items-center w-full sm:w-auto h-11 border-t sm:border-t-0 sm:border-l border-borderColor px-2 sm:pl-3'>
            <img src={assets.location_icon} alt="" className='w-4 h-4 mr-2 opacity-60' />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className='outline-none text-gray-600 text-sm bg-transparent cursor-pointer pr-2'
            >
              <option value="">All Locations</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}

        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default Cars
