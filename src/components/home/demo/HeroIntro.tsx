'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, animations } from '@/lib/ColorGuide';

interface HeroIntroProps {
  onNext: () => void;
  onPrev: () => void;
  isAutoPlaying: boolean;
  currentStep: number;
  totalSteps: number;
}

const HeroIntro: React.FC<HeroIntroProps> = ({
  onNext,
  onPrev,
  isAutoPlaying,
  currentStep,
  totalSteps,
}) => {
  const [showCTA, setShowCTA] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsLogoVisible(true), 500);
    const timer2 = setTimeout(() => setIsTextVisible(true), 1500);
    const timer3 = setTimeout(() => setShowCTA(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Auto-advance après 8 secondes
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        onNext();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, onNext]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        {/* Gradient animé */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(245, 124, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(245, 124, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(245, 124, 0, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />

        {/* Particules flottantes */}
        {typeof window !== 'undefined' && [...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            initial={{
              x: Math.random() * (window.innerWidth || 1200),
              y: Math.random() * (window.innerHeight || 800),
              opacity: 0,
            }}
            animate={{
              x: Math.random() * (window.innerWidth || 1200),
              y: Math.random() * (window.innerHeight || 800),
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo N School animé */}
        <AnimatePresence>
          {isLogoVisible && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                duration: 1,
              }}
              className="mb-12"
            >
              <div className="relative inline-block">
                {/* Halo lumineux */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-2xl opacity-30"
                />

                {/* Logo principal */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="text-white font-bold text-3xl"
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
                      delay: 1,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Titre principal */}
        <AnimatePresence>
          {isTextVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.h1
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                N School
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 font-medium"
              >
                Réinventez la gestion scolaire. Aujourd'hui.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
              >
                Découvrez comment notre plateforme révolutionne la gestion des établissements 
                éducatifs en Afrique avec une solution tout-en-un intuitive et puissante.
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call-to-Action */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(245, 124, 0, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="hidden sm:inline">Commencer la démonstration</span>
                    <span className="sm:hidden">Commencer</span>
                  </motion.span>
                  <motion.svg
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>

                {/* Effet de brillance */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 100, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-sm text-gray-500 mt-4"
              >
                Appuyez sur <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd> pour continuer
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroIntro; 