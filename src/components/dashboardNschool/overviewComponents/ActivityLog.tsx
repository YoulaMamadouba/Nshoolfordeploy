'use client';
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { TrashIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, ChevronDownIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: 'inscription' | 'ajout-tenant' | 'ajout-etudiant' | 'paiement' | 'rapport' | 'abonnement';
}

interface ActivityLogProps {
  activities: Activity[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15, duration: 0.5 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15, delay: i * 0.1 },
  }),
};

const buttonVariants: Variants = {
  hover: { scale: 1.1, backgroundColor: '#f57c00', color: 'white' },
  tap: { scale: 0.9 },
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

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15, duration: 0.3 },
  },
};

const optionVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15, delay: i * 0.05 },
  }),
};

const ITEMS_PER_PAGE = 10;

const filterOptions = {
  type: [
    { value: 'all', label: 'Toutes les actions' },
    { value: 'inscription', label: 'Inscription' },
    { value: 'ajout-tenant', label: 'Ajout Tenant' },
    { value: 'ajout-etudiant', label: 'Ajout Étudiant' },
    { value: 'paiement', label: 'Paiement' },
    { value: 'rapport', label: 'Rapport' },
    { value: 'abonnement', label: 'Abonnement' },
  ],
  date: [
    { value: 'all', label: 'Toutes les dates' },
    { value: 'last7days', label: 'Derniers 7 jours' },
    { value: 'last30days', label: 'Derniers 30 jours' },
    { value: 'last90days', label: 'Derniers 90 jours' },
  ],
};

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    date: 'all',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState({ type: false, date: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentActivities, setCurrentActivities] = useState<Activity[]>(activities);

  useEffect(() => {
    setCurrentActivities(activities);
  }, [activities]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
    setIsDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({ type: 'all', date: 'all' });
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    setCurrentActivities(currentActivities.filter((activity) => activity.id !== id));
  };

  const handleDownloadCSV = () => {
    const headers = ['ID', 'Action', 'Utilisateur', 'Temps', 'Type'];
    const rows = filteredActivities.map((activity) => [
      activity.id,
      activity.action,
      activity.user,
      activity.time,
      activity.type.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'activities.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const filteredActivities = currentActivities.filter((activity) => {
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || activity.type === filters.type;
    const matchesDate = filters.date === 'all' || (() => {
      const activityDate = new Date(activity.time);
      const today = new Date('2025-07-01');
      if (filters.date === 'last7days') {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return activityDate >= sevenDaysAgo && activityDate <= today;
      } else if (filters.date === 'last30days') {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return activityDate >= thirtyDaysAgo && activityDate <= today;
      } else if (filters.date === 'last90days') {
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        return activityDate >= ninetyDaysAgo && activityDate <= today;
      }
      return true;
    })();
    return matchesSearch && matchesType && matchesDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / ITEMS_PER_PAGE));
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const typeStyles: Record<Activity['type'], { bg: string; text: string }> = {
    inscription: { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' },
    'ajout-tenant': { bg: 'bg-blue-100 bg-opacity-80', text: 'text-blue-800' },
    'ajout-etudiant': { bg: 'bg-orange-100 bg-opacity-80', text: 'text-orange-800' },
    paiement: { bg: 'bg-purple-100 bg-opacity-80', text: 'text-purple-800' },
    rapport: { bg: 'bg-yellow-100 bg-opacity-80', text: 'text-yellow-800' },
    abonnement: { bg: 'bg-indigo-100 bg-opacity-80', text: 'text-indigo-800' },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-gradient-to-br from-white/90 to-gray-50/80 rounded-2xl p-4 shadow-sm border border-[#f57c00]/30 backdrop-blur-sm overflow-visible"
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        className="text-lg font-bold text-[#2b4a6a] text-center mb-4 tracking-tight"
        style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
      >
        Activité Récente
      </motion.h3>
      <div className="relative mb-4">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#f57c00]/50 to-transparent" />
      </div>

      {/* Filters */}
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
            placeholder="Rechercher par action ou utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
          />
        </div>
        {(['type', 'date'] as const).map((filterName) => (
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
                    variants={optionVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
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
            onClick={handleDownloadCSV}
            className="p-2 bg-[#f57c00]/10 text-[#f57c00] rounded-full border border-[#f57c00]/50 hover:bg-[#f57c00] hover:text-white transition-all duration-300"
            title="Télécharger la liste (CSV)"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gradient-to-r from-white/90 to-gray-50/80 border-b border-[#f57c00]/30">
            <tr className="text-left text-[#2b4a6a] font-bold">
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Utilisateur</th>
              <th className="py-3 px-4">Temps</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedActivities.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500 text-sm">
                  Aucune activité trouvée
                </td>
              </tr>
            ) : (
              paginatedActivities.map((activity, index) => (
                <motion.tr
                  key={`activity-row-${activity.id}`}
                  className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-white/30 hover:to-[#f57c00]/10 transition-all duration-300"
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  variants={rowVariants}
                >
                  <td className="py-3 px-4 text-gray-700">{activity.action}</td>
                  <td className="py-3 px-4 text-gray-700">{activity.user}</td>
                  <td className="py-3 px-4 text-gray-600">{new Date(activity.time).toLocaleString('fr-FR')}</td>
                  <td className="py-3 px-4">
                    <motion.span
                      variants={badgeVariants}
                      whileHover="hover"
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${typeStyles[activity.type].bg} ${typeStyles[activity.type].text}`}
                    >
                      {activity.type.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </motion.span>
                  </td>
                  <td className="py-3 px-4 flex justify-end gap-2">
                    <motion.button
                      variants={iconVariants}
                      whileHover="hover"
                      onClick={() => handleDelete(activity.id)}
                      className="text-red-600 p-1 rounded-full hover:bg-red-600/10 transition-all duration-300"
                      title="Supprimer"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      variants={iconVariants}
                      whileHover="hover"
                      onClick={handleDownloadCSV}
                      className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                      title="Exporter"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 150, damping: 12 }}
        className="flex justify-center gap-2 mt-6"
      >
        <motion.button
          variants={buttonVariants}
          whileHover={currentPage === 1 ? {} : "hover"}
          whileTap={currentPage === 1 ? {} : "tap"}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-full border border-[#f57c00]/50 !important ${
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
            className={`px-4 py-2 rounded-full text-sm font-medium border border-[#f57c00]/50 !important ${
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
          className={`p-2 rounded-full border border-[#f57c00]/50 !important ${
            currentPage === totalPages
              ? 'bg-[#f57c00]/10 text-[#f57c00]/50 cursor-not-allowed'
              : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
          } transition-all duration-300`}
        >
          →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ActivityLog;