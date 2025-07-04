'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SystemHealthSection from './SystemHealthSection';
import UsageMetricsSection from './UsageMetricsSection';
import ReportsAndExportSection from './ReportsAndExportSection';
import {
  HeartIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

type MonitoringView = 'health' | 'usage' | 'reports';

const MonitoringPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<MonitoringView>('health');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleViewChange = (view: MonitoringView) => {
    setCurrentView(view);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simuler un refresh des données
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const navigationItems = [
    {
      id: 'health' as MonitoringView,
      name: 'Santé Système',
      icon: HeartIcon,
      description: 'Métriques serveurs et performance',
    },
    {
      id: 'usage' as MonitoringView,
      name: 'Métriques Usage',
      icon: ChartBarIcon,
      description: 'Utilisation par tenant et features',
    },
    {
      id: 'reports' as MonitoringView,
      name: 'Rapports & Export',
      icon: DocumentChartBarIcon,
      description: 'Génération et export de rapports',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Monitoring & Analytics
            </h1>
            <p className="text-lg text-gray-600 mt-1 font-medium">
              Surveillez la santé de votre plateforme et analysez les performances
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-[#f57c00] text-white rounded-xl font-semibold shadow-lg hover:bg-[#e65100] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CogIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Actualisation...' : 'Actualiser'}
          </motion.button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleViewChange(item.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                currentView === item.id
                  ? 'bg-[#f57c00] text-white shadow-md'
                  : 'bg-white text-[#2b4a6a] border border-[#2b4a6a]/20 hover:bg-[#2b4a6a]/5'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentView === 'health' && (
          <motion.div
            key="health"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <SystemHealthSection isRefreshing={isRefreshing} />
          </motion.div>
        )}

        {currentView === 'usage' && (
          <motion.div
            key="usage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <UsageMetricsSection isRefreshing={isRefreshing} />
          </motion.div>
        )}

        {currentView === 'reports' && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <ReportsAndExportSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-[#f57c00]/10 via-[#ff9800]/10 to-[#f57c00]/10 rounded-3xl p-4 border border-[#f57c00]/20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#2b4a6a]">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#2b4a6a]">245ms</div>
            <div className="text-sm text-gray-600">Temps de réponse</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#2b4a6a]">1.2M</div>
            <div className="text-sm text-gray-600">Requêtes/jour</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#f57c00]">0.01%</div>
            <div className="text-sm text-gray-600">Taux d'erreur</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MonitoringPage; 