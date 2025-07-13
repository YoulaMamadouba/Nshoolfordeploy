'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { colors, animations } from '@/lib/ColorGuide';
import Link from 'next/link';

interface FinalCTAProps {
  onNext: () => void;
  onPrev: () => void;
  isAutoPlaying: boolean;
  currentStep: number;
  totalSteps: number;
}

const FinalCTA: React.FC<FinalCTAProps> = ({
  onNext,
  onPrev,
  isAutoPlaying,
  currentStep,
  totalSteps,
}) => {

  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 500);
    const timer2 = setTimeout(() => setShowSubtitle(true), 1500);
    const timer3 = setTimeout(() => setShowStats(true), 2500);
    const timer4 = setTimeout(() => setShowCTA(true), 3500);
    const timer5 = setTimeout(() => setShowConfetti(true), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  // Auto-advance après 10 secondes
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        // Rediriger vers la page d'accueil
        window.location.href = '/';
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(245, 124, 0, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(245, 124, 0, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(245, 124, 0, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50"
        />

        {/* Particules de confetti */}
        <AnimatePresence>
          {showConfetti && typeof window !== 'undefined' && (
            <>
              {[...Array(50)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{
                    x: Math.random() * (window.innerWidth || 1200),
                    y: -50,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.random() * (window.innerWidth || 1200),
                    y: (window.innerHeight || 800) + 50,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                  }}
                  className="absolute w-2 h-2 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: ['#f57c00', '#ff9800', '#ffb74d', '#ffcc02'][Math.floor(Math.random() * 4)],
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo N School */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <div className="relative inline-block">
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
            </div>
          </div>
        </motion.div>

        {/* Titre principal */}
        <AnimatePresence>
          {showTitle && (
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
                className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Et si votre école passait à N School aujourd'hui ?
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sous-titre */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
                Rejoignez la révolution de la gestion scolaire en Afrique
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistiques */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {[
                { value: '100+', label: 'Écoles partenaires', icon: '🏫' },
                { value: '50K+', label: 'Utilisateurs actifs', icon: '👥' },
                { value: '95%', label: 'Taux de satisfaction', icon: '⭐' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-orange-600 mb-1">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
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
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Link href="/signup">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(245, 124, 0, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Créer mon établissement
                      </motion.span>
                      <motion.svg
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-6 h-6"
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
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold shadow-lg border border-gray-200 hover:bg-white transition-all duration-300"
                  >
                    Retour à l'accueil
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    Nous contacter
                  </motion.button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-sm text-gray-500 mt-4"
              >
                Commencez votre essai gratuit de 14 jours
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Effet de particules flottantes */}
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
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="absolute w-1 h-1 bg-orange-400 rounded-full pointer-events-none"
        />
      ))}
    </div>
  );
};

export default FinalCTA; 