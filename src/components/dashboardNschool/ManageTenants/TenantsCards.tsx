'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  CalendarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

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

interface TenantsCardsProps {
  tenants: Tenant[];
  onViewDetails: (tenant: Tenant) => void;
  onEditTenant: (id: number) => void;
  onDeleteTenant: (id: number) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      delay: i * 0.1,
    },
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const badgeVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const TenantsCards: React.FC<TenantsCardsProps> = ({ tenants, onViewDetails, onEditTenant, onDeleteTenant }) => {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    if (theme === 'dark') {
      switch (status) {
        case 'active': return { bg: 'bg-green-100/20', text: 'text-green-300', border: 'border-green-300/30' };
        case 'inactive': return { bg: 'bg-gray-100/20', text: 'text-gray-300', border: 'border-gray-300/30' };
        case 'suspended': return { bg: 'bg-red-100/20', text: 'text-red-300', border: 'border-red-300/30' };
        default: return { bg: 'bg-gray-100/20', text: 'text-gray-300', border: 'border-gray-300/30' };
      }
    } else {
      switch (status) {
        case 'active': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
        case 'inactive': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
        case 'suspended': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      }
    }
  };

  const getPlanColor = (plan: string) => {
    if (theme === 'dark') {
      switch (plan) {
        case 'Enterprise': return { bg: 'bg-purple-100/20', text: 'text-purple-300', border: 'border-purple-300/30' };
        case 'Premium': return { bg: 'bg-blue-100/20', text: 'text-blue-300', border: 'border-blue-300/30' };
        case 'Basic': return { bg: 'bg-orange-100/20', text: 'text-orange-300', border: 'border-orange-300/30' };
        case 'Starter': return { bg: 'bg-green-100/20', text: 'text-green-300', border: 'border-green-300/30' };
        default: return { bg: 'bg-gray-100/20', text: 'text-gray-300', border: 'border-gray-300/30' };
      }
    } else {
      switch (plan) {
        case 'Enterprise': return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' };
        case 'Premium': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
        case 'Basic': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' };
        case 'Starter': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tenants.map((tenant, index) => (
        <motion.div
          key={`tenant-card-${tenant.id}`}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={`group relative rounded-2xl shadow-lg hover:shadow-2xl border overflow-hidden transition-all duration-300 min-h-[280px] ${
            theme === 'dark' 
              ? 'bg-[#1a2634]/80 border-[#2b4a6a]/30 hover:shadow-2xl hover:border-[#f57c00]/40' 
              : 'bg-white border-gray-100'
          }`}
        >
          {/* Header avec avatar et badges */}
          <div className="relative p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {tenant.logo ? (
                    <img src={tenant.logo} alt={tenant.name} className="w-full h-full object-cover" />
                  ) : (
                    tenant.name.charAt(0).toUpperCase()
                  )}
                  {/* Effet de brillance sur l'avatar */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h3 className={`font-bold text-lg leading-tight mb-1 truncate transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {tenant.name}
                  </h3>
                  <p className={`text-sm font-mono truncate transition-all duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {tenant.code}
                  </p>
                </div>
              </div>
            </div>

            {/* Badges avec meilleur espacement */}
            <div className="flex flex-wrap gap-2 mb-4">
              <motion.span
                variants={badgeVariants}
                whileHover="hover"
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(tenant.status).bg} ${getStatusColor(tenant.status).text} ${getStatusColor(tenant.status).border} shadow-sm backdrop-blur-sm`}
              >
                <SparklesIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                <span className="truncate">
                  {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                </span>
              </motion.span>
              
              <motion.span
                variants={badgeVariants}
                whileHover="hover"
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getPlanColor(tenant.plan).bg} ${getPlanColor(tenant.plan).text} ${getPlanColor(tenant.plan).border} shadow-sm backdrop-blur-sm`}
              >
                <BuildingOfficeIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                <span className="truncate">{tenant.plan}</span>
              </motion.span>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="px-6 pb-6">
            {/* Informations détaillées */}
            <div className="space-y-3 mb-6">
              <div className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <GlobeAltIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
                <span className="font-medium truncate">{tenant.domain}</span>
              </div>
              
              <div className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <UsersIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
                <span className="font-medium">{tenant.users.toLocaleString()} utilisateurs</span>
              </div>
              
              <div className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <CalendarIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
                <span className="font-medium">
                  Créé le {new Date(tenant.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className={`flex items-center justify-between pt-4 border-t transition-all duration-300 ${
              theme === 'dark' ? 'border-[#2b4a6a]/30' : 'border-gray-100'
            }`}>
              <div className="flex gap-2">
                <motion.button
                  variants={iconVariants}
                  whileHover="hover"
                  onClick={() => onViewDetails(tenant)}
                  className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                    theme === 'dark' 
                      ? 'text-gray-300 bg-[#2b4a6a]/30 hover:bg-[#2b4a6a] hover:text-white' 
                      : 'text-[#2b4a6a] bg-gray-50 hover:bg-[#2b4a6a] hover:text-white'
                  }`}
                  title="Voir détails"
                >
                  <EyeIcon className="h-4 w-4" />
                </motion.button>
                
                <motion.button
                  variants={iconVariants}
                  whileHover="hover"
                  onClick={() => onEditTenant(tenant.id)}
                  className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                    theme === 'dark' 
                      ? 'text-[#f57c00] bg-[#f57c00]/20 hover:bg-[#f57c00] hover:text-white' 
                      : 'text-[#f57c00] bg-orange-50 hover:bg-[#f57c00] hover:text-white'
                  }`}
                  title="Modifier"
                >
                  <PencilIcon className="h-4 w-4" />
                </motion.button>
                
                <motion.button
                  variants={iconVariants}
                  whileHover="hover"
                  onClick={() => onDeleteTenant(tenant.id)}
                  className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                    theme === 'dark' 
                      ? 'text-red-400 bg-red-600/20 hover:bg-red-600 hover:text-white' 
                      : 'text-red-600 bg-red-50 hover:bg-red-600 hover:text-white'
                  }`}
                  title="Supprimer"
                >
                  <TrashIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TenantsCards;