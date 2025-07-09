'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowLeftIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  CreditCardIcon,
  CheckIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface Tenant {
  id: number;
  name: string;
  code: string;
  domain: string;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  users: number;
  logo?: string;
}

interface CreateTenantProps {
  onBack: () => void;
  onTenantCreated: (tenant: Tenant) => void;
}

type Step = 1 | 2 | 3 | 4;

const CreateTenant = ({ onBack, onTenantCreated }: CreateTenantProps) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    email: '',
    phone: '',
    address: '',
    domain: '',
    secondaryDomains: '',
    language: 'fr',
    timezone: 'Europe/Paris',
    initialConfig: '',
    plan: 'Starter',
    trialPeriod: false,
    promoCode: '',
    paymentMethod: 'card',
    termsAccepted: false,
  });

  const steps = [
    { id: 1, title: 'Informations de base', icon: BuildingOffice2Icon },
    { id: 2, title: 'Configuration technique', icon: Cog6ToothIcon },
    { id: 3, title: 'Abonnement et paiement', icon: CreditCardIcon },
    { id: 4, title: 'Récapitulatif et validation', icon: CheckIcon },
  ];

  const establishmentTypes = [
    { value: 'ecole', label: 'École' },
    { value: 'college', label: 'Collège' },
    { value: 'lycee', label: 'Lycée' },
    { value: 'universite', label: 'Université' },
    { value: 'formation', label: 'Formation' },
  ];

  const plans = [
    { id: 'Starter', name: 'Starter', price: '€19/mois', features: ['Jusqu\'à 100 utilisateurs', 'Support email', 'Stockage 5GB'] },
    { id: 'Basic', name: 'Basic', price: '€49/mois', features: ['Jusqu\'à 500 utilisateurs', 'Support prioritaire', 'Stockage 20GB'] },
    { id: 'Premium', name: 'Premium', price: '€99/mois', features: ['Utilisateurs illimités', 'Support 24/7', 'Stockage 100GB'] },
    { id: 'Enterprise', name: 'Enterprise', price: '€299/mois', features: ['Tout inclus', 'Support dédié', 'Stockage illimité'] },
  ];

  const generateCode = () => {
    const name = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const type = formData.type;
    const random = Math.random().toString(36).substring(2, 6);
    const code = `${type}_${name}_${random}`;
    setFormData(prev => ({ ...prev, code }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = () => {
    const newTenant: Tenant = {
      id: Date.now(),
      name: formData.name,
      code: formData.code,
      domain: formData.domain,
      plan: formData.plan,
      status: 'active',
      createdAt: new Date().toISOString(),
      users: 0,
    };
    
    onTenantCreated(newTenant);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.code.trim() !== '' && formData.type !== '' && formData.email.trim() !== '';
      case 2:
        return formData.domain.trim() !== '';
      case 3:
        return formData.plan !== '';
      case 4:
        return formData.termsAccepted;
      default:
        return false;
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
        className={`rounded-3xl p-4 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border-gray-700/50'
            : 'bg-gradient-to-br from-white via-white to-gray-50/50 border-gray-200/50'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
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
              <h1 className={`text-2xl font-bold tracking-tight ${
                theme === 'dark' 
                  ? 'text-white' 
                  : 'text-[#2b4a6a]'
              }`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                Création d'un Nouveau Tenant
              </h1>
              <p className={`text-md font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Formulaire multi-étapes</p>
            </div>
          </div>
        </div>

        {/* Progress Steps - Animation ULTRA PREMIUM */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                    rotate: currentStep === step.id ? [0, -5, 5, 0] : 0
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.6, repeat: currentStep === step.id ? Infinity : 0 }
                  }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                    currentStep >= step.id
                      ? 'bg-gradient-to-r from-[#f57c00] to-[#ff9800] border-[#f57c00] text-white shadow-lg'
                      : theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-gray-400'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: currentStep >= step.id ? [1, 1.2, 1] : 1,
                      rotate: currentStep >= step.id ? [0, 360] : 0
                    }}
                    transition={{
                      scale: { duration: 0.5, delay: 0.2 },
                      rotate: { duration: 0.8, delay: 0.3 }
                    }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="relative w-20 h-1.5 ml-3">
                    {/* Barre de fond */}
                    <div className={`absolute inset-0 rounded-full ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    }`} />
                    
                    {/* Barre de progression avec effet 3D - Remplissage depuis le début */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-full shadow-sm origin-left"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: currentStep > step.id ? '100%' : currentStep === step.id ? '40%' : 0
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100
                      }}
                    />
                    
                    {/* Effet de brillance ultra-smooth */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full"
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ 
                        x: currentStep > step.id ? '100%' : '-100%',
                        opacity: currentStep > step.id ? 1 : 0
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: currentStep > step.id ? Infinity : 0,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    
                    {/* Particules flottantes */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: currentStep > step.id 
                          ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)"
                          : "none"
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Labels avec animation de type */}
          <div className="flex justify-between mt-3">
            {steps.map((step) => (
              <motion.span
                key={step.id}
                className={`text-xs font-medium transition-all duration-300 ${
                  currentStep >= step.id ? 'text-[#f57c00]' : theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`}
                animate={{
                  scale: currentStep === step.id ? 1.05 : 1,
                  fontWeight: currentStep === step.id ? '700' : '500',
                  y: currentStep === step.id ? [-2, 0, -2] : 0
                }}
                transition={{ 
                  duration: 0.4,
                  y: { duration: 1, repeat: currentStep === step.id ? Infinity : 0 }
                }}
              >
                {step.title}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Form Content */}
      <motion.div
        variants={cardVariants}
        className={`rounded-3xl shadow-xl border overflow-hidden backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700/50'
            : 'bg-white border-gray-200/50'
        }`}
      >
        <div className="p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <div>
                  <h2 className={`text-2xl font-bold mb-2 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                  }`}>
                    <BuildingOffice2Icon className="w-6 h-6 text-[#f57c00]" />
                    Informations de base
                  </h2>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Renseignez les informations essentielles de votre établissement</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Nom de l'établissement *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] focus:text-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                          : 'border-gray-300 bg-white/80'
                      }`}
                      placeholder="Ex: Lycée Victor Hugo"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Code tenant * (généré automatiquement, modifiable)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => handleInputChange('code', e.target.value)}
                        className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] focus:text-[#f57c00] transition-all duration-300 backdrop-blur-sm font-mono ${
                          theme === 'dark'
                            ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                            : 'border-gray-300 bg-white/80'
                        }`}
                        placeholder="Code généré automatiquement"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={generateCode}
                        className="px-4 py-3 bg-[#f57c00]/10 text-[#f57c00] rounded-xl border border-[#f57c00]/20 hover:bg-[#f57c00]/15 transition-all duration-300"
                      >
                        Générer
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Type d'établissement
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] focus:text-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white'
                          : 'border-gray-300 bg-[#2b4a6a]/5'
                      }`}
                    >
                      <option value="">Sélectionner un type</option>
                      {establishmentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Email de contact *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] focus:text-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                          : 'border-gray-300 bg-white/80'
                      }`}
                      placeholder="admin@etablissement.edu"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] focus:text-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                          : 'border-gray-300 bg-white/80'
                      }`}
                      placeholder="+33 1 42 XX XX XX"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Adresse complète
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] focus:text-[#f57c00] transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                      placeholder="123 Rue de la République, 75001 Paris, France"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <div>
                  <h2 className={`text-2xl font-bold mb-2 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                  }`}>
                    <Cog6ToothIcon className="w-6 h-6 text-[#f57c00]" />
                    Configuration technique
                  </h2>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Configurez les paramètres techniques de votre tenant</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Domaine principal * (disponibilité vérifiée en temps réel)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.domain}
                        onChange={(e) => handleInputChange('domain', e.target.value)}
                        className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                          theme === 'dark'
                            ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                            : 'border-gray-300 bg-white/80'
                        }`}
                        placeholder="etablissement"
                      />
                      <span className={`font-medium text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>.nschool.fr</span>
                    </div>
                    <p className="text-xs text-green-600">✓ Domaine disponible</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Domaines secondaires (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.secondaryDomains}
                      onChange={(e) => handleInputChange('secondaryDomains', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                          : 'border-gray-300 bg-white/80'
                      }`}
                      placeholder="www.etablissement.edu"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Langue par défaut
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white'
                          : 'border-gray-300 bg-white/80'
                      }`}
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Fuseau horaire
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white'
                          : 'border-gray-300 bg-white/80'
                      }`}
                    >
                      <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                      <option value="Europe/London">Europe/London (UTC+0)</option>
                      <option value="America/New_York">America/New_York (UTC-5)</option>
                    </select>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2 md:col-span-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Configuration initiale
                    </label>
                    <textarea
                      value={formData.initialConfig}
                      onChange={(e) => handleInputChange('initialConfig', e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 backdrop-blur-sm resize-none ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                          : 'border-gray-300 bg-white/80'
                      }`}
                      placeholder="Configuration spécifique à votre établissement..."
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <div>
                  <h2 className={`text-2xl font-bold mb-2 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                  }`}>
                    <CreditCardIcon className="w-6 h-6 text-[#f57c00]" />
                    Abonnement et paiement
                  </h2>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Choisissez le plan qui correspond à vos besoins</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInputChange('plan', plan.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.plan === plan.id
                          ? 'border-[#f57c00] bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-lg'
                          : theme === 'dark'
                            ? 'border-gray-600 bg-gray-700 hover:border-[#f57c00]/50 hover:bg-gray-600'
                            : 'border-gray-200 bg-white hover:border-[#f57c00]/50 hover:bg-orange-50/30'
                      }`}
                    >
                      <div className="text-center">
                        <h3 className={`text-lg font-bold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                        }`}>{plan.name}</h3>
                        <p className="text-2xl font-bold text-[#f57c00] mb-4">{plan.price}</p>
                        <ul className={`space-y-2 text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="trialPeriod"
                      checked={formData.trialPeriod}
                      onChange={(e) => handleInputChange('trialPeriod', e.target.checked)}
                      className="w-4 h-4 text-[#f57c00] border-[#f57c00]/20 rounded focus:ring-[#f57c00]/30"
                    />
                    <label htmlFor="trialPeriod" className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Période d'essai (optionnel)
                    </label>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Code promotionnel (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.promoCode}
                      onChange={(e) => handleInputChange('promoCode', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white placeholder-gray-400'
                          : 'border-gray-300 bg-white/80'
                      }`}
                      placeholder="PROMO2024"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                    <label className={`block text-sm font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Méthode de paiement
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300 backdrop-blur-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-700/80 text-white'
                          : 'border-gray-300 bg-white/80'
                      }`}
                    >
                      <option value="card">Carte bancaire</option>
                      <option value="sepa">Prélèvement SEPA</option>
                      <option value="invoice">Facture</option>
                    </select>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="space-y-6"
              >
                <div>
                  <h2 className={`text-2xl font-bold mb-2 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                  }`}>
                    <CheckIcon className="w-6 h-6 text-[#f57c00]" />
                    Récapitulatif et validation
                  </h2>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Vérifiez les informations avant de créer votre tenant</p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl border ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600/50'
                      : 'bg-gradient-to-br from-green-50 to-green-100/30 border-green-200/50'
                  }`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                  }`}>Résumé de toutes les informations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Nom</span>
                        <span className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Code</span>
                        <span className={`font-mono font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{formData.code}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Type</span>
                        <span className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{establishmentTypes.find(t => t.value === formData.type)?.label}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Email</span>
                        <span className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{formData.email}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Domaine</span>
                        <span className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{formData.domain}.nschool.fr</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Plan</span>
                        <span className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{formData.plan}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Période d'essai</span>
                        <span className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{formData.trialPeriod ? 'Oui' : 'Non'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>Méthode de paiement</span>
                        <span className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{formData.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                    className="w-4 h-4 text-[#f57c00] border-[#f57c00]/20 rounded focus:ring-[#f57c00]/30"
                  />
                  <label htmlFor="termsAccepted" className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    J'accepte les conditions d'utilisation et la politique de confidentialité
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className={`px-8 py-6 border-t ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: currentStep === 4 ? "0px 8px 25px rgba(245, 158, 11, 0.4)" : "0px 8px 25px rgba(245, 124, 0, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={!isStepValid()}
              className={`px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                currentStep === 4
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700'
                  : 'bg-gradient-to-r from-[#f57c00] to-[#ff9800] text-white hover:from-[#f57c00]/90 hover:to-[#ff9800]/90'
              }`}
            >
              {currentStep === 4 ? 'Créer le Tenant' : 'Suivant'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateTenant;