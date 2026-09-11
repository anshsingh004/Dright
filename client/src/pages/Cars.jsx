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
  const urlSearch = searchParams.get('search') || searchParams.get('q') || ''

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState(urlSearch)
  const [selectedCity, setSelectedCity] = useState(pickupLocation || '')
  const [availableCars, setAvailableCars] = useState([])

  const isSearchData = Boolean(pickupLocation && pickupDate && returnDate)
  const [filteredCars, setFilteredCars] = useState([])

  // Keep input in sync with URL search parameter if it changes
  useEffect(() => {
    if (urlSearch) {
      setInput(urlSearch)
    }
  }, [urlSearch])

  // Keep selectedCity in sync with URL pickup location if it changes
  useEffect(() => {
    if (pickupLocation) {
      setSelectedCity(pickupLocation)
    }
  }, [pickupLocation])

  const applyFilter = () => {
    const sourceList = (isSearchData && availableCars.length > 0) ? availableCars : cars;
    let filtered = sourceList.slice();

    if (selectedCity) {
      filtered = filtered.filter(car => car.location && car.location.toLowerCase() === selectedCity.toLowerCase());
    }

    if (input.trim() !== '') {
      const q = input.trim().toLowerCase();
      filtered = filtered.filter((car) => {
        const brand = (car.brand || '').toLowerCase();
        const model = (car.model || '').toLowerCase();
        const fullName = `${brand} ${model}`;
        const category = (car.category || '').toLowerCase();
        const transmission = (car.transmission || '').toLowerCase();
        const fuelType = (car.fuel_type || '').toLowerCase();
        const location = (car.location || '').toLowerCase();

        return (
          brand.includes(q) ||
          model.includes(q) ||
          fullName.includes(q) ||
          category.includes(q) ||
          transmission.includes(q) ||
          fuelType.includes(q) ||
          location.includes(q)
        );
      });
    }

    setFilteredCars(filtered);
  }

  const searchCarAvailablity = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', { location: pickupLocation, pickupDate, returnDate })
      if (data.success) {
        setAvailableCars(data.availableCars)
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
    if (isSearchData) {
      searchCarAvailablity()
    }
  }, [pickupLocation, pickupDate, returnDate])

  useEffect(() => {
    if (cars.length > 0) {
      applyFilter()
    }
  }, [input, selectedCity, cars, availableCars, isSearchData])

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

        {filteredCars.length === 0 ? (
          <div className='text-center py-16 xl:px-20 max-w-7xl mx-auto'>
            <p className='text-gray-500 text-base'>No cars found matching your criteria.</p>
            <button 
              onClick={() => { setInput(''); setSelectedCity(''); }}
              className='mt-4 px-5 py-2 bg-primary text-white text-xs sm:text-sm rounded-lg hover:bg-primary-dull transition-all cursor-pointer'
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
            {filteredCars.map((car, index) => (
              <motion.div key={car._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index % 6), duration: 0.4 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

    </div>
  )
}

export default Cars
