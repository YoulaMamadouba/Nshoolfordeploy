import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const buttonVariants: Variants = {
  hidden: { rotate: -10, scale: 0.9, opacity: 0 },
  visible: (i: number) => ({
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      delay: i * 0.1,
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: '0 6px 20px rgba(43, 74, 106, 0.2)',
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.3, repeat: 1 },
  },
};

const cardVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
};

const QuickActions = () => {
  const buttons = [
    {
      text: 'Ajouter Tenant',
      icon: <PlusIcon className="h-4 w-4" />,
    },
    {
      text: 'Ajouter Étudiant',
      icon: <PlusIcon className="h-4 w-4" />,
    },
    {
      text: 'Générer Rapport',
      icon: <DocumentTextIcon className="h-4 w-4" />,
    },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white/90 backdrop-blur-sm border border-[#2b4a6a]/20 rounded-2xl p-4 shadow-lg max-h-80 overflow-hidden"
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="text-2xl font-semibold text-gray-900 text-center mb-4 drop-shadow-md"
      >
        Actions Rapides
      </motion.h3>
      <div className="space-y-2">
        {buttons.map((btn, i) => (
          <motion.button
            key={btn.text}
            custom={i}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="relative w-full flex items-center justify-center space-x-2 p-3 bg-white/30 backdrop-blur-sm text-white rounded-lg overflow-hidden border border-[#2b4a6a]"
            style={{ backgroundColor: 'rgba(43, 74, 106, 0.8)' }}
          >
            {/* Wavy Ripple Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#2b4a6a]/30 to-[#2b4a6a]/10"
              initial={{ scale: 0, opacity: 0, translateX: '-50%' }}
              whileHover={{
                scale: [0, 1.5, 1],
                opacity: [0, 0.5, 0],
                translateX: ['-50%', '50%', '50%'],
              }}
              transition={{ duration: 0.6, times: [0, 0.5, 1] }}
            />
            <motion.div variants={iconVariants}>{btn.icon}</motion.div>
            <span className="relative z-10 text-sm font-medium">{btn.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;