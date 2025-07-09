'use client';
import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  CalendarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { GlobalUser } from './data';
import { useTheme } from '@/contexts/ThemeContext';

interface GlobalUsersListCardsProps {
  users: GlobalUser[];
  onViewDetails: (user: GlobalUser) => void;
  onEditUser: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onDeleteUser: (id: number) => void;
}

const ITEMS_PER_PAGE = 12;

const filterOptions = {
  status: [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'suspended', label: 'Suspendu' },
  ],
  role: [
    { value: 'all', label: 'Tous les rôles' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Support', label: 'Support' },
    { value: 'Commercial', label: 'Commercial' },
  ],
};

const GlobalUsersListCards: React.FC<GlobalUsersListCardsProps> = ({
  users,
  onViewDetails,
  onEditUser,
  onToggleStatus,
  onDeleteUser,
}) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState({ status: false, role: false });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
    setIsDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'all', role: 'all' });
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'all' || user.status === filters.status;
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchTerm, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const containerVariants: Variants = {
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
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

  const buttonVariants: Variants = {
    hover: { scale: 1.05, backgroundColor: '#f57c00' },
    tap: { scale: 0.95 },
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin': return ShieldCheckIcon;
      case 'Support': return UserGroupIcon;
      case 'Commercial': return CurrencyDollarIcon;
      default: return UserIcon;
    }
  };

  const getRoleColor = (role: string) => {
    if (theme === 'dark') {
      switch (role) {
        case 'Super Admin': return { bg: 'bg-red-900/30', text: 'text-red-300', border: 'border-red-600/50', icon: 'text-red-400' };
        case 'Support': return { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-600/50', icon: 'text-blue-400' };
        case 'Commercial': return { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-600/50', icon: 'text-green-400' };
        default: return { bg: 'bg-gray-700/30', text: 'text-gray-300', border: 'border-gray-600/50', icon: 'text-gray-400' };
      }
    } else {
      switch (role) {
        case 'Super Admin': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: 'text-red-600' };
        case 'Support': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', icon: 'text-blue-600' };
        case 'Commercial': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: 'text-green-600' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', icon: 'text-gray-600' };
      }
    }
  };

  const getStatusColor = (status: string) => {
    if (theme === 'dark') {
      switch (status) {
        case 'active': return { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-600/50', icon: 'text-green-400' };
        case 'inactive': return { bg: 'bg-gray-700/30', text: 'text-gray-300', border: 'border-gray-600/50', icon: 'text-gray-400' };
        case 'suspended': return { bg: 'bg-red-900/30', text: 'text-red-300', border: 'border-red-600/50', icon: 'text-red-400' };
        default: return { bg: 'bg-gray-700/30', text: 'text-gray-300', border: 'border-gray-600/50', icon: 'text-gray-400' };
      }
    } else {
      switch (status) {
        case 'active': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: 'text-green-600' };
        case 'inactive': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', icon: 'text-gray-600' };
        case 'suspended': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: 'text-red-600' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', icon: 'text-gray-600' };
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircleIcon;
      case 'inactive': return ClockIcon;
      case 'suspended': return ExclamationTriangleIcon;
      default: return CheckCircleIcon;
    }
  };

  const formatLastLogin = (lastLogin: string) => {
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'À l\'instant';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 48) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Filters Section */}
      <motion.div
        variants={cardVariants}
        className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
            : 'bg-gradient-to-br from-white via-white to-gray-50/50 border-gray-200/50'
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          {(['status', 'role'] as const).map((filterName) => (
            <div className="relative" key={filterName}>
              <motion.button
                className={`w-full text-sm border rounded-lg p-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 transition-all appearance-none cursor-pointer flex justify-between items-center ${
                  theme === 'dark'
                    ? 'text-gray-300 bg-gradient-to-r from-gray-700/70 to-[#f57c00]/10 border-[#f57c00]/50'
                    : 'text-[#2b4a6a] bg-gradient-to-r from-white/70 to-[#f57c00]/10 border-[#f57c00]/50'
                }`}
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
                  className={`absolute top-full left-0 w-full mt-2 border border-[#f57c00]/30 rounded-xl shadow-lg z-50 overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                      : 'bg-gradient-to-br from-white to-[#f5f7fa]'
                  }`}
                >
                  {filterOptions[filterName].map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-all duration-300 font-medium border-b border-[#f57c00]/10 last:border-b-0 flex items-center gap-2 ${
                        theme === 'dark'
                          ? `text-gray-300 hover:bg-[#f57c00]/20 ${
                              filters[filterName] === option.value ? 'bg-[#f57c00]/30 text-[#f57c00]' : ''
                            }`
                          : `text-[#2b4a6a] hover:bg-[#f57c00]/10 ${
                              filters[filterName] === option.value ? 'bg-[#f57c00]/20 text-[#f57c00]' : ''
                            }`
                      }`}
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
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div variants={cardVariants} className={`rounded-3xl shadow-xl border overflow-hidden backdrop-blur-sm ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700/50'
          : 'bg-white border-gray-200/50'
      }`}>
        <div className="p-6">
          {paginatedUsers.length === 0 ? (
            <div className={`py-12 text-center text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Aucun utilisateur trouvé
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedUsers.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);
                const StatusIcon = getStatusIcon(user.status);
                const roleColors = getRoleColor(user.role);
                const statusColors = getStatusColor(user.status);
                
                return (
                  <motion.div
                    key={user.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`relative rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 min-h-[320px] ${
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
                    
                    {/* Header avec avatar et badges */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <motion.div
                            className={`w-14 h-14 bg-gradient-to-br ${roleColors.bg.replace('bg-', 'from-').replace('-100', '-500')} to-${roleColors.bg.replace('bg-', '').replace('-100', '-600')} rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              <RoleIcon className="w-7 h-7" />
                            )}
                          </motion.div>
                          <div className="min-w-0 flex-1">
                            <h3 className={`font-bold text-lg leading-tight mb-1 truncate ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                            }`}>{user.name}</h3>
                            <p className={`text-sm truncate ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Badges avec meilleur espacement */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <motion.span
                          variants={badgeVariants}
                          whileHover="hover"
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${roleColors.bg} ${roleColors.text} ${roleColors.border} shadow-sm`}
                        >
                          <RoleIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                          <span className="truncate">{user.role}</span>
                        </motion.span>
                        
                        <motion.span
                          variants={badgeVariants}
                          whileHover="hover"
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors.bg} ${statusColors.text} ${statusColors.border} shadow-sm`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                          <span className="truncate">
                            {user.status === 'active' ? 'Actif' : user.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                          </span>
                        </motion.span>
                      </div>
                    </div>

                    {/* Contenu principal */}
                    <div className="px-6 pb-6">
                      {/* Informations détaillées */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <CalendarIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
                          <span className="font-medium">
                            Dernière connexion : {formatLastLogin(user.lastLogin)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <GlobeAltIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
                          <span className="font-medium">
                            {user.tenantAccess.length} tenants accessibles
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <ShieldCheckIcon className="w-4 h-4 text-[#f57c00] flex-shrink-0" />
                          <span className="font-medium">
                            {user.permissions.length} permissions
                          </span>
                        </div>
                      </div>

                      {/* Permissions principales */}
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 mb-2">Permissions principales :</p>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 3).map((permission, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              {permission}
                            </span>
                          ))}
                          {user.permissions.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              +{user.permissions.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex gap-2">
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onViewDetails(user)}
                            className="p-2.5 text-[#2b4a6a] bg-gray-50 rounded-lg hover:bg-[#2b4a6a] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                            title="Voir détails"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </motion.button>
                          
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onEditUser(user.id)}
                            className="p-2.5 text-[#f57c00] bg-orange-50 rounded-lg hover:bg-[#f57c00] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                            title="Modifier"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </motion.button>
                          
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onToggleStatus(user.id)}
                            className={`p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                              user.status === 'active' 
                                ? 'text-yellow-600 bg-yellow-50 hover:bg-yellow-600 hover:text-white' 
                                : 'text-green-600 bg-green-50 hover:bg-green-600 hover:text-white'
                            }`}
                            title={user.status === 'active' ? 'Suspendre' : 'Activer'}
                          >
                            {user.status === 'active' ? <ExclamationTriangleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
                          </motion.button>
                          
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onDeleteUser(user.id)}
                            className="p-2.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                            title="Supprimer"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Effet de bordure animée */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#f57c00]/20 via-[#ff9800]/20 to-[#f57c00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>
          )}
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

export default GlobalUsersListCards; 