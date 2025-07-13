'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { colors, animations } from '@/lib/ColorGuide';

interface StepDashboardProps {
  onNext: () => void;
  onPrev: () => void;
  isAutoPlaying: boolean;
  currentStep: number;
  totalSteps: number;
}

const StepDashboard: React.FC<StepDashboardProps> = ({
  onNext,
  onPrev,
  isAutoPlaying,
  currentStep,
  totalSteps,
}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsLoading(false), 1000);
    const timer2 = setTimeout(() => setShowHeader(true), 1500);
    const timer3 = setTimeout(() => setShowSidebar(true), 2000);
    const timer4 = setTimeout(() => setShowStats(true), 3000);
    const timer5 = setTimeout(() => setShowCharts(true), 4000);
    const timer6 = setTimeout(() => setShowActions(true), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <AnimatePresence>
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="p-6 shadow-lg bg-white border-b border-gray-200"
          >
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <span className="text-gray-600">Admin</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-64 min-h-screen p-6 shadow-lg bg-white border-r border-gray-200"
            >
              <div className="space-y-4">
                {[
                  { icon: '📊', label: 'Vue d\'ensemble', active: true },
                  { icon: '👥', label: 'Élèves' },
                  { icon: '📚', label: 'Cours' },
                  { icon: '📅', label: 'Emploi du temps' },
                  { icon: '📝', label: 'Notes' },
                  { icon: '💰', label: 'Paiements' },
                  { icon: '⚙️', label: 'Paramètres' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      item.active
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenu principal */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Titre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Bienvenue sur votre tableau de bord
              </h2>
              <p className="text-gray-600">
                Gérez votre établissement en toute simplicité
              </p>
            </motion.div>

            {/* Statistiques */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                  {[
                    { label: 'Élèves', value: '1,247', icon: '👥', color: 'from-blue-500 to-cyan-500' },
                    { label: 'Cours', value: '45', icon: '📚', color: 'from-green-500 to-emerald-500' },
                    { label: 'Professeurs', value: '28', icon: '👨‍🏫', color: 'from-purple-500 to-pink-500' },
                    { label: 'Taux de réussite', value: '94%', icon: '📈', color: 'from-orange-500 to-amber-500' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 rounded-2xl shadow-lg bg-gradient-to-r ${stat.color} text-white`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-80">{stat.label}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <div className="text-3xl">{stat.icon}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Graphiques */}
            <AnimatePresence>
              {showCharts && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                >
                  {/* Graphique des notes */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl shadow-lg bg-white"
                  >
                    <h3 className="text-xl font-bold mb-4">Répartition des notes</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Excellent (16-20)', percentage: 25, color: 'bg-green-500' },
                        { label: 'Très bien (14-15)', percentage: 35, color: 'bg-blue-500' },
                        { label: 'Bien (12-13)', percentage: 30, color: 'bg-yellow-500' },
                        { label: 'Passable (10-11)', percentage: 10, color: 'bg-orange-500' },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between text-sm">
                            <span>{item.label}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                              className={`h-2 rounded-full ${item.color}`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Graphique d'activité */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-2xl shadow-lg bg-white"
                  >
                    <h3 className="text-xl font-bold mb-4">Activité récente</h3>
                    <div className="space-y-4">
                      {[
                        { time: 'Il y a 2h', action: 'Nouvelle note ajoutée', icon: '📝' },
                        { time: 'Il y a 4h', action: 'Cours de mathématiques', icon: '📚' },
                        { time: 'Il y a 6h', action: 'Paiement reçu', icon: '💰' },
                        { time: 'Il y a 8h', action: 'Nouvel élève inscrit', icon: '👤' },
                      ].map((activity, index) => (
                        <motion.div
                          key={activity.action}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-2xl">{activity.icon}</span>
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions rapides */}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {[
                    { title: 'Ajouter un élève', icon: '👤', color: 'from-blue-500 to-cyan-500' },
                    { title: 'Créer un cours', icon: '📚', color: 'from-green-500 to-emerald-500' },
                    { title: 'Gérer les paiements', icon: '💰', color: 'from-purple-500 to-pink-500' },
                  ].map((action, index) => (
                    <motion.button
                      key={action.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl shadow-lg bg-gradient-to-r ${action.color} text-white text-center`}
                    >
                      <div className="text-4xl mb-3">{action.icon}</div>
                      <h3 className="font-semibold">{action.title}</h3>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6 }}
        className="fixed bottom-8 right-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          Découvrir les rôles
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StepDashboard; 