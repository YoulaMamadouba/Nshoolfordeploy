import React from 'react';
import { motion, Variants } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '@/contexts/ThemeContext';
import { CurrencyDollarIcon, ExclamationTriangleIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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

interface PaymentMetricsProps {
  totalRevenue: number;
  failedPayments: number;
  pendingPayments: number;
  refundedPayments: number;
  successRate: number;
}

const PaymentMetrics = ({ totalRevenue, failedPayments, pendingPayments, refundedPayments, successRate }: PaymentMetricsProps) => {
  const { theme } = useTheme();
  const metrics = [
    {
      title: 'Revenus Totaux',
      value: totalRevenue,
      prefix: '€',
      icon: <CurrencyDollarIcon />,
      description: 'Revenus générés ce mois',
    },
    {
      title: 'Paiements Échoués',
      value: failedPayments,
      icon: <ExclamationTriangleIcon />,
      description: 'Paiements en échec',
    },
    {
      title: 'Paiements En Attente',
      value: pendingPayments,
      icon: <ClockIcon />,
      description: 'Paiements en cours',
    },
    {
      title: 'Taux de Succès',
      value: successRate,
      suffix: '%',
      icon: <CheckCircleIcon />,
      description: 'Taux de réussite',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-transparent">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={`relative backdrop-blur-sm rounded-2xl p-4 shadow-sm border overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800/90 border-gray-700/50'
              : 'bg-white/90 border-gray-100/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-xs font-bold uppercase tracking-wide ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>{metric.title}</p>
              <motion.p
                variants={valueVariants}
                className={`text-2xl font-semibold mt-0.5 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
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
              <p className={`text-xs mt-0.5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>{metric.description}</p>
            </div>
            <motion.div
              variants={iconVariants}
              className={`w-10 h-10 text-orange-500 flex items-center justify-center rounded-full ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}
            >
              {React.cloneElement(metric.icon, { className: 'w-5 h-5' })}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PaymentMetrics;