import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  BellIcon,
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface FailedPayment {
  id: string;
  tenant: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
  failureReason: string;
  failedAt: string;
  retryCount: number;
  lastRetryAt?: string;
  nextRetryAt?: string;
  status: 'pending_retry' | 'max_retries' | 'suspended' | 'recovered';
}

interface FailedPaymentsManagerProps {
  failedPayments: FailedPayment[];
  onRetryPayment: (paymentId: string) => void;
  onSuspendTenant: (tenantId: string) => void;
  onRecoverPayment: (paymentId: string) => void;
  onSendNotification: (tenantId: string, type: 'email' | 'sms' | 'in_app') => void;
}

const FailedPaymentsManager = ({
  failedPayments,
  onRetryPayment,
  onSuspendTenant,
  onRecoverPayment,
  onSendNotification,
}: FailedPaymentsManagerProps) => {
  const [selectedPayment, setSelectedPayment] = useState<FailedPayment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_retry': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'max_retries': return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'recovered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_retry': return <ClockIcon className="w-4 h-4" />;
      case 'max_retries': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'suspended': return <XMarkIcon className="w-4 h-4" />;
      case 'recovered': return <CheckCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_retry': return 'En attente de relance';
      case 'max_retries': return 'Max tentatives atteint';
      case 'suspended': return 'Compte suspendu';
      case 'recovered': return 'Récupéré';
      default: return 'Inconnu';
    }
  };

  const filteredPayments = failedPayments.filter(payment => {
    if (filterStatus === 'all') return true;
    return payment.status === filterStatus;
  });

  const pendingRetries = failedPayments.filter(p => p.status === 'pending_retry').length;
  const maxRetries = failedPayments.filter(p => p.status === 'max_retries').length;
  const suspended = failedPayments.filter(p => p.status === 'suspended').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 overflow-hidden"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a] tracking-tight flex items-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mr-2" />
              Gestion des Échecs de Paiement
            </h3>
            <p className="text-sm text-gray-600 mt-1">Surveillez et gérez les paiements échoués</p>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-[#f57c00] rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-4 rounded-xl border border-yellow-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">En attente de relance</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRetries}</p>
              </div>
              <ClockIcon className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-4 rounded-xl border border-red-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Max tentatives</p>
                <p className="text-2xl font-bold text-red-600">{maxRetries}</p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-4 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Comptes suspendus</p>
                <p className="text-2xl font-bold text-gray-600">{suspended}</p>
              </div>
              <XMarkIcon className="w-8 h-8 text-gray-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-4 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending_retry">En attente de relance</option>
              <option value="max_retries">Max tentatives</option>
              <option value="suspended">Suspendus</option>
              <option value="recovered">Récupérés</option>
            </select>
          </div>
        </div>

        {/* Failed Payments List */}
        <div className="space-y-4">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircleIcon className="w-12 h-12 mx-auto text-green-400 mb-4" />
              <p>Aucun échec de paiement à traiter</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <motion.div
                key={payment.id}
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:border-[#f57c00]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-semibold text-[#2b4a6a]">{payment.tenant}</h4>
                        <p className="text-sm text-gray-600">€{payment.amount} - {payment.paymentMethod}</p>
                        <p className="text-xs text-gray-500">ID: {payment.transactionId}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-1">{getStatusText(payment.status)}</span>
                        </span>
                        
                        {payment.retryCount > 0 && (
                          <span className="text-xs text-gray-500">
                            Tentatives: {payment.retryCount}/3
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-xs text-red-600">
                        <strong>Raison:</strong> {payment.failureReason}
                      </p>
                      <p className="text-xs text-gray-500">
                        Échoué le {new Date(payment.failedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowDetails(true);
                      }}
                      className="p-2 text-gray-400 hover:text-[#f57c00] rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
                      title="Voir détails"
                    >
                      <Cog6ToothIcon className="w-4 h-4" />
                    </motion.button>
                    
                    {payment.status === 'pending_retry' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onRetryPayment(payment.id)}
                        className="p-2 text-blue-500 hover:text-blue-600 rounded-full hover:bg-blue-500/10 transition-all duration-300"
                        title="Relancer"
                      >
                        <ArrowPathIcon className="w-4 h-4" />
                      </motion.button>
                    )}
                    
                    {payment.status === 'max_retries' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSuspendTenant(payment.tenant)}
                        className="p-2 text-red-500 hover:text-red-600 rounded-full hover:bg-red-500/10 transition-all duration-300"
                        title="Suspendre"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Détails de l'Échec</h2>
                    <p className="text-red-100 mt-1">{selectedPayment.tenant}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Montant</p>
                    <p className="text-lg font-semibold text-[#2b4a6a]">€{selectedPayment.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Méthode</p>
                    <p className="text-lg font-semibold text-[#2b4a6a]">{selectedPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tentatives</p>
                    <p className="text-lg font-semibold text-[#2b4a6a]">{selectedPayment.retryCount}/3</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Statut</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedPayment.status)}`}>
                      {getStatusIcon(selectedPayment.status)}
                      <span className="ml-1">{getStatusText(selectedPayment.status)}</span>
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Raison de l'échec</p>
                  <p className="text-red-600 bg-red-50 p-3 rounded-lg">{selectedPayment.failureReason}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-4">Actions de récupération</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSendNotification(selectedPayment.tenant, 'email')}
                      className="flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <EnvelopeIcon className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSendNotification(selectedPayment.tenant, 'sms')}
                      className="flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <PhoneIcon className="w-4 h-4" />
                      <span className="text-sm">SMS</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSendNotification(selectedPayment.tenant, 'in_app')}
                      className="flex items-center justify-center space-x-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span className="text-sm">In-App</span>
                    </motion.button>
                  </div>
                </div>

                {selectedPayment.status === 'pending_retry' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onRetryPayment(selectedPayment.id);
                      setShowDetails(false);
                    }}
                    className="w-full bg-[#f57c00] text-white py-3 rounded-lg hover:bg-[#e65100] transition-colors flex items-center justify-center space-x-2"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                    <span>Relancer le Paiement</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FailedPaymentsManager;