'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  CreditCardIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface Tenant {
  id: number;
  name: string;
  code: string;
  domain: string;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  users: number;
  logo?: string;
}

interface TenantDetailsProps {
  tenant: Tenant;
  onBack: () => void;
}

type TabType = 'general' | 'subscription' | 'statistics' | 'technical';

const TenantDetails = ({ tenant, onBack }: TenantDetailsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general', label: 'Informations Générales', icon: BuildingOffice2Icon },
    { id: 'subscription', label: 'Abonnement', icon: CreditCardIcon },
    { id: 'statistics', label: 'Statistiques', icon: ChartBarIcon },
    { id: 'technical', label: 'Technique', icon: CogIcon },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'inactive':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      case 'suspended':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white';
      case 'Premium':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white';
      case 'Basic':
        return 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white';
      case 'Starter':
        return 'bg-gradient-to-r from-green-500 to-teal-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f57c00' }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 bg-gradient-to-r from-[#2b4a6a] to-[#3a5a7a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {tenant.name}
              </h1>
              <p className="text-lg text-gray-600 font-medium">Détails du tenant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getStatusColor(tenant.status)}`}>
              {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
            </span>
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getPlanColor(tenant.plan)}`}>
              {tenant.plan}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-xl">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Utilisateurs</p>
                <p className="text-2xl font-bold text-blue-800">{tenant.users.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-2xl border border-green-200/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-xl">
                <GlobeAltIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Domaine</p>
                <p className="text-lg font-semibold text-green-800 truncate">{tenant.domain}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-2xl border border-purple-200/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-xl">
                <CreditCardIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Code</p>
                <p className="text-lg font-semibold text-purple-800 font-mono">{tenant.code}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 rounded-2xl border border-orange-200/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-xl">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Créé le</p>
                <p className="text-lg font-semibold text-orange-800">
                  {new Date(tenant.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden backdrop-blur-sm"
      >
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#f57c00] border-b-2 border-[#f57c00] bg-orange-50/50'
                    : 'text-gray-600 hover:text-[#f57c00] hover:bg-orange-50/30'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200/50"
                  >
                    <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                      <BuildingOffice2Icon className="w-5 h-5 text-[#f57c00]" />
                      Informations de base
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Nom</span>
                        <span className="text-gray-900 font-semibold">{tenant.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Code</span>
                        <span className="text-gray-900 font-mono font-semibold">{tenant.code}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Domaine</span>
                        <span className="text-gray-900 font-semibold">{tenant.domain}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Date de création</span>
                        <span className="text-gray-900 font-semibold">
                          {new Date(tenant.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200/50"
                  >
                    <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5 text-[#f57c00]" />
                      Statut et sécurité
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Statut</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(tenant.status)}`}>
                          {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Plan</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getPlanColor(tenant.plan)}`}>
                          {tenant.plan}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Utilisateurs actifs</span>
                        <span className="text-gray-900 font-semibold">{tenant.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Dernière activité</span>
                        <span className="text-gray-900 font-semibold">Il y a 2 heures</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'subscription' && (
              <motion.div
                key="subscription"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100/30 p-6 rounded-2xl border border-blue-200/50"
                >
                  <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                    <CreditCardIcon className="w-5 h-5 text-[#f57c00]" />
                    Détails de l'abonnement
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-blue-200/50">
                      <p className="text-sm text-blue-600 font-medium">Plan actuel</p>
                      <p className="text-2xl font-bold text-blue-800">{tenant.plan}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-blue-200/50">
                      <p className="text-sm text-blue-600 font-medium">Prix mensuel</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {tenant.plan === 'Enterprise' ? '€299' : 
                         tenant.plan === 'Premium' ? '€99' : 
                         tenant.plan === 'Basic' ? '€49' : '€19'}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-blue-200/50">
                      <p className="text-sm text-blue-600 font-medium">Prochain paiement</p>
                      <p className="text-lg font-semibold text-blue-800">15 Juillet 2025</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'statistics' && (
              <motion.div
                key="statistics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-green-50 to-green-100/30 p-6 rounded-2xl border border-green-200/50"
                >
                  <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-[#f57c00]" />
                    Statistiques d'utilisation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-green-200/50">
                      <p className="text-sm text-green-600 font-medium">Utilisateurs actifs</p>
                      <p className="text-2xl font-bold text-green-800">{tenant.users}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-green-200/50">
                      <p className="text-sm text-green-600 font-medium">Sessions/jour</p>
                      <p className="text-2xl font-bold text-green-800">1,247</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-green-200/50">
                      <p className="text-sm text-green-600 font-medium">Temps moyen</p>
                      <p className="text-2xl font-bold text-green-800">45 min</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-green-200/50">
                      <p className="text-sm text-green-600 font-medium">Taux d'engagement</p>
                      <p className="text-2xl font-bold text-green-800">87%</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'technical' && (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100/30 p-6 rounded-2xl border border-purple-200/50"
                >
                  <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                    <CogIcon className="w-5 h-5 text-[#f57c00]" />
                    Informations techniques
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Version API</span>
                        <span className="text-gray-900 font-semibold">v2.1.0</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Base de données</span>
                        <span className="text-gray-900 font-semibold">PostgreSQL 14</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Serveur</span>
                        <span className="text-gray-900 font-semibold">AWS EC2</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">SSL</span>
                        <span className="text-green-600 font-semibold">Actif</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Uptime</span>
                        <span className="text-gray-900 font-semibold">99.9%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Latence</span>
                        <span className="text-gray-900 font-semibold">45ms</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Stockage</span>
                        <span className="text-gray-900 font-semibold">2.5 GB / 10 GB</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Dernière sauvegarde</span>
                        <span className="text-gray-900 font-semibold">Il y a 2h</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TenantDetails; 