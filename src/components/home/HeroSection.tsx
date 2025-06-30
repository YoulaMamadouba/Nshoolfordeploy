'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

// Hook simplifié pour le compteur
interface UseAnimatedCounterResult {
  count: number | string;
  suffix: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

function useAnimatedCounter(finalValue: string, duration: number = 2000): UseAnimatedCounterResult {
  const [count, setCount] = useState<number | string>(0);
  const [suffix, setSuffix] = useState<string>('');
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    // Extraire le nombre et le suffixe proprement
    const numberMatch = finalValue.match(/\d+/);
    const suffixMatch = finalValue.replace(/\d/g, '');
    
    const targetNumber = numberMatch ? parseInt(numberMatch[0]) : 0;
    setSuffix(suffixMatch || '');

    if (targetNumber === 0) {
      setCount(finalValue);
      return;
    }

    let startTime: number | null = null;
    interface AnimateFunction {
      (currentTime: number): void;
    }

    let animationId: number;

    const animate: AnimateFunction = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const progress: number = Math.min((currentTime - startTime) / duration, 1);
      const currentCount: number = Math.floor(targetNumber * progress);
      
      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [finalValue, duration, isInView]);

  return { count, suffix, ref: elementRef };
}

// Composant Statistique Simplifié
type StatCardProps = {
  value: string;
  label: string;
  index: number;
};

function StatCard({ value, label, index }: StatCardProps) {
  const { count, suffix, ref } = useAnimatedCounter(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="text-center p-4 rounded-2xl relative group"
    >
      {/* Contenu */}
      <div className="relative z-10">
        {/* Particule décorative */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3
          }}
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"
        />

        {/* Valeur principale */}
        <motion.div 
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent mb-2"
        >
          {typeof count === 'number' ? count + suffix : value}
        </motion.div>

        {/* Label */}
        <p className="text-sm font-medium text-gray-600">
          {label}
        </p>

        {/* Barre de progression */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ 
              delay: index * 0.1 + 0.5,
              duration: 1,
              ease: "easeOut"
            }}
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Éléments de fond animés */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-3xl"></div>
      </div>

      {/* Éléments décoratifs animés */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-10 top-1/4 h-16 w-16 rounded-full bg-amber-400/20 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute right-10 top-2/4 h-20 w-20 rounded-full bg-orange-500/20 blur-xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Texte à gauche */}
          <div className="text-center lg:text-left">
            {/* Titre principal */}
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

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-8 text-gray-600 mx-auto lg:mx-0"
            >
              La solution tout-en-un pour digitaliser votre établissement. Simplifiez la gestion des élèves, des notes, des emplois du temps et bien plus encore.
            </motion.p>

            {/* Boutons CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/register"
                className="relative overflow-hidden group rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-orange-500/30 hover:from-amber-600 hover:to-orange-700 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Commencer maintenant <ArrowRightIcon className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Link>

              <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-lg font-medium text-gray-900 shadow-md hover:bg-gray-50 transition-all duration-300 group">
                <PlayCircleIcon className="h-6 w-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                <span>Voir la démo</span>
              </button>
            </motion.div>

            {/* Section Statistiques */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16"
            >
              {/* Titre des statistiques */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center lg:text-left mb-8"
              >
                <h3 className="text-lg font-semibold text-gray-500 mb-3">
                  Ils nous font confiance
                </h3>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "64px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto lg:mx-0 rounded-full"
                />
              </motion.div>

              {/* Grille des statistiques */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {statsData.map((stat, index) => (
                  <StatCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    index={index}
                  />
                ))}
              </div>

              {/* Ligne décorative finale */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 2 }}
                className="mt-8 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"
              />
            </motion.div>
          </div>

          {/* Image à droite - Alignée avec le titre */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:justify-self-end lg:-mt-4">
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
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="rounded-2xl overflow-hidden shadow-2xl bg-white"
            >
              <div className="h-[600px] w-full">
                <Image
                  src="/images/bg1.png"
                  alt="Fille pointant vers la solution scolaire"
                  width={700}
                  height={800}
                  className="object-cover object-bottom w-full h-full"
                  quality={100}
                  priority
                />
              </div>
            </motion.div>

            {/* Effet de lueur subtile */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-orange-500/5 rounded-2xl blur-xl -z-10 scale-105" />
          </div>
        </div>
      </div>
    </section>
  );
}