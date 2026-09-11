import React, { useState, useMemo } from 'react'
import Title from './Title'
import CarCard from './CarCard'
import { useAppContext } from '../context/AppContext'

const Recommendations = () => {
  const { cars } = useAppContext()
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter only currently available cars
  const availableCars = useMemo(() => {
    return cars.filter(car => car.isAvaliable !== false)
  }, [cars])

  // Get distinct categories
  const categories = useMemo(() => {
    const cats = new Set(availableCars.map(car => car.category).filter(Boolean))
    return ['All', ...Array.from(cats)]
  }, [availableCars])

  // Compute top 3 recommended cars per category deterministically:
  // Ranking: newer model year, followed by best daily value
  const recommendationsByCategory = useMemo(() => {
    const grouped = {}

    availableCars.forEach(car => {
      const cat = car.category || 'Other'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push(car)
    })

    const result = {}
    Object.keys(grouped).forEach(cat => {
      result[cat] = grouped[cat]
        .slice()
        .sort((a, b) => {
          // 1. Newer year first
          if ((b.year || 0) !== (a.year || 0)) {
            return (b.year || 0) - (a.year || 0)
          }
          // 2. Competitive pricing (lower pricePerDay higher value)
          if ((a.pricePerDay || 0) !== (b.pricePerDay || 0)) {
            return (a.pricePerDay || 0) - (b.pricePerDay || 0)
          }
          // 3. Fallback to newest creation
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        })
        .slice(0, 3)
    })

    return result
  }, [availableCars])

  // Determine cars to display based on active tab
  const displayedCars = useMemo(() => {
    if (activeCategory === 'All') {
      // Flatten top 3 from each category (max 3 per category)
      const list = []
      Object.keys(recommendationsByCategory).forEach(cat => {
        list.push(...recommendationsByCategory[cat])
      })
      return list.slice(0, 6)
    }
    return recommendationsByCategory[activeCategory] || []
  }, [activeCategory, recommendationsByCategory])

  if (availableCars.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className='py-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-light/50 border-y border-borderColor'
    >
      <div className='flex flex-col items-center text-center'>
        <Title
          title='Top Recommendations by Vehicle Type'
          subTitle='Handpicked top 3 vehicles in every class, ranked by reliability, modern specs, and rental value.'
        />

        {/* Category Tabs */}
        {categories.length > 1 && (
          <div className='flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-white border border-borderColor rounded-full shadow-sm max-w-xl'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {cat === 'All' ? 'Top Picks' : `Top 3 ${cat}s`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Recommended Cars */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto'>
        {displayedCars.map((car, index) => {
          const rank = (index % 3) + 1
          const rankBadge =
            rank === 1
              ? '#1 Top Pick'
              : rank === 2
              ? '#2 Recommended'
              : '#3 Popular Choice'

          return (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 3) * 0.15, duration: 0.4 }}
              viewport={{ once: true }}
              className='relative'
            >
              <CarCard car={car} rankBadge={rankBadge} />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Recommendations
