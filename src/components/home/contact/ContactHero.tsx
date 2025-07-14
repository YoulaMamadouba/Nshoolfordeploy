'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContactHero: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const titleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'backOut',
        delay: 0.4
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20 lg:py-32">
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              scale: [0, 1, 0],
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            className="absolute w-2 h-2 bg-orange-300 rounded-full"
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icône */}
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
        </motion.div>

        {/* Titre */}
        <motion.h1
          variants={titleVariants}
          initial="initial"
          animate="animate"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-[#2b4a6a] to-[#f57c00] bg-clip-text text-transparent">
            Restons en contact
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          variants={subtitleVariants}
          initial="initial"
          animate="animate"
          className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Une question, une démo, un partenariat ? 
          <span className="block text-[#f57c00] font-medium">Écrivez-nous.</span>
        </motion.p>

        {/* Ligne décorative */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-8 h-1 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
        />
      </div>
    </section>
  );
};

export default ContactHero; 