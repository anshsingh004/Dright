import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}

            className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}

                className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
                <div>
                    <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}

                        src={assets.logo} alt="logo" className='h-8 md:h-9' />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}

                        className='max-w-80 mt-3'>
                        Dright is your premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}

                        className='flex items-center gap-3 mt-6'>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer"> <img src={assets.facebook_logo} className='w-5 h-5' alt="" /> </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer"> <img src={assets.instagram_logo} className='w-5 h-5' alt="" /> </a>
                        {/* Placeholder for X (Twitter) since we might not have X logo specifically in assets based on file list, using twitter logo as X or fallback */}
                        <a href="https://x.com" target="_blank" rel="noreferrer"> <img src={assets.twitter_logo} className='w-5 h-5' alt="X" /> </a>
                        <a href="mailto:annshsingh0411@gmail.com"> <img src={assets.gmail_logo} className='w-5 h-5' alt="" /> </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}

                    className='flex flex-wrap justify-between w-1/2 gap-8'>

                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/cars" className="hover:text-primary transition-colors">Browse Cars</Link></li>
                            <li><Link to="/owner" className="hover:text-primary transition-colors">List Your Car</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><Link to="/legal" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/legal" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link to="/legal" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/legal" className="hover:text-primary transition-colors">Insurance</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li>Dehradun, India</li>
                            <li>annshsingh0411@gmail.com</li>
                        </ul>
                    </div>

                </motion.div>





            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}

                className='flex flex-col md:flex-row gap-2 items-center justify-between py-5 border-t border-transparent'>
                <p>© {new Date().getFullYear()} Dright. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><Link to="/legal">Privacy</Link></li>
                    <li>|</li>
                    <li><Link to="/legal">Terms</Link></li>
                    <li>|</li>
                    <li><Link to="/legal">Cookies</Link></li>
                </ul>
            </motion.div>
        </motion.div>
    )
}

export default Footer
