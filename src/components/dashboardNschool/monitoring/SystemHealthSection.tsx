'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CpuChipIcon,
  ServerIcon,
  CircleStackIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  SignalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

interface SystemHealthSectionProps {
  isRefreshing: boolean;
}

interface MetricData {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: any;
  color: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

const SystemHealthSection: React.FC<SystemHealthSectionProps> = ({ isRefreshing }) => {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      name: 'CPU',
      value: 45,
      unit: '%',
      status: 'healthy',
      icon: CpuChipIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation du processeur',
      trend: 'stable',
    },
    {
      name: 'RAM',
      value: 78,
      unit: '%',
      status: 'warning',
      icon: ServerIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation de la mémoire',
      trend: 'up',
    },
    {
      name: 'Disque',
      value: 62,
      unit: '%',
      status: 'healthy',
      icon: CircleStackIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Espace disque utilisé',
      trend: 'stable',
    },
    {
      name: 'Base de données',
      value: 92,
      unit: '%',
      status: 'critical',
      icon: CircleStackIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Connexions actives',
      trend: 'up',
    },
    {
      name: 'Temps de réponse',
      value: 245,
      unit: 'ms',
      status: 'healthy',
      icon: GlobeAltIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Latence moyenne',
      trend: 'down',
    },
    {
      name: 'Taux d\'erreur',
      value: 0.01,
      unit: '%',
      status: 'healthy',
      icon: ExclamationTriangleIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Erreurs 5xx',
      trend: 'stable',
    },
  ]);

  useEffect(() => {
    if (isRefreshing) {
      // Simuler une mise à jour des métriques
      const interval = setInterval(() => {
        setMetrics(prev => prev.map(metric => ({
          ...metric,
          value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        })));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isRefreshing]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircleIcon;
      case 'warning': return ExclamationTriangleIcon;
      case 'critical': return ExclamationTriangleIcon;
      default: return CheckCircleIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
      case 'warning': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
      case 'critical': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
      default: return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-[#2b4a6a]';
      case 'down': return 'text-[#2b4a6a]';
      case 'stable': return 'text-[#2b4a6a]';
      default: return 'text-[#2b4a6a]';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2b4a6a]">Santé du Système</h2>
            <p className="text-gray-600">Métriques en temps réel de votre infrastructure</p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const StatusIcon = getStatusIcon(metric.status);
          const MetricIcon = metric.icon;
          const statusColors = getStatusColor(metric.status);
          
          return (
            <motion.div
              key={metric.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
            >
              {/* Header */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MetricIcon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-[#2b4a6a] text-lg leading-tight mb-1">{metric.name}</h3>
                      <p className="text-sm text-gray-500">{metric.description}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors.bg} ${statusColors.text} shadow-sm`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                    <span className="truncate">
                      {metric.status === 'healthy' ? 'Sain' : metric.status === 'warning' ? 'Attention' : 'Critique'}
                    </span>
                  </motion.span>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {metric.value.toFixed(metric.unit === '%' ? 0 : 1)}
                      </span>
                      <span className="text-sm text-gray-500">{metric.unit}</span>
                    </div>
                    <div className={`text-xs ${getTrendColor(metric.trend)} flex items-center gap-1`}>
                      <span>{getTrendIcon(metric.trend)}</span>
                      <span>
                        {metric.trend === 'up' ? 'En hausse' : metric.trend === 'down' ? 'En baisse' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-6 pb-6">
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Utilisation</span>
                    <span>{metric.value.toFixed(metric.unit === '%' ? 0 : 1)}{metric.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(metric.value, 100)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${metric.color} ${
                        metric.status === 'critical' ? 'animate-pulse' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Threshold Indicators */}
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* System Status Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <SignalIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a]">État Global du Système</h3>
            <p className="text-gray-600">Résumé de la santé de votre infrastructure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-[#f57c00]/10 rounded-2xl border border-[#f57c00]/20">
            <div className="text-3xl font-bold text-[#f57c00] mb-2">4</div>
            <p className="text-[#2b4a6a] font-semibold">Services sains</p>
          </div>
          <div className="text-center p-4 bg-[#f57c00]/10 rounded-2xl border border-[#f57c00]/20">
            <div className="text-3xl font-bold text-[#f57c00] mb-2">1</div>
            <p className="text-[#2b4a6a] font-semibold">Attention</p>
          </div>
          <div className="text-center p-4 bg-[#f57c00]/10 rounded-2xl border border-[#f57c00]/20">
            <div className="text-3xl font-bold text-[#f57c00] mb-2">1</div>
            <p className="text-[#2b4a6a] font-semibold">Critique</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#f57c00]/10 rounded-2xl border border-[#f57c00]/20">
          <div className="flex items-center gap-3">
            <ClockIcon className="w-5 h-5 text-[#f57c00]" />
            <div>
              <p className="text-[#2b4a6a] font-semibold">Dernière vérification</p>
              <p className="text-[#f57c00] text-sm">
                {new Date().toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemHealthSection; 