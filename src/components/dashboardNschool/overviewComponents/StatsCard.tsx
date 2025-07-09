import React from 'react';
import { motion, Variants } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '@/contexts/ThemeContext';

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

interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  prefix?: string;
  isActiveTenants?: boolean;
  monthlyGoal?: number;
  conversionRate?: number;
}

const StatsCard = ({ title, value, change, icon, prefix, isActiveTenants, monthlyGoal, conversionRate }: StatsCardProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`relative rounded-2xl p-4 shadow-sm border overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] border-[#f57c00]/20'
          : 'bg-white border-gray-100/50'
      }`}
    >
      {/* Gradient Accent Border */}
      <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#f57c00]/0 via-[#f57c00]/20 to-[#f57c00]/0 rounded-2xl pointer-events-none`} />
      
      {/* Content */}
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs font-bold uppercase tracking-wide ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {title}
          </p>
          <motion.p
            variants={valueVariants}
            className={`text-2xl font-semibold mt-0.5 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {prefix || ''}
            <CountUp
              end={value}
              duration={2.5}
              separator=","
              formattingFn={(num) => (prefix === '$' ? num.toLocaleString('en-US') : num.toString())}
            />
          </motion.p>
          {isActiveTenants ? (
            <div className="mt-0.5">
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {change}% d&apos;activité
              </p>
              <svg width="32" height="32" viewBox="0 0 32 32" className="mt-1">
                <circle 
                  cx="16" 
                  cy="16" 
                  r="12" 
                  stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} 
                  strokeWidth="4" 
                  fill="none" 
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#f57c00"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(change / 100) * 75.4} 75.4`}
                  strokeDashoffset="0"
                  transform="rotate(-90 16 16)"
                />
              </svg>
            </div>
          ) : monthlyGoal ? (
            <div className="mt-0.5">
              <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(1)}% vs mois dernier
              </p>
              <div className={`mt-1 w-full rounded-full h-1.5 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className="bg-[#f57c00] h-1.5 rounded-full"
                  style={{ width: `${Math.min((value / monthlyGoal) * 100, 100)}%` }}
                />
              </div>
              <p className={`text-[10px] mt-0.5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Objectif: ${monthlyGoal.toLocaleString('en-US')}
              </p>
            </div>
          ) : conversionRate ? (
            <div className="mt-0.5">
              <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(1)}% vs mois dernier
              </p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Taux de conversion: {conversionRate.toFixed(1)}%
              </p>
            </div>
          ) : (
            <p className={`text-xs mt-0.5 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '+' : ''}{change.toFixed(1)}% ce mois
            </p>
          )}
        </div>
        <motion.div
          variants={iconVariants}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            theme === 'dark' 
              ? 'text-orange-400 bg-orange-500/20' 
              : 'text-[#2b4a6a] bg-[#f57c00]/10'
          }`}
        >
          {React.cloneElement(icon, { className: 'w-5 h-5' })}
        </motion.div>
      </div>
      
      {/* Hover Glow Effect */}
      <motion.div
        className={`absolute inset-0 opacity-0 rounded-2xl ${
          theme === 'dark' ? 'bg-orange-500/10' : 'bg-[#f57c00]/5'
        }`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default StatsCard;