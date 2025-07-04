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
  CheckCircleIcon,
  ClockIcon,
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
        return 'bg-[#f57c00] text-white';
      case 'inactive':
        return 'bg-[#2b4a6a] text-white';
      case 'suspended':
        return 'bg-red-500 text-white';
      default:
        return 'bg-[#2b4a6a] text-white';
    }
  };

  const getPlanColor = (plan: string) => {
    return 'bg-[#f57c00] text-white';
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
      {/* Header avec fiche profil premium */}
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-8 shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden relative"
      >
        {/* Effet de brillance en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f57c00]/5 via-[#f57c00]/3 to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="p-3 bg-[#2b4a6a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </motion.button>
              
              <div className="flex items-center gap-6">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-2xl flex items-center justify-center text-white font-bold text-2xl overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {tenant.logo ? (
                    <img src={tenant.logo} alt={tenant.name} className="w-full h-full object-cover" />
                  ) : (
                    tenant.name.charAt(0).toUpperCase()
                  )}
                </motion.div>
                
                <div>
                  <h1 className="text-4xl font-bold text-[#2b4a6a] tracking-tight mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    {tenant.name}
                  </h1>
                  <p className="text-xl text-gray-600 font-medium mb-3">Détails du tenant</p>
                  
                  {/* Tags miniatures */}
                  <div className="flex items-center gap-3">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold shadow-md ${getStatusColor(tenant.status)}`}
                    >
                      {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                    </motion.span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold shadow-md ${getPlanColor(tenant.plan)}`}
                    >
                      {tenant.plan}
                    </motion.span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-[#2b4a6a]/10 text-[#2b4a6a] border border-[#2b4a6a]/20 shadow-md">
                      ID: {tenant.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f57c00]/10 p-4 rounded-2xl border border-[#f57c00]/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#f57c00] rounded-xl">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#f57c00] font-medium">Utilisateurs</p>
                <p className="text-2xl font-bold text-[#2b4a6a]">{tenant.users.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f57c00]/10 p-4 rounded-2xl border border-[#f57c00]/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#f57c00] rounded-xl">
                <GlobeAltIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#f57c00] font-medium">Domaine</p>
                <p className="text-lg font-semibold text-[#2b4a6a] truncate">{tenant.domain}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f57c00]/10 p-4 rounded-2xl border border-[#f57c00]/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#f57c00] rounded-xl">
                <CreditCardIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#f57c00] font-medium">Code</p>
                <p className="text-lg font-semibold text-[#2b4a6a] font-mono">{tenant.code}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f57c00]/10 p-4 rounded-2xl border border-[#f57c00]/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#f57c00] rounded-xl">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#f57c00] font-medium">Créé le</p>
                <p className="text-lg font-semibold text-[#2b4a6a]">
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
                    ? 'text-[#f57c00] border-b-2 border-[#f57c00] bg-[#f57c00]/5'
                    : 'text-[#2b4a6a] hover:text-[#f57c00] hover:bg-[#f57c00]/5'
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
                    className="bg-[#f57c00]/5 p-6 rounded-2xl border border-[#f57c00]/20"
                  >
                    <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                      <BuildingOffice2Icon className="w-5 h-5 text-[#f57c00]" />
                      Informations de base
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Nom</span>
                        <span className="text-[#2b4a6a] font-semibold">{tenant.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Code</span>
                        <span className="text-[#2b4a6a] font-mono font-semibold">{tenant.code}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Domaine</span>
                        <span className="text-[#2b4a6a] font-semibold">{tenant.domain}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#2b4a6a] font-medium">Date de création</span>
                        <span className="text-[#2b4a6a] font-semibold">
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
                    className="bg-[#f57c00]/5 p-6 rounded-2xl border border-[#f57c00]/20"
                  >
                    <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5 text-[#f57c00]" />
                      Statut et sécurité
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Statut</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(tenant.status)}`}>
                          {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Plan</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getPlanColor(tenant.plan)}`}>
                          {tenant.plan}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Utilisateurs actifs</span>
                        <span className="text-[#2b4a6a] font-semibold">{tenant.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#2b4a6a] font-medium">Dernière activité</span>
                        <span className="text-[#2b4a6a] font-semibold">Il y a 2 heures</span>
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
                  className="bg-[#f57c00]/5 p-6 rounded-2xl border border-[#f57c00]/20"
                >
                  <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                    <CreditCardIcon className="w-5 h-5 text-[#f57c00]" />
                    Détails de l'abonnement
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-[#f57c00]/20">
                      <p className="text-sm text-[#f57c00] font-medium">Plan actuel</p>
                      <p className="text-2xl font-bold text-[#2b4a6a]">{tenant.plan}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-[#f57c00]/20">
                      <p className="text-sm text-[#f57c00] font-medium">Prix mensuel</p>
                      <p className="text-2xl font-bold text-[#2b4a6a]">
                        {tenant.plan === 'Enterprise' ? '€299' : 
                         tenant.plan === 'Premium' ? '€99' : 
                         tenant.plan === 'Basic' ? '€49' : '€19'}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-[#f57c00]/20">
                      <p className="text-sm text-[#f57c00] font-medium">Prochain paiement</p>
                      <p className="text-lg font-semibold text-[#2b4a6a]">15 Juillet 2025</p>
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
                  className="bg-[#f57c00]/5 p-6 rounded-2xl border border-[#f57c00]/20"
                >
                  <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-[#f57c00]" />
                    Statistiques d'utilisation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl border border-[#f57c00]/20">
                      <p className="text-sm text-[#f57c00] font-medium">Utilisateurs actifs</p>
                      <p className="text-2xl font-bold text-[#2b4a6a]">{tenant.users}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-[#f57c00]/20">
                      <p className="text-sm text-[#f57c00] font-medium">Sessions/jour</p>
                      <p className="text-2xl font-bold text-[#2b4a6a]">1,247</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-[#f57c00]/20">
                      <p className="text-sm text-[#f57c00] font-medium">Temps moyen</p>
                      <p className="text-2xl font-bold text-[#2b4a6a]">45 min</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-[#f57c00]/20">
                      <p className="text-sm text-[#f57c00] font-medium">Taux d'engagement</p>
                      <p className="text-2xl font-bold text-[#2b4a6a]">87%</p>
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
                  className="bg-[#f57c00]/5 p-6 rounded-2xl border border-[#f57c00]/20"
                >
                  <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4 flex items-center gap-2">
                    <CogIcon className="w-5 h-5 text-[#f57c00]" />
                    Informations techniques
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Version API</span>
                        <span className="text-[#2b4a6a] font-semibold">v2.1.0</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Base de données</span>
                        <span className="text-[#2b4a6a] font-semibold">PostgreSQL 14</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Serveur</span>
                        <span className="text-[#2b4a6a] font-semibold">AWS EC2</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#2b4a6a] font-medium">SSL</span>
                        <span className="text-[#f57c00] font-semibold flex items-center gap-1">
                          <CheckCircleIcon className="w-4 h-4" />
                          Actif
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Uptime</span>
                        <span className="text-[#2b4a6a] font-semibold">99.9%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Latence</span>
                        <span className="text-[#2b4a6a] font-semibold">45ms</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#f57c00]/10">
                        <span className="text-[#2b4a6a] font-medium">Stockage</span>
                        <span className="text-[#2b4a6a] font-semibold">2.5 GB / 10 GB</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[#2b4a6a] font-medium">Dernière sauvegarde</span>
                        <span className="text-[#2b4a6a] font-semibold flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          Il y a 2h
                        </span>
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