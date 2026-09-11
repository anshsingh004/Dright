import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const Navbar = () => {

    const { setShowLogin, user, logout, isOwner, handleOwnerAction } = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        if (e) e.preventDefault()
        const trimmed = searchQuery.trim()
        if (trimmed) {
            navigate(`/cars?search=${encodeURIComponent(trimmed)}`)
        } else {
            navigate('/cars')
        }
        setOpen(false)
    }

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${location.pathname === "/" && "bg-light"}`}>

            <Link to='/'>
                <motion.img whileHover={{ scale: 1.05 }} src={assets.logo} alt="logo" className="h-8" />
            </Link>

            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
                {menuLinks.map((link, index) => (
                    <Link key={index} to={link.path} onClick={() => setOpen(false)} className="hover:text-primary transition-colors">
                        {link.name}
                    </Link>
                ))}

                {/* Desktop Navbar Search */}
                <form onSubmit={handleSearch} className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56 focus-within:border-primary transition-colors'>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 text-gray-700" 
                        placeholder="Search cars" 
                    />
                    <button type="submit" aria-label="Search" className="cursor-pointer hover:opacity-80 transition-opacity">
                        <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                    </button>
                </form>

                {/* Mobile/Tablet Drawer Search */}
                <form onSubmit={handleSearch} className='flex lg:hidden items-center text-sm gap-2 border border-borderColor px-3 py-1 rounded-full w-full max-w-xs focus-within:border-primary transition-colors'>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1 w-full bg-transparent outline-none placeholder-gray-500 text-gray-700" 
                        placeholder="Search cars" 
                    />
                    <button type="submit" aria-label="Search" className="cursor-pointer hover:opacity-80 transition-opacity">
                        <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                    </button>
                </form>

                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>

                    <button onClick={() => { setOpen(false); isOwner ? navigate('/owner') : handleOwnerAction(); }} className="cursor-pointer hover:text-primary transition-colors">{isOwner ? 'Dashboard' : 'List cars'}</button>

                    <button onClick={() => { setOpen(false); user ? logout() : setShowLogin(true); }} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">{user ? 'Logout' : 'Login'}</button>
                </div>
            </div>

            <button className='sm:hidden cursor-pointer' aria-label="Menu" onClick={() => setOpen(!open)}>
                <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
            </button>

        </motion.div>
    )
}

export default Navbar
