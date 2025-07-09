import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  EyeIcon,
  CheckCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface Alert {
  id: number;
  tenant: string;
  issue: string;
  type: 'payment_failed' | 'subscription_expired' | 'technical_issue' | 'account_suspended' | 'update_required';
  date: string;
}

interface Action {
  id: number;
  description: string;
  type: 'promo_code' | 'support_request' | 'db_migration';
}

interface AlertsCenterProps {
  alerts: Alert[];
  actions: Action[];
}

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

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const AlertsCenter = ({ alerts, actions }: AlertsCenterProps) => {
  const [filter, setFilter] = useState<string>('all');

  const getBadgeStyles = (type: Alert['type']) => {
    switch (type) {
      case 'payment_failed':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'subscription_expired':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'technical_issue':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'account_suspended':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'update_required':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getActionIcon = (type: Action['type']) => {
    switch (type) {
      case 'promo_code':
        return <ClockIcon className="w-5 h-5 text-[#f57c00]" />;
      case 'support_request':
        return <ExclamationCircleIcon className="w-5 h-5 text-[#2b4a6a]" />;
      case 'db_migration':
        return <ExclamationTriangleIcon className="w-5 h-5 text-[#a855f7]" />;
      default:
        return null;
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter((alert) => alert.type === filter);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-gradient-to-br from-white/90 to-gray-50/80 rounded-2xl p-4 shadow-sm border border-[#f57c00]/30 backdrop-blur-sm overflow-visible max-w-[450px] w-full min-w-0"
    >
      <h2 className="text-lg font-bold text-[#2b4a6a] text-center mb-4 tracking-tight" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
        Centre d'alertes
      </h2>
      <div className="relative mb-4">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#f57c00]/50 to-transparent" />
      </div>
      <div className="mb-4 relative">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full text-sm text-[#2b4a6a] bg-gradient-to-r from-white/70 to-[#f57c00]/10 border border-[#f57c00]/50 rounded-lg p-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 transition-all appearance-none cursor-pointer"
        >
          <option value="all">Tous</option>
          <option value="payment_failed">Paiement échoué</option>
          <option value="subscription_expired">Abonnement expiré</option>
          <option value="technical_issue">Problème technique</option>
          <option value="account_suspended">Compte suspendu</option>
          <option value="update_required">Mise à jour requise</option>
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-[#f57c00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      <div className="w-full h-64 flex flex-col space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#f57c00] scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
        {/* Tenants avec problèmes */}
        <div>
          <h3 className="text-sm font-bold text-[#2b4a6a] mb-2">Tenants avec problèmes</h3>
          {filteredAlerts.length === 0 ? (
            <p className="text-sm text-gray-500">Aucun problème signalé</p>
          ) : (
            <ul className="space-y-3">
              {filteredAlerts.map((alert) => (
                <motion.li
                  key={alert.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-white/30 p-2 rounded-lg border border-gray-100/50"
                >
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full border ${getBadgeStyles(alert.type)}`}
                  >
                    {alert.issue}
                  </span>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">{alert.tenant}</p>
                    <p className="text-xs text-gray-500">{alert.date}</p>
                  </div>
                  <div className="flex space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#2b4a6a', color: 'white' }}
                      className="text-sm bg-[#2b4a6a]/10 text-[#2b4a6a] px-2 py-1 rounded-md flex items-center space-x-1 transition-colors"
                      onClick={() => window.alert(`Voir détails: ${alert.tenant} - ${alert.issue}`)}
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>Voir</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#f57c00', color: 'white' }}
                      className="text-sm bg-[#f57c00]/10 text-[#f57c00] px-2 py-1 rounded-md flex items-center space-x-1 transition-colors"
                      onClick={() => window.alert(`Résoudre: ${alert.tenant} - ${alert.issue}`)}
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Résoudre</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#dc2626', color: 'white' }}
                      className="text-sm bg-red-600/10 text-red-600 px-2 py-1 rounded-md flex items-center space-x-1 transition-colors"
                      onClick={() => window.alert(`Supprimer: ${alert.tenant} - ${alert.issue}`)}
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Supprimer</span>
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Actions requises */}
        <div>
          <h3 className="text-sm font-bold text-[#2b4a6a] mb-2">Actions requises</h3>
          {actions.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune action requise</p>
          ) : (
            <ul className="space-y-3">
              {actions.map((action) => (
                <motion.li
                  key={action.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-white/30 p-2 rounded-lg border border-gray-100/50"
                >
                  <div className="flex items-center space-x-2">
                    {getActionIcon(action.type)}
                    <span className="text-sm text-gray-700">{action.description}</span>
                  </div>
                  <div />
                  <div className="flex space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#2b4a6a', color: 'white' }}
                      className="text-sm bg-[#2b4a6a]/10 text-[#2b4a6a] px-2 py-1 rounded-md flex items-center space-x-1 transition-colors"
                      onClick={() => window.alert(`Voir détails: ${action.description}`)}
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>Voir</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#f57c00', color: 'white' }}
                      className="text-sm bg-[#f57c00]/10 text-[#f57c00] px-2 py-1 rounded-md flex items-center space-x-1 transition-colors"
                      onClick={() => window.alert(`Résoudre: ${action.description}`)}
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Résoudre</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#dc2626', color: 'white' }}
                      className="text-sm bg-red-600/10 text-red-600 px-2 py-1 rounded-md flex items-center space-x-1 transition-colors"
                      onClick={() => window.alert(`Supprimer: ${action.description}`)}
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Supprimer</span>
                    </motion.button>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AlertsCenter;