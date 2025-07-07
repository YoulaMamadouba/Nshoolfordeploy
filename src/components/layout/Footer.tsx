'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Linkedin, Twitter, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3, margin: '-100px' });

  // Animation pour les sections du footer
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  // Animation pour les particules en forme de livre
  const bookParticleVariants = (index: number) => ({
    animate: {
      rotate: [0, 360],
      scale: [1, 1.3, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 4 + index * 0.5,
        repeat: Infinity,
        delay: index * 0.2,
        ease: 'easeInOut',
      },
    },
  });

  // Animation pour le CTA avec pulse uniquement
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  // Animation pour les liens en vague
  const waveVariants = (index: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 + index * 0.1, ease: 'easeOut' },
    },
    hover: { y: -5, transition: { duration: 0.2 } },
  });

  // Positions des particules en forme de livre
  const bookParticles = [
    { top: '10%', left: '10%', size: 20 },
    { top: '30%', left: '85%', size: 15 },
    { top: '50%', left: '20%', size: 18 },
    { top: '70%', left: '75%', size: 22 },
  ];

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-[#2b4a6a] py-20 mt-16"
      suppressHydrationWarning
    >
      {/* Fond dynamique avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3448] via-[#2b4a6a] to-[#f57c00]/20 opacity-70"></div>

      {/* Particules en forme de livre */}
      <div className="absolute inset-0 pointer-events-none">
        {bookParticles.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-[#f57c00]"
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.size,
              height: pos.size,
              transformOrigin: 'center',
            }}
            variants={bookParticleVariants(i)}
            animate="animate"
          >
            <BookOpen className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Section 1 : Mission avec effet de particules */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={sectionVariants}
            className="relative"
          >
            <h3 className="text-4xl font-extrabold">
              <span className="text-white">N</span>
              <span className="bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent">school</span>
            </h3>
            <p className="mt-4 text-base text-white/80 leading-relaxed">
              Révolutionner l'éducation en Afrique avec des solutions numériques accessibles, conçues pour inspirer et équiper les écoles de demain.
            </p>
            <motion.div
              className="absolute -top-4 -left-4 w-4 h-4 rounded-full bg-[#f57c00]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Section 2 : Navigation en vague interactive */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={sectionVariants}
            className="flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent mb-4">
              Explorer
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Accueil', 'À propos', 'Solutions', 'Contact'].map((item, i) => (
                <motion.div
                  key={i}
                  variants={waveVariants(i)}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover="hover"
                >
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="px-4 py-2 rounded-full bg-[#f57c00]/20 hover:bg-amber-400/30 text-white text-sm font-semibold transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mt-4 w-24 h-1 bg-gradient-to-r from-[#f57c00] to-amber-400"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Section 3 : Contact et réseaux sociaux */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={sectionVariants}
          >
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <motion.li
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="h-5 w-5 text-[#f57c00]" />
                <a
                  href="mailto:contact@nschool.education"
                  className="text-white hover:bg-gradient-to-r hover:from-[#f57c00] hover:to-amber-400 hover:bg-clip-text hover:text-transparent"
                >
                  contact@nschool.education
                </a>
              </motion.li>
              <motion.li
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="h-5 w-5 text-[#f57c00]" />
                <a
                  href="tel:+2250712345678"
                  className="text-white hover:bg-gradient-to-r hover:from-[#f57c00] hover:to-amber-400 hover:bg-clip-text hover:text-transparent"
                >
                  +225 07 12 34 56 78
                </a>
              </motion.li>
              <li className="flex gap-4">
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  className="p-2 rounded-full bg-[#f57c00]/20 hover:bg-amber-400/30"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Linkedin className="h-5 w-5 text-white" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  className="p-2 rounded-full bg-[#f57c00]/20 hover:bg-amber-400/30"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Twitter className="h-5 w-5 text-white" />
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA avec pulse uniquement */}
        <motion.div
          className="mt-12 text-center"
          variants={ctaVariants}
          initial="hidden"
          animate={isInView ? ['visible', 'pulse'] : 'hidden'}
        >
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 text-white font-semibold text-lg overflow-hidden"
          >
            <span className="relative z-10">Découvrez Nschool</span>
            <ArrowRight className="relative z-10 h-5 w-5" />
          </Link>
        </motion.div>

        {/* Copyright avec style spécifique */}
        <motion.div
          className="mt-12 text-center text-sm text-white/80"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div>
            © 2025{' '}
            <span className="relative inline-block">
              <span className="font-semibold">
                <span className="text-white">N</span>
                <span className="bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent">school</span>
              </span>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-[#f57c00]"
                  style={{ top: `${20 + i * 60}%`, left: `${85 + i * 10}%` }}
                  variants={bookParticleVariants(i)}
                  animate="animate"
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