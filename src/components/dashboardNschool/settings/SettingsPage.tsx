'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GeneralConfigSection from './GeneralConfigSection';
import EmailSettingsSection from './EmailSettingsSection';
import SecurityAndComplianceSection from './SecurityAndComplianceSection';
import { Cog6ToothIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

type SettingsView = 'general' | 'email' | 'security';

const SettingsPage: React.FC = () => {
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300
              ${currentView === tab.id ? 'bg-[#f57c00] text-white shadow-lg' : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'}`}>
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