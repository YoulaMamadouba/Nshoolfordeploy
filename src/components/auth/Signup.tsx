'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import AuthNav from "./AuthNav";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface SignupFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export default function SignupForm({
  className,
  ...props
}: SignupFormProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("student"); // Default to first role

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

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

  const roleCardVariants = {
    hover: { 
      scale: 1.03, 
      y: -2, 
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 },
    selected: { 
      backgroundColor: "rgba(245, 158, 11, 0.2)",
      boxShadow: "0px 2px 8px rgba(245, 158, 11, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const roles = [
    { value: "student", label: "Élève/Étudiant", icon: "mdi:school" },
    { value: "parent", label: "Parent", icon: "mdi:account-group" },
    { value: "teacher", label: "Enseignant", icon: "mdi:teach" },
    { value: "school", label: "École", icon: "mdi:school-outline" },
    { value: "university", label: "Université", icon: "mdi:university" },
    { value: "administration", label: "Administration", icon: "mdi:office-building" },
    { value: "admin", label: "Direction", icon: "mdi:account-tie" }
  ];

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
        <div className="relative w-full max-w-[420px] z-10 mx-auto space-y-6">
          {/* Role Selection Carousel */}
          <motion.div variants={item} className="space-y-2">
            <Label className="text-gray-700 text-sm font-medium text-center block">Choisissez votre rôle</Label>
            <div className="flex overflow-x-auto gap-2 p-2 bg-gradient-to-r from-white/50 to-amber-50/50 backdrop-blur-sm rounded-xl snap-x snap-mandatory custom-scrollbar">
              {roles.map((role) => (
                <motion.div
                  key={role.value}
                  className={cn(
                    "flex-shrink-0 w-32 p-2 rounded-lg border border-gradient-to-r from-[#2b4a6a] to-[#4a6a8a] bg-white/90 flex items-center gap-2 cursor-pointer",
                    selectedRole === role.value 
                      ? "bg-amber-500/20 text-[#2b4a6a]" 
                      : "hover:bg-gradient-to-r hover:from-[#2b4a6a]/10 hover:to-[#4a6a8a]/10"
                  )}
                  variants={roleCardVariants}
                  whileHover={selectedRole === role.value ? {} : "hover"}
                  whileTap="tap"
                  onClick={() => setSelectedRole(role.value)}
                >
                  <Icon icon={role.icon} className="w-5 h-5 text-[#2b4a6a]" />
                  <span className="text-xs font-medium">{role.label}</span>
                </motion.div>
              ))}
            </div>
            <input type="hidden" name="role" value={selectedRole} />
          </motion.div>

          {/* Signup card with cascading animations */}
          <motion.div
            className={cn(
              "flex flex-col gap-4 w-full backdrop-blur-sm bg-white/85 rounded-xl p-2 shadow-2xl border border-amber-500/30",
              className
            )}
            variants={container}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
          >
            <Card className="border-0 bg-white/95">
              <CardHeader className="pb-2">
                <motion.div variants={item}>
                  <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                    Créer un compte
                  </CardTitle>
                </motion.div>
                <motion.div variants={item}>
                  <CardDescription className="text-gray-600 text-center text-sm">
                    Créez votre espace personnalisé
                  </CardDescription>
                </motion.div>
              </CardHeader>
              
              <CardContent className="pt-2">
                <motion.div className="space-y-4" variants={container}>
                  {/* Full Name Field */}
                  <motion.div className="space-y-1" variants={item}>
                    <Label htmlFor="fullname" className="text-gray-700 text-sm">Nom complet</Label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="Votre nom complet"
                        required
                        className="focus:ring-2 focus:ring-[#2b4a6a] focus:border-[#2b4a6a] h-9 text-sm w-full border-gray-300 placeholder-gray-400 transition-colors duration-200"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div className="space-y-1" variants={item}>
                    <Label htmlFor="email" className="text-gray-700 text-sm">E-mail</Label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemple@domaine.com"
                        required
                        className="focus:ring-2 focus:ring-[#2b4a6a] focus:border-[#2b4a6a] h-9 text-sm w-full border-gray-300 placeholder-gray-400 transition-colors duration-200"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div className="space-y-1" variants={item}>
                    <Label htmlFor="password" className="text-gray-700 text-sm">Mot de passe</Label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="focus:ring-2 focus:ring-[#2b4a6a] focus:border-[#2b4a6a] h-9 text-sm w-full border-gray-300 placeholder-gray-400 transition-colors duration-200"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Confirm Password Field */}
                  <motion.div className="space-y-1" variants={item}>
                    <Label htmlFor="confirmPassword" className="text-gray-700 text-sm">Confirmer le mot de passe</Label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        className="focus:ring-2 focus:ring-[#2b4a6a] focus:border-[#2b4a6a] h-9 text-sm w-full border-gray-300 placeholder-gray-400 transition-colors duration-200"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Signup Button with pulse effect */}
                  <motion.div variants={item}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0px 5px 15px rgba(245, 158, 11, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md py-1 h-9 text-sm transition-all duration-300"
                      >
                        S'inscrire
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Divider */}
                  <motion.div className="relative my-4" variants={item}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-xs text-gray-500">OU</span>
                    </div>
                  </motion.div>

                  {/* Google Button with animation */}
                  <motion.div variants={item}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(254, 243, 199, 0.5)"
                      }}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 flex items-center justify-center gap-2 py-1 h-9 text-sm transition-all duration-200"
                      >
                        <Icon icon="flat-color-icons:google" className="text-lg" />
                        Continuer avec Google
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Login Link with animation */}
                  <motion.div variants={item}>
                    <p className="mt-4 text-center text-xs text-gray-600">
                      Déjà un compte ?{' '}
                      <motion.span 
                        className="font-medium text-amber-600 hover:underline cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link href="/login">
                          Se connecter
                        </Link>
                      </motion.span>
                    </p>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}