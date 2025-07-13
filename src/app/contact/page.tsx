'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ContactHero from '@/components/home/contact/ContactHero';
import ContactForm from '@/components/home/contact/ContactForm';
import ContactInfos from '@/components/home/contact/ContactInfos';
import ContactMap from '@/components/home/contact/ContactMap';

export default function ContactPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50"
    >
      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Formulaire de contact */}
          <motion.div
            variants={{
              initial: { opacity: 0, x: -30 },
              animate: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ContactForm />
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            variants={{
              initial: { opacity: 0, x: 30 },
              animate: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <ContactInfos />
          </motion.div>
        </div>

        {/* Blocs Suivez-nous et Prêt à commencer */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Bloc Suivez-nous */}
          <motion.div
            variants={{
              initial: { opacity: 0, x: -30 },
              animate: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          >
            <div className="bg-gradient-to-br from-[#2b4a6a]/5 to-[#f57c00]/5 rounded-2xl p-8 border border-[#2b4a6a]/10">
              <h3 className="text-xl font-semibold text-[#2b4a6a] mb-6 text-center">
                Suivez-nous
              </h3>
              <div className="flex justify-center space-x-4">
                {[
                  {
                    name: 'LinkedIn',
                    color: 'from-blue-600 to-blue-700',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'Twitter',
                    color: 'from-blue-400 to-blue-500',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )
                  },
                  {
                    name: 'Facebook',
                    color: 'from-blue-600 to-blue-700',
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )
                  }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bloc Prêt à commencer */}
          <motion.div
            variants={{
              initial: { opacity: 0, x: 30 },
              animate: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-[#f57c00] to-orange-600 rounded-2xl p-8 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">
                Prêt à commencer ?
              </h3>
              <p className="text-orange-100 mb-4">
                Rejoignez N School et transformez votre établissement
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#f57c00] px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-300"
              >
                Essai gratuit
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Carte */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
          className="mt-16"
        >
          <ContactMap />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 