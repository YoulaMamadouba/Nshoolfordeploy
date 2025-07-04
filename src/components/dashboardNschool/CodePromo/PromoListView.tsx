'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PlusIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  Squares2X2Icon,
  TableCellsIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import PromoCard from './PromoCard';
import PromoTableView from './PromoTableView';
import PromoStats from './PromoStats';

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

interface PromoListViewProps {
  promoCodes: PromoCode[];
  onViewStats: (promoCode: PromoCode) => void;
  onEditPromo: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onDeletePromo: (id: number) => void;
  onAddPromo: () => void;
}

const ITEMS_PER_PAGE = 12;

const filterOptions = {
  status: [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'paused', label: 'En pause' },
    { value: 'expired', label: 'Expiré' },
  ],
  type: [
    { value: 'all', label: 'Tous les types' },
    { value: 'percentage', label: 'Pourcentage' },
    { value: 'fixed', label: 'Montant fixe' },
  ],
  plan: [
    { value: 'all', label: 'Tous les plans' },
    { value: 'Starter', label: 'Starter' },
    { value: 'Basic', label: 'Basic' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Enterprise', label: 'Enterprise' },
  ],
};

const PromoListView: React.FC<PromoListViewProps> = ({
  promoCodes,
  onViewStats,
  onEditPromo,
  onToggleStatus,
  onDeletePromo,
  onAddPromo,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    plan: 'all',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState({ status: false, type: false, plan: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showStats, setShowStats] = useState(false);

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
    setIsDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'all', type: 'all', plan: 'all' });
    setCurrentPage(1);
  };

  const filteredPromoCodes = useMemo(() => {
    return promoCodes.filter((promo) => {
      const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           promo.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'all' || promo.status === filters.status;
      const matchesType = filters.type === 'all' || promo.type === filters.type;
      const matchesPlan = filters.plan === 'all' || promo.applicablePlans.includes(filters.plan);
      return matchesSearch && matchesStatus && matchesType && matchesPlan;
    });
  }, [promoCodes, searchTerm, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredPromoCodes.length / ITEMS_PER_PAGE));
  const paginatedPromoCodes = filteredPromoCodes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#f57c00' },
    tap: { scale: 0.95 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15, duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Codes Promotionnels
            </h1>
            <p className="text-lg text-gray-600 mt-1 font-medium">
              Gérez vos campagnes marketing et boostez vos conversions
            </p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setShowStats(!showStats)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                showStats 
                  ? 'bg-[#f57c00] text-white border-[#f57c00] shadow-lg ring-2 ring-[#f57c00]/20' 
                  : 'bg-white text-[#f57c00] border-[#f57c00] hover:bg-[#f57c00] hover:text-white hover:shadow-lg'
              }`}
              title="Afficher les statistiques"
            >
              <ChartBarIcon className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onAddPromo}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <PlusIcon className="h-5 w-5" />
              Nouveau Code
            </motion.button>
          </div>
        </div>

        {/* Filters and Actions */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col sm:flex-row gap-4 mb-6 items-center"
        >
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par code ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
            />
          </div>
          
          {(['status', 'type', 'plan'] as const).map((filterName) => (
            <div className="relative" key={filterName}>
              <motion.button
                className="w-full text-sm text-[#2b4a6a] bg-gradient-to-r from-white/70 to-[#f57c00]/10 border border-[#f57c00]/50 rounded-lg p-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 transition-all appearance-none cursor-pointer flex justify-between items-center"
                onClick={() => setIsDropdownOpen((prev) => ({ ...prev, [filterName]: !prev[filterName] }))}
              >
                <span>{filterOptions[filterName].find((opt) => opt.value === filters[filterName])?.label}</span>
                <motion.div
                  animate={{ scale: isDropdownOpen[filterName] ? 0.8 : 1, rotate: isDropdownOpen[filterName] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="w-4 h-4 text-[#f57c00]" />
                </motion.div>
              </motion.button>
              {isDropdownOpen[filterName] && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-full left-0 w-full mt-2 bg-gradient-to-br from-white to-[#f5f7fa] border border-[#f57c00]/30 rounded-xl shadow-lg z-50 overflow-hidden"
                >
                  {filterOptions[filterName].map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`px-4 py-2.5 text-sm text-[#2b4a6a] hover:bg-[#f57c00]/10 cursor-pointer transition-all duration-300 font-medium ${
                        filters[filterName] === option.value ? 'bg-[#f57c00]/20 text-[#f57c00]' : ''
                      } border-b border-[#f57c00]/10 last:border-b-0 flex items-center gap-2`}
                      onClick={() => handleFilterChange(filterName, option.value)}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#f57c00]/50" />
                      {option.label}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          
          <div className="flex gap-2">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleResetFilters}
              className="p-2 bg-[#f57c00]/10 text-[#f57c00] rounded-full border border-[#f57c00]/50 hover:bg-[#f57c00] hover:text-white transition-all duration-300"
              title="Réinitialiser les filtres"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
              className={`p-2 rounded-full border border-[#f57c00]/50 transition-all duration-300 ${
                viewMode === 'cards' 
                  ? 'bg-[#f57c00] text-white' 
                  : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
              }`}
              title={viewMode === 'table' ? 'Vue Cards' : 'Vue Tableau'}
            >
              {viewMode === 'table' ? 
                <Squares2X2Icon className="h-5 w-5 text-white" /> : 
                <TableCellsIcon className="h-5 w-5 text-white" />
              }
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                // TODO: Implémenter l'export CSV
                console.log('Export CSV');
              }}
              className="p-2 bg-[#f57c00]/10 text-[#f57c00] rounded-full border border-[#f57c00]/50 hover:bg-[#f57c00] hover:text-white transition-all duration-300"
              title="Exporter (CSV)"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Statistics Section */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <PromoStats promoCodes={promoCodes} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content View */}
      <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden backdrop-blur-sm">
        <div className="p-6">
          <AnimatePresence mode="wait">
            {viewMode === 'cards' ? (
              <div>
                {paginatedPromoCodes.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-sm">
                    Aucun code promotionnel trouvé
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedPromoCodes.map((promoCode, index) => (
                      <PromoCard
                        key={promoCode.id}
                        promoCode={promoCode}
                        onViewStats={() => onViewStats(promoCode)}
                        onEdit={() => onEditPromo(promoCode.id)}
                        onToggleStatus={() => onToggleStatus(promoCode.id)}
                        onDelete={() => onDeletePromo(promoCode.id)}
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <PromoTableView
                promoCodes={paginatedPromoCodes}
                onViewStats={onViewStats}
                onEditPromo={onEditPromo}
                onToggleStatus={onToggleStatus}
                onDeletePromo={onDeletePromo}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-center gap-2">
              <motion.button
                variants={buttonVariants}
                whileHover={currentPage === 1 ? {} : "hover"}
                whileTap={currentPage === 1 ? {} : "tap"}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-full border border-[#f57c00]/50 ${
                  currentPage === 1
                    ? 'bg-[#f57c00]/10 text-[#f57c00]/50 cursor-not-allowed'
                    : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
                } transition-all duration-300`}
              >
                ←
              </motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border border-[#f57c00]/50 ${
                    currentPage === page
                      ? 'bg-[#f57c00] text-white'
                      : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
                  } transition-all duration-300`}
                >
                  {page}
                </motion.button>
              ))}
              <motion.button
                variants={buttonVariants}
                whileHover={currentPage === totalPages ? {} : "hover"}
                whileTap={currentPage === totalPages ? {} : "tap"}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full border border-[#f57c00]/50 ${
                  currentPage === totalPages
                    ? 'bg-[#f57c00]/10 text-[#f57c00]/50 cursor-not-allowed'
                    : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
                } transition-all duration-300`}
              >
                →
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PromoListView; 