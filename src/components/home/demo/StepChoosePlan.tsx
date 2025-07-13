'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { colors, animations } from '@/lib/ColorGuide';

interface StepChoosePlanProps {
  onNext: () => void;
  onPrev: () => void;
  isAutoPlaying: boolean;
  currentStep: number;
  totalSteps: number;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  color: string;
  icon: string;
}

const StepChoosePlan: React.FC<StepChoosePlanProps> = ({
  onNext,
  onPrev,
  isAutoPlaying,
  currentStep,
  totalSteps,
}) => {

  const [currentPlan, setCurrentPlan] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showSelection, setShowSelection] = useState(false);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '29',
      period: '/mois',
      features: ['Jusqu\'à 100 élèves', 'Gestion des notes', 'Emploi du temps', 'Support email'],
      color: '#3b82f6, #06b6d4',
      icon: '🚀',
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '59',
      period: '/mois',
      features: ['Jusqu\'à 500 élèves', 'Toutes les fonctionnalités Starter', 'Messagerie interne', 'Rapports avancés'],
      popular: true,
      color: '#f97316, #f59e0b',
      icon: '⭐',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '99',
      period: '/mois',
      features: ['Jusqu\'à 1000 élèves', 'Toutes les fonctionnalités Basic', 'Classes virtuelles', 'API personnalisée'],
      color: '#a855f7, #ec4899',
      icon: '💎',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '199',
      period: '/mois',
      features: ['Élèves illimités', 'Toutes les fonctionnalités', 'Support dédié', 'Déploiement sur site'],
      color: '#1f2937, #111827',
      icon: '🏢',
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSelection(true), 2000);
    const timer2 = setTimeout(() => setCurrentPlan(1), 4000);
    const timer3 = setTimeout(() => setCurrentPlan(2), 6000);
    const timer4 = setTimeout(() => setCurrentPlan(3), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
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

  const handlePlanSelect = (planIndex: number) => {
    setSelectedPlan(planIndex);
    setTimeout(() => onNext(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Choisissez votre plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sélectionnez le plan qui correspond le mieux aux besoins de votre établissement
          </p>
        </motion.div>

        {/* Carousel 3D des plans */}
        <div className="relative">
          <div className="flex justify-center items-center gap-8 perspective-1000">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                animate={{
                  opacity: currentPlan >= index ? 1 : 0.6,
                  scale: currentPlan === index ? 1 : 0.9,
                  rotateY: currentPlan === index ? 0 : currentPlan > index ? 45 : -45,
                  z: currentPlan === index ? 50 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                }}
                className={`relative transform-gpu transition-all duration-500 ${
                  currentPlan === index ? 'z-20' : 'z-10'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlanSelect(index)}
                  className={`relative p-8 rounded-2xl shadow-2xl cursor-pointer backdrop-blur-sm border-2 ${
                    selectedPlan === index
                      ? 'ring-4 ring-orange-500 ring-opacity-50'
                      : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${plan.color.split(', ')[0]}, ${plan.color.split(', ')[1]})`,
                    minWidth: '280px',
                    minHeight: '400px',
                  }}
                >
                  {/* Badge populaire */}
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold"
                    >
                      Le plus populaire
                    </motion.div>
                  )}

                  {/* Icône */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.2, type: 'spring' }}
                    className="text-4xl mb-4"
                  >
                    {plan.icon}
                  </motion.div>

                  {/* Nom du plan */}
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{plan.name}</h3>

                  {/* Prix */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">${plan.price}</span>
                    <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{plan.period}</span>
                  </div>

                  {/* Fonctionnalités */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 + index * 0.2 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                          className="w-2 h-2 bg-white rounded-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                        />
                        <span className="text-white text-sm font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bouton de sélection */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                      selectedPlan === index
                        ? 'bg-white text-orange-500 shadow-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
                        : 'bg-white/30 text-white hover:bg-white/40 backdrop-blur-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {selectedPlan === index ? 'Sélectionné ✓' : 'Choisir ce plan'}
                  </motion.button>

                  {/* Effet de brillance */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 100, opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Indicateurs de navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-6 right-6 flex gap-2"
        >
          {plans.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentPlan(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPlan === index
                  ? 'bg-orange-500 scale-125'
                  : 'bg-gray-300 hover:bg-orange-300'
              }`}
            />
          ))}
        </motion.div>

        {/* Call-to-Action */}
        <AnimatePresence>
          {showSelection && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center mt-12 mb-8"
            >
              <p className="text-gray-600 mb-4">
                Cliquez sur un plan pour le sélectionner
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
              >
                Continuer
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Particules flottantes */}
      {typeof window !== 'undefined' && [...Array(10)].map((_, index) => (
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

export default StepChoosePlan; 