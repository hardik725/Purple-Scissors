import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants for different sections
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const textVariant = {
    hover: { scale: 1.1, color: '#ff9cf3', transition: { duration: 0.3 } },
  };

  const headingVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  const imageUrls = [
    "https://i.ibb.co/2S0NhK8/Whats-App-Image-2025-01-19-at-15-51-19-3c397b6b.jpg",
    "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3993467/pexels-photo-3993467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5069612/pexels-photo-5069612.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <footer className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 via-purple-800 to-purple-900 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Get in Touch Section */}
        <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3
            variants={headingVariant}
            className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            GET IN TOUCH
          </motion.h3>
          <motion.p
            variants={textVariant}
            whileHover="hover"
            className="flex items-center mb-4 text-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="mr-2">📍</span> Address: Hiralal Path, E Gola Rd, Sarvoday Nagar, Patna, Bihar 801503
          </motion.p>
          <motion.p
            variants={textVariant}
            whileHover="hover"
            className="flex items-center mb-4 text-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="mr-2">📞</span> Phone: +91 9835019554
          </motion.p>
          <motion.p
            variants={textVariant}
            whileHover="hover"
            className="flex items-center mb-4 text-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="mr-2">📞</span> Phone: +91 9128792222
          </motion.p>
          <motion.p
            variants={textVariant}
            whileHover="hover"
            className="flex items-center text-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="mr-2">✉️</span> Mail: purple.scissors.org@gmail.com
          </motion.p>
        </motion.div>

        {/* Opening Hours Section */}
        <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3
            variants={headingVariant}
            className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            OPENING HOURS
          </motion.h3>
          <motion.p
            variants={textVariant}
            whileHover="hover"
            className="flex items-center mb-4 text-lg"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="mr-2">⏰</span> Monday - Saturday: 11 am to 8 pm
          </motion.p>
          <motion.p
            variants={textVariant}
            whileHover="hover"
            className="flex items-center text-lg"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="mr-2">⏰</span> Sunday: 12 noon to 8 pm
          </motion.p>
        </motion.div>

        {/* Services Section */}
        <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3
            variants={headingVariant}
            className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            SERVICES
          </motion.h3>
          <ul className="space-y-3 text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {['HAIR', 'ESSENTIAL', 'SKIN CARE', 'BRIDAL', 'SPECIAL', 'MAKE-UP', 'MB-HAIR-STYLE'].map((service) => (
              <motion.li
                key={service}
                variants={textVariant}
                whileHover="hover"
                className="hover:cursor-pointer"
              >
                {service}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Look Book Section */}
        <motion.div variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3
            variants={headingVariant}
            className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            OUR SERVICES
          </motion.h3>
          <div className="grid grid-cols-3 gap-3">
            {imageUrls.map((url, index) => (
              <motion.img
                key={index}
                src={url}
                alt={`Service ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="text-center text-sm mt-10 border-t border-purple-700 pt-6 font-cursive text-gray-300"
        style={{ fontFamily: 'Dancing Script, cursive' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Copyright © 2025 Purple Scissors Beauty Lounge
      </motion.div>
    </footer>
  );
};

export default Footer;
