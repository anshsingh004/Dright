import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import Title from '../components/Title'

const Legal = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 px-6 md:px-16 lg:px-24 xl:px-32 min-h-screen">

            <Title title="Legal Information" subTitle="Transparency is key to our relationship with you." />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-10 space-y-16 max-w-4xl mx-auto text-gray-900"
            >

                {/* Privacy Policy */}
                <section id="privacy">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Privacy Policy</h2>
                    <p className="mb-4">
                        At Dright, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
                    </p>
                    <h3 className="text-xl font-medium mb-2 text-black">Information We Collect</h3>
                    <p className="mb-4">
                        We collect information you provide directly to us, such as when you create an account, list a car, or book a vehicle. This may include your name, email address, phone number, and payment information.
                    </p>
                    <h3 className="text-xl font-medium mb-2 text-black">How We Use Your Information</h3>
                    <p>
                        We use your information to provide our services, process transactions, and communicate with you. We do not sell your personal data to third parties.
                    </p>
                </section>

                {/* Terms of Service */}
                <section id="terms">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Terms of Service</h2>
                    <p className="mb-4">
                        By using Dright, you agree to these Terms of Service. Please read them carefully.
                    </p>
                    <h3 className="text-xl font-medium mb-2 text-black">User Responsibilities</h3>
                    <p className="mb-4">
                        You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate and current information.
                    </p>
                    <h3 className="text-xl font-medium mb-2 text-black"> prohibited Activities</h3>
                    <p>
                        You may not use our service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.
                    </p>
                </section>

                {/* Cookie Policy */}
                <section id="cookies">
                    <h2 className="text-2xl font-semibold mb-4 text-black">Cookie Policy</h2>
                    <p className="mb-4">
                        We use cookies to enhance your experience on our website. Cookies are small text files stored on your device.
                    </p>
                    <h3 className="text-xl font-medium mb-2 text-black">Types of Cookies We Use</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Essential Cookies:</strong> Necessary for the website to function.</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how you use our site.</li>
                        <li><strong>Preference Cookies:</strong> Remember your preferences, such as language like Dark Mode.</li>
                    </ul>
                </section>

                <section className="border-t border-gray-200 pt-8 mt-10">
                    <h2 className="text-xl font-semibold mb-4 text-black">Contact Us</h2>
                    <p>If you have any questions about these terms, please contact us at:</p>
                    <address className="mt-2 not-italic">
                        <strong>Dright Support</strong><br />
                        Annsh Singh<br />
                        Dehradun, India<br />
                        Email: <a href="mailto:annshsingh0411@gmail.com" className="text-primary hover:underline">annshsingh0411@gmail.com</a>
                    </address>
                </section>

            </motion.div>
        </div>
    )
}

export default Legal
