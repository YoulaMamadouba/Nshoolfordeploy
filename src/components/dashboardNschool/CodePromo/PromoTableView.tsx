'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ChevronUpIcon,
  ChevronDownIcon,
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

interface PromoTableViewProps {
  promoCodes: PromoCode[];
  onViewStats: (promoCode: PromoCode) => void;
  onEditPromo: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onDeletePromo: (id: number) => void;
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15, delay: i * 0.1 },
  }),
};

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const badgeVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const PromoTableView: React.FC<PromoTableViewProps> = ({
  promoCodes,
  onViewStats,
  onEditPromo,
  onToggleStatus,
  onDeletePromo,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      case 'paused': return { bg: 'bg-yellow-100 bg-opacity-80', text: 'text-yellow-800' };
      case 'expired': return { bg: 'bg-red-100 bg-opacity-80', text: 'text-red-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'percentage': return { bg: 'bg-purple-100 bg-opacity-80', text: 'text-purple-800' };
      case 'fixed': return { bg: 'bg-blue-100 bg-opacity-80', text: 'text-blue-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-gradient-to-r from-white/90 to-gray-50/80 border-b border-[#f57c00]/30">
          <tr className="text-left text-[#2b4a6a] font-bold">
            <th className="py-3 px-4">
              <div className="flex items-center gap-1">
                <SparklesIcon className="w-4 h-4" />
                Code
              </div>
            </th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Valeur</th>
            <th className="py-3 px-4">Début</th>
            <th className="py-3 px-4">Fin</th>
            <th className="py-3 px-4">Utilisations</th>
            <th className="py-3 px-4">Statut</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promoCodes.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-6 text-center text-gray-500 text-sm">
                Aucun code promotionnel trouvé
              </td>
            </tr>
          ) : (
            promoCodes.map((promoCode, index) => (
              <motion.tr
                key={`promo-row-${promoCode.id}`}
                className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-white/30 hover:to-[#f57c00]/10 transition-all duration-300"
                initial="hidden"
                animate="visible"
                custom={index}
                variants={rowVariants}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-lg flex items-center justify-center text-white font-bold text-sm overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SparklesIcon className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-900 font-mono">{promoCode.code}</p>
                      <p className="text-xs text-gray-500">{promoCode.applicablePlans.join(', ')}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-700 max-w-xs truncate">{promoCode.description}</p>
                </td>
                <td className="py-3 px-4">
                  <motion.span
                    variants={badgeVariants}
                    whileHover="hover"
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getTypeColor(promoCode.type).bg} ${getTypeColor(promoCode.type).text}`}
                  >
                    {promoCode.type === 'percentage' ? <PercentBadgeIcon className="w-3 h-3 mr-1" /> : <CurrencyEuroIcon className="w-3 h-3 mr-1" />}
                    {promoCode.type === 'percentage' ? 'Pourcentage' : 'Montant fixe'}
                  </motion.span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-gray-900">
                    {promoCode.type === 'percentage' ? `${promoCode.value}%` : `${promoCode.value}€`}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(promoCode.startDate).toLocaleDateString('fr-FR')}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(promoCode.endDate).toLocaleDateString('fr-FR')}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-[#f57c00]" />
                    <span className="font-medium text-gray-700">
                      {promoCode.currentUses} / {promoCode.maxUses || '∞'}
                    </span>
                  </div>
                  {promoCode.maxUses && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className={`h-full rounded-full ${
                          (promoCode.currentUses / promoCode.maxUses) > 0.8 ? 'bg-red-500' : 
                          (promoCode.currentUses / promoCode.maxUses) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((promoCode.currentUses / promoCode.maxUses) * 100, 100)}%` }}
                      />
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <motion.span
                    variants={badgeVariants}
                    whileHover="hover"
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(promoCode.status).bg} ${getStatusColor(promoCode.status).text}`}
                  >
                    {promoCode.status === 'active' && <PlayIcon className="w-3 h-3 mr-1" />}
                    {promoCode.status === 'paused' && <PauseIcon className="w-3 h-3 mr-1" />}
                    {promoCode.status === 'expired' && <CalendarIcon className="w-3 h-3 mr-1" />}
                    {promoCode.status === 'active' ? 'Actif' : promoCode.status === 'paused' ? 'En pause' : 'Expiré'}
                  </motion.span>
                </td>
                <td className="py-3 px-4 flex justify-end gap-2">
                  <motion.button
                    variants={iconVariants}
                    whileHover="hover"
                    onClick={() => onViewStats(promoCode)}
                    className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                    title="Voir statistiques"
                  >
                    <ChartBarIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    variants={iconVariants}
                    whileHover="hover"
                    onClick={() => onEditPromo(promoCode.id)}
                    className="text-[#f57c00] p-1 rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
                    title="Modifier"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    variants={iconVariants}
                    whileHover="hover"
                    onClick={() => onToggleStatus(promoCode.id)}
                    className={`p-1 rounded-full transition-all duration-300 ${
                      promoCode.status === 'active' 
                        ? 'text-yellow-600 hover:bg-yellow-600/10' 
                        : 'text-green-600 hover:bg-green-600/10'
                    }`}
                    title={promoCode.status === 'active' ? 'Mettre en pause' : 'Activer'}
                  >
                    {promoCode.status === 'active' ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                  </motion.button>
                  <motion.button
                    variants={iconVariants}
                    whileHover="hover"
                    onClick={() => onDeletePromo(promoCode.id)}
                    className="text-red-600 p-1 rounded-full hover:bg-red-600/10 transition-all duration-300"
                    title="Supprimer"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </motion.button>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PromoTableView; 