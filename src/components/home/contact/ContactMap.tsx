'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ContactMap: React.FC = () => {
  const mapVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    hover: { 
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={mapVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      {/* En-tête de la carte */}
      <div className="bg-gradient-to-r from-[#2b4a6a] to-[#f57c00] p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Notre localisation</h3>
            <p className="text-white/80 text-sm">Youla City, Conakry, Guinée</p>
          </div>
        </div>
      </div>

      {/* Carte Google Maps stylée */}
      <div className="relative h-80 lg:h-96">
        {/* Carte statique stylée (remplace l'iframe pour l'exemple) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Simulation d'une carte */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#f57c00] to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[#2b4a6a] mb-2">
                N School Headquarters
              </h4>
              <p className="text-gray-600 text-sm">
                Youla City<br />
                Conakry, Guinée
              </p>
            </div>
          </div>

          {/* Éléments décoratifs de carte */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-[#f57c00] rounded-full animate-pulse" />
          <div className="absolute top-8 right-8 w-3 h-3 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-6 left-1/4 w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Overlay avec informations */}
        <div className="absolute bottom-4 left-4 right-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#2b4a6a] text-sm">
                  Accès facile
                </h4>
                <p className="text-gray-600 text-xs">
                  Zone: Youla City - Centre-ville
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#f57c00] to-orange-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-[#e65100] hover:to-orange-700 transition-all duration-300"
              >
                Itinéraire
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-600">Zone sécurisée</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-gray-600">Accès facile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-gray-600">Centre-ville</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactMap; 