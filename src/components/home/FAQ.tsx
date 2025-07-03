'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDownIcon, AcademicCapIcon, GlobeAltIcon, ShieldCheckIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const faqs = [
    {
      question: "Comment N School s'adapte-t-il aux réalités africaines ?",
      answer: "N School a été conçu spécifiquement pour l'Afrique avec des fonctionnalités comme le mode hors-ligne, la prise en charge des coupures d'électricité, le multi-langues (français, anglais, arabe), et l'adaptation aux systèmes éducatifs locaux. Notre plateforme fonctionne même avec une connexion internet instable.",
      icon: GlobeAltIcon,
      category: "Adaptation locale"
    },
    {
      question: "Quels sont les coûts et la tarification ?",
      answer: "Nous proposons des plans flexibles adaptés à tous les budgets : 15$/mois pour les petites écoles, 25$/mois pour les ONG, et 40$/mois pour les universités. Aucun frais caché, pas de contrat long terme, et une période d'essai gratuite de 30 jours.",
      icon: AcademicCapIcon,
      category: "Tarification"
    },
    {
      question: "La sécurité des données est-elle garantie ?",
      answer: "Absolument. Nous utilisons un chiffrement de niveau bancaire (AES-256), des sauvegardes automatiques quotidiennes, et respectons le RGPD. Vos données restent votre propriété et sont hébergées sur des serveurs sécurisés en Afrique.",
      icon: ShieldCheckIcon,
      category: "Sécurité"
    },
    {
      question: "Puis-je utiliser N School sur mobile ?",
      answer: "Oui ! N School est entièrement responsive et fonctionne parfaitement sur smartphones et tablettes. Nous proposons également une application mobile native pour iOS et Android avec toutes les fonctionnalités principales.",
      icon: DevicePhoneMobileIcon,
      category: "Mobilité"
    },
    {
      question: "Quel support technique proposez-vous ?",
      answer: "Notre équipe de support est disponible 24/7 en français et en anglais. Nous proposons des formations gratuites, une documentation complète, des tutoriels vidéo, et un chat en direct pour les questions urgentes.",
      icon: AcademicCapIcon,
      category: "Support"
    },
    {
      question: "Combien de temps pour migrer mes données existantes ?",
      answer: "La migration est simple et rapide ! Notre équipe vous accompagne gratuitement pour importer vos données existantes (élèves, notes, emplois du temps) en moins de 48h. Aucune interruption de service.",
      icon: GlobeAltIcon,
      category: "Migration"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={ref}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-orange-50/30 via-white to-white"
    >
      {/* Éléments décoratifs scolaires */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-10 top-20 w-32 h-32 border-2 border-orange-400 rounded-full"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-20 bottom-20 w-24 h-24 border-2 border-amber-500 rounded-full"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Questions <span className="bg-gradient-to-r from-[#2b4a6a] to-[#7ba1c9] bg-clip-text text-transparent">fréquentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur N School et son adaptation aux réalités africaines
          </p>
        </motion.div>

        {/* Grille FAQ innovante */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleFAQ(index)}
              >
                {/* Fond décoratif */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-amber-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* En-tête de la question */}
                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-[#f57c00] to-amber-500 rounded-xl shadow-lg">
                    <faq.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDownIcon className="h-5 w-5 text-[#f57c00] group-hover:text-amber-600 transition-colors" />
                      </motion.div>
                    </div>
                    
                    {/* Catégorie */}
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Réponse animée */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-gray-200/50">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                    
                    {/* Indicateur visuel */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#f57c00] rounded-full animate-pulse" />
                      <span className="text-sm text-gray-500">Réponse complète</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#f57c00]/10 to-amber-500/10 rounded-2xl p-8 border border-[#f57c00]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vous avez d'autres questions ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous accompagner dans votre transition numérique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-[#f57c00] to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                Contactez-nous
              </button>
              <button className="px-8 py-3 bg-white border border-[#f57c00] text-[#f57c00] font-semibold rounded-xl hover:bg-[#f57c00] hover:text-white transition-all duration-300">
                Voir la démo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 