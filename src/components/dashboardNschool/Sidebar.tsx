'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  CreditCardIcon,
  UserGroupIcon,
  TicketIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

type CurrentView = 'overview' | 'tenants' | 'plans' | 'payments' | 'domains' | 'codePromo' | 'globalUsers' | 'monitoring' | 'settings';

interface SidebarProps {
  onNavigation: (view: CurrentView) => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
  currentView?: CurrentView;
}

const Sidebar = ({ onNavigation, onCollapseChange, currentView = 'overview' }: SidebarProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerItem, setDrawerItem] = useState<any>(null);
  const { theme } = useTheme();

  // Notifier le parent du changement d'état
  React.useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, onClick: () => onNavigation('overview'), view: 'overview' as CurrentView },
    { name: 'Gestion Tenants', icon: BuildingOffice2Icon, onClick: () => onNavigation('tenants'), view: 'tenants' as CurrentView },
    { name: 'Gestion Domaines', icon: GlobeAltIcon, onClick: () => onNavigation('domains'), view: 'domains' as CurrentView },
    { 
      name: 'Abonnements', 
      icon: CreditCardIcon, 
      hasSubmenu: true,
      subItems: [
        { name: 'Plans', onClick: () => onNavigation('plans'), view: 'plans' as CurrentView },
        { name: 'Paiement', onClick: () => onNavigation('payments'), view: 'payments' as CurrentView },
      ]
    },
    { name: 'Utilisateurs Globaux', icon: UserGroupIcon, onClick: () => onNavigation('globalUsers'), view: 'globalUsers' as CurrentView },
    { name: 'Codes Promotionnels', icon: TicketIcon, onClick: () => onNavigation('codePromo'), view: 'codePromo' as CurrentView },
    { name: 'Monitoring', icon: ChartBarIcon, onClick: () => onNavigation('monitoring'), view: 'monitoring' as CurrentView },
    { name: 'Paramètres', icon: Cog6ToothIcon, onClick: () => onNavigation('settings'), view: 'settings' as CurrentView },
  ];

  const handleItemClick = (item: any) => {
    if (item.hasSubmenu) {
      if (isCollapsed) {
        // Ouvrir le drawer pour les sous-menus
        setDrawerItem(item);
        setShowDrawer(true);
      } else {
        setExpandedSection(expandedSection === item.name ? null : item.name);
      }
    } else {
      item.onClick();
    }
  };

  const isItemActive = (item: any) => {
    if (item.view) {
      return currentView === item.view;
    }
    if (item.hasSubmenu && item.subItems) {
      return item.subItems.some((subItem: any) => subItem.view === currentView);
    }
    return false;
  };

  const isSubItemActive = (subItem: any) => {
    return currentView === subItem.view;
  };

  return (
    <motion.aside
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed left-0 top-0 text-white h-screen z-30 backdrop-blur-sm transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${
        theme === 'dark'
          ? 'bg-[#1a2332]/95 border-r border-[#f57c00]/30 shadow-[0_0_20px_rgba(245,124,0,0.3)]'
          : 'bg-[#2b4a6a] border-r border-[#f57c00]/10 shadow-[0_0_15px_rgba(245,124,0,0.2)]'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className={`p-4 flex items-center justify-center border-b relative ${
          theme === 'dark' ? 'border-[#f57c00]/40 bg-[#151f28]/50' : 'border-[#f57c00]/20'
        }`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`transition-all duration-300 ${isCollapsed ? 'scale-75' : ''}`}
          >
            <h2 className="text-xl font-bold tracking-tight">
              {isCollapsed ? (
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">N</span>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">N</span>
                  <span className="text-white"> School</span>
                </>
              )}
            </h2>
          </motion.div>
          {/* Bouton innovant de réduction */}
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`absolute right-2 top-2 w-9 h-9 flex items-center justify-center rounded-full shadow-lg border-2 transition-all duration-300 group ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#f57c00]/90 to-[#1a2332]/90 border-white/40 hover:shadow-2xl hover:shadow-orange-500/50'
                : 'bg-gradient-to-br from-[#f57c00]/80 to-[#2b4a6a]/80 border-white/30 hover:shadow-2xl hover:shadow-orange-500/20'
            }`}
            title={isCollapsed ? "Agrandir la sidebar" : "Réduire la sidebar"}
          >
            <span className="sr-only">Réduire la sidebar</span>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-180">
              <circle cx="11" cy="11" r="10" stroke="#fff" strokeWidth="2" fill="url(#sidebarBtnGradient)" />
              <path d={isCollapsed ? "M7 11h8 M11 7v8" : "M7 11h8"} stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="sidebarBtnGradient" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f57c00" />
                  <stop offset="1" stopColor="#2b4a6a" />
                </linearGradient>
              </defs>
            </svg>
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 p-4 space-y-2 ${
          theme === 'dark' ? 'bg-[#151f28]/30' : ''
        }`}>
          {navItems.map((item, index) => {
            const isActive = isItemActive(item);
            return (
              <div key={item.name}>
                <motion.button
                  onClick={() => handleItemClick(item)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  className={`relative flex items-center justify-between p-2.5 rounded-md text-white group transition-all duration-300 w-full text-left ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-gradient-to-r from-[#f57c00]/30 to-[#f57c00]/20 shadow-lg shadow-orange-500/30 border border-[#f57c00]/40'
                        : 'bg-gradient-to-r from-[#f57c00]/20 to-[#f57c00]/10 shadow-md border border-[#f57c00]/30'
                      : theme === 'dark' 
                        ? 'hover:bg-[#f57c00]/20 hover:shadow-lg hover:shadow-orange-500/30 bg-[#1a2332]/50' 
                        : 'hover:bg-[#f57c00]/10 hover:shadow-md'
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <item.icon className={`h-6 w-6 ${
                        isActive
                          ? 'text-white'
                          : theme === 'dark' ? 'text-orange-400' : 'text-[#f57c00]'
                      }`} />
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute inset-0 rounded-full blur-sm ${
                            theme === 'dark' ? 'bg-white/30' : 'bg-white/20'
                          }`}
                        />
                      )}
                      <motion.div
                        animate={{ opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`absolute inset-0 rounded-full blur-sm ${
                          theme === 'dark' ? 'bg-orange-400/30' : 'bg-[#f57c00]/20'
                        }`}
                      />
                    </motion.div>
                    <motion.span 
                      className={`text-sm font-semibold ${
                        isActive ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-white'
                      }`}
                      animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  </div>
                  {item.hasSubmenu && !isCollapsed && (
                    <motion.div
                      animate={{ rotate: expandedSection === item.name ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRightIcon className={`h-4 w-4 ${
                        isActive
                          ? 'text-white'
                          : theme === 'dark' ? 'text-orange-400' : 'text-[#f57c00]'
                      }`} />
                    </motion.div>
                  )}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isActive
                        ? 'opacity-100 bg-white'
                        : 'opacity-0 group-hover:opacity-100'
                    } ${
                      theme === 'dark' ? 'bg-white' : 'bg-white'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full ${
                        theme === 'dark' ? 'bg-white' : 'bg-white'
                      }`}
                    />
                  )}
                </motion.button>

                {/* Submenu */}
                {item.hasSubmenu && !isCollapsed && (
                  <AnimatePresence>
                    {expandedSection === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                        className={`ml-8 mt-2 space-y-1 ${
                          theme === 'dark' ? 'bg-[#151f28]/50' : ''
                        }`}
                      >
                        {item.subItems?.map((subItem, subIndex) => {
                          const isSubActive = isSubItemActive(subItem);
                          return (
                            <motion.button
                              key={subItem.name}
                              onClick={subItem.onClick}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.1 }}
                              className={`relative flex items-center space-x-3 p-2 rounded-md group transition-all duration-300 w-full text-left ${
                                isSubActive
                                  ? theme === 'dark'
                                    ? 'bg-gradient-to-r from-[#f57c00]/25 to-[#f57c00]/15 text-white shadow-md shadow-orange-500/20 border border-[#f57c00]/30'
                                    : 'bg-gradient-to-r from-[#f57c00]/15 to-[#f57c00]/10 text-white shadow-sm border border-[#f57c00]/25'
                                  : theme === 'dark' 
                                    ? 'text-white/80 hover:text-white hover:bg-[#f57c00]/15 hover:shadow-md hover:shadow-orange-500/20' 
                                    : 'text-white/70 hover:text-white hover:bg-[#f57c00]/5'
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full ${
                                isSubActive
                                  ? 'bg-white'
                                  : theme === 'dark' ? 'bg-orange-400' : 'bg-[#f57c00]'
                              }`} />
                              <span className="text-sm font-medium">{subItem.name}</span>
                              <motion.div
                                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                                  isSubActive
                                    ? 'opacity-100 bg-white'
                                    : 'opacity-0 group-hover:opacity-100'
                                } ${
                                  theme === 'dark' ? 'bg-white' : 'bg-[#f57c00]'
                                }`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isSubActive ? 1 : 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                              />
                              {isSubActive && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4 rounded-r-full ${
                                    theme === 'dark' ? 'bg-white' : 'bg-white'
                                  }`}
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-[#f57c00]/40 bg-[#151f28]/50' : 'border-[#f57c00]/20'
        }`}>
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                theme === 'dark' ? 'bg-orange-400/40' : 'bg-[#f57c00]/30'
              }`}>
                <span className={`text-sm font-bold ${
                  theme === 'dark' ? 'text-orange-400' : 'text-[#f57c00]'
                }`}>A</span>
              </div>
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 rounded-md blur-sm ${
                  theme === 'dark' ? 'bg-orange-400/30' : 'bg-[#f57c00]/20'
                }`}
              />
            </motion.div>
            <motion.div 
              className="text-xs"
              animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-semibold text-white">Admin</p>
              <p className={`${
                theme === 'dark' ? 'text-orange-400/70' : 'text-[#f57c00]/60'
              }`}>admin@nschool.com</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mini drawer pour les sous-menus en mode réduit */}
      <AnimatePresence>
        {showDrawer && drawerItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setShowDrawer(false)}
          >
            <motion.div
              initial={{ x: -100, y: 0, scale: 0.8 }}
              animate={{ x: 0, y: 0, scale: 1 }}
              exit={{ x: -100, y: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`absolute left-16 top-1/2 transform -translate-y-1/2 w-48 shadow-2xl rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-[#f57c00]/30'
                  : 'bg-gradient-to-br from-[#2b4a6a] to-[#1a2332] border-[#f57c00]/20'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sous-menus compacts */}
              <div className="p-3">
                <div className="space-y-1">
                  {drawerItem.subItems?.map((subItem: any, index: number) => {
                    const isSubActive = isSubItemActive(subItem);
                    return (
                      <motion.button
                        key={subItem.name}
                        onClick={() => {
                          subItem.onClick();
                          setShowDrawer(false);
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative flex items-center gap-2 p-2 rounded-lg group transition-all duration-300 w-full text-left ${
                          isSubActive
                            ? 'bg-gradient-to-r from-[#f57c00]/25 to-[#f57c00]/15 text-white shadow-md shadow-orange-500/20 border border-[#f57c00]/30'
                            : 'text-white/80 hover:text-white hover:bg-[#f57c00]/15 hover:shadow-md hover:shadow-orange-500/20'
                        }`}
                        title={subItem.name}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          isSubActive ? 'bg-white' : 'bg-[#f57c00]'
                        }`} />
                        <span className="text-xs font-medium truncate">{subItem.name}</span>
                        {isSubActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-3 rounded-r-full bg-white"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Sidebar;