import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  StarIcon,
  UsersIcon,
  CloudIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      duration: 0.5,
    },
  },
};

const buttonVariants: Variants = {
  hover: { scale: 1.1, backgroundColor: '#f57c00', color: 'white' },
  tap: { scale: 0.9 },
};

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  users: number;
  storage: string;
  features: string[];
  color: string;
  tenantCount: number;
  revenue: number;
  isPopular?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}

const PlanCard = ({ plan, onEdit, onDelete }: PlanCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPeriodText = (period: string) => {
    switch (period) {
      case 'monthly': return '/mois';
      case 'quarterly': return '/trimestre';
      case 'yearly': return '/an';
      default: return '/mois';
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      'bg-gray-500': 'from-gray-500 to-gray-600',
      'bg-green-500': 'from-green-500 to-emerald-600',
      'bg-blue-500': 'from-blue-500 to-cyan-600',
      'bg-purple-500': 'from-purple-500 to-violet-600',
      'bg-orange-500': 'from-orange-500 to-red-500',
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 overflow-hidden group"
    >
      {/* Gradient Accent Border */}
      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#f57c00]/0 via-[#f57c00]/20 to-[#f57c00]/0 rounded-2xl pointer-events-none" />
      
      {/* Popular Badge */}
      {plan.isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20"
        >
          <StarIcon className="w-3 h-3 inline mr-1" />
          Populaire
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a] mb-1">{plan.name}</h3>
            <p className="text-sm text-gray-600">{plan.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#f57c00]">
              {plan.price === 0 ? 'Gratuit' : `€${plan.price}`}
            </div>
            <div className="text-xs text-gray-500">
              {plan.price === 0 ? '' : getPeriodText(plan.period)}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-[#2b4a6a] mb-3">Fonctionnalités incluses :</h4>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-gray-500">Utilisateurs</div>
            <div className="font-semibold text-[#2b4a6a]">
              {plan.users === -1 ? 'Illimité' : plan.users.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-gray-500">Stockage</div>
            <div className="font-semibold text-[#2b4a6a]">{plan.storage}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(plan)}
            className="flex-1 bg-[#f57c00]/10 text-[#f57c00] py-2 px-4 rounded-lg hover:bg-[#f57c00]/20 transition-colors text-sm font-medium"
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Supprimer
          </button>
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-lg font-bold text-[#f57c00]">{plan.tenantCount}</p>
            <p className="text-xs text-gray-500">Tenants</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">€{plan.revenue.toLocaleString('fr-FR')}</p>
            <p className="text-xs text-gray-500">Revenus/mois</p>
          </div>
        </div>
      </div>

      {/* Color Accent */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getColorClasses(plan.color)}`}
      />
    </motion.div>
  );
};

export default PlanCard; 