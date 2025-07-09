'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import CountUp from 'react-countup';
import {
  ArrowLeftIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import PaymentTable from './PaymentTable';
import FailedPaymentsManager from './FailedPaymentsManager';

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
    scale: 1.03,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
      delay: 0.2,
    },
  },
  hover: {
    scale: [1, 1.15, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

const valueVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
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

interface PaymentMetric {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  description: string;
}

interface PaymentMetricsProps {
  totalRevenue: number;
  failedPayments: number;
  pendingPayments: number;
  successRate: number;
}

const PaymentMetrics = ({ totalRevenue, failedPayments, pendingPayments, successRate }: PaymentMetricsProps) => {
  const metrics: PaymentMetric[] = [
    {
      title: 'Revenus Totaux',
      value: totalRevenue || 0,
      prefix: '€',
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      description: 'Revenus des paiements réussis',
    },
    {
      title: 'Paiements Échoués',
      value: failedPayments || 0,
      icon: <ExclamationTriangleIcon className="w-6 h-6" />,
      description: 'Nombre de paiements échoués',
    },
    {
      title: 'Paiements en Attente',
      value: pendingPayments || 0,
      icon: <ClockIcon className="w-6 h-6" />,
      description: 'Paiements en cours de traitement',
    },
    {
      title: 'Taux de Succès',
      value: successRate || 0,
      suffix: '%',
      icon: <ArrowPathIcon className="w-6 h-6" />,
      description: 'Pourcentage de paiements réussis',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <motion.div
          key={metric.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 overflow-hidden"
        >
          {/* Gradient Accent Border */}
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#f57c00]/0 via-[#f57c00]/20 to-[#f57c00]/0 rounded-2xl pointer-events-none" />

          {/* Content */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{metric.title}</p>
              <motion.p
                variants={valueVariants}
                className="text-2xl font-semibold text-gray-900 mt-0.5"
              >
                {metric.prefix || ''}
                <CountUp
                  end={metric.value}
                  duration={2.5}
                  separator=","
                  decimals={metric.title === 'Taux de Succès' ? 1 : 0}
                  formattingFn={(num) =>
                    metric.prefix === '€'
                      ? num.toLocaleString('fr-FR')
                      : num.toString()
                  }
                />
                {metric.suffix || ''}
              </motion.p>
              <p className="text-xs text-gray-600 mt-0.5">{metric.description}</p>
            </div>
            <motion.div
              variants={iconVariants}
              className="w-10 h-10 text-[#2b4a6a] flex items-center justify-center rounded-full bg-[#f57c00]/10"
            >
              {React.isValidElement(metric.icon)
                ? React.cloneElement(metric.icon as React.ReactElement<any>, { className: 'w-5 h-5' })
                : metric.icon}
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-[#f57c00]/5 opacity-0 rounded-2xl"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

interface PaymentsManagementProps {
  onBack: () => void;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    date: '2024-01-15',
    tenant: 'École Polytechnique',
    amount: 20,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'success',
    transactionId: 'TXN_001234',
    description: 'Abonnement Premium - Janvier 2024',
  },
  {
    id: '2',
    date: '2024-01-14',
    tenant: 'Université de Paris',
    amount: 100,
    currency: 'EUR',
    paymentMethod: 'Prélèvement SEPA',
    status: 'success',
    transactionId: 'TXN_001235',
    description: 'Abonnement Enterprise - Janvier 2024',
  },
  {
    id: '3',
    date: '2024-01-13',
    tenant: 'Lycée Saint-Louis',
    amount: 10,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'failed',
    transactionId: 'TXN_001236',
    description: 'Abonnement Basic - Janvier 2024',
  },
  {
    id: '4',
    date: '2024-01-12',
    tenant: 'Institut de Formation',
    amount: 5,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'pending',
    transactionId: 'TXN_001237',
    description: 'Abonnement Starter - Janvier 2024',
  },
  {
    id: '5',
    date: '2024-01-11',
    tenant: 'Académie des Sciences',
    amount: 20,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'refunded',
    transactionId: 'TXN_001238',
    description: 'Abonnement Premium - Janvier 2024',
  },
  {
    id: '6',
    date: '2024-01-10',
    tenant: 'Collège International',
    amount: 10,
    currency: 'EUR',
    paymentMethod: 'Prélèvement SEPA',
    status: 'success',
    transactionId: 'TXN_001239',
    description: 'Abonnement Basic - Janvier 2024',
  },
  {
    id: '7',
    date: '2024-01-09',
    tenant: 'École de Commerce',
    amount: 100,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'failed',
    transactionId: 'TXN_001240',
    description: 'Abonnement Enterprise - Janvier 2024',
  },
  {
    id: '8',
    date: '2024-01-08',
    tenant: 'Centre de Formation Pro',
    amount: 5,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'success',
    transactionId: 'TXN_001241',
    description: 'Abonnement Starter - Janvier 2024',
  },
  {
    id: '9',
    date: '2024-01-07',
    tenant: 'Lycée Technique',
    amount: 15,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'success',
    transactionId: 'TXN_001242',
    description: 'Abonnement Basic - Janvier 2024',
  },
  {
    id: '10',
    date: '2024-01-06',
    tenant: 'Institut Supérieur',
    amount: 50,
    currency: 'EUR',
    paymentMethod: 'Prélèvement SEPA',
    status: 'success',
    transactionId: 'TXN_001243',
    description: 'Abonnement Premium - Janvier 2024',
  },
  {
    id: '11',
    date: '2024-01-05',
    tenant: 'École Primaire',
    amount: 3,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'failed',
    transactionId: 'TXN_001244',
    description: 'Abonnement Starter - Janvier 2024',
  },
  {
    id: '12',
    date: '2024-01-04',
    tenant: 'Université Privée',
    amount: 200,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    status: 'success',
    transactionId: 'TXN_001245',
    description: 'Abonnement Enterprise - Janvier 2024',
  },
];

const mockFailedPayments: FailedPayment[] = [
  {
    id: 'failed-1',
    tenant: 'Lycée Saint-Louis',
    amount: 10,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    transactionId: 'TXN_001236',
    failureReason: 'Carte expirée',
    failedAt: '2024-01-13T10:30:00Z',
    retryCount: 2,
    status: 'pending_retry',
    nextRetryAt: '2024-01-20T10:30:00Z',
  },
  {
    id: 'failed-2',
    tenant: 'École de Commerce',
    amount: 100,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    transactionId: 'TXN_001240',
    failureReason: 'Fonds insuffisants',
    failedAt: '2024-01-09T14:15:00Z',
    retryCount: 3,
    status: 'max_retries',
  },
  {
    id: 'failed-3',
    tenant: 'École Primaire',
    amount: 3,
    currency: 'EUR',
    paymentMethod: 'Carte bancaire',
    transactionId: 'TXN_001244',
    failureReason: 'Carte bloquée',
    failedAt: '2024-01-05T09:45:00Z',
    retryCount: 1,
    status: 'pending_retry',
    nextRetryAt: '2024-01-12T09:45:00Z',
  },
];

const PaymentsManagement = ({ onBack }: PaymentsManagementProps) => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [failedPayments, setFailedPayments] = useState<FailedPayment[]>(mockFailedPayments);
  const [activeTab, setActiveTab] = useState<'transactions' | 'failed'>('transactions');

  const totalRevenue = payments.filter(p => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const failedPaymentsCount = payments.filter(p => p.status === 'failed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const successRate = payments.length > 0 ? Math.round(((payments.length - failedPaymentsCount) / payments.length) * 100) : 0;

  const handleViewDetails = (payment: Payment) => {
    console.log('Voir détails:', payment);
  };

  const handleRetryPayment = (paymentId: string) => {
    console.log('Relancer paiement:', paymentId);
  };

  const handleRefundPayment = (paymentId: string) => {
    console.log('Rembourser paiement:', paymentId);
  };

  const handleRetryFailedPayment = (paymentId: string) => {
    console.log('Relancer échec:', paymentId);
  };

  const handleSuspendTenant = (tenantId: string) => {
    console.log('Suspendre tenant:', tenantId);
  };

  const handleSendNotification = (tenantId: string, type: 'email' | 'sms' | 'in_app') => {
    console.log('Envoyer notification:', tenantId, type);
  };

  const handleRecoverPayment = (paymentId: string) => {
    console.log('Récupérer paiement:', paymentId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.6 }}
      className="pt-2 px-2 min-h-full bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
        className="mb-6 bg-transparent"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-[#f57c00] rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                Gestion des Paiements
              </h1>
              <p className="text-lg text-gray-600 mt-1 font-medium">
                Surveillez et gérez vos transactions
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <PaymentMetrics
        totalRevenue={totalRevenue}
        failedPayments={failedPaymentsCount}
        pendingPayments={pendingPayments}
        successRate={successRate}
      />

      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'transactions'
                ? 'bg-white text-[#f57c00] shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Transactions ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('failed')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === 'failed'
                ? 'bg-white text-[#f57c00] shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Échecs ({failedPayments.length})
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'transactions' && (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PaymentTable
              payments={payments}
              onViewDetails={handleViewDetails}
              onRetryPayment={handleRetryPayment}
              onRefundPayment={handleRefundPayment}
            />
          </motion.div>
        )}

        {activeTab === 'failed' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FailedPaymentsManager
              failedPayments={failedPayments}
              onRetryPayment={handleRetryFailedPayment}
              onSuspendTenant={handleSuspendTenant}
              onSendNotification={handleSendNotification}
              onRecoverPayment={handleRecoverPayment}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaymentsManagement;