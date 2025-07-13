'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon, 
  UserCircleIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface DashboardHeaderProps {
  isSidebarCollapsed?: boolean;
}

const DashboardHeader = ({ isSidebarCollapsed = false }: DashboardHeaderProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const notifications = [
    { id: 1, title: "Nouveau tenant ajouté", time: "Il y a 5 min", type: "success" },
    { id: 2, title: "Rapport mensuel disponible", time: "Il y a 1h", type: "info" },
    { id: 3, title: "Maintenance prévue", time: "Il y a 2h", type: "warning" }
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 z-40 backdrop-blur-sm border-b transition-all duration-300 ${
        isSidebarCollapsed ? 'left-16' : 'left-64'
      } ${
        theme === 'dark' 
          ? 'bg-[#151f28]/95 border-[#f57c00]/20' 
          : 'bg-white/95 border-orange-100'
      }`}
      style={{ height: '64px' }}
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* Section Gauche - Titre et Breadcrumb */}
        <div className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className={`text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent`}>
              Dashboard Admin
            </h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Gestion N School
            </p>
          </motion.div>
        </div>

        {/* Section Centre - Barre de recherche */}
        <motion.div 
          className="flex-1 max-w-md mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: searchFocused ? 
                  "0 0 0 1.5px rgba(251, 146, 60, 0.3), 0 3px 12px rgba(251, 146, 60, 0.2)" : 
                  theme === 'dark' ? "0 1px 4px rgba(0, 0, 0, 0.3)" : "0 1px 4px rgba(0, 0, 0, 0.05)"
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <MagnifyingGlassIcon className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Rechercher..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#1e2a35] border-[#f57c00]/30 text-white placeholder-gray-400 focus:bg-[#2a3744]'
                    : 'bg-gray-50 border border-gray-200 text-black focus:bg-white'
                }`}
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: searchFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Section Droite - Actions et Profil */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Premium Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`relative p-3 rounded-2xl transition-all duration-500 overflow-hidden ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] shadow-lg shadow-orange-500/20'
                : 'bg-gradient-to-br from-white to-gray-50 shadow-lg shadow-orange-500/10'
            } border-2 ${
              theme === 'dark'
                ? 'border-orange-500/30 hover:border-orange-400/50'
                : 'border-orange-200 hover:border-orange-300'
            }`}
          >
            {/* Background Gradient Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-amber-500/20 to-orange-400/20"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(251, 146, 60, 0.2) 0%, rgba(245, 158, 11, 0.2) 50%, rgba(251, 146, 60, 0.2) 100%)",
                  "linear-gradient(45deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 146, 60, 0.2) 50%, rgba(245, 158, 11, 0.2) 100%)",
                  "linear-gradient(45deg, rgba(251, 146, 60, 0.2) 0%, rgba(245, 158, 11, 0.2) 50%, rgba(251, 146, 60, 0.2) 100%)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Icon Container */}
            <div className="relative z-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 180, scale: 0, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20,
                      duration: 0.5 
                    }}
                    className="relative"
                  >
                    <MoonIcon className="h-6 w-6 text-orange-400" />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-orange-400 rounded-full blur-md opacity-50"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Sparkle Effects */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-300 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 20}%`
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 180, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -180, scale: 0, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20,
                      duration: 0.5 
                    }}
                    className="relative"
                  >
                    <SunIcon className="h-6 w-6 text-orange-500" />
                    
                    {/* Sun Rays Effect */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-0.5 h-3 bg-gradient-to-b from-orange-400 to-transparent"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-8px)`
                          }}
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scaleY: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-orange-400/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>

          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-2 rounded-full transition-all duration-200 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-orange-400 hover:bg-[#1e2a35]'
                : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
            }`}
          >
            <Cog6ToothIcon className="h-6 w-6" />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-orange-400 rounded-full opacity-20 blur-sm"
            />
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationOpen(!notificationOpen)}
              className={`relative p-2 rounded-full transition-all duration-200 bg-gradient-to-r from-orange-400/20 to-amber-500/20 ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-orange-400 hover:bg-[#1e2a35]'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <BellIcon className="h-6 w-6" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400/90 to-amber-500/90 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold"
              >
                3
              </motion.span>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full opacity-20 blur-sm"
              />
            </motion.button>
            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-64 rounded-lg shadow-md z-50 ${
                    theme === 'dark'
                      ? 'bg-[#1e2a35] border border-[#f57c00]/20'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Header avec bouton de fermeture */}
                  <div className={`p-3 border-b flex items-center justify-between ${
                    theme === 'dark' ? 'border-[#f57c00]/20' : 'border-gray-200'
                  }`}>
                    <h3 className={`font-semibold text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Notifications</h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setNotificationOpen(false)}
                      className={`p-1 rounded-full transition-all duration-200 ${
                        theme === 'dark'
                          ? 'text-gray-400 hover:text-orange-400 hover:bg-[#2a3744]'
                          : 'text-gray-500 hover:text-orange-600 hover:bg-gray-100'
                      }`}
                      title="Fermer les notifications"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                  <div className="max-h-56 overflow-auto">
                    {notifications.map((notif, index) => (
                      <motion.div 
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-3 hover:border-b cursor-pointer ${
                          theme === 'dark'
                            ? 'hover:bg-[#2a3744] border-[#f57c00]/10'
                            : 'hover:bg-gray-50 border-gray-50'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                            notif.type === 'success' ? 'bg-green-500' :
                            notif.type === 'warning' ? 'bg-yellow-500' :
                            'bg-orange-400'
                          }`} />
                          <div>
                            <p className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{notif.title}</p>
                            <p className={`text-xs ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>{notif.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`relative p-2 flex items-center space-x-1 rounded-full transition-all duration-200 ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-orange-400 hover:bg-[#1e2a35]'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
              }`}
            >
              <div className="relative">
                <UserCircleIcon className="h-6 w-6 text-orange-500 group-hover:text-orange-600 transition-all duration-200" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-orange-400 rounded-full opacity-20 blur-sm"
                />
              </div>
              <div className="text-left hidden md:block">
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Admin</p>
              </div>
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              } ${userMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
            </motion.button>
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-44 rounded-lg shadow-md z-50 ${
                    theme === 'dark'
                      ? 'bg-[#1e2a35] border border-[#f57c00]/20'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Header avec bouton de fermeture */}
                  <div className={`p-2 border-b flex items-center justify-between ${
                    theme === 'dark' ? 'border-[#f57c00]/20' : 'border-gray-200'
                  }`}>
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Menu utilisateur</span>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setUserMenuOpen(false)}
                      className={`p-1 rounded-full transition-all duration-200 ${
                        theme === 'dark'
                          ? 'text-gray-400 hover:text-orange-400 hover:bg-[#2a3744]'
                          : 'text-gray-500 hover:text-orange-600 hover:bg-gray-100'
                      }`}
                      title="Fermer le menu"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </motion.button>
                  </div>
                  <div className="py-1.5">
                    <button className={`flex items-center space-x-2 w-full px-3 py-1.5 text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-[#2a3744] hover:text-orange-400'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}>
                      <Cog6ToothIcon className="h-4 w-4" />
                      <span>Paramètres</span>
                    </button>
                    <hr className={`my-0.5 ${
                      theme === 'dark' ? 'border-[#f57c00]/20' : 'border-gray-100'
                    }`} />
                    <button className={`flex items-center space-x-2 w-full px-3 py-1.5 text-sm transition-colors ${
                      theme === 'dark'
                        ? 'text-red-400 hover:bg-red-900/20'
                        : 'text-red-600 hover:bg-red-50'
                    }`}>
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;