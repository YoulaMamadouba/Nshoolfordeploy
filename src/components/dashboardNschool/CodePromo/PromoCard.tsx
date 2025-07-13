'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  PlayIcon,
  PauseIcon,
  CalendarIcon,
  UsersIcon,
  CurrencyEuroIcon,
  PercentBadgeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface PromoCode {
  id: number;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  maxUses: number | null;
  currentUses: number;
  status: 'active' | 'paused' | 'expired';
  applicablePlans: string[];
  conditions: string;
  revenueGenerated: number;
  revenueLost: number;
  conversionRate: number;
}

interface PromoCardProps {
  promoCode: PromoCode;
  onViewStats: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  index: number;
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

const PromoCard: React.FC<PromoCardProps> = ({ promoCode, onViewStats, onEdit, onToggleStatus, onDelete, index }) => {
  const { theme } = useTheme();
  
  const getStatusColor = (status: string) => {
    if (theme === 'dark') {
      switch (status) {
        case 'active': return { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-700/50', icon: 'text-green-400' };
        case 'paused': return { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-700/50', icon: 'text-yellow-400' };
        case 'expired': return { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-700/50', icon: 'text-red-400' };
        default: return { bg: 'bg-gray-800/50', text: 'text-gray-300', border: 'border-gray-600/50', icon: 'text-gray-400' };
      }
    } else {
      switch (status) {
        case 'active': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: 'text-green-600' };
        case 'paused': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: 'text-yellow-600' };
        case 'expired': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: 'text-red-600' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', icon: 'text-gray-600' };
      }
    }
  };

  const getTypeColor = (type: string) => {
    if (theme === 'dark') {
      switch (type) {
        case 'percentage': return { bg: 'bg-purple-900/30', text: 'text-purple-400', border: 'border-purple-700/50' };
        case 'fixed': return { bg: 'bg-blue-900/30', text: 'text-blue-400', border: 'border-blue-700/50' };
        default: return { bg: 'bg-gray-800/50', text: 'text-gray-300', border: 'border-gray-600/50' };
      }
    } else {
      switch (type) {
        case 'percentage': return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' };
        case 'fixed': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      }
    }
  };

  const isExpired = new Date(promoCode.endDate) < new Date();
  const usagePercentage = promoCode.maxUses ? (promoCode.currentUses / promoCode.maxUses) * 100 : 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`group relative rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 min-h-[320px] hover:shadow-xl ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
          : 'bg-white border-gray-100'
      }`}
    >
      {/* Header avec code et badges */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <SparklesIcon className="w-7 h-7" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-bold text-lg leading-tight mb-1 truncate font-mono ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{promoCode.code}</h3>
              <p className={`text-sm truncate ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>{promoCode.description}</p>
            </div>
          </div>
        </div>

        {/* Badges avec meilleur espacement */}
        <div className="flex flex-wrap gap-2 mb-4">
          <motion.span
            variants={badgeVariants}
            whileHover="hover"
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(promoCode.status).bg} ${getStatusColor(promoCode.status).text} ${getStatusColor(promoCode.status).border} shadow-sm`}
          >
            {promoCode.status === 'active' && <PlayIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />}
            {promoCode.status === 'paused' && <PauseIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />}
            {promoCode.status === 'expired' && <CalendarIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />}
            <span className="truncate">
              {promoCode.status === 'active' ? 'Actif' : promoCode.status === 'paused' ? 'En pause' : 'Expiré'}
            </span>
          </motion.span>
          
          <motion.span
            variants={badgeVariants}
            whileHover="hover"
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getTypeColor(promoCode.type).bg} ${getTypeColor(promoCode.type).text} ${getTypeColor(promoCode.type).border} shadow-sm`}
          >
            {promoCode.type === 'percentage' ? <PercentBadgeIcon className="w-3 h-3 mr-1.5 flex-shrink-0" /> : <CurrencyEuroIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />}
            <span className="truncate">
              {promoCode.type === 'percentage' ? `${promoCode.value}%` : `${promoCode.value}€`}
            </span>
          </motion.span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="px-6 pb-6">
        {/* Informations détaillées */}
        <div className="space-y-3 mb-6">
          <div className={`flex items-center gap-3 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <CalendarIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
            <span className="font-medium">
              {new Date(promoCode.startDate).toLocaleDateString('fr-FR')} - {new Date(promoCode.endDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
          
          <div className={`flex items-center gap-3 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <UsersIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
            <span className="font-medium">
              {promoCode.currentUses} / {promoCode.maxUses || '∞'} utilisations
            </span>
          </div>
          
          <div className={`flex items-center gap-3 text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <CurrencyEuroIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
            <span className="font-medium">
              {promoCode.revenueGenerated.toLocaleString()}€ générés
            </span>
          </div>
        </div>

        {/* Barre de progression d'utilisation */}
        {promoCode.maxUses && (
          <div className="mb-6">
            <div className={`flex justify-between text-xs mb-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>Utilisation</span>
              <span>{Math.round(usagePercentage)}%</span>
            </div>
            <div className={`w-full rounded-full h-2 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(usagePercentage, 100)}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full rounded-full ${
                  usagePercentage > 80 ? 'bg-red-500' : usagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              />
            </div>
          </div>
        )}

        {/* Plans applicables */}
        <div className="mb-6">
          <p className={`text-xs mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>Plans applicables :</p>
          <div className="flex flex-wrap gap-1">
            {promoCode.applicablePlans.slice(0, 3).map((plan, idx) => (
              <span key={idx} className={`px-2 py-1 text-xs rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {plan}
              </span>
            ))}
            {promoCode.applicablePlans.length > 3 && (
              <span className={`px-2 py-1 text-xs rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-700/50 text-gray-300 border border-gray-600/50' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                +{promoCode.applicablePlans.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={`flex items-center justify-between pt-4 border-t ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-100'
        }`}>
          <div className="flex gap-2">
            <motion.button
              variants={iconVariants}
              whileHover="hover"
              onClick={onViewStats}
              className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                theme === 'dark'
                  ? 'text-[#2b4a6a] bg-gray-700/50 hover:bg-[#2b4a6a] hover:text-white'
                  : 'text-[#2b4a6a] bg-gray-50 hover:bg-[#2b4a6a] hover:text-white'
              }`}
              title="Voir statistiques"
            >
              <ChartBarIcon className="h-4 w-4" />
            </motion.button>
            
            <motion.button
              variants={iconVariants}
              whileHover="hover"
              onClick={onEdit}
              className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                theme === 'dark'
                  ? 'text-[#f57c00] bg-orange-900/30 hover:bg-[#f57c00] hover:text-white'
                  : 'text-[#f57c00] bg-orange-50 hover:bg-[#f57c00] hover:text-white'
              }`}
              title="Modifier"
            >
              <PencilIcon className="h-4 w-4" />
            </motion.button>
            
            <motion.button
              variants={iconVariants}
              whileHover="hover"
              onClick={onToggleStatus}
              className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                promoCode.status === 'active' 
                  ? theme === 'dark'
                    ? 'text-yellow-400 bg-yellow-900/30 hover:bg-yellow-600 hover:text-white'
                    : 'text-yellow-600 bg-yellow-50 hover:bg-yellow-600 hover:text-white'
                  : theme === 'dark'
                    ? 'text-green-400 bg-green-900/30 hover:bg-green-600 hover:text-white'
                    : 'text-green-600 bg-green-50 hover:bg-green-600 hover:text-white'
              }`}
              title={promoCode.status === 'active' ? 'Mettre en pause' : 'Activer'}
            >
              {promoCode.status === 'active' ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </motion.button>
            
            <motion.button
              variants={iconVariants}
              whileHover="hover"
              onClick={onDelete}
              className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                theme === 'dark'
                  ? 'text-red-400 bg-red-900/30 hover:bg-red-600 hover:text-white'
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
  );
};

export default PromoCard; 