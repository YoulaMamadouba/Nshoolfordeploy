'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

// Global CSS for gradient animations
const globalStyles = `
  @keyframes gradientPulse {
    0% { stop-opacity: 0.7; }
    50% { stop-opacity: 1; }
    100% { stop-opacity: 0.7; }
  }
  .gradient-pulse stop:nth-child(1),
  .gradient-pulse stop:nth-child(3) {
    animation: gradientPulse 3s ease-in-out infinite;
  }
  .gradient-pulse stop:nth-child(2) {
    animation: gradientPulse 3s ease-in-out infinite reverse;
  }
  
  @keyframes iceShimmer {
    0% { 
      stroke-dashoffset: 0;
      opacity: 0.6;
    }
    50% { 
      stroke-dashoffset: -20;
      opacity: 1;
    }
    100% { 
      stroke-dashoffset: -40;
      opacity: 0.6;
    }
  }
  
  @keyframes iceGlow {
    0%, 100% { 
      filter: drop-shadow(0 0 8px rgba(125, 211, 252, 0.4)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.2));
    }
    50% { 
      filter: drop-shadow(0 0 12px rgba(125, 211, 252, 0.8)) drop-shadow(0 0 24px rgba(59, 130, 246, 0.4));
    }
  }
  
  @keyframes icePulse {
    0%, 100% { 
      stroke-width: 2;
      opacity: 0.8;
    }
    50% { 
      stroke-width: 3;
      opacity: 1;
    }
  }
  
  .ice-line {
    animation: iceShimmer 3s ease-in-out infinite, iceGlow 4s ease-in-out infinite;
  }
  
  .ice-line-vertical {
    animation: iceShimmer 2.5s ease-in-out infinite reverse, iceGlow 3.5s ease-in-out infinite;
  }
  
  .ice-line-horizontal {
    animation: iceShimmer 3.5s ease-in-out infinite, iceGlow 4.5s ease-in-out infinite;
  }
  
  .ice-pulse {
    animation: icePulse 2s ease-in-out infinite;
  }
`;

// Hook pour le compteur animé avec IntersectionObserver
interface UseAnimatedCounterResult {
  count: number | string;
  suffix: string;
  ref: React.RefObject<HTMLDivElement>;
}

function useAnimatedCounter(finalValue: string, duration: number = 2000): UseAnimatedCounterResult {
  const [count, setCount] = useState<number | string>(0);
  const [suffix, setSuffix] = useState<string>('');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

    const numberMatch = finalValue.match(/\d+/);
    const suffixMatch = finalValue.replace(/\d/g, '');
        const targetNumber = numberMatch ? parseInt(numberMatch[0], 10) : 0;
    setSuffix(suffixMatch || '');

    if (targetNumber === 0) {
      setCount(finalValue);
      return;
    }

    let startTime: number | null = null;
        const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentCount = Math.floor(targetNumber * progress);
      setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

        const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [finalValue, duration]);

  return { count, suffix, ref: elementRef as React.RefObject<HTMLDivElement> };
}

// Composant pour une carte de statistique
interface StatCardProps {
  value: string;
  label: string;
  index: number;
}

function StatCard({ value, label, index }: StatCardProps) {
  const { count, suffix, ref } = useAnimatedCounter(value);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="text-center p-4 rounded-2xl relative group cursor-pointer"
      // style={{ border: '1px solid red' }} // Décommenter pour déboguer
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-amber-50/80 rounded-2xl shadow-lg"
      />
      <div className="relative z-10">
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"
        />
        <motion.div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent mb-2">
          {typeof count === 'number' ? `${count}${suffix}` : value}
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 360] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 -right-1 text-amber-400 text-sm"
            >
              ✨
            </motion.span>
          )}
        </motion.div>
        <p className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
          {label}
        </p>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const statsData = [
    { value: '100+', label: 'Écoles' },
    { value: '50K+', label: 'Utilisateurs' },
    { value: '24/7', label: 'Disponibilité' },
    { value: '95%', label: 'Satisfaction' },
  ];

  const handleImageError = () => {
    console.error('Erreur de chargement de l’image /images/bg1.png. Vérifiez que le fichier existe dans /public/images/');
  };

  return (
    <section className="relative overflow-visible bg-gradient-to-b from-orange-50 via-white to-white pt-20 pb-16 md:pt-40 md:pb-28">
      <style>{globalStyles}</style>
      {/* Suppression du voile orange de fond */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="block bg-gradient-to-r from-[#2b4a6a] to-[#7ba1c9] bg-clip-text text-transparent">
                Révolutionnez la gestion scolaire en Afrique
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-8 text-gray-600 mx-auto lg:mx-0"
            >
              La solution tout-en-un pour digitaliser votre établissement. Simplifiez la gestion des élèves, des notes, des emplois du temps et bien plus encore.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/register"
                className="relative overflow-hidden group rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-lg font-bold text-white shadow-lg hover:shadow-orange-500/30 hover:from-amber-600 hover:to-orange-700 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Commencer maintenant <ArrowRightIcon className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Link>
              <Link href="/demo" className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-lg font-medium text-gray-900 shadow-md hover:bg-gray-50 transition-all duration-300 group">
                <PlayCircleIcon className="h-6 w-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                <span>Voir la démo</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center lg:text-left mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-500 mb-3">Ils nous font confiance</h3>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '64px' }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto lg:mx-0 rounded-full"
                />
              </motion.div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {statsData.map((stat, index) => (
                  <StatCard key={index} value={stat.value} label={stat.label} index={index} />
                ))}
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 2 }}
                className="mt-8 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"
              />
            </motion.div>
          </div>
          <div className="relative w-full max-w-[1500px] mx-auto -mx-4 sm:-mx-6 lg:-mx-12 lg:max-w-none lg:justify-self-end lg:-mt-4 overflow-visible">
                        <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0]
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative"
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/images/bg1.png"
                alt="Fille pointant vers la solution scolaire"
                width={2400}
                height={1600}
                className="object-cover w-full h-[400px] sm:h-[500px] md:h-[600px]"
                style={{ objectPosition: '50% 100%', background: 'transparent' }}
                quality={100}
                priority
                onError={handleImageError}
              />
              
              {/* Effet Fresnel Light Move - Ultra Premium Enhanced */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Suppression des halos orange qui créent le voile */}
                
                {/* Ligne de lumière traversante verticale intensifiée */}
                <motion.div
                  className="absolute right-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-amber-400/80 to-transparent"
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                
                {/* Ligne de lumière secondaire */}
                <motion.div
                  className="absolute right-1/3 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-orange-500/60 to-transparent"
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                />
                
                {/* Reflet en verre animé amélioré */}
                <motion.div
                  className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-white/30 via-transparent to-transparent"
                  animate={{
                    x: [0, -30, 0],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                

                
                {/* Effet de fresnel - Ligne de lumière horizontale principale */}
                <motion.div
                  className="absolute right-0 top-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400/90 to-transparent"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                
                {/* Ligne de lumière horizontale secondaire */}
                <motion.div
                  className="absolute right-0 top-2/3 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />
                
                {/* Suppression du halo de profondeur orange */}
                
                {/* Effet de brillance traversant */}
                <motion.div
                  className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white/40 via-transparent to-transparent"
                  animate={{
                    x: [0, -50, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}