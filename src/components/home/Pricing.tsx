'use client';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Écoles',
      price: '$15/mois',
      description: 'Parfait pour les petites et moyennes écoles cherchant une gestion simple.',
      features: [
        'Gestion des élèves',
        'Emplois du temps',
        'Communication de base',
        'Support par email',
      ],
    },
    {
      name: 'Universités',
      price: '$40/mois',
      description: 'Conçu pour les grandes institutions avec des besoins avancés.',
      features: [
        'Gestion des élèves & notes',
        'Paiements scolaires',
        'Tableau de bord analytics',
        'Support prioritaire',
      ],
    },
    {
      name: 'Autres',
      price: '$25/mois',
      description: 'Flexible pour ONG, centres de formation ou autres établissements.',
      features: [
        'Fonctionnalités personnalisables',
        'Communication intégrée',
        'Gestion des paiements',
        'Support standard',
      ],
    },
  ];

  return (
    <section className="relative overflow-visible bg-gradient-to-b from-white via-orange-50/30 to-orange-100/50 pt-20 pb-20 md:pt-28 md:pb-28">
      {/* Background inversé par rapport à HeroSection */}
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
            <span className="block">Des plans pour chaque établissement</span>
            <span className="block bg-gradient-to-r from-[#2b4a6a] to-[#7ba1c9] bg-clip-text text-transparent">
              adaptés à vos besoins
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
            Choisissez la solution qui convient à votre école, université ou organisation.
          </p>
        </motion.div>

        {/* Grille de plans */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative perspective-1000">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.3, ease: 'anticipate' }}
              style={{
                transform: `translateY(${Math.sin(index * 0.5) * 20}px)`,
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
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-r from-[#2b4a6a]/10 to-[#7ba1c9]/10 blur-2xl opacity-30"
                />
                <div className="relative flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-[#2b4a6a]">{plan.name}</h3>
                  <p className="text-3xl font-extrabold text-[#f97316]">{plan.price}</p>
                  <p className="text-base text-gray-600">{plan.description}</p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckIcon className="h-5 w-5 text-[#2b4a6a]" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className="mt-6 relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-base font-bold text-white shadow-lg hover:shadow-orange-500/40 transition-all duration-500 group"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10 flex items-center gap-2"
                    >
                      Choisir ce plan
                      <ArrowRightIcon className="h-5 w-5" />
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100"
                    />
                  </Link>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}