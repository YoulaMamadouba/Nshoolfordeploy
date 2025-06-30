'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlobeAltIcon, BoltIcon, ScaleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation de texte pour "si oui , alors"
  const text = "si oui , alors";
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Délai entre chaque lettre
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Animation pour le bouton
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 2 }, // Apparition après 2s
    },
  };

  const features = [
    {
      title: "Gestion centralisée",
      description: "Gérez élèves, enseignants, notes, présences et emplois du temps dans une plateforme intuitive.",
      icon: <GlobeAltIcon className="h-12 w-12 text-[#f57c00]" />,
      animation: { y: [0, -10, 0], transition: { duration: 4, repeat: Infinity } },
    },
    {
      title: "Communication intégrée",
      description: "Connectez parents, élèves et enseignants via messagerie et notifications en temps réel.",
      icon: <BoltIcon className="h-12 w-12 text-[#f57c00]" />,
      animation: { rotate: [0, 10, -10, 0], transition: { duration: 5, repeat: Infinity } },
    },
    {
      title: "Personnalisation flexible",
      description: "Adaptez la plateforme à votre établissement avec des options modulaires et multi-tenant.",
      icon: <ScaleIcon className="h-12 w-12 text-[#f57c00]" />,
      animation: { scale: [1, 1.05, 1], transition: { duration: 3, repeat: Infinity } },
    },
  ];

  const comparisons = [
    { label: "Solutions occidentales", drawbacks: ["Lourdes", "Chères", "Pas adaptées"] },
    { label: "School", advantages: ["Léger", "Abordable", "Sur-mesure"] },
  ];

  return (
    <section 
      ref={ref}
      className="relative overflow-hidden py-28 bg-gradient-to-b from-[#f57c00]/5 to-white"
    >
      {/* Fond dynamique */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-full w-full bg-[url('/images/africa-outline.svg')] bg-contain bg-no-repeat bg-center" />
      </div>

      {/* Éléments décoratifs animés */}
      <motion.div
        animate={{
          rotate: [0, 360],
          transition: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
        className="absolute -left-20 top-1/3 opacity-5 text-[#f57c00]"
      >
        <svg width="300" height="300" viewBox="0 0 100 100">
          <path 
            d="M20,50 Q50,20 80,50 Q50,80 20,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Titre impactant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#151f28]">
            Pourquoi <span className="text-[#f57c00]">nous choisir</span> ?
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            La première solution <span className="font-semibold text-[#f57c00]">spécialement conçue</span> pour les défis des écoles africaines
          </p>
        </motion.div>

        {/* Comparaison visuelle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-28"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {comparisons.map((item, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl ${index === 0 ? 'bg-white shadow-lg' : 'bg-[#151f28] text-white'}`}
              >
                <h3 className={`text-2xl font-bold mb-6 ${index === 0 ? 'text-gray-800' : 'text-[#f57c00]'}`}>
                  {item.label}
                </h3>
                
                <ul className="space-y-4">
                  {index === 0 ? (
                    item.drawbacks?.map((drawback, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-3">✗</span>
                        <span>{drawback}</span>
                      </li>
                    ))
                  ) : (
                    item.advantages?.map((advantage, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-3">✓</span>
                        <span>{advantage}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>

          {/* Flèche animée entre les colonnes */}
          <motion.div
            animate={{
              x: [-20, 20, -20],
              transition: { duration: 3, repeat: Infinity }
            }}
            className="hidden md:flex items-center justify-center mt-8 text-[#f57c00]"
          >
            <svg width="100" height="24" viewBox="0 0 100 24">
              <path 
                d="M0,12 L80,12 M80,12 L60,0 M80,12 L60,24" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M20,12 L100,12 M100,12 L80,0 M100,12 L80,24" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <motion.div
                  animate={feature.animation}
                  className="flex justify-center mb-6"
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-center text-[#151f28] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>

              {/* Barre colorée en bas */}
              <div className="h-2 bg-gradient-to-r from-[#f57c00] to-amber-400" />
            </motion.div>
          ))}
        </div>

        {/* Statistiques impressionnantes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-28 bg-[#151f28] rounded-3xl p-12 text-white relative overflow-hidden"
        >
          {/* Fond animé */}
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              transition: { duration: 15, repeat: Infinity }
            }}
            className="absolute inset-0 opacity-10"
          >
            <div className="grid grid-cols-5 gap-8 h-full">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="border-r border-[#f57c00]/20" />
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Accessible" },
              { value: "90%", label: "Transparence" },
              { value: "80%", label: "Temps gagné" },
              { value: "100%", label: "Adapté" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-[#f57c00] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 uppercase text-sm tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-[#151f28] mb-6">
            Prêt à moderniser la gestion scolaire ?
          </h3>
          <motion.p
            className="text-lg text-gray-600 mb-8 font-bold"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>
          <motion.a
            href="/login"
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f57c00] to-amber-400 px-6 py-3 text-base font-bold text-white shadow-lg hover:shadow-orange-500/40 transition-all duration-500"
          >
            Connectez-vous
            <ArrowRightIcon className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}