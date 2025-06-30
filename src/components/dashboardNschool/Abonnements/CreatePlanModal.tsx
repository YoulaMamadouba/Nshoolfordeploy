import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  PlusIcon,
  CheckIcon,
  Cog6ToothIcon,
  UsersIcon,
  CloudIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  users: number;
  storage: string;
  features: string[];
  color: string;
  isPopular?: boolean;
}

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: Omit<Plan, 'id' | 'tenantCount' | 'revenue'>) => void;
}

const CreatePlanModal = ({ isOpen, onClose, onSave }: CreatePlanModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    period: 'monthly' as const,
    users: 100,
    storage: '5GB',
    features: ['Modules de base'],
    color: 'bg-blue-500',
    isPopular: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [availableFeatures] = useState([
    'Modules de base',
    'Modules avancés',
    'Tous les modules',
    'Fonctionnalités premium',
    'Personnalisation',
    'Support communautaire',
    'Support email',
    'Support prioritaire',
    'Support téléphonique',
    'Support dédié',
    'Intégrations avancées',
    'Stockage illimité',
  ]);

  const colorOptions = [
    { value: 'bg-gray-500', label: 'Gris', color: '#6b7280' },
    { value: 'bg-green-500', label: 'Vert', color: '#10b981' },
    { value: 'bg-blue-500', label: 'Bleu', color: '#3b82f6' },
    { value: 'bg-purple-500', label: 'Violet', color: '#8b5cf6' },
    { value: 'bg-orange-500', label: 'Orange', color: '#f97316' },
    { value: 'bg-red-500', label: 'Rouge', color: '#ef4444' },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
    setFormData({
      name: '',
      description: '',
      price: 0,
      period: 'monthly',
      users: 100,
      storage: '5GB',
      features: ['Modules de base'],
      color: 'bg-blue-500',
      isPopular: false,
    });
    setCurrentStep(1);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#f57c00] to-[#ff9800] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Créer un Nouveau Plan</h2>
                  <p className="text-orange-100 mt-1">Configurez votre plan d'abonnement</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center mt-6 space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step ? 'bg-white text-[#f57c00]' : 'bg-white/30 text-white'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-12 h-1 mx-2 ${
                        currentStep > step ? 'bg-white' : 'bg-white/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[#2b4a6a] mb-4">Informations Générales</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom du Plan
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all"
                            placeholder="Ex: Premium Plus"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prix
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={formData.price}
                              onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                              className="w-full px-4 py-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all"
                              placeholder="0"
                            />
                            <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Périodicité
                          </label>
                          <select
                            value={formData.period}
                            onChange={(e) => handleInputChange('period', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all"
                          >
                            <option value="monthly">Mensuel</option>
                            <option value="quarterly">Trimestriel</option>
                            <option value="yearly">Annuel</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Couleur
                          </label>
                          <div className="grid grid-cols-6 gap-2">
                            {colorOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleInputChange('color', option.value)}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  formData.color === option.value ? 'border-[#f57c00]' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: option.color }}
                                title={option.label}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all"
                          placeholder="Décrivez les avantages de ce plan..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[#2b4a6a] mb-4">Limites et Capacités</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <UsersIcon className="w-4 h-4 mr-2" />
                            Nombre d'Utilisateurs
                          </label>
                          <input
                            type="number"
                            value={formData.users}
                            onChange={(e) => handleInputChange('users', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all"
                            placeholder="100"
                          />
                          <p className="text-xs text-gray-500 mt-1">Utilisez -1 pour illimité</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <CloudIcon className="w-4 h-4 mr-2" />
                            Stockage
                          </label>
                          <input
                            type="text"
                            value={formData.storage}
                            onChange={(e) => handleInputChange('storage', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all"
                            placeholder="5GB"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <Cog6ToothIcon className="w-4 h-4 mr-2" />
                          Fonctionnalités Incluses
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {availableFeatures.map((feature) => (
                            <label key={feature} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={formData.features.includes(feature)}
                                onChange={() => handleFeatureToggle(feature)}
                                className="w-4 h-4 text-[#f57c00] border-gray-300 rounded focus:ring-[#f57c00]"
                              />
                              <span className="ml-3 text-sm text-gray-700">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[#2b4a6a] mb-4">Aperçu du Plan</h3>
                      
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-[#2b4a6a]">{formData.name || 'Nouveau Plan'}</h4>
                            <p className="text-gray-600 mt-1">{formData.description || 'Description du plan'}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#f57c00]">
                              €{formData.price}
                              <span className="text-sm text-gray-500 ml-1">
                                /{formData.period === 'monthly' ? 'mois' : formData.period === 'quarterly' ? 'trimestre' : 'an'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <UsersIcon className="w-4 h-4 text-[#f57c00]" />
                            <span className="text-sm text-gray-600">
                              {formData.users === -1 ? 'Illimité' : formData.users} utilisateurs
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CloudIcon className="w-4 h-4 text-[#f57c00]" />
                            <span className="text-sm text-gray-600">{formData.storage}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-semibold text-[#2b4a6a] mb-2">Fonctionnalités :</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {formData.features.map((feature) => (
                              <div key={feature} className="flex items-center text-sm text-gray-600">
                                <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.isPopular}
                            onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                            className="w-4 h-4 text-[#f57c00] border-gray-300 rounded focus:ring-[#f57c00]"
                          />
                          <span className="ml-3 text-sm text-gray-700">Marquer comme plan populaire</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {currentStep === 1 ? 'Annuler' : 'Précédent'}
              </motion.button>
              
              <div className="flex space-x-3">
                {currentStep < 3 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2 bg-[#f57c00] text-white rounded-lg hover:bg-[#e65100] transition-colors"
                  >
                    Suivant
                  </motion.button>
                )}
                
                {currentStep === 3 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-[#f57c00] text-white rounded-lg hover:bg-[#e65100] transition-colors flex items-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Créer le Plan
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePlanModal; 