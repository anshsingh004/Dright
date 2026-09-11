import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const CarDetails = () => {

  const { id } = useParams()

  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [withDriver, setWithDriver] = useState(false)
  const [pickupOption, setPickupOption] = useState('pickup')
  const [deliveryAddress, setDeliveryAddress] = useState('')

  const currency = import.meta.env.VITE_CURRENCY
  const isDriverAvailable = car ? car.driverAvailable !== false : true

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      toast.error('Please select both pickup and return dates');
      return;
    }
    if (new Date(returnDate) < new Date(pickupDate)) {
      toast.error('Return date cannot be earlier than pickup date');
      return;
    }
    if (pickupOption === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate,
        withDriver: isDriverAvailable ? withDriver : false,
        pickupOption,
        deliveryAddress: pickupOption === 'delivery' ? deliveryAddress.trim() : ''
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === id))
  }, [cars, id])

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>

      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65' />
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left: Car Image & Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}

          className='lg:col-span-2'>

          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}

            src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md' />
          <motion.div className='space-y-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              <p className='text-gray-500 text-lg'>{car.category} • {car.year}</p>
            </div>
            <hr className='border-borderColor my-6' />

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}

                  key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2' />
                  {text}
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt="" />
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>

          </motion.div>
        </motion.div>

        {/* Right: Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}

          onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>

          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>{currency}{car.pricePerDay}<span className='text-base text-gray-400 font-normal'>per day</span></p>

          <hr className='border-borderColor my-6' />

          <div className='flex flex-col gap-2'>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}
              type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='pickup-date' min={new Date().toISOString().split('T')[0]} />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
              type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='return-date' min={pickupDate || new Date().toISOString().split('T')[0]} />
          </div>

          {/* Rental Option: Car Only vs Car + Driver */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700 text-sm'>Rental Option</label>
            <div className='grid grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={() => setWithDriver(false)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all cursor-pointer text-center ${
                  !withDriver
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-borderColor text-gray-600 hover:border-gray-400'
                }`}
              >
                Car Only
              </button>

              <button
                type='button'
                disabled={!isDriverAvailable}
                onClick={() => isDriverAvailable && setWithDriver(true)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all text-center ${
                  !isDriverAvailable
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : withDriver
                    ? 'border-primary bg-primary/10 text-primary font-semibold cursor-pointer'
                    : 'border-borderColor text-gray-600 hover:border-gray-400 cursor-pointer'
                }`}
              >
                Car + Driver
              </button>
            </div>
            {!isDriverAvailable && (
              <p className='text-xs text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-md mt-1'>
                Driver service unavailable for this car.
              </p>
            )}
          </div>

          {/* Pickup / Delivery Option */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700 text-sm'>Fulfillment Option</label>
            <div className='grid grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={() => setPickupOption('pickup')}
                className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer text-center ${
                  pickupOption === 'pickup'
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-borderColor text-gray-600 hover:border-gray-400'
                }`}
              >
                Pick up at location
              </button>

              <button
                type='button'
                onClick={() => setPickupOption('delivery')}
                className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer text-center ${
                  pickupOption === 'delivery'
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-borderColor text-gray-600 hover:border-gray-400'
                }`}
              >
                Deliver to address
              </button>
            </div>

            {pickupOption === 'delivery' && (
              <div className='mt-1'>
                <input
                  type='text'
                  placeholder='Enter street delivery address...'
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className='w-full border border-borderColor px-3 py-2 rounded-lg text-sm text-gray-700 outline-none focus:border-primary'
                  required
                />
              </div>
            )}
          </div>

          <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>Book Now</button>

          <p className='text-center text-sm'>No credit card required to reserve</p>

        </motion.form>
      </div>

    </div>
  ) : <Loader />
}

export default CarDetails
