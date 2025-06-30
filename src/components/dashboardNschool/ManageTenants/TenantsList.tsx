'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

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
}

const TenantsList = ({ tenants, onViewDetails, onAddTenant }: TenantsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const filteredAndSortedTenants = useMemo(() => {
    let filtered = tenants.filter((tenant) => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
      const matchesPlan = planFilter === 'all' || tenant.plan === planFilter;
      
      return matchesSearch && matchesStatus && matchesPlan;
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
  }, [tenants, searchTerm, statusFilter, planFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedTenants.length / ITEMS_PER_PAGE);
  const paginatedTenants = filteredAndSortedTenants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting tenant with ID: ${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Premium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Basic':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Starter':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Search and Filters Bar */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1 relative min-w-0">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un tenant..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filters Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#2b4a6a] to-[#3a5a7a] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FunnelIcon className="w-5 h-5" />
            Filtres
          </motion.button>

          {/* Add Tenant Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#f57c00' }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddTenant}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#f57c00] to-[#ff9800] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <PlusIcon className="w-5 h-5" />
            Ajouter
          </motion.button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="suspended">Suspendu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                  <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
                  >
                    <option value="all">Tous les plans</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Premium">Premium</option>
                    <option value="Basic">Basic</option>
                    <option value="Starter">Starter</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setPlanFilter('all');
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 font-medium">
          {filteredAndSortedTenants.length} tenant{filteredAndSortedTenants.length !== 1 ? 's' : ''} trouvé{filteredAndSortedTenants.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Table */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden backdrop-blur-sm"
      >
        <div className="overflow-x-auto max-h-96">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tenant</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Domaine</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort('plan')}
                    className="flex items-center gap-1 hover:text-[#f57c00] transition-colors"
                  >
                    Plan
                    {sortBy === 'plan' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-1 hover:text-[#f57c00] transition-colors"
                  >
                    Statut
                    {sortBy === 'status' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center gap-1 hover:text-[#f57c00] transition-colors"
                  >
                    Date de création
                    {sortBy === 'createdAt' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  <button
                    onClick={() => handleSort('users')}
                    className="flex items-center gap-1 hover:text-[#f57c00] transition-colors"
                  >
                    Utilisateurs
                    {sortBy === 'users' && (
                      sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTenants.map((tenant, index) => (
                <motion.tr
                  key={tenant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 100, damping: 15 }}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-yellow-50/50 transition-all duration-300"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-lg flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                        {tenant.logo ? (
                          <img src={tenant.logo} alt={tenant.name} className="w-full h-full object-cover" />
                        ) : (
                          tenant.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-base">{tenant.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                      {tenant.code}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-700 text-sm">{tenant.domain}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPlanColor(tenant.plan)}`}>
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(tenant.status)}`}>
                      {tenant.status === 'active' ? 'Actif' : tenant.status === 'inactive' ? 'Inactif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-600 text-sm">
                      {new Date(tenant.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <motion.span 
                      className="text-gray-700 font-medium"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tenant.users.toLocaleString()}
                    </motion.span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onViewDetails(tenant)}
                        className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => console.log(`Edit tenant ${tenant.id}`)}
                        className="text-[#f57c00] p-1 rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(tenant.id)}
                        className="text-red-600 p-1 rounded-full hover:bg-red-600/10 transition-all duration-300"
                        title="Supprimer"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Page {currentPage} sur {totalPages}
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Précédent
                </motion.button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  if (totalPages <= 5 || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 text-sm border border-gray-300 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-[#f57c00] text-white border-[#f57c00]'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </motion.button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 py-1.5 text-gray-400">...</span>;
                  }
                  return null;
                })}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  Suivant
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TenantsList; 