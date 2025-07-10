'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface AdminRole {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  permissions: string[];
  activeUsers: number;
  totalUsers: number;
  status: 'active' | 'warning' | 'critical';
}

const AdminTeamSection: React.FC = () => {
  const { theme } = useTheme();
  const adminRoles: AdminRole[] = [
    {
      id: 'super-admin',
      title: 'Super Administrateur',
      description: 'Accès complet à toutes les fonctionnalités du système',
      icon: ShieldCheckIcon,
      color: 'from-red-500 to-pink-600',
      gradient: 'from-red-50 to-pink-50',
      permissions: [
        'Gestion complète des tenants',
        'Configuration système',
        'Gestion des utilisateurs',
        'Accès aux métriques avancées',
        'Modification des permissions'
      ],
      activeUsers: 2,
      totalUsers: 2,
      status: 'active'
    },
    {
      id: 'support',
      title: 'Support',
      description: 'Assistance client et gestion des tenants',
      icon: UserGroupIcon,
      color: 'from-blue-500 to-indigo-600',
      gradient: 'from-blue-50 to-indigo-50',
      permissions: [
        'Voir tous les tenants',
        'Modifier les tenants',
        'Assistance client',
        'Accès aux logs',
        'Gestion des tickets'
      ],
      activeUsers: 5,
      totalUsers: 6,
      status: 'warning'
    },
    {
      id: 'commercial',
      title: 'Commercial',
      description: 'Gestion des abonnements et métriques commerciales',
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-emerald-600',
      gradient: 'from-green-50 to-emerald-50',
      permissions: [
        'Gestion des abonnements',
        'Création de codes promo',
        'Accès aux métriques',
        'Gestion des paiements',
        'Rapports commerciaux'
      ],
      activeUsers: 3,
      totalUsers: 4,
      status: 'active'
    }
  ];

  const cardVariants: Variants = {
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

  const getStatusColor = (status: string) => {
    if (theme === 'dark') {
      switch (status) {
        case 'active': return { bg: 'bg-green-900/30', text: 'text-green-300', icon: 'text-green-400' };
        case 'warning': return { bg: 'bg-yellow-900/30', text: 'text-yellow-300', icon: 'text-yellow-400' };
        case 'critical': return { bg: 'bg-red-900/30', text: 'text-red-300', icon: 'text-red-400' };
        default: return { bg: 'bg-gray-700/30', text: 'text-gray-300', icon: 'text-gray-400' };
      }
    } else {
      switch (status) {
        case 'active': return { bg: 'bg-green-100', text: 'text-green-800', icon: 'text-green-600' };
        case 'warning': return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'text-yellow-600' };
        case 'critical': return { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-600' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'text-gray-600' };
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircleIcon;
      case 'warning': return ClockIcon;
      case 'critical': return ExclamationTriangleIcon;
      default: return CheckCircleIcon;
    }
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
            ? 'bg-gray-800 border-gray-700/50'
            : 'bg-white border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <StarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Équipe d'Administration</h2>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Gérez les rôles et permissions de votre équipe</p>
          </div>
        </div>
      </motion.div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {adminRoles.map((role, index) => {
          const StatusIcon = getStatusIcon(role.status);
          const statusColors = getStatusColor(role.status);
          
          return (
            <motion.div
              key={role.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`relative rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Animation de pulse subtile */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#f57c00]/5 to-transparent"
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Header */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <role.icon className="w-7 h-7" />
                    </motion.div>
                    <div>
                      <h3 className={`font-bold text-lg leading-tight mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                      }`}>{role.title}</h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{role.description}</p>
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
                      {role.status === 'active' ? 'Actif' : role.status === 'warning' ? 'Attention' : 'Critique'}
                    </span>
                  </motion.span>
                  
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}>{role.activeUsers}/{role.totalUsers}</p>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Utilisateurs actifs</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {/* Permissions */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>Permissions principales :</h4>
                  <div className="space-y-2">
                    {role.permissions.slice(0, 3).map((permission, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className={`flex items-center gap-2 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 bg-[#f57c00] rounded-full flex-shrink-0" />
                        <span className="truncate">{permission}</span>
                      </motion.div>
                    ))}
                    {role.permissions.length > 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.15 }}
                        className={`flex items-center gap-2 text-sm ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          theme === 'dark' ? 'bg-gray-500' : 'bg-gray-400'
                        }`} />
                        <span>+{role.permissions.length - 3} autres permissions</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className={`flex justify-between text-xs mb-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>Utilisation</span>
                    <span>{Math.round((role.activeUsers / role.totalUsers) * 100)}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(role.activeUsers / role.totalUsers) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${role.color}`}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className={`flex items-center justify-between pt-4 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg hover:bg-[#f57c00] hover:text-white transition-all duration-300 text-sm font-semibold ${
                      theme === 'dark'
                        ? 'text-[#f57c00] bg-orange-900/20 hover:bg-[#f57c00]'
                        : 'text-[#f57c00] bg-orange-50 hover:bg-[#f57c00]'
                    }`}
                  >
                    Gérer les permissions
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg hover:bg-[#2b4a6a] hover:text-white transition-all duration-300 text-sm font-semibold ${
                      theme === 'dark'
                        ? 'text-gray-300 bg-gray-700 hover:bg-[#2b4a6a]'
                        : 'text-[#2b4a6a] bg-gray-50 hover:bg-[#2b4a6a]'
                    }`}
                  >
                    Voir les utilisateurs
                  </motion.button>
                </div>
              </div>

              {/* Effet de bordure animée */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#f57c00]/20 via-[#ff9800]/20 to-[#f57c00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
            : 'bg-gradient-to-br from-white via-white to-gray-50/50 border-gray-200/50'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>
              {adminRoles.reduce((sum, role) => sum + role.totalUsers, 0)}
            </div>
            <p className={`font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Total utilisateurs</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {adminRoles.reduce((sum, role) => sum + role.activeUsers, 0)}
            </div>
            <p className={`font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Utilisateurs actifs</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#f57c00] mb-2">
              {adminRoles.length}
            </div>
            <p className={`font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Rôles définis</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTeamSection; 