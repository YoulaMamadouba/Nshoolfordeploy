'use client';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: '-100px' });

  // Animation pour le CTA avec pulse subtil
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: 'easeOut'
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Animation pour les particules décoratives (sans mouvement vertical)
  const particleVariants = (index: number) => ({
    animate: {
      x: [0, Math.cos(index * 1.5) * 6, 0],
      y: 0, // Position verticale fixe
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3 + index * 0.5,
        repeat: Infinity,
        delay: index * 0.3,
        ease: 'easeInOut',
      },
    },
  });

  // Animation pour l'effet glow subtil
  const glowVariants = {
    animate: {
      textShadow: [
        '0 0 10px rgba(245, 124, 0, 0.3)',
        '0 0 20px rgba(245, 124, 0, 0.5)',
        '0 0 10px rgba(245, 124, 0, 0.3)',
      ],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Positions fixes pour les particules flottantes
  const particlePositions = [
    { top: '10%', left: '15%' },
    { top: '20%', left: '25%' },
    { top: '30%', left: '35%' },
    { top: '40%', left: '45%' },
    { top: '50%', left: '55%' },
    { top: '60%', left: '65%' },
    { top: '70%', left: '75%' },
    { top: '80%', left: '85%' },
    { top: '90%', left: '95%' },
    { top: '15%', left: '20%' },
    { top: '25%', left: '30%' },
    { top: '35%', left: '40%' },
  ];

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-[#2b4a6a] py-20 mt-16"
      suppressHydrationWarning
    >
      {/* Effet de fond avec gradient subtil */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3448] via-[#2b4a6a] to-[#2b4a6a] opacity-50"></div>

      {/* Particules décoratives flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 opacity-30"
            style={{
              top: pos.top,
              left: pos.left,
              y: 0, // Position verticale fixe
              willChange: 'opacity, transform',
            }}
            variants={particleVariants(i)}
            animate="animate"
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne 1 : Nom et description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <div className="relative inline-block">
              <motion.h3
                className="text-2xl font-bold relative z-10"
                variants={glowVariants}
                animate={isInView ? 'animate' : {}}
                style={{ willChange: 'text-shadow' }}
              >
                <span className="text-white">N</span>
                <span className="text-white"> </span>
                <span className="bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent">School</span>
              </motion.h3>

              {/* Particules scintillantes autour du logo */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 z-0"
                  style={{
                    top: `${30 + i * 20}%`,
                    left: `${80 + i * 10}%`,
                    y: 0, // Position verticale fixe
                    willChange: 'opacity, transform',
                  }}
                  variants={particleVariants(i)}
                  animate={isInView ? 'animate' : {}}
                />
              ))}
            </div>
            <motion.p
              className="mt-4 text-base text-white/80 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ willChange: 'opacity' }}
            >
              Révolutionner la gestion scolaire en Afrique avec des solutions adaptées et accessibles.
            </motion.p>
          </motion.div>

          {/* Colonne 2 : Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <h4
              className="text-xl font-bold bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent"
            >
              Liens
            </h4>
            <ul className="mt-4 space-y-3">
              {['Accueil', 'À propos', 'Équipe', 'Contact'].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  style={{ willChange: 'opacity, transform' }}
                >
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-white hover:bg-gradient-to-r hover:from-[#f57c00] hover:to-amber-400 hover:bg-clip-text hover:text-transparent transition-all duration-300 group inline-block"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      style={{ willChange: 'transform' }}
                    >
                      {item}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne 3 : Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <h4
              className="text-xl font-bold bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent"
            >
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <motion.li
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ willChange: 'opacity, transform' }}
              >
                <Mail className="h-5 w-5 text-white group-hover:text-[#f57c00] transition-colors duration-300" />
                <a
                  href="mailto:contact@nschool.education"
                  className="text-white hover:bg-gradient-to-r hover:from-[#f57c00] hover:to-amber-400 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                >
                  contact@nschool.education
                </a>
              </motion.li>
              <motion.li
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ willChange: 'opacity, transform' }}
              >
                <Phone className="h-5 w-5 text-white group-hover:text-[#f57c00] transition-colors duration-300" />
                <a
                  href="tel:+2250712345678"
                  className="text-white hover:bg-gradient-to-r hover:from-[#f57c00] hover:to-amber-400 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                >
                  +225 07 12 34 56 78
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Colonne 4 : Réseaux sociaux et CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <h4
              className="text-xl font-bold bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent"
            >
              Suivez-nous
            </h4>
            <div className="mt-4 flex gap-4">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                className="text-white hover:text-[#f57c00] transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                style={{ willChange: 'transform' }}
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                className="text-white hover:text-[#f57c00] transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                style={{ willChange: 'transform' }}
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
            </div>

            <motion.div
              className="mt-6"
              variants={ctaVariants}
              initial="hidden"
              animate={isInView ? ['visible', 'pulse'] : 'hidden'}
              style={{ willChange: 'opacity, transform' }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300"
              >
                <span>Contactez-nous</span>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: 'transform' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright avec animation élégante */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 border-t border-white/20 pt-8 text-center"
          style={{ willChange: 'opacity' }}
        >
          <div className="text-base text-white/80">
            © 2025{' '}
            <span className="relative inline-block">
              <motion.span
                className="font-semibold relative z-10"
                variants={glowVariants}
                animate={isInView ? 'animate' : {}}
                style={{ willChange: 'text-shadow' }}
              >
                <span className="text-white">N</span>
                <span className="text-white"> </span>
                <span className="bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent">School</span>
              </motion.span>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-0.5 w-0.5 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 z-0 opacity-60"
                  style={{
                    top: `${20 + i * 60}%`,
                    left: `${85 + i * 10}%`,
                    y: 0, // Position verticale fixe
                    willChange: 'opacity, transform',
                  }}
                  variants={particleVariants(i)}
                  animate={isInView ? 'animate' : {}}
                />
              ))}
            </span>
            . Tous droits réservés.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}