'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import AuthNav from "./AuthNav";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface LoginSchoolProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function LoginSchool({
  className,
  ...props
}: LoginSchoolProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState<'subdomain' | 'login'>('subdomain');
  const [subdomain, setSubdomain] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const floating = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Validation du sous-domaine
  useEffect(() => {
    const checkSubdomain = async () => {
      if (!subdomain) {
        setSubdomainStatus('idle');
        return;
      }

      if (subdomain.length < 3) {
        setSubdomainStatus('invalid');
        return;
      }

      setSubdomainStatus('checking');

      // Simulation de vérification de sous-domaine
      setTimeout(() => {
        // Simulation : toujours valide pour les tests
        setSubdomainStatus('valid');
      }, 500);
    };

    const timeoutId = setTimeout(checkSubdomain, 300);
    return () => clearTimeout(timeoutId);
  }, [subdomain]);

  const handleSubdomainSubmit = () => {
    if (subdomainStatus === 'valid') {
      setStep('login');
    }
  };

  const getSubdomainStatusIcon = () => {
    switch (subdomainStatus) {
      case 'checking':
        return <Icon icon="mdi:loading" className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'valid':
        return <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-500" />;
      case 'invalid':
        return <Icon icon="mdi:close-circle" className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getSubdomainStatusText = () => {
    switch (subdomainStatus) {
      case 'checking':
        return "Vérification...";
      case 'valid':
        return "Établissement trouvé";
      case 'invalid':
        return "Sous-domaine invalide";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-amber-50 overflow-hidden" {...props}>
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

      {/* Navbar with entry animation */}
      <motion.div
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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
          variants={floating}
          animate="animate"
        />
        
        {/* Floating particles effect */}
        {isMounted && (
          <>
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
          </>
        )}

        {/* Main container with animations */}
        <div className="relative w-full max-w-md z-10 mx-auto space-y-6">
          {/* Login card with cascading animations */}
          <div
            className={cn(
              "flex flex-col gap-4 w-full backdrop-blur-sm bg-white/85 rounded-xl p-2 shadow-2xl border border-amber-500/30",
              className
            )}
          >
            <Card className="border-0 bg-white/95">
              <CardHeader className="pb-3">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 text-center">
                    Connexion Établissement
                  </CardTitle>
                </div>
                <div>
                  <CardDescription className="text-gray-600 text-center text-sm">
                    Accédez à votre espace d'administration
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="pt-2">
                <AnimatePresence mode="wait">
                  {step === 'subdomain' ? (
                    <motion.div 
                      key="subdomain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="space-y-4"
                    >
                      {/* Sous-domaine */}
                      <div className="space-y-2">
                        <Label htmlFor="subdomain" className="text-gray-700 text-sm font-medium">
                          Identifiez votre établissement
                        </Label>
                        <div className="relative">
                          <Input
                            id="subdomain"
                            type="text"
                            placeholder="ex: etienne"
                            value={subdomain}
                            onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                            className="focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm transition-all duration-200 pr-10"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {getSubdomainStatusIcon()}
                          </div>
                        </div>
                        
                        {/* Prévisualisation */}
                        {subdomain && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md"
                          >
                            Votre établissement : <span className="font-mono text-amber-600">
                              {subdomain}.localhost:8000
                            </span>
                          </motion.div>
                        )}
                        
                        {/* Statut */}
                        {subdomain && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-xs ${
                              subdomainStatus === 'valid' ? 'text-green-600' :
                              subdomainStatus === 'invalid' ? 'text-red-600' :
                              'text-gray-600'
                            }`}
                          >
                            {getSubdomainStatusText()}
                          </motion.div>
                        )}
                      </div>

                      {/* Bouton Continuer */}
                      <div>
                        <Button
                          onClick={handleSubdomainSubmit}
                          disabled={subdomainStatus !== 'valid'}
                          className={`w-full h-11 text-sm font-medium transition-all duration-300 ${
                            subdomainStatus === 'valid'
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <span>Continuer</span>
                          <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      {/* Lien vers support */}
                      <div className="text-center">
                        <p className="text-xs text-gray-600">
                          Problème d'accès ?{' '}
                          <Link href="/support" className="text-amber-600 hover:underline font-medium">
                            Contactez le support
                          </Link>
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="space-y-4"
                    >
                      {/* En-tête avec info établissement */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:school" className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-medium text-amber-800">
                            {subdomain}.localhost:8000
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setStep('subdomain')}
                            className="ml-auto text-xs text-amber-600 hover:text-amber-700"
                          >
                            Changer
                          </Button>
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-gray-700 text-sm">E-mail</Label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            id="email"
                            type="email"
                            placeholder="admin@votre-etablissement.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm w-full border-gray-300 placeholder-gray-400 transition-colors duration-200"
                          />
                        </motion.div>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-gray-700 text-sm">Mot de passe</Label>
                          <motion.a 
                            href="#" 
                            className="text-xs text-amber-600 hover:underline"
                            whileHover={{ scale: 1.05 }}
                          >
                            Mot de passe oublié ?
                          </motion.a>
                        </div>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 text-sm w-full border-gray-300 placeholder-gray-400 transition-colors duration-200"
                          />
                        </motion.div>
                      </div>

                      {/* Login Button */}
                      <div>
                        <motion.div
                          whileHover={{ 
                            scale: 1.01,
                            boxShadow: "0px 3px 10px rgba(245, 158, 11, 0.3)"
                          }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md py-1 h-11 text-sm transition-all duration-300"
                          >
                            Se connecter
                          </Button>
                        </motion.div>
                      </div>

                      {/* Divider */}
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-2 bg-white text-xs text-gray-500">OU</span>
                        </div>
                      </div>

                      {/* Google Button */}
                      <div>
                        <motion.div
                          whileHover={{ 
                            scale: 1.01,
                            backgroundColor: "rgba(254, 243, 199, 0.3)"
                          }}
                        >
                          <Button
                            variant="outline"
                            className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 flex items-center justify-center gap-2 py-1 h-11 text-sm transition-all duration-200"
                          >
                            <Icon icon="flat-color-icons:google" className="text-lg" />
                            Continuer avec Google
                          </Button>
                        </motion.div>
                      </div>

                      {/* Signup Link */}
                      <div>
                        <p className="mt-4 text-center text-xs text-gray-600">
                          Pas encore d'établissement ?{' '}
                          <Link 
                            href="/signup" 
                            className="font-medium text-amber-600 hover:underline"
                          >
                            Créer un établissement
                          </Link>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 