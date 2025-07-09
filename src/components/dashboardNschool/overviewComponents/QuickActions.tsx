import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  Cog6ToothIcon, 
  DocumentTextIcon, 
  UserPlusIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

const QuickActions = () => {
  const { theme } = useTheme();

  const actions = [
    {
      id: 1,
      title: 'Ajouter Tenant',
      description: 'Créer un nouveau tenant',
      icon: <PlusIcon className="w-6 h-6" />,
      color: theme === 'dark' ? 'from-orange-500 to-amber-500' : 'from-[#f57c00] to-amber-500',
      bgColor: theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50',
      borderColor: theme === 'dark' ? 'border-orange-500/30' : 'border-orange-200',
    },
    {
      id: 2,
      title: 'Gérer Paramètres',
      description: 'Configurer le système',
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      color: theme === 'dark' ? 'from-blue-500 to-cyan-500' : 'from-blue-500 to-cyan-500',
      bgColor: theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-50',
      borderColor: theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200',
    },
    {
      id: 3,
      title: 'Générer Rapport',
      description: 'Créer un rapport',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      color: theme === 'dark' ? 'from-green-500 to-emerald-500' : 'from-green-500 to-emerald-500',
      bgColor: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-50',
      borderColor: theme === 'dark' ? 'border-green-500/30' : 'border-green-200',
    },
    {
      id: 4,
      title: 'Ajouter Utilisateur',
      description: 'Inviter un utilisateur',
      icon: <UserPlusIcon className="w-6 h-6" />,
      color: theme === 'dark' ? 'from-purple-500 to-pink-500' : 'from-purple-500 to-pink-500',
      bgColor: theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50',
      borderColor: theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200',
    },
    {
      id: 5,
      title: 'Voir Statistiques',
      description: 'Analyser les données',
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: theme === 'dark' ? 'from-indigo-500 to-blue-500' : 'from-indigo-500 to-blue-500',
      bgColor: theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-50',
      borderColor: theme === 'dark' ? 'border-indigo-500/30' : 'border-indigo-200',
    },
    {
      id: 6,
      title: 'Notifications',
      description: 'Gérer les alertes',
      icon: <BellIcon className="w-6 h-6" />,
      color: theme === 'dark' ? 'from-red-500 to-pink-500' : 'from-red-500 to-pink-500',
      bgColor: theme === 'dark' ? 'bg-red-500/20' : 'bg-red-50',
      borderColor: theme === 'dark' ? 'border-red-500/30' : 'border-red-200',
    },
  ];

  return (
    <div className={`rounded-xl p-6 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] border border-[#f57c00]/20' 
        : 'bg-white border border-gray-200'
    } shadow-lg`}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        Actions Rapides
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: theme === 'dark' 
                ? '0 10px 30px rgba(245, 124, 0, 0.2)' 
                : '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              action.bgColor
            } ${action.borderColor} hover:border-opacity-50`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} text-white`}>
                {action.icon}
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {action.title}
                </h3>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {action.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;