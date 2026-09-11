import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car, rankBadge }) => {

  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  // Guard against invalid/negative/zero seating count
  const seatingCount = (car.seating_capacity && Number(car.seating_capacity) > 0) ? car.seating_capacity : 4

  return (
    <div onClick={() => { navigate(`/car-details/${car._id}`); scrollTo(0, 0) }} className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-white relative'>

      <div className='relative h-48 overflow-hidden'>
        <img src={car.image} alt="Car Image" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' />

        <div className='absolute top-3 left-3 flex flex-col gap-1.5 items-start'>
          {rankBadge && (
            <span className='bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md tracking-wide'>
              {rankBadge}
            </span>
          )}
          {car.isAvaliable && !rankBadge && (
            <p className='bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full'>Available Now</p>
          )}
        </div>

        {car.driverAvailable !== false && (
          <span className='absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-indigo-700 text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm'>
            Driver Option
          </span>
        )}

        <div className='absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
          <span className='font-semibold'>{currency}{car.pricePerDay}</span>
          <span className='text-sm text-white/80'> / day</span>
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h3 className='text-lg font-medium'>{car.brand} {car.model}</h3>
            <p className='text-muted-foreground text-sm'>{car.category} • {car.year}</p>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.users_icon} alt="" className='h-4 mr-2' />
            <span>{seatingCount} Seats</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.fuel_icon} alt="" className='h-4 mr-2' />
            <span>{car.fuel_type}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.car_icon} alt="" className='h-4 mr-2' />
            <span>{car.transmission}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.location_icon} alt="" className='h-4 mr-2' />
            <span>{car.location}</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default CarCard
