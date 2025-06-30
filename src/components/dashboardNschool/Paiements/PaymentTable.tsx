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
  FunnelIcon,
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
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' },
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

const PaymentTable = ({ payments, onViewDetails, onRetryPayment, onRefundPayment }: PaymentTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'refunded': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircleIcon className="w-4 h-4" />;
      case 'failed': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      case 'refunded': return <ArrowPathIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-orange-500/20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-orange-500/10 backdrop-blur-sm rounded-2xl pointer-events-none" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a] tracking-tight">Transactions Récentes</h3>
            <p className="text-sm text-gray-600 mt-1">Gérez vos paiements et transactions</p>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="p-2 text-gray-400 hover:text-[#f57c00] rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="all">Tous les statuts</option>
              <option value="success">Réussi</option>
              <option value="failed">Échoué</option>
              <option value="pending">En attente</option>
              <option value="refunded">Remboursé</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
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
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Aucune transaction trouvée
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-[#f57c00]/5 transition-all duration-300"
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(payment.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">{payment.tenant}</td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      €{payment.amount.toLocaleString('fr-FR')}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{payment.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1">
                          {payment.status === 'success' && 'Réussi'}
                          {payment.status === 'failed' && 'Échoué'}
                          {payment.status === 'pending' && 'En attente'}
                          {payment.status === 'refunded' && 'Remboursé'}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-xs">{payment.transactionId}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end space-x-2">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => onViewDetails(payment)}
                          className="p-1.5 text-gray-400 hover:text-[#f57c00] rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
                          title="Voir détails"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </motion.button>
                        {payment.status === 'failed' && (
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => onRetryPayment(payment.id)}
                            className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition-all duration-300"
                            title="Relancer"
                          >
                            <ArrowPathIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                        {payment.status === 'success' && (
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => onRefundPayment(payment.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-500/10 transition-all duration-300"
                            title="Rembourser"
                          >
                            <ArrowPathIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-[#f57c00]/10 text-[#f57c00] rounded-full border border-[#f57c00]/50 disabled:opacity-50 hover:bg-[#f57c00]/30 transition-all duration-300"
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
                    : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00]/30'
                } transition-all duration-300`}
              >
                {page}
              </motion.button>
            ))}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-[#f57c00]/10 text-[#f57c00] rounded-full border border-[#f57c00]/50 disabled:opacity-50 hover:bg-[#f57c00]/30 transition-all duration-300"
            >
              →
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentTable;