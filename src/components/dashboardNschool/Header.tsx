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
  MoonIcon
} from '@heroicons/react/24/outline';

const DashboardHeader = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notifications = [
    { id: 1, title: "Nouveau tenant ajouté", time: "Il y a 5 min", type: "success" },
    { id: 2, title: "Rapport mensuel disponible", time: "Il y a 1h", type: "info" },
    { id: 3, title: "Maintenance prévue", time: "Il y a 2h", type: "warning" }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Note: Actual dark mode implementation requires additional logic (e.g., toggling a class on the root element).
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40 ml-64"
    >
      <div className="px-4 py-2.5">
        <div className="flex items-center justify-between">
          {/* Section Gauche - Titre et Breadcrumb */}
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Dashboard Admin
              </h1>
              <p className="text-xs text-gray-500">Gestion N School</p>
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
                    "0 1px 4px rgba(0, 0, 0, 0.05)"
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white transition-all duration-300"
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
            {/* Mode Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="splitColor" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stop-color="#FFFFFF" />
                    <stop offset="50%" stop-color="#2B4A6A" />
                  </linearGradient>
                </defs>
                {isDarkMode ? (
                  <SunIcon className="h-6 w-6" style={{ fill: 'url(#splitColor)' }} />
                ) : (
                  <MoonIcon className="h-6 w-6" style={{ fill: 'url(#splitColor)' }} />
                )}
              </svg>
            </motion.button>

            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-full transition-all duration-200"
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
                className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <BellIcon className="h-6 w-6" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold"
                >
                  3
                </motion.span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-300 rounded-full opacity-20 blur-sm"
                />
              </motion.button>
              <AnimatePresence>
                {notificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-md border border-gray-200 z-50"
                  >
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-56 overflow-auto">
                      {notifications.map((notif, index) => (
                        <motion.div 
                          key={notif.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 cursor-pointer"
                        >
                          <div className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                              notif.type === 'success' ? 'bg-green-500' :
                              notif.type === 'warning' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`} />
                            <div>
                              <p className="text-sm text-gray-900 font-medium">{notif.title}</p>
                              <p className="text-xs text-gray-500">{notif.time}</p>
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
                className="relative p-2 flex items-center space-x-1 hover:bg-gray-100 text-gray-600 hover:text-orange-600 rounded-full transition-all duration-200"
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
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                </div>
                <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
              </motion.button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md border border-gray-200 z-50"
                  >
                    <div className="py-1.5">
                      <button className="flex items-center space-x-2 w-full px-3 py-1.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                        <Cog6ToothIcon className="h-4 w-4" />
                        <span>Paramètres</span>
                      </button>
                      <hr className="my-0.5 border-gray-100" />
                      <button className="flex items-center space-x-2 w-full px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
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
      </div>
    </motion.header>
  );
};

export default DashboardHeader;