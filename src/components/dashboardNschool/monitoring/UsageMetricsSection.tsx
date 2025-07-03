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
      color: 'from-blue-500 to-indigo-600',
      description: 'Utilisation du module élèves',
    },
    {
      name: 'Système de notes',
      usage: 87,
      icon: ChartBarIcon,
      color: 'from-green-500 to-emerald-600',
      description: 'Utilisation du module notes',
    },
    {
      name: 'Emplois du temps',
      usage: 72,
      icon: ClockIcon,
      color: 'from-purple-500 to-pink-600',
      description: 'Utilisation du module planning',
    },
    {
      name: 'Communication',
      usage: 65,
      icon: ChatBubbleLeftRightIcon,
      color: 'from-orange-500 to-red-600',
      description: 'Utilisation du module communication',
    },
    {
      name: 'Rapports',
      usage: 58,
      icon: DocumentChartBarIcon,
      color: 'from-teal-500 to-cyan-600',
      description: 'Utilisation du module rapports',
    },
    {
      name: 'API',
      usage: 92,
      icon: CpuChipIcon,
      color: 'from-gray-500 to-slate-600',
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
    switch (status) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      case 'inactive': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      case 'suspended': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
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
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2b4a6a]">Métriques d'Usage</h2>
            <p className="text-gray-600">Analyse de l'utilisation par tenant et fonctionnalités</p>
          </div>
        </div>
      </motion.div>

      {/* Feature Usage Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <FireIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a]">Features les Plus Utilisées</h3>
            <p className="text-gray-600">Taux d'adoption des fonctionnalités</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureUsage.map((feature, index) => {
            const FeatureIcon = feature.icon;
            
            return (
              <motion.div
                key={feature.name}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300"
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FeatureIcon className="w-6 h-6" />
                      {/* Effet de brillance sur l'icône */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">{feature.name}</h4>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Utilisation</span>
                      <span className="font-semibold">{feature.usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.usage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${feature.color}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Adoption</span>
                    <span className={`font-semibold ${
                      feature.usage >= 80 ? 'text-green-600' : 
                      feature.usage >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {feature.usage >= 80 ? 'Excellente' : 
                       feature.usage >= 60 ? 'Bonne' : 'À améliorer'}
                    </span>
                  </div>
                </div>

                {/* Effet de bordure animée */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#f57c00]/20 via-[#ff9800]/20 to-[#f57c00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Tenant Usage Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
            <UsersIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a]">Usage par Tenant</h3>
            <p className="text-gray-600">Détails de l'utilisation par établissement</p>
          </div>
        </div>

        <div className="space-y-4">
          {tenantUsage.map((tenant, index) => {
            const statusColors = getStatusColor(tenant.status);
            
            return (
              <motion.div
                key={tenant.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 p-6"
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {tenant.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{tenant.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${statusColors.bg} ${statusColors.text} ${statusColors.border}`}>
                            {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                          </span>
                          <div className="flex items-center gap-1 text-sm">
                            {tenant.growth > 0 ? (
                              <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
                            ) : (
                              <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
                            )}
                            <span className={tenant.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                              {Math.abs(tenant.growth)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Dernière activité</p>
                      <p className="text-sm font-semibold text-gray-900">{formatLastActivity(tenant.lastActivity)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <UsersIcon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-blue-600 font-semibold">Utilisateurs actifs</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-800">{tenant.activeUsers.toLocaleString()}</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CloudIcon className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-600 font-semibold">Stockage utilisé</span>
                      </div>
                      <div className="text-2xl font-bold text-green-800">{tenant.storageUsed} GB</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CpuChipIcon className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-purple-600 font-semibold">Appels API</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-800">{tenant.apiCalls.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Features utilisées :</p>
                    <div className="flex flex-wrap gap-2">
                      {tenant.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Effet de bordure animée */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#f57c00]/20 via-[#ff9800]/20 to-[#f57c00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Platform Usage Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <GlobeAltIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a]">Résumé Plateforme</h3>
            <p className="text-gray-600">Vue d'ensemble de l'utilisation globale</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {tenantUsage.reduce((sum, tenant) => sum + tenant.activeUsers, 0).toLocaleString()}
            </div>
            <p className="text-blue-800 font-semibold">Utilisateurs totaux</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {tenantUsage.reduce((sum, tenant) => sum + tenant.storageUsed, 0).toFixed(1)} GB
            </div>
            <p className="text-green-800 font-semibold">Stockage total</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {tenantUsage.reduce((sum, tenant) => sum + tenant.apiCalls, 0).toLocaleString()}
            </div>
            <p className="text-purple-800 font-semibold">Appels API/jour</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {tenantUsage.filter(tenant => tenant.status === 'active').length}
            </div>
            <p className="text-orange-800 font-semibold">Tenants actifs</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UsageMetricsSection; 