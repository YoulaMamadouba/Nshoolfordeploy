import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
  ExclamationCircleIcon,
  ShieldExclamationIcon,
  CogIcon,
  ArrowPathIcon,
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

interface AlertsCardsProps {
  alerts: Alert[];
  actions: Action[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const AlertsCards: React.FC<AlertsCardsProps> = ({ alerts, actions }) => {
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'payment_failed':
        return 'bg-[#f57c00]/15 text-[#f57c00] border-[#f57c00]/25';
      case 'subscription_expired':
        return 'bg-[#2b4a6a]/15 text-[#2b4a6a] border-[#2b4a6a]/25';
      case 'technical_issue':
        return 'bg-[#f57c00]/15 text-[#f57c00] border-[#f57c00]/25';
      case 'account_suspended':
        return 'bg-[#2b4a6a]/15 text-[#2b4a6a] border-[#2b4a6a]/25';
      case 'update_required':
        return 'bg-[#f57c00]/15 text-[#f57c00] border-[#f57c00]/25';
      default:
        return 'bg-[#2b4a6a]/15 text-[#2b4a6a] border-[#2b4a6a]/25';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'payment_failed':
        return <CreditCardIcon className="w-4 h-4" />;
      case 'subscription_expired':
        return <ExclamationCircleIcon className="w-4 h-4" />;
      case 'technical_issue':
        return <CogIcon className="w-4 h-4" />;
      case 'account_suspended':
        return <ShieldExclamationIcon className="w-4 h-4" />;
      case 'update_required':
        return <ArrowPathIcon className="w-4 h-4" />;
      default:
        return <ExclamationTriangleIcon className="w-4 h-4" />;
    }
  };

  const filteredAlerts = useMemo(() => {
    let filtered = alerts;
    
    if (filter !== 'all') {
      filtered = filtered.filter(alert => alert.type === filter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(alert => 
        alert.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.issue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [alerts, filter, searchTerm]);

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-br from-white/95 to-gray-50/90 rounded-3xl p-6 shadow-xl border border-[#f57c00]/20 backdrop-blur-sm overflow-hidden w-full min-w-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#f57c00]/20 to-[#2b4a6a]/20 rounded-xl flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-[#f57c00]" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#f57c00]/30 rounded-xl opacity-20 blur-sm"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#2b4a6a] to-[#f57c00] bg-clip-text text-transparent tracking-tight">
              Centre d'alertes
            </h2>
            <p className="text-xs text-[#2b4a6a]/60 font-medium">Gestion des alertes en temps réel</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#2b4a6a]/70">
          <span>{filteredAlerts.length} alertes actives</span>
          <div className="w-2 h-2 bg-[#f57c00]/60 rounded-full animate-pulse"></div>
        </div>
      </div>

            {/* Barre de filtres - Style identique à ActivityLog */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        className="flex flex-col sm:flex-row gap-4 mb-6 items-center"
      >
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par tenant ou problème..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full text-sm text-[#2b4a6a] bg-gradient-to-r from-white/70 to-[#f57c00]/10 border border-[#f57c00]/50 rounded-lg p-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 transition-all appearance-none cursor-pointer"
          >
            <option value="all">Tous les types</option>
            <option value="payment_failed">Paiement échoué</option>
            <option value="subscription_expired">Abonnement expiré</option>
            <option value="technical_issue">Problème technique</option>
            <option value="account_suspended">Compte suspendu</option>
            <option value="update_required">Mise à jour requise</option>
          </select>
        </div>
      </motion.div>

      {/* Grille des alertes */}
      {paginatedAlerts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-[#f57c00]/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-8 h-8 text-[#f57c00]" />
          </div>
          <h3 className="text-lg font-semibold text-[#2b4a6a] mb-2">Aucune alerte trouvée</h3>
          <p className="text-[#2b4a6a]/60 max-w-md">
            {searchTerm || filter !== 'all' 
              ? "Aucune alerte ne correspond aux critères de recherche actuels."
              : "Tous les systèmes fonctionnent correctement."
            }
          </p>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {paginatedAlerts.map((alertItem, index) => (
              <motion.div
                key={`alert-card-${alertItem.id}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="group relative bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getBadgeStyles(alertItem.type)}`}>
                      {getAlertIcon(alertItem.type)}
                      {alertItem.issue}
                    </span>
                    <div className="w-2 h-2 bg-[#f57c00] rounded-full animate-pulse"></div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 text-sm mb-2">{alertItem.tenant}</h3>
                  
                  <div className="flex items-center gap-1 text-xs text-[#2b4a6a]/60 mb-4">
                    <ClockIcon className="w-3 h-3" />
                    <span>{alertItem.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: '#2b4a6a', color: 'white' }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs bg-[#2b4a6a]/15 text-[#2b4a6a] px-2 py-1 rounded-lg flex items-center gap-1 transition-all duration-200 font-medium hover:shadow-sm"
                      onClick={() => window.alert(`Voir détails: ${alertItem.tenant} - ${alertItem.issue}`)}
                    >
                      <EyeIcon className="w-3 h-3" />
                      <span>Voir</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: '#f57c00', color: 'white' }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs bg-[#f57c00]/15 text-[#f57c00] px-2 py-1 rounded-lg flex items-center gap-1 transition-all duration-200 font-medium hover:shadow-sm"
                      onClick={() => window.alert(`Résoudre: ${alertItem.tenant} - ${alertItem.issue}`)}
                    >
                      <CheckCircleIcon className="w-3 h-3" />
                      <span>Résoudre</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-[#2b4a6a]/70">
                Page {currentPage} sur {totalPages} ({filteredAlerts.length} alertes)
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-500 hover:text-[#f57c00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </motion.button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-[#f57c00] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-500 hover:text-[#f57c00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default AlertsCards; 