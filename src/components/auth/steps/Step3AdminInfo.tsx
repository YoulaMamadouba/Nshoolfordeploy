'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step3AdminInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step3AdminInfo({ formData, updateFormData, nextStep, prevStep }: Step3AdminInfoProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValid, setIsValid] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid' | 'taken'>('idle');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpStatus, setOtpStatus] = useState<'idle' | 'sending' | 'sent' | 'verifying' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(0);

  // Validation du formulaire
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.admin_email || !isValidEmail(formData.admin_email)) {
      newErrors.admin_email = "Veuillez saisir une adresse email valide";
    }

    if (!formData.admin_first_name || formData.admin_first_name.length < 2) {
      newErrors.admin_first_name = "Le prénom doit contenir au moins 2 caractères";
    }

    if (!formData.admin_last_name || formData.admin_last_name.length < 2) {
      newErrors.admin_last_name = "Le nom doit contenir au moins 2 caractères";
    }

    setErrors(newErrors);
    // Simulation : permettre de passer à l'étape suivante sans OTP pour les tests
    setIsValid(Object.keys(newErrors).length === 0 && emailStatus === 'valid');
  }, [formData, emailStatus]);

  // Validation email en temps réel
  useEffect(() => {
    const validateEmail = async () => {
      if (!formData.admin_email) {
        setEmailStatus('idle');
        return;
      }

      if (!isValidEmail(formData.admin_email)) {
        setEmailStatus('invalid');
        return;
      }

      setEmailStatus('checking');

      // Simulation de vérification d'email - toujours valide pour les tests
      setTimeout(() => {
        setEmailStatus('valid'); // Toujours valide en mode simulation
      }, 500);
    };

    const timeoutId = setTimeout(validateEmail, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.admin_email]);

  // Compteur pour le renvoi d'OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getEmailStatusIcon = () => {
    switch (emailStatus) {
      case 'checking':
        return <Icon icon="mdi:loading" className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'valid':
        return <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500" />;
      case 'invalid':
        return <Icon icon="mdi:close-circle" className="w-5 h-5 text-red-500" />;
      case 'taken':
        return <Icon icon="mdi:alert-circle" className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getEmailStatusText = () => {
    switch (emailStatus) {
      case 'checking':
        return "Vérification...";
      case 'valid':
        return "Email valide";
      case 'invalid':
        return "Format invalide";
      case 'taken':
        return "Email déjà utilisé";
      default:
        return "";
    }
  };

  const sendOtp = async () => {
    setOtpStatus('sending');
    
    // Simulation d'envoi d'OTP
    setTimeout(() => {
      setOtpStatus('sent');
      setCountdown(60);
      setShowOtpModal(true);
    }, 2000);
  };

  const verifyOtp = async () => {
    setOtpStatus('verifying');
    
    // Simulation de vérification OTP
    setTimeout(() => {
      if (otpCode === '123456') { // Code de test
        setOtpStatus('success');
        updateFormData({ otp_verified: true });
        setTimeout(() => {
          setShowOtpModal(false);
          setOtpCode('');
        }, 1500);
      } else {
        setOtpStatus('error');
        setTimeout(() => setOtpStatus('sent'), 2000);
      }
    }, 1000);
  };

  const resendOtp = () => {
    if (countdown > 0) return;
    sendOtp();
  };

  return (
    <>
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
              <Icon icon="mdi:account-tie" className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Informations de l'Administrateur
            </CardTitle>
            <CardDescription className="text-gray-600">
              Créez le compte administrateur principal de votre établissement
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Email */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="admin_email" className="text-gray-700 text-sm font-medium">
                Email de l'administrateur *
              </Label>
              <div className="relative">
                <Input
                  id="admin_email"
                  type="email"
                  placeholder="admin@votre-etablissement.com"
                  value={formData.admin_email}
                  onChange={(e) => updateFormData({ admin_email: e.target.value })}
                  className={`pr-10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                    errors.admin_email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {getEmailStatusIcon()}
                </div>
              </div>
              
              {formData.admin_email && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs ${
                    emailStatus === 'valid' ? 'text-green-600' :
                    emailStatus === 'taken' ? 'text-red-600' :
                    emailStatus === 'invalid' ? 'text-orange-600' :
                    'text-gray-600'
                  }`}
                >
                  {getEmailStatusText()}
                </motion.div>
              )}
              
              {errors.admin_email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs"
                >
                  {errors.admin_email}
                </motion.p>
              )}
            </motion.div>

            {/* Prénom et Nom */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="admin_first_name" className="text-gray-700 text-sm font-medium">
                  Prénom *
                </Label>
                <Input
                  id="admin_first_name"
                  type="text"
                  placeholder="Prénom"
                  value={formData.admin_first_name}
                  onChange={(e) => updateFormData({ admin_first_name: e.target.value })}
                  className={`focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                    errors.admin_first_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.admin_first_name && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs"
                  >
                    {errors.admin_first_name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="admin_last_name" className="text-gray-700 text-sm font-medium">
                  Nom *
                </Label>
                <Input
                  id="admin_last_name"
                  type="text"
                  placeholder="Nom"
                  value={formData.admin_last_name}
                  onChange={(e) => updateFormData({ admin_last_name: e.target.value })}
                  className={`focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                    errors.admin_last_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.admin_last_name && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs"
                  >
                    {errors.admin_last_name}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Prévisualisation */}
            {formData.admin_first_name && formData.admin_last_name && (
              <motion.div 
                className="bg-amber-50 border border-amber-200 rounded-lg p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:account" className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">
                    Bonjour {formData.admin_first_name} {formData.admin_last_name}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Bouton de validation email */}
            {emailStatus === 'valid' && !formData.otp_verified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={sendOtp}
                  disabled={otpStatus === 'sending'}
                  className="w-full h-11 text-sm bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                >
                  {otpStatus === 'sending' ? (
                    <>
                      <Icon icon="mdi:loading" className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:email" className="w-4 h-4 mr-2" />
                      Valider l'email
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Statut de vérification OTP */}
            {formData.otp_verified && (
              <motion.div 
                className="bg-green-50 border border-green-200 rounded-lg p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Email vérifié avec succès
                  </span>
                </div>
              </motion.div>
            )}

            {/* Explication */}
            <motion.div 
              className="bg-blue-50 border border-blue-200 rounded-lg p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start gap-2">
                <Icon icon="mdi:information" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">Compte administrateur :</p>
                  <p>Ce compte vous permettra d'accéder à l'interface d'administration de votre établissement. 
                  Vous pourrez gérer les utilisateurs, les paramètres et toutes les fonctionnalités de votre espace.</p>
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

      {/* Modal OTP */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="text-center mb-6">
                <Icon icon="mdi:email-lock" className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Vérification de l'email
                </h3>
                <p className="text-sm text-gray-600">
                  Nous avons envoyé un code de vérification à <br />
                  <span className="font-medium">{formData.admin_email}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                    Code de vérification
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="h-11 text-center text-lg font-mono tracking-widest"
                    maxLength={6}
                  />
                </div>

                {otpStatus === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center"
                  >
                    Code incorrect. Veuillez réessayer.
                  </motion.p>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowOtpModal(false)}
                    variant="outline"
                    className="flex-1 h-11"
                  >
                    Annuler
                  </Button>
                  
                  <Button
                    onClick={verifyOtp}
                    disabled={otpCode.length !== 6 || otpStatus === 'verifying'}
                    className="flex-1 h-11 bg-amber-600 hover:bg-amber-700"
                  >
                    {otpStatus === 'verifying' ? (
                      <>
                        <Icon icon="mdi:loading" className="w-4 h-4 mr-2 animate-spin" />
                        Vérification...
                      </>
                    ) : (
                      'Vérifier'
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    onClick={resendOtp}
                    disabled={countdown > 0}
                    variant="ghost"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {countdown > 0 
                      ? `Renvoyer dans ${countdown}s` 
                      : 'Renvoyer le code'
                    }
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 