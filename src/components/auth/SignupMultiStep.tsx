'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import AuthNav from "./AuthNav";
import Step1SchoolInfo from "./steps/Step1SchoolInfo";
import Step2ContactInfo from "./steps/Step2ContactInfo";
import Step3AdminInfo from "./steps/Step3AdminInfo";
import Step4Security from "./steps/Step4Security";
import Step5Pricing from "./steps/Step5Pricing";
import Step6Recap from "./steps/Step6Recap";
import { FormData } from "./types";

const steps = [
  { id: 1, title: "Informations de l'Établissement", icon: "mdi:school" },
  { id: 2, title: "Informations de Contact", icon: "mdi:map-marker" },
  { id: 3, title: "Informations de l'Administrateur", icon: "mdi:account-tie" },
  { id: 4, title: "Sécurité et Finalisation", icon: "mdi:shield-check" },
  { id: 5, title: "Choisir un Plan", icon: "mdi:package-variant" },
  { id: 6, title: "Récapitulatif", icon: "mdi:clipboard-check" }
];

export default function SignupMultiStep() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    school_name: "",
    school_type: "",
    subdomain: "",
    phone: "",
    address: "",
    localisation: { latitude: 0, longitude: 0 },
    admin_email: "",
    admin_first_name: "",
    admin_last_name: "",
    otp_verified: false,
    password: "",
    password_confirm: "",
    accepts_terms: false,
    selected_plan: ""
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      nextStep,
      prevStep
    };

    switch (currentStep) {
      case 1:
        return <Step1SchoolInfo {...stepProps} />;
      case 2:
        return <Step2ContactInfo {...stepProps} />;
      case 3:
        return <Step3AdminInfo {...stepProps} />;
      case 4:
        return <Step4Security {...stepProps} />;
      case 5:
        return <Step5Pricing {...stepProps} />;
      case 6:
        return <Step6Recap {...stepProps} />;
      default:
        return <Step1SchoolInfo {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-amber-50 overflow-hidden">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(43, 74, 106, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2b4a6a;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a6a8a;
        }
        .custom-scrollbar {
          -ms-overflow-style: auto;
          scrollbar-width: thin;
          scrollbar-color: #2b4a6a rgba(43, 74, 106, 0.1);
        }
      `}</style>

      {/* Navbar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <AuthNav />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Background image with floating animation */}
        <motion.div 
          className="absolute inset-0 bg-[url('/images/students.jpg')] bg-cover bg-center opacity-15"
          style={{ 
            backgroundPosition: 'center 20%',
            backgroundSize: 'cover',
          }}
          animate={{
            y: [0, -10, 0],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Floating particles effect */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 50],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Main container */}
        <div className="relative w-full max-w-4xl z-10 mx-auto space-y-6">
          {/* Progress Stepper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Création de votre établissement
              </h2>
              <span className="text-sm text-gray-600">
                Étape {currentStep} sur {steps.length}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <motion.div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToStep(step.id)}
                    style={{ cursor: currentStep >= step.id ? "pointer" : "default" }}
                  >
                    <Icon 
                      icon={step.icon} 
                      className={`w-5 h-5 ${
                        currentStep >= step.id ? "text-white" : "text-gray-400"
                      }`} 
                    />
                  </motion.div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                      currentStep > step.id ? "bg-amber-500" : "bg-gray-300"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-3 text-center">
              <span className="text-sm font-medium text-amber-600">
                {steps[currentStep - 1]?.title}
              </span>
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 