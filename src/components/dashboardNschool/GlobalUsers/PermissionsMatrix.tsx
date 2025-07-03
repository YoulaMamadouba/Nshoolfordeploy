'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
  LockClosedIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CogIcon,
  ChartBarIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface Permission {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
}

interface Role {
  id: string;
  name: string;
  icon: any;
  color: string;
  permissions: string[];
}

const PermissionsMatrix: React.FC = () => {
  const [selectedPermission, setSelectedPermission] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ permission: string; role: string } | null>(null);

  const permissions: Permission[] = [
    {
      id: 'view-tenants',
      name: 'Voir tous les tenants',
      description: 'Accès en lecture seule à tous les tenants du système',
      icon: EyeIcon,
      category: 'Tenants'
    },
    {
      id: 'edit-tenants',
      name: 'Modifier les tenants',
      description: 'Modifier les informations et paramètres des tenants',
      icon: PencilIcon,
      category: 'Tenants'
    },
    {
      id: 'delete-tenants',
      name: 'Supprimer des tenants',
      description: 'Supprimer définitivement des tenants du système',
      icon: TrashIcon,
      category: 'Tenants'
    },
    {
      id: 'manage-subscriptions',
      name: 'Gérer les abonnements',
      description: 'Créer, modifier et gérer les abonnements des tenants',
      icon: CreditCardIcon,
      category: 'Abonnements'
    },
    {
      id: 'create-promo-codes',
      name: 'Créer des codes promo',
      description: 'Générer et gérer les codes promotionnels',
      icon: DocumentTextIcon,
      category: 'Marketing'
    },
    {
      id: 'access-metrics',
      name: 'Accéder aux métriques',
      description: 'Consulter les tableaux de bord et rapports',
      icon: ChartBarIcon,
      category: 'Analytics'
    },
    {
      id: 'manage-users',
      name: 'Gérer les utilisateurs',
      description: 'Créer, modifier et supprimer des utilisateurs globaux',
      icon: UserGroupIcon,
      category: 'Administration'
    },
    {
      id: 'system-config',
      name: 'Configuration système',
      description: 'Modifier les paramètres système globaux',
      icon: CogIcon,
      category: 'Administration'
    }
  ];

  const roles: Role[] = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      icon: ShieldCheckIcon,
      color: 'from-red-500 to-pink-600',
      permissions: ['view-tenants', 'edit-tenants', 'delete-tenants', 'manage-subscriptions', 'create-promo-codes', 'access-metrics', 'manage-users', 'system-config']
    },
    {
      id: 'support',
      name: 'Support',
      icon: UserGroupIcon,
      color: 'from-blue-500 to-indigo-600',
      permissions: ['view-tenants', 'edit-tenants', 'access-metrics']
    },
    {
      id: 'commercial',
      name: 'Commercial',
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-emerald-600',
      permissions: ['view-tenants', 'manage-subscriptions', 'create-promo-codes', 'access-metrics']
    }
  ];

  const hasPermission = (roleId: string, permissionId: string): boolean => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.permissions.includes(permissionId) : false;
  };

  const getPermissionDetails = (permissionId: string) => {
    return permissions.find(p => p.id === permissionId);
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

  const cellVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <LockClosedIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2b4a6a]">Matrice des Permissions</h2>
            <p className="text-gray-600">Gérez les permissions par rôle d'utilisateur</p>
          </div>
        </div>
      </motion.div>

      {/* Matrix Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden backdrop-blur-sm"
      >
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-[#2b4a6a] font-bold">
                    <div className="flex items-center gap-2">
                      <InformationCircleIcon className="w-5 h-5" />
                      Permissions
                    </div>
                  </th>
                  {roles.map((role) => (
                    <th key={role.id} className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <motion.div
                          className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <role.icon className="w-6 h-6" />
                        </motion.div>
                        <span className="font-bold text-[#2b4a6a] text-sm">{role.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission, index) => (
                  <motion.tr
                    key={permission.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50/30 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#f57c00]/20 to-[#ff9800]/20 rounded-lg flex items-center justify-center">
                          <permission.icon className="w-5 h-5 text-[#f57c00]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{permission.name}</p>
                          <p className="text-xs text-gray-500">{permission.category}</p>
                        </div>
                      </div>
                    </td>
                    {roles.map((role) => {
                      const hasAccess = hasPermission(role.id, permission.id);
                      return (
                        <td key={role.id} className="py-4 px-6 text-center">
                          <motion.div
                            className="relative inline-block"
                            variants={cellVariants}
                            whileHover="hover"
                            onMouseEnter={() => setHoveredCell({ permission: permission.id, role: role.id })}
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            <motion.div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto cursor-pointer transition-all duration-300 ${
                                hasAccess
                                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200'
                                  : 'bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300'
                              }`}
                              whileHover={{
                                scale: 1.1,
                                boxShadow: hasAccess ? '0 10px 25px rgba(34, 197, 94, 0.3)' : '0 10px 25px rgba(156, 163, 175, 0.3)',
                              }}
                            >
                              {hasAccess ? (
                                <CheckIcon className="w-6 h-6 text-green-600" />
                              ) : (
                                <XMarkIcon className="w-6 h-6 text-gray-400" />
                              )}
                            </motion.div>

                            {/* Tooltip */}
                            <AnimatePresence>
                              {hoveredCell?.permission === permission.id && hoveredCell?.role === role.id && (
                                <motion.div
                                  variants={tooltipVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
                                >
                                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                                    <div className="font-semibold mb-1">
                                      {hasAccess ? 'Permission accordée' : 'Permission refusée'}
                                    </div>
                                    <div className="text-gray-300">
                                      {permission.description}
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <h3 className="text-lg font-bold text-[#2b4a6a] mb-4">Légende</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200 rounded-lg flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Permission accordée</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <XMarkIcon className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-sm text-gray-700">Permission refusée</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Super Admin - Accès complet</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Support - Assistance et gestion</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Commercial - Gestion commerciale</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <h3 className="text-lg font-bold text-[#2b4a6a] mb-4">Résumé des Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <role.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{role.name}</h4>
              <p className="text-2xl font-bold text-[#f57c00] mb-1">{role.permissions.length}</p>
              <p className="text-sm text-gray-600">permissions accordées</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PermissionsMatrix; 