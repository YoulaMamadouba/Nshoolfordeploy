'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Step5PricingProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const plans = [
  {
    id: "basic",
    name: "Basique",
    price: "Gratuit",
    period: "pour toujours",
    description: "Parfait pour commencer",
    features: [
      "Jusqu'à 100 élèves",
      "Fonctionnalités de base",
      "Support par email",
      "Mise à jour automatique"
    ],
    popular: false,
    color: "from-gray-500 to-gray-600"
  },
  {
    id: "pro",
    name: "Professionnel",
    price: "29€",
    period: "/mois",
    description: "Recommandé pour la plupart des établissements",
    features: [
      "Jusqu'à 1000 élèves",
      "Toutes les fonctionnalités",
      "Support prioritaire",
      "Personnalisation avancée",
      "Rapports détaillés",
      "API d'intégration"
    ],
    popular: true,
    color: "from-amber-500 to-amber-600"
  },
  {
    id: "enterprise",
    name: "Entreprise",
    price: "99€",
    period: "/mois",
    description: "Pour les grandes institutions",
    features: [
      "Élèves illimités",
      "Fonctionnalités premium",
      "Support dédié 24/7",
      "Personnalisation complète",
      "Analytics avancées",
      "Intégrations multiples",
      "Formation personnalisée"
    ],
    popular: false,
    color: "from-purple-500 to-purple-600"
  }
];

export default function Step5Pricing({ formData, updateFormData, nextStep, prevStep }: Step5PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState(formData.selected_plan || "");

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    updateFormData({ selected_plan: planId });
  };

  const isValid = selectedPlan !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-0 bg-white/95 shadow-xl">
        <CardHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon icon="mdi:package-variant" className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Choisir un Plan
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sélectionnez le plan qui correspond à vos besoins
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAIRE
                    </span>
                  </motion.div>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-amber-500 shadow-xl' 
                      : 'hover:shadow-lg'
                  }`}
                >
                  <Card className={`border-0 h-full transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200' 
                      : 'bg-white hover:bg-gray-50'
                  }`}>
                    <CardHeader className="text-center pb-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon 
                          icon={plan.id === 'basic' ? 'mdi:school' : plan.id === 'pro' ? 'mdi:star' : 'mdi:crown'} 
                          className="w-6 h-6 text-white" 
                        />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-800">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Prix */}
                      <div className="text-center">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-bold text-gray-800">
                            {plan.price}
                          </span>
                          <span className="text-sm text-gray-600">
                            {plan.period}
                          </span>
                        </div>
                      </div>
                      
                      {/* Fonctionnalités */}
                      <div className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + featureIndex * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <Icon 
                              icon="mdi:check-circle" 
                              className="w-4 h-4 text-green-500 flex-shrink-0" 
                            />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Indicateur de sélection */}
                      {selectedPlan === plan.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3"
                        >
                          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <Icon icon="mdi:check" className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Information sur les plans */}
          <motion.div 
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-2">
              <Icon icon="mdi:information" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">À propos des plans :</p>
                <p>Vous pouvez changer de plan à tout moment depuis votre tableau de bord. 
                Tous les plans incluent une période d'essai gratuite de 14 jours.</p>
              </div>
            </div>
          </motion.div>

          {/* Boutons de navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3 pt-4"
          >
            <Button
              onClick={prevStep}
              variant="outline"
              className="flex-1 h-11 text-sm border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 transition-all duration-200"
            >
              <Icon icon="mdi:arrow-left" className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={!isValid}
              className={`flex-1 h-11 text-sm font-medium transition-all duration-300 ${
                isValid 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Suivant</span>
              <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 