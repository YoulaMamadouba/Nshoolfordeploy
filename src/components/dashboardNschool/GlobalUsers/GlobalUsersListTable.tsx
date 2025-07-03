'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface GlobalUsersListTableProps {
  users: GlobalUser[];
  onViewDetails: (user: GlobalUser) => void;
  onEditUser: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onDeleteUser: (id: number) => void;
}

const ITEMS_PER_PAGE = 10;

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

const GlobalUsersListTable: React.FC<GlobalUsersListTableProps> = ({
  users,
  onViewDetails,
  onEditUser,
  onToggleStatus,
  onDeleteUser,
}) => {
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

  const rowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 15, delay: i * 0.1 },
    }),
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  const badgeVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2, ease: 'easeOut' },
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin': return ShieldCheckIcon;
      case 'Support': return UserGroupIcon;
      case 'Commercial': return CurrencyDollarIcon;
      default: return UserIcon;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return { bg: 'bg-red-100 bg-opacity-80', text: 'text-red-800' };
      case 'Support': return { bg: 'bg-blue-100 bg-opacity-80', text: 'text-blue-800' };
      case 'Commercial': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      case 'inactive': return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
      case 'suspended': return { bg: 'bg-red-100 bg-opacity-80', text: 'text-red-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
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
        variants={containerVariants}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
            />
          </div>
          
          {(['status', 'role'] as const).map((filterName) => (
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

      {/* Table */}
      <motion.div variants={containerVariants} className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden backdrop-blur-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gradient-to-r from-white/90 to-gray-50/80 border-b border-[#f57c00]/30">
                <tr className="text-left text-[#2b4a6a] font-bold">
                  <th className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      Utilisateur
                    </div>
                  </th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Rôle</th>
                  <th className="py-3 px-4">Dernière connexion</th>
                  <th className="py-3 px-4">Tenants accessibles</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500 text-sm">
                      Aucun utilisateur trouvé
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user, index) => {
                    const RoleIcon = getRoleIcon(user.role);
                    const StatusIcon = getStatusIcon(user.status);
                    const roleColors = getRoleColor(user.role);
                    const statusColors = getStatusColor(user.status);
                    
                    return (
                      <motion.tr
                        key={`user-row-${user.id}`}
                        className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-white/30 hover:to-[#f57c00]/10 transition-all duration-300"
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        variants={rowVariants}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className={`w-10 h-10 bg-gradient-to-br ${roleColors.bg.replace('bg-', 'from-').replace('-100', '-500')} to-${roleColors.bg.replace('bg-', '').replace('-100', '-600')} rounded-lg flex items-center justify-center text-white font-bold text-sm overflow-hidden`}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              ) : (
                                <RoleIcon className="w-5 h-5" />
                              )}
                            </motion.div>
                            <div>
                              <p className="font-semibold text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.permissions.length} permissions</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-700">{user.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <motion.span
                            variants={badgeVariants}
                            whileHover="hover"
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${roleColors.bg} ${roleColors.text}`}
                          >
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {user.role}
                          </motion.span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-[#f57c00]" />
                            <span>{formatLastLogin(user.lastLogin)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <GlobeAltIcon className="w-4 h-4 text-[#f57c00]" />
                            <span className="font-medium text-gray-700">
                              {user.tenantAccess.length} tenants
                            </span>
                          </div>
                          {user.tenantAccess.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {user.tenantAccess.slice(0, 2).join(', ')}
                              {user.tenantAccess.length > 2 && ` +${user.tenantAccess.length - 2}`}
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <motion.span
                            variants={badgeVariants}
                            whileHover="hover"
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors.bg} ${statusColors.text}`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {user.status === 'active' ? 'Actif' : user.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                          </motion.span>
                        </td>
                        <td className="py-3 px-4 flex justify-end gap-2">
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onViewDetails(user)}
                            className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                            title="Voir détails"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onEditUser(user.id)}
                            className="text-[#f57c00] p-1 rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
                            title="Modifier"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onToggleStatus(user.id)}
                            className={`p-1 rounded-full transition-all duration-300 ${
                              user.status === 'active' 
                                ? 'text-yellow-600 hover:bg-yellow-600/10' 
                                : 'text-green-600 hover:bg-green-600/10'
                            }`}
                            title={user.status === 'active' ? 'Suspendre' : 'Activer'}
                          >
                            {user.status === 'active' ? <ExclamationTriangleIcon className="h-5 w-5" /> : <CheckCircleIcon className="h-5 w-5" />}
                          </motion.button>
                          <motion.button
                            variants={iconVariants}
                            whileHover="hover"
                            onClick={() => onDeleteUser(user.id)}
                            className="text-red-600 p-1 rounded-full hover:bg-red-600/10 transition-all duration-300"
                            title="Supprimer"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
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

export default GlobalUsersListTable; 