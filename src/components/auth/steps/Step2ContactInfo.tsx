'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Step2ContactInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function Step2ContactInfo({ formData, updateFormData, nextStep, prevStep }: Step2ContactInfoProps) {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValid, setIsValid] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'getting' | 'success' | 'error'>('idle');

  // Validation du formulaire
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};

    if (formData.phone && formData.phone.length < 8) {
      newErrors.phone = "Le numéro de téléphone doit contenir au moins 8 chiffres";
    }

    if (!formData.address || formData.address.length < 5) {
      newErrors.address = "L'adresse doit contenir au moins 5 caractères";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && formData.address);
  }, [formData]);

  // Formatage automatique du téléphone (format Guinée)
  const formatPhoneNumber = (value: string) => {
    // Supprimer tous les caractères non numériques
    const cleaned = value.replace(/\D/g, '');
    
    // Format Guinée: +224 627 613 835
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    updateFormData({ phone: formatted });
  };

  // Récupération de la géolocalisation
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setIsGettingLocation(true);
    setLocationStatus('getting');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateFormData({
          localisation: { latitude, longitude }
        });
        setLocationStatus('success');
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
        setLocationStatus('error');
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const getLocationStatusIcon = () => {
    switch (locationStatus) {
      case 'getting':
        return <Icon icon="mdi:loading" className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'success':
        return <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500" />;
      case 'error':
        return <Icon icon="mdi:close-circle" className="w-5 h-5 text-red-500" />;
      default:
        return <Icon icon="mdi:map-marker" className="w-5 h-5 text-gray-400" />;
    }
  };

  const getLocationStatusText = () => {
    switch (locationStatus) {
      case 'getting':
        return "Récupération de votre position...";
      case 'success':
        return "Position récupérée avec succès";
      case 'error':
        return "Impossible de récupérer votre position";
      default:
        return "Cliquez pour récupérer votre position";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="border-0 bg-white/95 shadow-2xl border border-amber-500/30">
        <CardHeader className="text-center pb-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon icon="mdi:map-marker" className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          </motion.div>
          <CardTitle className="text-xl font-bold text-gray-800">
            Informations de Contact
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Où se trouve votre établissement ?
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Téléphone */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05, duration: 0.2 }}
          >
            <Label htmlFor="phone" className="text-gray-700 text-sm font-medium">
              Téléphone (optionnel)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="627 613 835"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.phone}
              </motion.p>
            )}
            <p className="text-xs text-gray-500">
              Format Guinée: 627 613 835
            </p>
          </motion.div>

          {/* Adresse */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <Label htmlFor="address" className="text-gray-700 text-sm font-medium">
              Adresse complète *
            </Label>
            <Textarea
              id="address"
              placeholder="Ex: 123 Rue de la Paix, Conakry, Guinée"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
              className={`focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[80px] text-sm transition-all duration-200 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.address}
              </motion.p>
            )}
          </motion.div>

          {/* Géolocalisation */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            <Label className="text-gray-700 text-sm font-medium">
              Localisation
            </Label>
            
            <div className="space-y-3">
              {/* Bouton de géolocalisation */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  variant="outline"
                  className={`w-full h-11 text-sm border-2 transition-all duration-200 ${
                    locationStatus === 'success' 
                      ? 'border-green-500 text-green-600 bg-green-50' 
                      : locationStatus === 'error'
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getLocationStatusIcon()}
                    <span>{getLocationStatusText()}</span>
                  </div>
                </Button>
              </motion.div>

              {/* Coordonnées affichées si disponibles */}
              {formData.localisation.latitude && formData.localisation.longitude && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="mdi:check-circle" className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Coordonnées récupérées</span>
                  </div>
                  <div className="text-xs text-green-700 space-y-1">
                    <p>Latitude: {formData.localisation.latitude.toFixed(6)}</p>
                    <p>Longitude: {formData.localisation.longitude.toFixed(6)}</p>
                  </div>
                </motion.div>
              )}

              {/* Message d'information */}
              <motion.div 
                className="bg-blue-50 border border-blue-200 rounded-lg p-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <div className="flex items-start gap-2">
                  <Icon icon="mdi:information" className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-800">
                    <p className="font-medium mb-1">Géolocalisation :</p>
                    <p>La géolocalisation nous aide à mieux localiser votre établissement sur la carte. 
                    Vous pouvez aussi la saisir manuellement plus tard dans les paramètres.</p>
                  </div>
                </div>
              </motion.div>
            </div>
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
            
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0px 5px 15px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={nextStep}
                disabled={!isValid}
                className={`flex-1 h-11 text-sm font-medium transition-all duration-300 ${
                  isValid 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Suivant</span>
                <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 