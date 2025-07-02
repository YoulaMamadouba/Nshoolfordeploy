'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BeakerIcon, ClockIcon, GlobeAltIcon, ChartBarIcon } from '@heroicons/react/24/outline';

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
};

const DiagnosticTools: React.FC = () => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-gradient-to-br from-white/90 to-gray-50/80 rounded-2xl p-6 shadow-sm border border-[#f57c00]/30 backdrop-blur-sm overflow-visible"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        className="text-xl font-bold text-[#2b4a6a] text-center mb-6 tracking-tight"
        style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
      >
        Outils de Diagnostic
      </motion.h2>
      <div className="relative mb-4">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#f57c00]/50 to-transparent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: BeakerIcon,
            title: 'Test de Connectivité',
            description: 'Domaine → Serveur',
            action: 'Lancer le test',
            onClick: () => console.log('Test de connectivité'),
          },
          {
            icon: ClockIcon,
            title: 'Vérification SSL',
            description: 'Date d\'expiration',
            action: 'Vérifier',
            onClick: () => console.log('Vérification SSL'),
          },
          {
            icon: GlobeAltIcon,
            title: 'Analyse DNS',
            description: 'Recommandations',
            action: 'Analyser',
            onClick: () => console.log('Analyse DNS'),
          },
          {
            icon: ChartBarIcon,
            title: 'Test de Performance',
            description: 'Temps de réponse',
            action: 'Tester',
            onClick: () => console.log('Test de performance'),
          },
        ].map((tool, index) => (
          <motion.div
            key={tool.title}
            variants={itemVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            className="flex items-center p-4 bg-white/50 rounded-xl border border-[#f57c00]/20 hover:bg-[#f57c00]/5 transition-all duration-300"
          >
            <motion.div variants={iconVariants} whileHover="hover">
              <tool.icon className="w-6 h-6 text-[#f57c00] mr-3" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-[#2b4a6a]">{tool.title}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={tool.onClick}
              className="px-4 py-2 text-sm font-medium text-[#f57c00] bg-[#f57c00]/10 border border-[#f57c00]/50 rounded-full hover:bg-[#f57c00] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 transition-all duration-300"
              aria-label={tool.action}
            >
              {tool.action}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DiagnosticTools;