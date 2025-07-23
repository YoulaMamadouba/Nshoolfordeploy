'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  gradient: string;
  icon: string;
  description: string;
}

const StepChoosePlan: React.FC<StepChoosePlanProps> = ({
  onNext,
  onPrev,
  isAutoPlaying,
  currentStep,
  totalSteps,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showSelection, setShowSelection] = useState(false);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '29',
      period: '/mois',
      description: 'Parfait pour les petites écoles',
      features: ['Jusqu\'à 100 élèves', 'Gestion des notes', 'Emploi du temps', 'Support email'],
      gradient: 'from-[#2b4a6a] to-[#7ba1c9]',
      icon: '🚀',
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '59',
      period: '/mois',
      description: 'Idéal pour les établissements moyens',
      features: ['Jusqu\'à 500 élèves', 'Toutes les fonctionnalités Starter', 'Messagerie interne', 'Rapports avancés'],
      popular: true,
      gradient: 'from-orange-500 to-amber-600',
      icon: '⭐',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '99',
      period: '/mois',
      description: 'Pour les grandes institutions',
      features: ['Jusqu\'à 1000 élèves', 'Toutes les fonctionnalités Basic', 'Classes virtuelles', 'API personnalisée'],
      gradient: 'from-[#2b4a6a] to-[#7ba1c9]',
      icon: '💎',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '199',
      period: '/mois',
      description: 'Solution complète pour les groupes',
      features: ['Élèves illimités', 'Toutes les fonctionnalités', 'Support dédié', 'Déploiement sur site'],
      gradient: 'from-orange-500 to-amber-600',
      icon: '🏢',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowSelection(true), 2000);
    return () => clearTimeout(timer);
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Arrière-plan avec motifs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#2b4a6a]/20 to-[#7ba1c9]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100/20 to-[#2b4a6a]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Choisissez votre plan
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Sélectionnez le plan qui correspond le mieux aux besoins de votre établissement
          </p>
        </motion.div>

        {/* Grille des plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Badge populaire */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    Le plus populaire
                  </div>
                </motion.div>
              )}

              {/* Card principale */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanSelect(index)}
                className={`relative h-full p-6 lg:p-8 rounded-2xl cursor-pointer transition-all duration-300 ${
                  selectedPlan === index
                    ? 'ring-4 ring-orange-500/50 shadow-2xl'
                    : 'shadow-xl hover:shadow-2xl'
                } bg-white border border-gray-100`}
              >
                {/* Gradient de fond */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 rounded-2xl`}></div>
                
                {/* Contenu */}
                <div className="relative z-10">
                  {/* En-tête */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1, type: 'spring' }}
                      className="text-3xl mb-3"
                    >
                      {plan.icon}
                    </motion.div>
                    
                    <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                      {plan.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4">
                      {plan.description}
                    </p>

                    {/* Prix */}
                    <div className="mb-6">
                      <span className={`text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 text-sm">{plan.period}</span>
                    </div>
                  </div>

                  {/* Fonctionnalités */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.05 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${plan.gradient}`}></div>
                        <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bouton */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      selectedPlan === index
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                        : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg`
                    }`}
                  >
                    {selectedPlan === index ? 'Sélectionné ✓' : 'Choisir ce plan'}
                  </motion.button>
                </div>

                {/* Effet de brillance */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 100, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl pointer-events-none"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action */}
        <AnimatePresence>
          {showSelection && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600 mb-6">
                Cliquez sur un plan pour le sélectionner
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continuer
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Particules flottantes */}
      {typeof window !== 'undefined' && [...Array(8)].map((_, index) => (
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
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-[#7ba1c9] rounded-full pointer-events-none"
        />
      ))}
    </div>
  );
};

export default StepChoosePlan; 