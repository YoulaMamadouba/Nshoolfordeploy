'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step1SchoolInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const schoolTypes = [
  { value: "PRIMAIRE", label: "École Primaire" },
  { value: "COLLEGE", label: "Collège" },
  { value: "LYCEE", label: "Lycée" },
  { value: "UNIVERSITE", label: "Université" },
  { value: "INSTITUT", label: "Institut" },
  { value: "ECOLE_PRIVEE", label: "École Privée" },
  { value: "AUTRE", label: "Autre" }
];

export default function Step1SchoolInfo({ formData, updateFormData, nextStep }: Step1SchoolInfoProps) {
  const [subdomainStatus, setSubdomainStatus] = useState<'checking' | 'available' | 'taken' | 'invalid'>('checking');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isValid, setIsValid] = useState(false);

  // Générer un sous-domaine suggéré basé sur le nom de l'école
  const generateSubdomain = (schoolName: string) => {
    if (!schoolName) return "";
    
    return schoolName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Enlever les accents
      .replace(/[^a-z0-9]/g, "") // Garder seulement les lettres et chiffres
      .substring(0, 20);
  };

  // Validation en temps réel du sous-domaine
  useEffect(() => {
    const checkSubdomain = async () => {
      if (!formData.subdomain) {
        setSubdomainStatus('checking');
        return;
      }

      if (formData.subdomain.length < 3) {
        setSubdomainStatus('invalid');
        return;
      }

      // Simulation de vérification de disponibilité - toujours disponible pour les tests
      setTimeout(() => {
        setSubdomainStatus('available'); // Toujours disponible en mode simulation
      }, 300);
    };

    const timeoutId = setTimeout(checkSubdomain, 300);
    return () => clearTimeout(timeoutId);
  }, [formData.subdomain]);

  // Validation générale du formulaire
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.school_name || formData.school_name.length < 2) {
      newErrors.school_name = "Le nom de l'établissement doit contenir au moins 2 caractères";
    }

    if (!formData.school_type) {
      newErrors.school_type = "Veuillez sélectionner un type d'établissement";
    }

    if (!formData.subdomain || formData.subdomain.length < 3) {
      newErrors.subdomain = "Le sous-domaine doit contenir au moins 3 caractères";
    } else if (subdomainStatus === 'taken') {
      newErrors.subdomain = "Ce sous-domaine est déjà pris";
    } else if (subdomainStatus === 'invalid') {
      newErrors.subdomain = "Le sous-domaine contient des caractères invalides";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && subdomainStatus === 'available');
  }, [formData, subdomainStatus]);

  const handleSchoolNameChange = (value: string) => {
    updateFormData({ school_name: value });
    if (!formData.subdomain || formData.subdomain === generateSubdomain(formData.school_name)) {
      updateFormData({ subdomain: generateSubdomain(value) });
    }
  };

  const getSubdomainStatusIcon = () => {
    switch (subdomainStatus) {
      case 'checking':
        return <Icon icon="mdi:loading" className="w-5 h-5 text-gray-400 animate-spin" />;
      case 'available':
        return <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500" />;
      case 'taken':
        return <Icon icon="mdi:close-circle" className="w-5 h-5 text-red-500" />;
      case 'invalid':
        return <Icon icon="mdi:alert-circle" className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getSubdomainStatusText = () => {
    switch (subdomainStatus) {
      case 'checking':
        return "Vérification...";
      case 'available':
        return "Disponible";
      case 'taken':
        return "Déjà pris";
      case 'invalid':
        return "Format invalide";
      default:
        return "";
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
            <Icon icon="mdi:school" className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Informations de l'Établissement
          </CardTitle>
          <CardDescription className="text-gray-600">
            Commençons par les informations de base de votre établissement
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Nom de l'établissement */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="school_name" className="text-gray-700 text-sm font-medium">
              Nom de l'établissement *
            </Label>
            <Input
              id="school_name"
              type="text"
              placeholder="Ex: École Saint-Joseph"
              value={formData.school_name}
              onChange={(e) => handleSchoolNameChange(e.target.value)}
              className={`focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                errors.school_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.school_name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.school_name}
              </motion.p>
            )}
          </motion.div>

          {/* Type d'établissement */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="school_type" className="text-gray-700 text-sm font-medium">
              Type d'établissement *
            </Label>
            <Select
              value={formData.school_type}
              onValueChange={(value) => updateFormData({ school_type: value })}
            >
              <SelectTrigger className={`h-11 text-sm transition-all duration-200 ${
                errors.school_type ? 'border-red-500' : 'border-gray-300'
              }`}>
                <SelectValue placeholder="Sélectionnez le type d'établissement" />
              </SelectTrigger>
              <SelectContent>
                {schoolTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.school_type && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.school_type}
              </motion.p>
            )}
          </motion.div>

          {/* Sous-domaine */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="subdomain" className="text-gray-700 text-sm font-medium">
              Sous-domaine *
            </Label>
            <div className="relative">
              <Input
                id="subdomain"
                type="text"
                placeholder="votre-etablissement"
                value={formData.subdomain}
                onChange={(e) => updateFormData({ subdomain: e.target.value.toLowerCase() })}
                className={`pr-10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 ${
                  errors.subdomain ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getSubdomainStatusIcon()}
              </div>
            </div>
            
            {/* Prévisualisation du domaine */}
            {formData.subdomain && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md"
              >
                Votre domaine sera : <span className="font-mono text-amber-600">
                  {formData.subdomain}.localhost:8000
                </span>
              </motion.div>
            )}
            
            {/* Statut du sous-domaine */}
            {formData.subdomain && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs ${
                  subdomainStatus === 'available' ? 'text-green-600' :
                  subdomainStatus === 'taken' ? 'text-red-600' :
                  subdomainStatus === 'invalid' ? 'text-orange-600' :
                  'text-gray-600'
                }`}
              >
                {getSubdomainStatusText()}
              </motion.div>
            )}
            
            {errors.subdomain && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs"
              >
                {errors.subdomain}
              </motion.p>
            )}
          </motion.div>

          {/* Explication du sous-domaine */}
          <motion.div 
            className="bg-amber-50 border border-amber-200 rounded-lg p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-2">
              <Icon icon="mdi:information" className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-800">
                <p className="font-medium mb-1">À propos du sous-domaine :</p>
                <p>Ce sera l'adresse unique de votre établissement sur la plateforme. 
                Choisissez un nom simple et mémorable. Seuls les lettres, chiffres et tirets sont autorisés.</p>
              </div>
            </div>
          </motion.div>

          {/* Bouton Suivant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <Button
              onClick={nextStep}
              disabled={!isValid}
              className={`w-full h-11 text-sm font-medium transition-all duration-300 ${
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