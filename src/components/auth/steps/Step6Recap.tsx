'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Step6RecapProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const plans = {
  basic: { name: "Basique", price: "Gratuit" },
  pro: { name: "Professionnel", price: "29€/mois" },
  enterprise: { name: "Entreprise", price: "99€/mois" }
};

const schoolTypes = {
  PRIMAIRE: "École Primaire",
  COLLEGE: "Collège",
  LYCEE: "Lycée",
  UNIVERSITE: "Université",
  INSTITUT: "Institut",
  ECOLE_PRIVEE: "École Privée",
  AUTRE: "Autre"
};

export default function Step6Recap({ formData, prevStep }: Step6RecapProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showSuccessDrawer, setShowSuccessDrawer] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('submitting');

    try {
      // Simulation de soumission avec gestion d'erreur
      const success = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulation d'erreur de connexion (20% de chance)
          if (Math.random() < 0.2) {
            reject(new Error('Erreur de connexion au serveur'));
          } else {
            resolve(true);
          }
        }, 3000);
      });

      setSubmitStatus('success');
      setIsSubmitting(false);
      setShowSuccessDrawer(true);
      
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
      
      // Réinitialiser l'erreur après 5 secondes
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const recapSections = [
    {
      title: "Informations de l'Établissement",
      icon: "mdi:school",
      items: [
        { label: "Nom", value: formData.school_name },
        { label: "Type", value: schoolTypes[formData.school_type as keyof typeof schoolTypes] || formData.school_type },
        { label: "Sous-domaine", value: `${formData.subdomain}.localhost:8000` }
      ]
    },
    {
      title: "Informations de Contact",
      icon: "mdi:map-marker",
      items: [
        { label: "Téléphone", value: formData.phone || "Non renseigné" },
        { label: "Adresse", value: formData.address },
        { label: "Coordonnées", value: formData.localisation.latitude && formData.localisation.longitude 
          ? `${formData.localisation.latitude.toFixed(6)}, ${formData.localisation.longitude.toFixed(6)}`
          : "Non récupérées"
        }
      ]
    },
    {
      title: "Informations de l'Administrateur",
      icon: "mdi:account-tie",
      items: [
        { label: "Email", value: formData.admin_email },
        { label: "Prénom", value: formData.admin_first_name },
        { label: "Nom", value: formData.admin_last_name },
        { label: "Email vérifié", value: formData.otp_verified ? "✅ Oui" : "❌ Non" }
      ]
    },
    {
      title: "Plan Sélectionné",
      icon: "mdi:package-variant",
      items: [
        { label: "Plan", value: plans[formData.selected_plan as keyof typeof plans]?.name || "Non sélectionné" },
        { label: "Prix", value: plans[formData.selected_plan as keyof typeof plans]?.price || "Non défini" }
      ]
    }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="border-0 bg-white/95 shadow-2xl border border-amber-500/30">
          <CardHeader className="text-center pb-3">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon icon="mdi:clipboard-check" className="w-10 h-10 text-amber-500 mx-auto mb-2" />
            </motion.div>
            <CardTitle className="text-xl font-bold text-gray-800">
              Récapitulatif
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Vérifiez toutes les informations avant de créer votre établissement
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Sections de récapitulatif */}
            <div className="space-y-4">
              {recapSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon icon={section.icon} className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-gray-600 font-medium">{item.label} :</span>
                        <span className="text-gray-800 font-mono">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message de confirmation */}
            <motion.div 
              className="bg-green-50 border border-green-200 rounded-lg p-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-2">
                <Icon icon="mdi:check-circle" className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-green-800">
                  <p className="font-medium mb-1">Prêt à créer votre établissement !</p>
                  <p>Une fois créé, vous recevrez un email de confirmation avec vos identifiants de connexion. 
                  Votre espace sera accessible à l'adresse : <span className="font-mono text-green-700">
                    {formData.subdomain}.localhost:8000
                  </span></p>
                </div>
              </div>
            </motion.div>

            {/* Conditions d'utilisation */}
            <motion.div 
              className="bg-blue-50 border border-blue-200 rounded-lg p-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start gap-2">
                <Icon icon="mdi:information" className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">Important :</p>
                  <p>En cliquant sur "Créer mon établissement", vous confirmez que toutes les informations sont correctes 
                  et que vous acceptez nos conditions d'utilisation et notre politique de confidentialité.</p>
                </div>
              </div>
            </motion.div>

            {/* Boutons de navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 pt-4"
            >
              <Button
                onClick={prevStep}
                variant="outline"
                className="flex-1 h-11 text-sm border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600 transition-all duration-200"
              >
                <Icon icon="mdi:arrow-left" className="w-4 h-4 mr-2" />
                Modifier
              </Button>
              
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0px 5px 15px rgba(245, 158, 11, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 h-11 text-sm font-medium transition-all duration-300 ${
                    submitStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : submitStatus === 'error'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md'
                  }`}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <Icon icon="mdi:loading" className="w-4 h-4 mr-2 animate-spin" />
                      Création en cours...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <Icon icon="mdi:check-circle" className="w-4 h-4 mr-2" />
                      Créé avec succès !
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <Icon icon="mdi:refresh" className="w-4 h-4 mr-2" />
                      Réessayer
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:school" className="w-4 h-4 mr-2" />
                      Créer mon établissement
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {/* Message de succès */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
              >
                <Icon icon="mdi:party-popper" className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800 mb-1">Félicitations !</h3>
                <p className="text-sm text-green-700">
                  Votre établissement a été créé avec succès. Vous allez recevoir un email de confirmation.
                </p>
              </motion.div>
            )}

            {/* Message d'erreur */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
              >
                <Icon icon="mdi:alert-circle" className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-800 mb-1">Erreur de connexion</h3>
                <p className="text-sm text-red-700 mb-3">
                  Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez.
                </p>
                <div className="space-y-2 text-xs text-red-600">
                  <p>• Vérifiez votre connexion internet</p>
                  <p>• Assurez-vous que le serveur est accessible</p>
                  <p>• Réessayez dans quelques instants</p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Drawer de succès stylisé */}
      <AnimatePresence>
        {showSuccessDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowSuccessDrawer(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-50 p-4 sm:p-6 w-[calc(100%-2rem)] max-w-sm sm:max-w-md mx-auto"
            >
              {/* Indicateur de glissement */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Contenu du drawer */}
              <div className="text-center space-y-3 sm:space-y-4">
                {/* Animation de succès */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="relative"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Icon icon="mdi:check" className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  {/* Particules de célébration */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      style={{
                        top: `${20 + Math.sin(i * 60) * 30}px`,
                        left: `${20 + Math.cos(i * 60) * 30}px`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Titre */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                    🎉 Établissement créé avec succès !
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    Votre établissement <span className="font-semibold text-amber-600">{formData.school_name}</span> est maintenant opérationnel
                  </p>
                </motion.div>

                {/* Informations importantes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="bg-blue-50 rounded-lg p-2.5 sm:p-3 md:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <Icon icon="mdi:email" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-blue-800 text-xs sm:text-sm md:text-base">Email de confirmation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                      Un email avec vos identifiants a été envoyé à <span className="font-mono">{formData.admin_email}</span>
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-2.5 sm:p-3 md:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <Icon icon="mdi:web" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                      <span className="font-semibold text-green-800 text-xs sm:text-sm md:text-base">Accès à votre espace</span>
                    </div>
                    <p className="text-xs sm:text-sm text-green-700 leading-relaxed">
                      Votre espace est accessible à : <span className="font-mono text-green-800">
                        {formData.subdomain}.localhost:8000
                      </span>
                    </p>
                  </div>
                </motion.div>

                {/* Bouton de redirection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-1 sm:pt-2"
                >
                  <Button
                    onClick={() => router.push('/login')}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold shadow-lg text-xs sm:text-sm md:text-base"
                  >
                    <Icon icon="mdi:login" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2" />
                    Aller à la page de connexion
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 