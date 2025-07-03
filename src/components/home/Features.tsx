'use client';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  UserGroupIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  ChartBarIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Features() {
  const features = [
    {
      title: 'Gestion des élèves',
      description: 'Centralisez les dossiers, suivez les présences et performances en un clic.',
      icon: UserGroupIcon,
    },
    {
      title: 'Notes et rapports',
      description: 'Automatisez les notes et créez des bulletins modernes instantanément.',
      icon: DocumentTextIcon,
    },
    {
      title: 'Emplois du temps',
      description: 'Planifiez et partagez des emplois du temps clairs et dynamiques.',
      icon: CalendarIcon,
    },
    {
      title: 'Communication',
      description: 'Connectez parents, enseignants et élèves en temps réel.',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      title: 'Paiements scolaires',
      description: 'Simplifiez les frais avec des transactions sécurisées en ligne.',
      icon: CreditCardIcon,
    },
    {
      title: 'Tableau de bord',
      description: 'Visualisez toutes vos données dans une interface intuitive.',
      icon: ChartBarIcon,
    },
  ];

  return (
    <section className="relative overflow-visible bg-gradient-to-b from-orange-50 via-white to-white pt-20 pb-20 md:pt-28 md:pb-28">
      {/* Background identique à HeroSection */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-3xl"></div>
      </div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-10 top-1/4 h-16 w-16 rounded-full bg-amber-400/20 blur-xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute right-10 top-2/4 h-20 w-20 rounded-full bg-orange-500/20 blur-xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            <span className="block">Transformez votre école</span>
            <span className="block bg-gradient-to-r from-[#2b4a6a] to-[#7ba1c9] bg-clip-text text-transparent">
              avec une technologie révolutionnaire
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
            Découvrez des outils inédits conçus pour les écoles africaines, alliant puissance et simplicité.
          </p>
        </motion.div>

        {/* Grille de fonctionnalités en arc */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative perspective-1000">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.3, ease: 'anticipate' }}
              style={{
                transform: `translateY(${Math.sin(index * 0.5) * 20}px) rotateY(${index % 2 === 0 ? 5 : -5}deg)`,
                zIndex: 10 - index,
              }}
            >
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                scale={1.05}
                transitionSpeed={500}
                className="relative p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                {/* Tache floue intégrée */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-r from-amber-400/10 to-orange-500/10 blur-2xl opacity-30"
                />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-10 w-10 text-[#f97316]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2b4a6a]">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <div className="mx-auto">
                    <ArrowRightCircleIcon className="h-8 w-8 text-[#2b4a6a]" />
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* CTA central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/register"
            className="relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-lg font-bold text-white shadow-lg hover:shadow-orange-500/40 transition-all duration-500 group"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 flex items-center gap-2"
            >
              Plus encore
              <ArrowRightIcon className="h-5 w-5" />
            </motion.span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}