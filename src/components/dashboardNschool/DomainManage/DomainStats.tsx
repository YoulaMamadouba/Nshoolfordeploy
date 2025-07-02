'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GlobeAltIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import CountUp from 'react-countup';

interface DomainStatsProps {
  stats?: {
    totalDomains: number;
    activeDomains: number;
    inactiveDomains: number;
    customDomains: number;
    subDomains: number;
  };
}

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

const DomainStats: React.FC<DomainStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 overflow-hidden"
      >
        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#f57c00]/0 via-[#f57c00]/20 to-[#f57c00]/0 rounded-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Domaines</p>
            <motion.p
              variants={valueVariants}
              className="text-2xl font-semibold text-gray-900 mt-0.5"
            >
              <CountUp end={stats?.totalDomains ?? 0} duration={2.5} separator="," />
            </motion.p>
            <p className="text-xs text-gray-600 mt-0.5">Domaines enregistrés</p>
          </div>
          <motion.div
            variants={iconVariants}
            className="w-10 h-10 text-[#2b4a6a] flex items-center justify-center rounded-full bg-[#f57c00]/10"
          >
            <GlobeAltIcon className="w-5 h-5" />
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 bg-[#f57c00]/5 opacity-0 rounded-2xl"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 overflow-hidden"
      >
        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#f57c00]/0 via-[#f57c00]/20 to-[#f57c00]/0 rounded-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Domaines Actifs</p>
            <motion.p
              variants={valueVariants}
              className="text-2xl font-semibold text-gray-900 mt-0.5"
            >
              <CountUp end={stats?.activeDomains ?? 0} duration={2.5} separator="," />
            </motion.p>
            <div className="mt-0.5">
              <p className="text-xs text-gray-600">
                {(stats?.activeDomains && stats?.totalDomains
                  ? (stats.activeDomains / stats.totalDomains) * 100
                  : 0
                ).toFixed(1)}% d'activité
              </p>
              <svg width="32" height="32" viewBox="0 0 32 32" className="mt-1">
                <circle cx="16" cy="16" r="12" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#f57c00"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${
                    (stats?.activeDomains && stats?.totalDomains
                      ? (stats.activeDomains / stats.totalDomains) * 75.4
                      : 0
                    )
                  } 75.4`}
                  strokeDashoffset="0"
                  transform="rotate(-90 16 16)"
                />
              </svg>
            </div>
          </div>
          <motion.div
            variants={iconVariants}
            className="w-10 h-10 text-[#2b4a6a] flex items-center justify-center rounded-full bg-[#f57c00]/10"
          >
            <CheckCircleIcon className="w-5 h-5" />
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 bg-[#f57c00]/5 opacity-0 rounded-2xl"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 overflow-hidden"
      >
        <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#f57c00]/0 via-[#f57c00]/20 to-[#f57c00]/0 rounded-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Personnalisés / Sous-domaines</p>
            <motion.p
              variants={valueVariants}
              className="text-2xl font-semibold text-gray-900 mt-0.5"
            >
              <CountUp end={stats?.customDomains ?? 0} duration={2.5} separator="," /> /{' '}
              <CountUp end={stats?.subDomains ?? 0} duration={2.5} separator="," />
            </motion.p>
            <p className="text-xs text-gray-600 mt-0.5">Domaines configurés</p>
          </div>
          <motion.div
            variants={iconVariants}
            className="w-10 h-10 text-[#2b4a6a] flex items-center justify-center rounded-full bg-[#f57c00]/10"
          >
            <GlobeAltIcon className="w-5 h-5" />
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 bg-[#f57c00]/5 opacity-0 rounded-2xl"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default DomainStats;