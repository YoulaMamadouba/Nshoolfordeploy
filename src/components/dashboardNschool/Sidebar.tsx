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
} from '@heroicons/react/24/outline';

type CurrentView = 'overview' | 'tenants' | 'plans' | 'payments' | 'domains' | 'codePromo' | 'globalUsers';

interface SidebarProps {
  onNavigation: (view: CurrentView) => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const Sidebar = ({ onNavigation, onCollapseChange }: SidebarProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Notifier le parent du changement d'état
  React.useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, onClick: () => onNavigation('overview') },
    { name: 'Gestion Tenants', icon: BuildingOffice2Icon, onClick: () => onNavigation('tenants') },
    { name: 'Gestion Domaines', icon: GlobeAltIcon, onClick: () => onNavigation('domains') },
    { 
      name: 'Abonnements', 
      icon: CreditCardIcon, 
      hasSubmenu: true,
      subItems: [
        { name: 'Plans', onClick: () => onNavigation('plans') },
        { name: 'Paiement', onClick: () => onNavigation('payments') },
      ]
    },
    { name: 'Utilisateurs Globaux', icon: UserGroupIcon, onClick: () => onNavigation('globalUsers') },
    { name: 'Codes Promotionnels', icon: TicketIcon, onClick: () => onNavigation('codePromo') },
    { name: 'Monitoring', icon: ChartBarIcon, onClick: () => console.log('Monitoring clicked') },
    { name: 'Paramètres', icon: Cog6ToothIcon, onClick: () => console.log('Settings clicked') },
  ];

  const handleItemClick = (item: any) => {
    if (item.hasSubmenu) {
      setExpandedSection(expandedSection === item.name ? null : item.name);
    } else {
      item.onClick();
    }
  };

  return (
    <motion.aside
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed left-0 top-0 bg-[#2b4a6a] text-white h-screen z-30 backdrop-blur-sm bg-opacity-90 shadow-[0_0_15px_rgba(245,124,0,0.2)] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-center border-b border-[#f57c00]/20 relative">
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
            className="absolute right-2 top-2 w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f57c00]/80 to-[#2b4a6a]/80 shadow-lg border-2 border-white/30 hover:shadow-2xl transition-all duration-300 group"
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
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, index) => (
            <div key={item.name}>
              <motion.button
                onClick={() => handleItemClick(item)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="relative flex items-center justify-between p-2.5 rounded-md text-white hover:bg-[#f57c00]/10 group transition-all duration-300 w-full text-left"
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <item.icon className="h-6 w-6 text-[#f57c00]" />
                    <motion.div
                      animate={{ opacity: [0.2, 0.3, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-[#f57c00]/20 rounded-full blur-sm"
                    />
                  </motion.div>
                  <motion.span 
                    className="text-sm font-semibold text-white"
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
                    <ChevronRightIcon className="h-4 w-4 text-[#f57c00]" />
                  </motion.div>
                )}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
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
                      className="ml-8 mt-2 space-y-1"
                    >
                      {item.subItems?.map((subItem, subIndex) => (
                        <motion.button
                          key={subItem.name}
                          onClick={subItem.onClick}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.1 }}
                          className="relative flex items-center space-x-3 p-2 rounded-md text-white/70 hover:text-white hover:bg-[#f57c00]/5 group transition-all duration-300 w-full text-left"
                        >
                          <div className="w-2 h-2 bg-[#f57c00] rounded-full" />
                          <span className="text-sm font-medium">{subItem.name}</span>
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f57c00] opacity-0 group-hover:opacity-100"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#f57c00]/20">
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
              <div className="w-8 h-8 bg-[#f57c00]/30 rounded-md flex items-center justify-center">
                <span className="text-[#f57c00] text-sm font-bold">A</span>
              </div>
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#f57c00]/20 rounded-md blur-sm"
              />
            </motion.div>
            <motion.div 
              className="text-xs"
              animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-semibold text-white">Admin</p>
              <p className="text-[#f57c00]/60">admin@nschool.com</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;