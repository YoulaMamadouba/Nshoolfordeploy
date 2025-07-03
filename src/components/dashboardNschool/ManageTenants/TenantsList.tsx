'use client';
import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ChevronUpIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import TenantsCards from './TenantsCards';

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

interface TenantsListProps {
  tenants: Tenant[];
  onViewDetails: (tenant: Tenant) => void;
  onAddTenant: () => void;
  onEditTenant: (id: number) => void;
  onDeleteTenant: (id: number) => void;
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
  status: [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'suspended', label: 'Suspendu' },
  ],
  plan: [
    { value: 'all', label: 'Tous les plans' },
    { value: 'Enterprise', label: 'Enterprise' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Basic', label: 'Basic' },
    { value: 'Starter', label: 'Starter' },
  ],
  date: [
    { value: 'all', label: 'Toutes les dates' },
    { value: 'last7days', label: 'Derniers 7 jours' },
    { value: 'last30days', label: 'Derniers 30 jours' },
    { value: 'last90days', label: 'Derniers 90 jours' },
  ],
};

const TenantsList: React.FC<TenantsListProps> = ({ tenants, onViewDetails, onAddTenant, onEditTenant, onDeleteTenant }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    plan: 'all',
    date: 'all',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState({ status: false, plan: false, date: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
    setIsDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'all', plan: 'all', date: 'all' });
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleDownloadCSV = () => {
    const headers = ['ID', 'Nom', 'Code', 'Domaine', 'Plan', 'Statut', 'Date de création', 'Utilisateurs'];
    const rows = filteredAndSortedTenants.map((tenant) => [
      tenant.id,
      tenant.name,
      tenant.code,
      tenant.domain,
      tenant.plan,
      tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu',
      new Date(tenant.createdAt).toLocaleDateString('fr-FR'),
      tenant.users.toLocaleString(),
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tenants.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const filteredAndSortedTenants = useMemo(() => {
    let filtered = tenants.filter((tenant) => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'all' || tenant.status === filters.status;
      const matchesPlan = filters.plan === 'all' || tenant.plan === filters.plan;
      const matchesDate = filters.date === 'all' || (() => {
        const tenantDate = new Date(tenant.createdAt);
        const today = new Date('2025-07-01');
        if (filters.date === 'last7days') {
          const sevenDaysAgo = new Date(today);
          sevenDaysAgo.setDate(today.getDate() - 7);
          return tenantDate >= sevenDaysAgo && tenantDate <= today;
        } else if (filters.date === 'last30days') {
          const thirtyDaysAgo = new Date(today);
          thirtyDaysAgo.setDate(today.getDate() - 30);
          return tenantDate >= thirtyDaysAgo && tenantDate <= today;
        } else if (filters.date === 'last90days') {
          const ninetyDaysAgo = new Date(today);
          ninetyDaysAgo.setDate(today.getDate() - 90);
          return tenantDate >= ninetyDaysAgo && tenantDate <= today;
        }
        return true;
      })();
      return matchesSearch && matchesStatus && matchesPlan && matchesDate;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Tenant];
      let bValue: any = b[sortBy as keyof Tenant];
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tenants, searchTerm, filters.status, filters.plan, filters.date, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedTenants.length / ITEMS_PER_PAGE));
  const paginatedTenants = filteredAndSortedTenants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      case 'inactive': return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
      case 'suspended': return { bg: 'bg-red-100 bg-opacity-80', text: 'text-red-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return { bg: 'bg-purple-100 bg-opacity-80', text: 'text-purple-800' };
      case 'Premium': return { bg: 'bg-blue-100 bg-opacity-80', text: 'text-blue-800' };
      case 'Basic': return { bg: 'bg-orange-100 bg-opacity-80', text: 'text-orange-800' };
      case 'Starter': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
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
        Liste des Tenants
      </motion.h3>
      <div className="relative mb-4">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#f57c00]/50 to-transparent" />
      </div>

      {/* Filters and Actions */}
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
            placeholder="Rechercher par nom, code ou domaine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
          />
        </div>
        {(['status', 'plan', 'date'] as const).map((filterName) => (
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
            {viewMode === 'table' ? <Squares2X2Icon className="h-5 w-5" /> : <TableCellsIcon className="h-5 w-5" />}
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onAddTenant}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#f57c00] to-[#ff9800] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            title="Ajouter un tenant"
          >
            <PlusIcon className="h-5 w-5" />
            Ajouter
          </motion.button>
        </div>
      </motion.div>

      {/* Content View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gradient-to-r from-white/90 to-gray-50/80 border-b border-[#f57c00]/30">
              <tr className="text-left text-[#2b4a6a] font-bold">
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-[#f57c00] transition-colors">
                    Tenant
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('code')} className="flex items-center gap-1 hover:text-[#f57c00] transition-colors">
                    Code
                    {sortBy === 'code' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('domain')} className="flex items-center gap-1 hover:text-[#f57c00] transition-colors">
                    Domaine
                    {sortBy === 'domain' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('plan')} className="flex items-center gap-1 hover:text-[#f57c00] transition-colors">
                    Plan
                    {sortBy === 'plan' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('status')} className="flex items-center gap-1 hover:text-[#f57c00] transition-colors">
                    Statut
                    {sortBy === 'status' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('createdAt')} className="flex items-center gap-1 hover:text-[#f57c00] transition-colors">
                    Date de création
                    {sortBy === 'createdAt' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4">
                  <button onClick={() => handleSort('users')} className="flex items-center gap-1 hover:text-[#f57c00] transition-colors">
                    Utilisateurs
                    {sortBy === 'users' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTenants.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500 text-sm">
                    Aucun tenant trouvé
                  </td>
                </tr>
              ) : (
                paginatedTenants.map((tenant, index) => (
                  <motion.tr
                    key={`tenant-row-${tenant.id}`}
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
                          {tenant.logo ? (
                            <img src={tenant.logo} alt={tenant.name} className="w-full h-full object-cover" />
                          ) : (
                            tenant.name.charAt(0)
                          )}
                        </motion.div>
                        <p className="font-semibold text-gray-900">{tenant.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{tenant.code}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{tenant.domain}</td>
                    <td className="py-3 px-4">
                      <motion.span
                        variants={badgeVariants}
                        whileHover="hover"
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(tenant.plan).bg} ${getPlanColor(tenant.plan).text}`}
                      >
                        {tenant.plan}
                      </motion.span>
                    </td>
                    <td className="py-3 px-4">
                      <motion.span
                        variants={badgeVariants}
                        whileHover="hover"
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tenant.status).bg} ${getStatusColor(tenant.status).text}`}
                      >
                        {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                      </motion.span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{new Date(tenant.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="py-3 px-4">
                      <motion.span
                        variants={badgeVariants}
                        whileHover="hover"
                        className="text-gray-700 font-medium"
                      >
                        {tenant.users.toLocaleString()}
                      </motion.span>
                    </td>
                    <td className="py-3 px-4 flex justify-end gap-2">
                      <motion.button
                        variants={iconVariants}
                        whileHover="hover"
                        onClick={() => onViewDetails(tenant)}
                        className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        variants={iconVariants}
                        whileHover="hover"
                        onClick={() => onEditTenant(tenant.id)}
                        className="text-[#f57c00] p-1 rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        variants={iconVariants}
                        whileHover="hover"
                        onClick={() => onDeleteTenant(tenant.id)}
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
      ) : (
        <div>
          {paginatedTenants.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              Aucun tenant trouvé
            </div>
          ) : (
            <TenantsCards
              tenants={paginatedTenants}
              onViewDetails={onViewDetails}
              onEditTenant={onEditTenant}
              onDeleteTenant={onDeleteTenant}
            />
          )}
        </div>
      )}

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
      </motion.div>
    </motion.div>
  );
};

export default TenantsList;