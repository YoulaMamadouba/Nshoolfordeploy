'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { GlobeAltIcon, CogIcon, ShieldCheckIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15, duration: 0.5 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15, delay: i * 0.1 },
  }),
};

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    rotate: 15,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const buttonVariants: Variants = {
  hover: { scale: 1.1, backgroundColor: '#f57c00', color: 'white' },
  tap: { scale: 0.9 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 1.5, ease: 'easeInOut', repeat: Infinity },
  },
};

const DomainConfig: React.FC = () => {
  const { theme } = useTheme();
  const [dnsStatus, setDnsStatus] = useState('Vérifié');
  const [sslStatus, setSslStatus] = useState('Valide jusqu\'au 31/12/2025');
  const [redirects, setRedirects] = useState('301 Activée');
  const [cdnCache, setCdnCache] = useState('Activé');

  const getStatusBadge = (status: string) => {
    if (theme === 'dark') {
      if (status.includes('Vérifié') || status.includes('Valide') || status.includes('Activé')) {
        return { bg: 'bg-green-900/30', text: 'text-green-300' };
      }
      return { bg: 'bg-yellow-900/30', text: 'text-yellow-300' };
    } else {
      if (status.includes('Vérifié') || status.includes('Valide') || status.includes('Activé')) {
        return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      }
      return { bg: 'bg-yellow-100 bg-opacity-80', text: 'text-yellow-800' };
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`relative rounded-2xl p-6 shadow-sm border backdrop-blur-sm overflow-visible ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/80 border-[#f57c00]/30'
          : 'bg-gradient-to-br from-white/90 to-gray-50/80 border-[#f57c00]/30'
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        className={`text-xl font-bold text-center mb-6 tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
        }`}
        style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
      >
        Configuration des Domaines
      </motion.h2>
      <div className="relative mb-4">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#f57c00]/50 to-transparent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: CogIcon,
            title: 'Configuration DNS',
            status: dnsStatus,
            action: 'Vérifier maintenant',
            onClick: () => console.log('Vérification DNS'),
          },
          {
            icon: CogIcon,
            title: 'Certificat SSL',
            status: sslStatus,
            action: 'Renouveler',
            onClick: () => console.log('Renouvellement SSL'),
          },
          {
            icon: CogIcon,
            title: 'Redirections',
            status: redirects,
            action: 'Gérer',
            onClick: () => console.log('Gestion des redirections'),
          },
          {
            icon: CogIcon,
            title: 'Cache CDN',
            status: cdnCache,
            action: 'Configurer',
            onClick: () => console.log('Configuration CDN'),
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            className={`flex items-center p-4 rounded-xl border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800/50 border-[#f57c00]/20 hover:bg-[#f57c00]/10'
                : 'bg-white/50 border-[#f57c00]/20 hover:bg-[#f57c00]/5'
            }`}
          >
            <motion.div variants={iconVariants} whileHover="hover">
              <item.icon className="w-6 h-6 text-[#f57c00] mr-3" />
            </motion.div>
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-[#2b4a6a]'
              }`}>{item.title}</h3>
              <motion.span
                className={`inline-block px-3 py-1 mt-1 rounded-full text-sm font-medium ${getStatusBadge(item.status).bg} ${getStatusBadge(item.status).text}`}
              >
                {item.status}
              </motion.span>
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={item.action === 'Vérifier maintenant' ? 'pulse' : {}}
              onClick={item.onClick}
              className="px-4 py-2 text-sm font-medium text-[#f57c00] bg-[#f57c00]/10 border border-[#f57c00]/50 rounded-full hover:bg-[#f57c00] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 transition-all duration-300"
              aria-label={item.action}
            >
              {item.action}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DomainConfig;