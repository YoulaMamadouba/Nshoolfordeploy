'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { colors, animations } from '@/lib/ColorGuide';

interface StepRolesPresentationProps {
  onNext: () => void;
  onPrev: () => void;
  isAutoPlaying: boolean;
  currentStep: number;
  totalSteps: number;
}

interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  actions: string[];
}

const StepRolesPresentation: React.FC<StepRolesPresentationProps> = ({
  onNext,
  onPrev,
  isAutoPlaying,
  currentStep,
  totalSteps,
}) => {

  const [currentRole, setCurrentRole] = useState(0);
  const [showRoleDetails, setShowRoleDetails] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const roles: Role[] = [
    {
      id: 'student',
      name: 'Élève',
      description: 'Accédez à vos cours, notes et emploi du temps',
      icon: '👨‍🎓',
      color: 'from-blue-500 to-cyan-500',
      features: ['Consulter les notes', 'Voir l\'emploi du temps', 'Accéder aux cours', 'Envoyer des messages'],
      actions: ['📊 Consulter mes notes', '📅 Voir mon emploi du temps', '📚 Accéder aux ressources', '💬 Contacter un professeur'],
    },
    {
      id: 'teacher',
      name: 'Professeur',
      description: 'Gérez vos classes, notes et ressources pédagogiques',
      icon: '👨‍🏫',
      color: 'from-green-500 to-emerald-500',
      features: ['Saisir les notes', 'Gérer les cours', 'Suivre la progression', 'Partager des ressources'],
      actions: ['📝 Saisir les notes', '📚 Créer un cours', '📊 Suivre la progression', '📁 Partager des ressources'],
    },
    {
      id: 'parent',
      name: 'Parent',
      description: 'Suivez la scolarité de vos enfants',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-purple-500 to-pink-500',
      features: ['Suivre les notes', 'Payer les frais', 'Recevoir les notifications', 'Communiquer avec l\'école'],
      actions: ['📊 Suivre les notes', '💰 Payer les frais', '🔔 Recevoir les notifications', '💬 Contacter l\'école'],
    },
    {
      id: 'admin',
      name: 'Administrateur',
      description: 'Gérez l\'établissement et les utilisateurs',
      icon: '👨‍💼',
      color: 'from-orange-500 to-amber-500',
      features: ['Gérer les utilisateurs', 'Configurer l\'établissement', 'Générer les rapports', 'Gérer les paiements'],
      actions: ['👥 Gérer les utilisateurs', '⚙️ Configurer l\'établissement', '📊 Générer les rapports', '💰 Gérer les paiements'],
    },
    {
      id: 'super-admin',
      name: 'Super Administrateur',
      description: 'Gérez plusieurs établissements et la plateforme',
      icon: '👑',
      color: 'from-gray-800 to-gray-900',
      features: ['Créer des établissements', 'Gérer la plateforme', 'Support technique', 'Facturation'],
      actions: ['🏫 Créer un établissement', '🌐 Gérer la plateforme', '🛠️ Support technique', '💳 Facturation'],
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowRoleDetails(true), 1000);
    const timer2 = setTimeout(() => setCurrentRole(1), 3000);
    const timer3 = setTimeout(() => setCurrentRole(2), 5000);
    const timer4 = setTimeout(() => setCurrentRole(3), 7000);
    const timer5 = setTimeout(() => setCurrentRole(4), 9000);
    const timer6 = setTimeout(() => setShowActions(true), 11000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  // Auto-advance après 12 secondes
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        onNext();
      }, 12000);

      return () => clearTimeout(timer);
    }
  }, [isAutoPlaying, onNext]);

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
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            Rôles utilisateurs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment chaque utilisateur interagit avec la plateforme N School
          </p>
        </motion.div>

        {/* Présentation des rôles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Section gauche - Rôles */}
          <div className="space-y-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: currentRole >= index ? 1 : 0.3,
                  x: currentRole >= index ? 0 : -20,
                  scale: currentRole === index ? 1.05 : 1,
                }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  currentRole === index
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl'
                    : 'bg-white/80 border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setCurrentRole(index)}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{
                      scale: currentRole === index ? [1, 1.2, 1] : 1,
                      rotate: currentRole === index ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5, repeat: currentRole === index ? Infinity : 0 }}
                    className="text-4xl"
                  >
                    {role.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">{role.name}</h3>
                    <p className={`text-sm ${currentRole === index ? 'text-white/80' : 'text-gray-600'}`}>
                      {role.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section droite - Détails du rôle */}
          <AnimatePresence mode="wait">
            {showRoleDetails && (
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                                 className="p-8 rounded-2xl shadow-2xl backdrop-blur-sm bg-white/80 border border-gray-200"
              >
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    {roles[currentRole].icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{roles[currentRole].name}</h3>
                  <p className="text-gray-600">{roles[currentRole].description}</p>
                </div>

                {/* Fonctionnalités */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-700">Fonctionnalités principales :</h4>
                  <div className="space-y-2">
                    {roles[currentRole].features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                          className="w-2 h-2 bg-orange-500 rounded-full"
                        />
                        <span className="text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <AnimatePresence>
                  {showActions && currentRole === roles.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h4 className="font-semibold mb-3 text-gray-700">Actions typiques :</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {roles[currentRole].actions.map((action, actionIndex) => (
                          <motion.div
                            key={action}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: actionIndex * 0.1 }}
                            className="p-3 bg-gray-50 rounded-lg text-sm"
                          >
                            {action}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Indicateurs de navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-2 mt-8"
        >
          {roles.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentRole(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentRole === index
                  ? 'bg-orange-500 scale-125'
                  : 'bg-gray-300 hover:bg-orange-300'
              }`}
            />
          ))}
        </motion.div>

        {/* Call-to-Action */}
        <AnimatePresence>
          {showActions && (
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
                Terminer la démonstration
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Particules flottantes */}
      {typeof window !== 'undefined' && [...Array(15)].map((_, index) => (
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
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="absolute w-1 h-1 bg-orange-400 rounded-full pointer-events-none"
        />
      ))}
    </div>
  );
};

export default StepRolesPresentation; 