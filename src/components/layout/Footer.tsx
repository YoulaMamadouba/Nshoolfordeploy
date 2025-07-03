'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation pour le CTA
  const ctaVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8,
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

  // Animation pour les taches
  const splatterVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Animation pour le contour néon
  const neonVariants = {
    animate: {
      textShadow: [
        '0 0 6px rgba(245, 124, 0, 0.2), 0 0 12px rgba(245, 124, 0, 0.1)',
        '0 0 10px rgba(245, 124, 0, 0.5), 0 0 20px rgba(245, 124, 0, 0.3)',
        '0 0 6px rgba(245, 124, 0, 0.2), 0 0 12px rgba(245, 124, 0, 0.1)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Animation pour les particules scintillantes
  const sparkleVariants = (index: number) => ({
    animate: {
      x: [0, Math.cos(index * 2) * 10, 0],
      y: [0, Math.sin(index * 2) * 10, 0],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 2 + Math.random() * 1,
        repeat: Infinity,
        delay: index * 0.4,
        ease: 'easeInOut',
      },
    },
  });

  return (
    <footer 
      ref={ref}
      className="relative overflow-hidden bg-[#2b4a6a] py-20 mt-16"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne 1 : Nom et description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative inline-block">
              <motion.h3
                className="text-2xl font-bold relative z-10"
                variants={neonVariants}
                animate={isInView ? 'animate' : {}}
              >
                <span className="bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent">N</span>
                <span className="text-white"> School</span>
              </motion.h3>
              {/* Particules scintillantes */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 z-0"
                  style={{ top: '50%', left: '50%' }}
                  variants={sparkleVariants(i)}
                  animate={isInView ? 'animate' : {}}
                />
              ))}
            </div>
            <p className="mt-4 text-base text-white/80">
              Révolutionner la gestion scolaire en Afrique avec des solutions adaptées et accessibles.
            </p>
          </motion.div>

          {/* Colonne 2 : Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-white">Liens</h4>
            <ul className="mt-4 space-y-2">
              {['Accueil', 'À propos', 'Équipe', 'Contact'].map((item, i) => (
                <li key={i}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-white hover:text-[#f57c00] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne 3 : Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 group">
                <Mail className="h-5 w-5 text-white group-hover:text-[#f57c00] transition-colors" />
                <a
                  href="mailto:contact@nschool.education"
                  className="text-white hover:text-[#f57c00] transition-colors"
                >
                  contact@nschool.education
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Phone className="h-5 w-5 text-white group-hover:text-[#f57c00] transition-colors" />
                <a
                  href="tel:+2250712345678"
                  className="text-white hover:text-[#f57c00] transition-colors"
                >
                  +225 07 12 34 56 78
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Colonne 4 : Réseaux sociaux et CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-xl font-bold text-white">Suivez-nous</h4>
            <div className="mt-4 flex gap-4">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                className="text-white hover:text-[#f57c00] transition-colors"
                whileHover={{ y: -3, scale: 1.2 }}
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                className="text-white hover:text-[#f57c00] transition-colors"
                whileHover={{ y: -3, scale: 1.2 }}
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
            </div>
            <motion.div
              className="mt-6"
              variants={ctaVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 px-4 py-2 text-base font-bold text-white shadow-xl hover:shadow-orange-500/50 transition-all duration-500"
              >
                Contactez-nous
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 border-t border-white/20 pt-6 text-center"
        >
          <p className="text-base text-white/80">
            © 2025{' '}
            <span className="relative inline-block">
              <motion.span
                className="font-bold relative z-10"
                variants={neonVariants}
                animate={isInView ? 'animate' : {}}
              >
                <span className="bg-gradient-to-r from-[#f57c00] to-amber-400 bg-clip-text text-transparent">N</span>
                <span className="text-white"> School</span>
              </motion.span>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 z-0"
                  style={{ top: '50%', left: '50%' }}
                  variants={sparkleVariants(i)}
                  animate={isInView ? 'animate' : {}}
                />
              ))}
            </span>
            . Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}