'use client';
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import DomainStats from '@/components/dashboardNschool/DomainManage/DomainStats';
import DomainList from '@/components/dashboardNschool/DomainManage/DomainList';
import DomainConfig from '@/components/dashboardNschool/DomainManage/DomainConfig';
import DiagnosticTools from '@/components/dashboardNschool/DomainManage/DiagnosticTools';

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
    },
    {
      id: 2,
      name: 'www.lycee-vhugo.edu',
      tenant: 'Lycée V.Hugo',
      type: 'Secondaire',
      status: 'Actif',
      ssl: 'Valide',
    },
  ],
};

const DomainManage = () => {
  const [data, setData] = useState<typeof mockDomainData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData(mockDomainData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-6 px-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-full"
    >
      <h1 className="text-2xl font-bold text-[#2b4a6a] mb-6">Gestion des Domaines</h1>
      <DomainStats stats={data?.stats} />
      <DomainList domains={data?.domains} />
      <DomainConfig />
      <DiagnosticTools />
    </motion.div>
  );
};

export default DomainManage;