'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { colors, transitions } from '@/lib/ColorGuide';

// Import des composants de démonstration
import HeroIntro from '@/components/home/demo/HeroIntro';
import StepTenantOnboarding from '@/components/home/demo/StepTenantOnboarding';
import StepChoosePlan from '@/components/home/demo/StepChoosePlan';
import StepDashboard from '@/components/home/demo/StepDashboard';
import StepRolesPresentation from '@/components/home/demo/StepRolesPresentation';
import FinalCTA from '@/components/home/demo/FinalCTA';
import PageTransition from '@/components/home/demo/PageTransition';

// Types pour la navigation
interface DemoStep {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  isActive: boolean;
}

export default function DemoPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Configuration des étapes de la démonstration
  const demoSteps: DemoStep[] = [
    {
      id: 'hero',
      title: 'Introduction',
      component: HeroIntro,
      isActive: true,
    },
    {
      id: 'onboarding',
      title: 'Création de compte',
      component: StepTenantOnboarding,
      isActive: false,
    },
    {
      id: 'plans',
      title: 'Choix du plan',
      component: StepChoosePlan,
      isActive: false,
    },
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      component: StepDashboard,
      isActive: false,
    },
    {
      id: 'roles',
      title: 'Rôles utilisateurs',
      component: StepRolesPresentation,
      isActive: false,
    },
    {
      id: 'final',
      title: 'Conclusion',
      component: FinalCTA,
      isActive: false,
    },
  ];

  // Gestion de la navigation
  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Auto-play de la démonstration
  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < demoSteps.length - 1) {
          nextStep();
        } else {
          setIsAutoPlaying(false);
        }
      }, 8000); // 8 secondes par étape

      return () => clearTimeout(timer);
    }
  }, [currentStep, isAutoPlaying]);

  // Chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Gestion du clavier
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          nextStep();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevStep();
          break;
        case 'a':
        case 'A':
          event.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
        case 'Escape':
          event.preventDefault();
          setIsAutoPlaying(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, isAutoPlaying]);

  if (isLoading) {
    return <PageTransition />;
  }

  const CurrentComponent = demoSteps[currentStep].component;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Navigation flottante */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 right-6 z-50"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border bg-white/80 border-gray-200 text-gray-800">
          {/* Bouton Auto-play */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isAutoPlaying
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-orange-100'
            }`}
            title={isAutoPlaying ? 'Arrêter l\'auto-play (A)' : 'Démarrer l\'auto-play (A)'}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              {isAutoPlaying ? (
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              )}
            </svg>
          </motion.button>

          {/* Indicateurs d'étapes */}
          <div className="flex items-center gap-1">
            {demoSteps.map((step, index) => (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-orange-500 scale-125'
                    : index < currentStep
                    ? 'bg-orange-300'
                    : 'bg-gray-300'
                }`}
                title={step.title}
              />
            ))}
          </div>

          {/* Contrôles de navigation */}
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`p-1 rounded transition-all duration-300 ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
              title="Étape précédente (←)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>

            <span className="text-xs font-medium px-2">
              {currentStep + 1} / {demoSteps.length}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              disabled={currentStep === demoSteps.length - 1}
              className={`p-1 rounded transition-all duration-300 ${
                currentStep === demoSteps.length - 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
              title="Étape suivante (→)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Contenu principal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={transitions.page}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <CurrentComponent
            onNext={nextStep}
            onPrev={prevStep}
            isAutoPlaying={isAutoPlaying}
            currentStep={currentStep}
            totalSteps={demoSteps.length}
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicateur de progression */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <div className="px-4 py-2 rounded-full backdrop-blur-md border bg-white/80 border-gray-200 text-gray-800">
          <div className="flex items-center gap-2 text-sm">
            <span>Progression</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}%</span>
          </div>
        </div>
      </motion.div>

      {/* Raccourcis clavier */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="px-3 py-2 rounded-lg backdrop-blur-md border text-xs bg-white/80 border-gray-200 text-gray-600">
          <div className="space-y-1">
            <div>← → Navigation</div>
            <div>Espace Pause</div>
            <div>A Auto-play</div>
            <div>Échap Stop</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 