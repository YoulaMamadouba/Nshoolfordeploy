'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PromoListView from './PromoListView';
import PromoForm from './PromoForm';
import { useTheme } from '@/contexts/ThemeContext';

interface PromoCode {
  id: number;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  maxUses: number | null;
  currentUses: number;
  status: 'active' | 'paused' | 'expired';
  applicablePlans: string[];
  conditions: string;
  revenueGenerated: number;
  revenueLost: number;
  conversionRate: number;
}

type View = 'list' | 'create' | 'edit';

const CodePromo = () => {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCode | null>(null);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: 1,
      code: 'WELCOME2024',
      description: 'Code de bienvenue pour nouveaux clients',
      type: 'percentage',
      value: 20,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      maxUses: 100,
      currentUses: 45,
      status: 'active',
      applicablePlans: ['Starter', 'Basic', 'Premium'],
      conditions: 'Nouveaux clients uniquement',
      revenueGenerated: 12500,
      revenueLost: 3200,
      conversionRate: 15.7,
    },
    {
      id: 2,
      code: 'SUMMER50',
      description: 'Promotion été - 50€ de réduction',
      type: 'fixed',
      value: 50,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      maxUses: 200,
      currentUses: 89,
      status: 'active',
      applicablePlans: ['Premium', 'Enterprise'],
      conditions: 'Minimum 6 mois d\'engagement',
      revenueGenerated: 8900,
      revenueLost: 4450,
      conversionRate: 12.3,
    },
    {
      id: 3,
      code: 'LOYALTY25',
      description: 'Réduction fidélité clients existants',
      type: 'percentage',
      value: 25,
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      maxUses: 50,
      currentUses: 50,
      status: 'expired',
      applicablePlans: ['Basic', 'Premium', 'Enterprise'],
      conditions: 'Clients avec plus de 6 mois d\'ancienneté',
      revenueGenerated: 7500,
      revenueLost: 1875,
      conversionRate: 18.9,
    },
    {
      id: 4,
      code: 'STARTUP30',
      description: 'Offre spéciale startups',
      type: 'percentage',
      value: 30,
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      maxUses: 75,
      currentUses: 32,
      status: 'paused',
      applicablePlans: ['Enterprise'],
      conditions: 'Startups de moins de 2 ans',
      revenueGenerated: 9600,
      revenueLost: 2880,
      conversionRate: 8.5,
    },
  ]);

  const handleViewChange = (view: View, promoCode?: PromoCode) => {
    setCurrentView(view);
    if (promoCode) {
      setSelectedPromoCode(promoCode);
    }
  };

  const handleAddPromo = () => {
    setSelectedPromoCode(null);
    setCurrentView('create');
  };

  const handleEditPromo = (id: number) => {
    const promoCode = promoCodes.find(p => p.id === id);
    if (promoCode) {
      setSelectedPromoCode(promoCode);
      setCurrentView('edit');
    }
  };

  const handleSavePromo = (promoCode: PromoCode) => {
    if (currentView === 'create') {
      setPromoCodes(prev => [promoCode, ...prev]);
    } else if (currentView === 'edit') {
      setPromoCodes(prev => prev.map(p => p.id === promoCode.id ? promoCode : p));
    }
    setCurrentView('list');
    setSelectedPromoCode(null);
  };

  const handleToggleStatus = (id: number) => {
    setPromoCodes(prev => prev.map(promo => {
      if (promo.id === id) {
        const newStatus = promo.status === 'active' ? 'paused' : 'active';
        return { ...promo, status: newStatus };
      }
      return promo;
    }));
  };

  const handleDeletePromo = (id: number) => {
    setPromoCodes(prev => prev.filter(p => p.id !== id));
  };

  const handleViewStats = (promoCode: PromoCode) => {
    console.log('Voir statistiques pour:', promoCode.code);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.6 }}
      className={`pt-2 px-2 min-h-full ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <AnimatePresence mode="wait">
        {currentView === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <PromoListView
              promoCodes={promoCodes}
              onViewStats={handleViewStats}
              onEditPromo={handleEditPromo}
              onToggleStatus={handleToggleStatus}
              onDeletePromo={handleDeletePromo}
              onAddPromo={handleAddPromo}
            />
          </motion.div>
        )}

        {(currentView === 'create' || currentView === 'edit') && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <PromoForm
              promoCode={selectedPromoCode as any}
              onBack={() => handleViewChange('list')}
              onSave={handleSavePromo as any}
              mode={currentView}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CodePromo; 