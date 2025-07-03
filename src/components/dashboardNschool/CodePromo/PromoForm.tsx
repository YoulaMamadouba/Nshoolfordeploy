'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  SparklesIcon,
  CalendarIcon,
  UsersIcon,
  CurrencyEuroIcon,
  PercentBadgeIcon,
  CheckIcon,
  XMarkIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface PromoCode {
  id?: number;
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

interface PromoFormProps {
  promoCode?: PromoCode;
  onBack: () => void;
  onSave: (promoCode: PromoCode) => void;
  mode: 'create' | 'edit';
}

const PromoForm: React.FC<PromoFormProps> = ({ promoCode, onBack, onSave, mode }) => {
  const [formData, setFormData] = useState<PromoCode>({
    code: '',
    description: '',
    type: 'percentage',
    value: 0,
    startDate: '',
    endDate: '',
    maxUses: null,
    currentUses: 0,
    status: 'active',
    applicablePlans: [],
    conditions: '',
    revenueGenerated: 0,
    revenueLost: 0,
    conversionRate: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = [
    { id: 'Starter', name: 'Starter', price: '€19/mois' },
    { id: 'Basic', name: 'Basic', price: '€49/mois' },
    { id: 'Premium', name: 'Premium', price: '€99/mois' },
    { id: 'Enterprise', name: 'Enterprise', price: '€299/mois' },
  ];

  useEffect(() => {
    if (promoCode) {
      setFormData(promoCode);
    }
  }, [promoCode]);

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePlanToggle = (planId: string) => {
    setFormData(prev => ({
      ...prev,
      applicablePlans: prev.applicablePlans.includes(planId)
        ? prev.applicablePlans.filter(id => id !== planId)
        : [...prev.applicablePlans, planId]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Le code est requis';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Le code doit contenir au moins 3 caractères';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (formData.value <= 0) {
      newErrors.value = 'La valeur doit être supérieure à 0';
    }

    if (formData.type === 'percentage' && formData.value > 100) {
      newErrors.value = 'Le pourcentage ne peut pas dépasser 100%';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'La date de fin est requise';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'La date de fin doit être postérieure à la date de début';
    }

    if (formData.maxUses !== null && formData.maxUses <= 0) {
      newErrors.maxUses = 'Le nombre maximum d\'utilisations doit être supérieur à 0';
    }

    if (formData.applicablePlans.length === 0) {
      newErrors.applicablePlans = 'Sélectionnez au moins un plan applicable';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const finalData = {
        ...formData,
        id: formData.id || Date.now(),
        currentUses: formData.currentUses || 0,
        revenueGenerated: formData.revenueGenerated || 0,
        revenueLost: formData.revenueLost || 0,
        conversionRate: formData.conversionRate || 0,
      };
      
      onSave(finalData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f57c00' }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 bg-gradient-to-r from-[#2b4a6a] to-[#3a5a7a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {mode === 'create' ? 'Créer un Code Promotionnel' : 'Modifier le Code'}
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                {mode === 'create' ? 'Configurez votre nouvelle campagne marketing' : 'Modifiez les paramètres du code'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form Content */}
      <motion.form
        variants={cardVariants}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden backdrop-blur-sm"
      >
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne gauche */}
            <div className="space-y-6">
              {/* Code et Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2b4a6a] flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-[#f57c00]" />
                  Informations de base
                </h3>
                
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Code promotionnel *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                      className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm font-mono ${
                        errors.code ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Ex: WELCOME2024"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={generateCode}
                      className="px-4 py-3 bg-[#f57c00]/10 text-[#f57c00] rounded-xl border border-[#f57c00]/20 hover:bg-[#f57c00]/15 transition-all duration-300"
                    >
                      Générer
                    </motion.button>
                  </div>
                  {errors.code && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      {errors.code}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description interne *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Description détaillée du code promotionnel..."
                  />
                  {errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      {errors.description}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Type et Valeur */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2b4a6a] flex items-center gap-2">
                  <CreditCardIcon className="w-5 h-5 text-[#f57c00]" />
                  Réduction
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Type de réduction *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value as 'percentage' | 'fixed')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-[#2b4a6a]/5 backdrop-blur-sm"
                    >
                      <option value="percentage">Pourcentage (%)</option>
                      <option value="fixed">Montant fixe (€)</option>
                    </select>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Valeur *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.value}
                        onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                          errors.value ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder={formData.type === 'percentage' ? '20' : '50'}
                        min="0"
                        max={formData.type === 'percentage' ? '100' : undefined}
                        step={formData.type === 'percentage' ? '1' : '0.01'}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {formData.type === 'percentage' ? '%' : '€'}
                      </div>
                    </div>
                    {errors.value && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        {errors.value}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2b4a6a] flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#f57c00]" />
                  Période de validité
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Date de début *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                        errors.startDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.startDate && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        {errors.startDate}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Date de fin *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                        errors.endDate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.endDate && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        {errors.endDate}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-6">
              {/* Plans applicables */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2b4a6a] flex items-center gap-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-[#f57c00]" />
                  Plans applicables *
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handlePlanToggle(plan.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.applicablePlans.includes(plan.id)
                          ? 'border-[#f57c00] bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-[#f57c00]/50 hover:bg-orange-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                          <p className="text-sm text-gray-600">{plan.price}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.applicablePlans.includes(plan.id)
                            ? 'border-[#f57c00] bg-[#f57c00]'
                            : 'border-gray-300'
                        }`}>
                          {formData.applicablePlans.includes(plan.id) && (
                            <CheckIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {errors.applicablePlans && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    {errors.applicablePlans}
                  </motion.p>
                )}
              </div>

              {/* Limites d'utilisation */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2b4a6a] flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-[#f57c00]" />
                  Limites d'utilisation
                </h3>
                
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nombre maximum d'utilisations (optionnel)
                  </label>
                  <input
                    type="number"
                    value={formData.maxUses || ''}
                    onChange={(e) => handleInputChange('maxUses', e.target.value ? parseInt(e.target.value) : null)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                      errors.maxUses ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Illimité (laisser vide)"
                    min="1"
                  />
                  {errors.maxUses && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      {errors.maxUses}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Conditions d'utilisation */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#2b4a6a] flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-[#f57c00]" />
                  Conditions d'utilisation
                </h3>
                
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Conditions spéciales (optionnel)
                  </label>
                  <textarea
                    value={formData.conditions}
                    onChange={(e) => handleInputChange('conditions', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="Conditions spéciales, restrictions, notes internes..."
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Annuler
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 8px 25px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <CheckIcon className="w-5 h-5" />
                  {mode === 'create' ? 'Créer le Code' : 'Sauvegarder'}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default PromoForm; 