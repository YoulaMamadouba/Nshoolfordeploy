'use client';
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import DomainStats from '@/components/dashboardNschool/DomainManage/DomainStats';
import DomainList from '@/components/dashboardNschool/DomainManage/DomainList';
import DomainConfig from '@/components/dashboardNschool/DomainManage/DomainConfig';
import DiagnosticTools from '@/components/dashboardNschool/DomainManage/DiagnosticTools';
import { GlobeAltIcon, CogIcon, WrenchScrewdriverIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

interface Domain {
  id: number;
  name: string;
  tenant: string;
  type: string;
  status: string;
  ssl: string;
  createdAt: string;
}

const mockDomainData = {
  stats: {
    totalDomains: 10,
    activeDomains: 8,
    inactiveDomains: 2,
    customDomains: 6,
    subDomains: 4,
  },
  domains: [
    {
      id: 1,
      name: 'lycee-vhugo.nschool.fr',
      tenant: 'Lycée V.Hugo',
      type: 'Principal',
      status: 'Actif',
      ssl: 'Valide',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      name: 'www.lycee-vhugo.edu',
      tenant: 'Lycée V.Hugo',
      type: 'Secondaire',
      status: 'Actif',
      ssl: 'Valide',
      createdAt: '2024-01-10T14:20:00Z',
    },
  ] as Domain[],
};

const DomainManage = () => {
  const [data, setData] = useState<typeof mockDomainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'overview' | 'config' | 'diagnostic'>('overview');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData(mockDomainData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-[#f57c00] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const navigationItems = [
    {
      id: 'overview',
      name: 'Vue d\'ensemble',
      icon: ChartBarIcon,
      description: 'Statistiques et liste des domaines'
    },
    {
      id: 'config',
      name: 'Configuration',
      icon: CogIcon,
      description: 'Paramètres et configuration avancée'
    },
    {
      id: 'diagnostic',
      name: 'Outils Diagnostic',
      icon: WrenchScrewdriverIcon,
      description: 'Tests et diagnostics de domaines'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl shadow-lg">
              <GlobeAltIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                Gestion des Domaines
              </h1>
              <p className="text-lg text-gray-600 mt-1 font-medium">
                Gérez vos domaines et configurations DNS
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(item.id as any)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeSection === item.id
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-white text-[#2b4a6a] border border-[#2b4a6a]/20 hover:bg-[#2b4a6a]/5'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs opacity-80">{item.description}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="space-y-6"
          >
            <DomainStats stats={data?.stats} />
            <DomainList domains={data?.domains} />
          </motion.div>
        )}

        {activeSection === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <DomainConfig />
          </motion.div>
        )}

        {activeSection === 'diagnostic' && (
          <motion.div
            key="diagnostic"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <DiagnosticTools />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DomainManage;