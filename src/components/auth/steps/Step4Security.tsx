'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Step4SecurityProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step4Security({ formData, updateFormData, nextStep, prevStep }: Step4SecurityProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');

  // Validation du mot de passe
  useEffect(() => {
    const strength = calculatePasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  // Validation générale du formulaire
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    } else if (passwordStrength === 'weak') {
      newErrors.password = "Le mot de passe est trop faible";
    }

    if (formData.password && formData.password_confirm && formData.password !== formData.password_confirm) {
      newErrors.password_confirm = "Les mots de passe ne correspondent pas";
    }

    if (!formData.accepts_terms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && formData.password && formData.password_confirm && formData.accepts_terms);
  }, [formData, passwordStrength]);

  const calculatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (!password) return 'weak';
    
    let score = 0;
    
    // Longueur
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexité
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    if (score >= 5) return 'strong';
    if (score >= 3) return 'medium';
    return 'weak';
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'strong':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'Faible';
      case 'medium':
        return 'Moyen';
      case 'strong':
        return 'Fort';
      default:
        return '';
    }
  };

  const getPasswordStrengthIcon = () => {
    switch (passwordStrength) {
      case 'weak':
        return 'mdi:alert-circle';
      case 'medium':
        return 'mdi:check-circle';
      case 'strong':
        return 'mdi:shield-check';
      default:
        return 'mdi:help-circle';
    }
  };

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
            <Icon icon="mdi:shield-check" className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Sécurité et Finalisation
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sécurisez votre compte et acceptez les conditions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Mot de passe */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
              Mot de passe *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Créez un mot de passe sécurisé"
                value={formData.password}
                onChange={(e) => updateFormData({ password: e.target.value })}
                className={`pr-10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className="w-5 h-5" />
              </button>
            </div>
            
            {/* Indicateur de force du mot de passe */}
            {formData.password && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <Icon 
                  icon={getPasswordStrengthIcon()} 
                  className={`w-4 h-4 ${getPasswordStrengthColor()}`} 
                />
                <span className={`text-xs font-medium ${getPasswordStrengthColor()}`}>
                  {getPasswordStrengthText()}
                </span>
              </motion.div>
            )}
            
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.password}
              </motion.p>
            )}
          </motion.div>

          {/* Confirmation du mot de passe */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="password_confirm" className="text-gray-700 text-sm font-medium">
              Confirmer le mot de passe *
            </Label>
            <div className="relative">
              <Input
                id="password_confirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                value={formData.password_confirm}
                onChange={(e) => updateFormData({ password_confirm: e.target.value })}
                className={`pr-10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                  errors.password_confirm ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} className="w-5 h-5" />
              </button>
            </div>
            
            {/* Indicateur de correspondance */}
            {formData.password && formData.password_confirm && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <Icon 
                  icon={formData.password === formData.password_confirm ? "mdi:check-circle" : "mdi:close-circle"} 
                  className={`w-4 h-4 ${
                    formData.password === formData.password_confirm ? "text-green-500" : "text-red-500"
                  }`} 
                />
                <span className={`text-xs font-medium ${
                  formData.password === formData.password_confirm ? "text-green-600" : "text-red-600"
                }`}>
                  {formData.password === formData.password_confirm ? "Mots de passe identiques" : "Mots de passe différents"}
                </span>
              </motion.div>
            )}
            
            {errors.password_confirm && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.password_confirm}
              </motion.p>
            )}
          </motion.div>

          {/* Conseils de sécurité */}
          <motion.div 
            className="bg-blue-50 border border-blue-200 rounded-lg p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-2">
              <Icon icon="mdi:information" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">Conseils pour un mot de passe sécurisé :</p>
                <ul className="space-y-1">
                  <li>• Au moins 8 caractères</li>
                  <li>• Mélangez lettres majuscules et minuscules</li>
                  <li>• Incluez des chiffres et des symboles</li>
                  <li>• Évitez les informations personnelles</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Conditions d'utilisation */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id="accepts_terms"
                checked={formData.accepts_terms}
                onCheckedChange={(checked) => updateFormData({ accepts_terms: checked })}
                className="mt-1"
              />
              <div className="space-y-1">
                <Label htmlFor="accepts_terms" className="text-sm font-medium text-gray-700">
                  J'accepte les conditions d'utilisation *
                </Label>
                <p className="text-xs text-gray-600">
                  En cochant cette case, vous acceptez nos{' '}
                  <a href="#" className="text-amber-600 hover:underline">
                    conditions d'utilisation
                  </a>{' '}
                  et notre{' '}
                  <a href="#" className="text-amber-600 hover:underline">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </div>
            </div>
            
            {errors.terms && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.terms}
              </motion.p>
            )}
          </motion.div>

          {/* Boutons de navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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