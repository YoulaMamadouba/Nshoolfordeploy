import React from 'react';
import { motion, Variants } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '@/contexts/ThemeContext';
import { CurrencyDollarIcon, ChartBarIcon, UsersIcon, StarIcon } from '@heroicons/react/24/outline';

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

interface SubscriptionMetricsProps {
  mrr: number;
  arr: number;
  retentionRate: number;
  clv: number;
}

const SubscriptionMetrics = ({ mrr, arr, retentionRate, clv }: SubscriptionMetricsProps) => {
  const { theme } = useTheme();
  const metrics = [
    {
      title: 'MRR',
      value: mrr,
      prefix: '€',
      icon: <CurrencyDollarIcon />,
      description: 'Revenu mensuel récurrent',
    },
    {
      title: 'ARR',
      value: arr,
      prefix: '€',
      icon: <ChartBarIcon />,
      description: 'Revenu annuel récurrent',
    },
    {
      title: 'Taux de rétention',
      value: retentionRate,
      suffix: '%',
      icon: <UsersIcon />,
      description: 'Taux de rétention des clients',
    },
    {
      title: 'CLV',
      value: clv,
      prefix: '€',
      icon: <StarIcon />,
      description: 'Valeur vie client',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  decimals={metric.title === 'Taux de rétention' ? 1 : 0}
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
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                theme === 'dark'
                  ? 'text-gray-300 bg-gray-700'
                  : 'text-gray-600 bg-gray-100'
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

export default SubscriptionMetrics; 