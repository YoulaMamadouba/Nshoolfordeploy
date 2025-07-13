'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  CloudIcon,
  CpuChipIcon,
  ChartBarIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentChartBarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface UsageMetricsSectionProps {
  isRefreshing: boolean;
}

interface TenantUsage {
  id: string;
  name: string;
  activeUsers: number;
  storageUsed: number;
  apiCalls: number;
  features: string[];
  lastActivity: string;
  status: 'active' | 'inactive' | 'suspended';
  growth: number;
}

interface FeatureUsage {
  name: string;
  usage: number;
  icon: any;
  color: string;
  description: string;
}

const UsageMetricsSection: React.FC<UsageMetricsSectionProps> = ({ isRefreshing }) => {
  const { theme } = useTheme();
  const [tenantUsage, setTenantUsage] = useState<TenantUsage[]>([
    {
      id: '1',
      name: 'École A',
      activeUsers: 1250,
      storageUsed: 45.2,
      apiCalls: 125000,
      features: ['Gestion élèves', 'Notes', 'Emplois du temps'],
      lastActivity: '2024-01-15T10:30:00Z',
      status: 'active',
      growth: 12.5,
    },
    {
      id: '2',
      name: 'École B',
      activeUsers: 890,
      storageUsed: 32.1,
      apiCalls: 89000,
      features: ['Gestion élèves', 'Notes'],
      lastActivity: '2024-01-15T09:15:00Z',
      status: 'active',
      growth: 8.3,
    },
    {
      id: '3',
      name: 'École C',
      activeUsers: 2100,
      storageUsed: 78.5,
      apiCalls: 210000,
      features: ['Gestion élèves', 'Notes', 'Emplois du temps', 'Communication'],
      lastActivity: '2024-01-15T11:45:00Z',
      status: 'active',
      growth: 15.7,
    },
    {
      id: '4',
      name: 'École D',
      activeUsers: 450,
      storageUsed: 18.3,
      apiCalls: 45000,
      features: ['Gestion élèves'],
      lastActivity: '2024-01-14T16:20:00Z',
      status: 'inactive',
      growth: -2.1,
    },
  ]);

  const [featureUsage] = useState<FeatureUsage[]>([
    {
      name: 'Gestion des élèves',
      usage: 95,
      icon: UsersIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation du module élèves',
    },
    {
      name: 'Système de notes',
      usage: 87,
      icon: ChartBarIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation du module notes',
    },
    {
      name: 'Emplois du temps',
      usage: 72,
      icon: ClockIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation du module planning',
    },
    {
      name: 'Communication',
      usage: 65,
      icon: ChatBubbleLeftRightIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation du module communication',
    },
    {
      name: 'Rapports',
      usage: 58,
      icon: DocumentChartBarIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation du module rapports',
    },
    {
      name: 'API',
      usage: 92,
      icon: CpuChipIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      description: 'Utilisation des API',
    },
  ]);

  useEffect(() => {
    if (isRefreshing) {
      // Simuler une mise à jour des métriques
      const interval = setInterval(() => {
        setTenantUsage(prev => prev.map(tenant => ({
          ...tenant,
          activeUsers: Math.max(0, tenant.activeUsers + Math.floor((Math.random() - 0.5) * 50)),
          storageUsed: Math.max(0, Math.min(100, tenant.storageUsed + (Math.random() - 0.5) * 5)),
          apiCalls: Math.max(0, tenant.apiCalls + Math.floor((Math.random() - 0.5) * 1000)),
        })));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRefreshing]);

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'À l\'instant';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  const getStatusColor = (status: string) => {
    if (theme === 'dark') {
      switch (status) {
        case 'active': return { bg: 'bg-[#f57c00]/20', text: 'text-white', border: 'border-[#f57c00]/30' };
        case 'inactive': return { bg: 'bg-gray-800/50', text: 'text-gray-300', border: 'border-gray-600/50' };
        case 'suspended': return { bg: 'bg-[#f57c00]/20', text: 'text-white', border: 'border-[#f57c00]/30' };
        default: return { bg: 'bg-gray-800/50', text: 'text-gray-300', border: 'border-gray-600/50' };
      }
    } else {
      switch (status) {
        case 'active': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', border: 'border-[#f57c00]/20' };
        case 'inactive': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
        case 'suspended': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', border: 'border-[#f57c00]/20' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      }
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
            : 'bg-white border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Métriques d'Utilisation</h2>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Analyse de l'utilisation par tenant et par fonctionnalité</p>
          </div>
        </div>
      </motion.div>

      {/* Tenant Usage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tenantUsage.map((tenant, index) => {
          const statusColors = getStatusColor(tenant.status);
          
          return (
            <motion.div
              key={tenant.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`group relative rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
                  : 'bg-white border-gray-100'
              }`}
            >
              {/* Header */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <UsersIcon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className={`font-bold text-lg leading-tight mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                      }`}>{tenant.name}</h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{tenant.activeUsers} utilisateurs actifs</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors.bg} ${statusColors.text} ${statusColors.border} shadow-sm`}
                  >
                    <span className="truncate">
                      {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                    </span>
                  </motion.span>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {tenant.growth > 0 ? '+' : ''}{tenant.growth.toFixed(1)}%
                      </span>
                    </div>
                    <div className={`text-xs flex items-center gap-1 ${
                      tenant.growth > 0 
                        ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                        : theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    }`}>
                      {tenant.growth > 0 ? <ArrowTrendingUpIcon className="w-3 h-3" /> : <ArrowTrendingDownIcon className="w-3 h-3" />}
                      <span>
                        {tenant.growth > 0 ? 'En hausse' : 'En baisse'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Stockage utilisé</p>
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{tenant.storageUsed.toFixed(1)} GB</p>
                  </div>
                  <div>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Appels API</p>
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{tenant.apiCalls.toLocaleString()}</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className={`text-xs mb-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Fonctionnalités utilisées :</p>
                  <div className="flex flex-wrap gap-1">
                    {tenant.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className={`px-2 py-1 text-xs rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    ))}
                    {tenant.features.length > 3 && (
                      <span className={`px-2 py-1 text-xs rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{tenant.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Last Activity */}
                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Dernière activité : {formatLastActivity(tenant.lastActivity)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
            : 'bg-white border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <FireIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Utilisation par Fonctionnalité</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Taux d'adoption des différentes fonctionnalités</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureUsage.map((feature, index) => (
            <motion.div
              key={feature.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`p-4 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{feature.name}</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>{feature.description}</p>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Utilisation</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{feature.usage}%</span>
                </div>
                <div className={`w-full rounded-full h-2 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${feature.usage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${feature.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UsageMetricsSection; 