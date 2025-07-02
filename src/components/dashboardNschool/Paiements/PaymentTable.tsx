'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  EyeIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

interface Payment {
  id: string;
  date: string;
  tenant: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'success' | 'failed' | 'pending' | 'refunded';
  transactionId: string;
  description: string;
}

interface PaymentTableProps {
  payments: Payment[];
  onViewDetails: (payment: Payment) => void;
  onRetryPayment: (paymentId: string) => void;
  onRefundPayment: (paymentId: string) => void;
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
    { value: 'success', label: 'Réussi' },
    { value: 'failed', label: 'Échoué' },
    { value: 'pending', label: 'En attente' },
    { value: 'refunded', label: 'Remboursé' },
  ],
  date: [
    { value: 'all', label: 'Toutes les dates' },
    { value: 'last7days', label: 'Derniers 7 jours' },
    { value: 'last30days', label: 'Derniers 30 jours' },
    { value: 'last90days', label: 'Derniers 90 jours' },
  ],
  paymentMethod: [
    { value: 'all', label: 'Toutes les méthodes' },
    { value: 'Carte', label: 'Carte' },
    { value: 'Virement', label: 'Virement' },
    { value: 'Paypal', label: 'Paypal' },
  ],
};

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onViewDetails, onRetryPayment, onRefundPayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    date: 'all',
    paymentMethod: 'all',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState({ status: false, date: false, paymentMethod: false });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
    setIsDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'all', date: 'all', paymentMethod: 'all' });
    setCurrentPage(1);
  };

  const handleDownloadCSV = () => {
    const headers = ['ID', 'Date', 'Tenant', 'Montant', 'Méthode', 'Statut', 'ID Transaction', 'Description'];
    const rows = filteredPayments.map((payment) => [
      payment.id,
      new Date(payment.date).toLocaleDateString('fr-FR'),
      payment.tenant,
      payment.amount,
      payment.paymentMethod,
      payment.status,
      payment.transactionId,
      payment.description,
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'payments.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      case 'failed': return { bg: 'bg-red-100 bg-opacity-80', text: 'text-red-800' };
      case 'pending': return { bg: 'bg-yellow-100 bg-opacity-80', text: 'text-yellow-800' };
      case 'refunded': return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || payment.status === filters.status;
    const matchesMethod = filters.paymentMethod === 'all' || payment.paymentMethod === filters.paymentMethod;
    const matchesDate = filters.date === 'all' || (() => {
      const paymentDate = new Date(payment.date);
      const today = new Date('2025-07-01');
      if (filters.date === 'last7days') {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return paymentDate >= sevenDaysAgo && paymentDate <= today;
      } else if (filters.date === 'last30days') {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return paymentDate >= thirtyDaysAgo && paymentDate <= today;
      } else if (filters.date === 'last90days') {
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        return paymentDate >= ninetyDaysAgo && paymentDate <= today;
      }
      return true;
    })();
    return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / ITEMS_PER_PAGE));
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        Transactions Récentes
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
            placeholder="Rechercher par tenant ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
          />
        </div>
        {(['status', 'date', 'paymentMethod'] as const).map((filterName) => (
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
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Tenant</th>
              <th className="py-3 px-4">Montant</th>
              <th className="py-3 px-4">Méthode</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4">ID Transaction</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500 text-sm">
                  Aucune transaction trouvée
                </td>
              </tr>
            ) : (
              paginatedPayments.map((payment, index) => (
                <motion.tr
                  key={`payment-row-${payment.id}`}
                  className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-white/30amps://x.com/ to-[#f57c00]/10 transition-all duration-300"
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  variants={rowVariants}
                >
                  <td className="py-3 px-4 text-gray-700">{new Date(payment.date).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">{payment.tenant}</td>
                  <td className="py-3 px-4 text-gray-700 font-semibold">
                    €{payment.amount.toLocaleString('fr-FR')}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{payment.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <motion.span
                      variants={badgeVariants}
                      whileHover="hover"
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status).bg} ${getStatusColor(payment.status).text}`}
                    >
                      {payment.status === 'success' && 'Réussi'}
                      {payment.status === 'failed' && 'Échoué'}
                      {payment.status === 'pending' && 'En attente'}
                      {payment.status === 'refunded' && 'Remboursé'}
                    </motion.span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 font-mono text-xs">{payment.transactionId}</td>
                  <td className="py-3 px-4 flex justify-end gap-2">
                    <motion.button
                      variants={iconVariants}
                      whileHover="hover"
                      onClick={() => onViewDetails(payment)}
                      className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                      title="Voir détails"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </motion.button>
                    {payment.status === 'failed' && (
                      <motion.button
                        variants={iconVariants}
                        whileHover="hover"
                        onClick={() => onRetryPayment(payment.id)}
                        className="text-blue-500 p-1 rounded-full hover:bg-blue-500/10 transition-all duration-300"
                        title="Relancer"
                      >
                        <ArrowPathIcon className="h-5 w-5" />
                      </motion.button>
                    )}
                    {payment.status === 'success' && (
                      <motion.button
                        variants={iconVariants}
                        whileHover="hover"
                        onClick={() => onRefundPayment(payment.id)}
                        className="text-red-600 p-1 rounded-full hover:bg-red-600/10 transition-all duration-300"
                        title="Rembourser"
                      >
                        <ArrowPathIcon className="h-5 w-5" />
                      </motion.button>
                    )}
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

export default PaymentTable;