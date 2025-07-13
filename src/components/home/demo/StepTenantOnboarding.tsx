'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { colors, animations } from '@/lib/ColorGuide';

interface StepTenantOnboardingProps {
  onNext: () => void;
  onPrev: () => void;
  isAutoPlaying: boolean;
  currentStep: number;
  totalSteps: number;
}

const StepTenantOnboarding: React.FC<StepTenantOnboardingProps> = ({
  onNext,
  onPrev,
  isAutoPlaying,
  currentStep,
  totalSteps,
}) => {

  const [currentPhase, setCurrentPhase] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const phases = [
    { title: 'Création du compte', description: 'Configurez votre établissement' },
    { title: 'Informations de base', description: 'Nom, adresse, type d\'établissement' },
    { title: 'Configuration initiale', description: 'Paramètres de base' },
    { title: 'Compte créé !', description: 'Votre établissement est prêt' },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowForm(true), 1000);
    const timer2 = setTimeout(() => setCurrentPhase(1), 3000);
    const timer3 = setTimeout(() => setCurrentPhase(2), 5000);
    const timer4 = setTimeout(() => setCurrentPhase(3), 7000);
    const timer5 = setTimeout(() => setShowSuccess(true), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
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
      {/* Arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Section gauche - Processus */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Création de votre établissement
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Configurez votre établissement en quelques étapes simples
              </p>
            </motion.div>

            {/* Étapes du processus */}
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: currentPhase >= index ? 1 : 0.3,
                    x: currentPhase >= index ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    currentPhase === index
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                      : currentPhase > index
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: currentPhase >= index ? 1 : 0 }}
                    transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      currentPhase === index
                        ? 'bg-white text-orange-500'
                        : currentPhase > index
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentPhase > index ? '✓' : index + 1}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">{phase.title}</h3>
                    <p className="text-sm opacity-80">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section droite - Formulaire animé */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-white/80 border border-gray-200"
            >
              <AnimatePresence mode="wait">
                {currentPhase === 0 && (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <span className="text-white text-2xl">🏫</span>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Bienvenue sur N School</h3>
                    <p className="text-gray-600">Préparez-vous à révolutionner votre établissement</p>
                  </motion.div>
                )}

                {currentPhase === 1 && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold mb-4">Informations de base</h3>
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">Nom de l'établissement</label>
                        <motion.div
                          animate={{ 
                            borderColor: ['#e5e7eb', '#f57c00', '#e5e7eb'],
                            boxShadow: ['0 0 0 0 rgba(245, 124, 0, 0)', '0 0 0 3px rgba(245, 124, 0, 0.1)', '0 0 0 0 rgba(245, 124, 0, 0)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="border rounded-lg px-3 py-2 bg-gray-50"
                        >
                          <span className="text-gray-600">Lycée Moderne de Dakar</span>
                        </motion.div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Type d'établissement</label>
                        <motion.div
                          animate={{ 
                            borderColor: ['#e5e7eb', '#f57c00', '#e5e7eb'],
                            boxShadow: ['0 0 0 0 rgba(245, 124, 0, 0)', '0 0 0 3px rgba(245, 124, 0, 0.1)', '0 0 0 0 rgba(245, 124, 0, 0)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          className="border rounded-lg px-3 py-2 bg-gray-50"
                        >
                          <span className="text-gray-600">Lycée</span>
                        </motion.div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Adresse</label>
                        <motion.div
                          animate={{ 
                            borderColor: ['#e5e7eb', '#f57c00', '#e5e7eb'],
                            boxShadow: ['0 0 0 0 rgba(245, 124, 0, 0)', '0 0 0 3px rgba(245, 124, 0, 0.1)', '0 0 0 0 rgba(245, 124, 0, 0)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          className="border rounded-lg px-3 py-2 bg-gray-50"
                        >
                          <span className="text-gray-600">123 Avenue de l'Éducation, Dakar</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {currentPhase === 2 && (
                  <motion.div
                    key="config"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold mb-4">Configuration initiale</h3>
                    
                    <div className="space-y-3">
                      {['Année scolaire', 'Langue d\'interface', 'Fuseau horaire'].map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm font-medium">{item}</span>
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                            className="w-4 h-4 bg-green-500 rounded-full"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentPhase === 3 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-green-600">Compte créé avec succès !</h3>
                    <p className="text-gray-600">Votre établissement est maintenant configuré</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Call-to-Action */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
              >
                Continuer vers les plans
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StepTenantOnboarding; 