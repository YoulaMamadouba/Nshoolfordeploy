'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GeneralConfigSection from './GeneralConfigSection';
import EmailSettingsSection from './EmailSettingsSection';
import SecurityAndComplianceSection from './SecurityAndComplianceSection';
import { Cog6ToothIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

type SettingsView = 'general' | 'email' | 'security';

const SettingsPage: React.FC = () => {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<SettingsView>('general');

  const tabs = [
    { id: 'general', label: 'Général', icon: Cog6ToothIcon },
    { id: 'email', label: 'Emails', icon: EnvelopeIcon },
    { id: 'security', label: 'Sécurité & RGPD', icon: ShieldCheckIcon },
  ];

  return (
    <motion.div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentView(tab.id as SettingsView)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              currentView === tab.id 
                ? 'bg-[#f57c00] text-white shadow-lg' 
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-200 border border-gray-600/20 hover:bg-gray-600/20'
                  : 'bg-white text-[#2b4a6a] border border-[#2b4a6a]/20 hover:bg-[#2b4a6a]/5'
            }`}>
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {currentView === 'general' && <GeneralConfigSection />}
        {currentView === 'email' && <EmailSettingsSection />}
        {currentView === 'security' && <SecurityAndComplianceSection />}
      </AnimatePresence>
    </motion.div>
  );
};

export default SettingsPage; 