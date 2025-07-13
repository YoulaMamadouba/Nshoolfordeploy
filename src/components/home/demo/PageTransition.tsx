'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/ColorGuide';

const PageTransition: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Logo N School animé */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.8,
        }}
        className="relative"
      >
        {/* Cercle de fond */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-xl opacity-30"
        />
        
        {/* Logo principal */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white font-bold text-2xl"
          >
            N
          </motion.div>
          
          {/* Effet de brillance */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 50, opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.8,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
          />
        </div>
      </motion.div>

      {/* Texte de chargement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-1/4 text-center"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-600 font-medium"
        >
          Chargement de la démonstration...
        </motion.p>
        
        {/* Points de chargement */}
        <div className="flex justify-center gap-1 mt-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-orange-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>

              {/* Particules flottantes */}
        {typeof window !== 'undefined' && [...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: Math.random() * (window.innerWidth || 1200),
              y: Math.random() * (window.innerHeight || 800),
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: Math.random() * (window.innerWidth || 1200),
              y: Math.random() * (window.innerHeight || 800),
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            className="absolute w-2 h-2 bg-orange-400 rounded-full"
          />
        ))}

      {/* Barre de progression */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-200 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
        />
      </motion.div>
    </div>
  );
};

export default PageTransition; 