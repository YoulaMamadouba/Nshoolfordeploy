'use client';
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useRef } from "react";

const teamMembers = [
  {
    name: "Dr. Kwame Nkrumah",
    role: "Fondateur & CEO",
    description: "Visionnaire de l'éducation numérique en Afrique, avec 15 ans d'expérience dans la transformation des systèmes éducatifs. Ancien directeur d'école et expert UNESCO.",
    image: "/images/shawn.jpeg",
    phone: "+225 07 12 34 56 78",
    linkedin: "#",
    email: "ceo@nschool.education",
    achievements: ["Prix Innovation Africaine 2022", "Top 30 under 30 Forbes Africa"]
  },
  {
    name: "Aminata Diallo",
    role: "Directrice Technologie",
    description: "Ingénieure logiciel formée à l'ESMT Dakar. Spécialiste des architectures cloud adaptées aux infrastructures africaines. Passionnée par l'accessibilité numérique.",
    image: "/images/télécharger (1).jpg",
    phone: "+225 05 67 89 01 23",
    linkedin: "#",
    email: "cto@nschool.education",
    achievements: ["Membre IEEE", "Conférencière TEDxAbidjan"]
  },
  {
    name: "Jean-Baptiste Kouamé",
    role: "Responsable Pédagogique",
    description: "Docteur en sciences de l'éducation. A conçu des programmes scolaires pour 5 pays africains. Expert en gamification de l'apprentissage.",
    image: "/images/télécharger (2).jpg",
    phone: "+225 01 23 45 67 89",
    linkedin: "#",
    email: "cpo@nschool.education",
    achievements: ["Auteur 'L'École de Demain'", "Consultant UNICEF"]
  }
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const next = () => setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  const currentMember = teamMembers[currentIndex];

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
      x: [0, 10, -10, 0],
      y: [0, -5, 5, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section 
      ref={ref}
      className="relative w-full bg-white"
    >
      {/* Taches orange-ambre dynamiques */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-20 w-24 h-24 bg-gradient-to-r from-[#f57c00] to-amber-400 rounded-full opacity-20 blur-2xl"
          variants={splatterVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 right-40 w-16 h-16 bg-gradient-to-r from-[#f57c00] to-amber-400 rounded-full opacity-30 blur-xl"
          variants={splatterVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-[#f57c00] to-amber-400 rounded-full opacity-25 blur-xl"
          variants={splatterVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-12 h-12 bg-gradient-to-r from-[#f57c00] to-amber-400 rounded-full opacity-35 blur-xl"
          variants={splatterVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        />
        <motion.div
          className="absolute top-10 right-20 w-20 h-20 bg-gradient-to-r from-[#f57c00] to-amber-400 rounded-full opacity-25 blur-xl"
          variants={splatterVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-0 top-0 h-full w-full bg-[url('/images/school-pattern.svg')] bg-[length:200px_200px] bg-center" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 ">
        {/* Titre */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#151f28] text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Rencontrez <span className="text-[#f57c00]">notre équipe</span>
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Des experts passionnés par la révolution éducative en Afrique
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Image avec effet de carte */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentIndex}`}
              className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -50, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: 50, rotateY: -90 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={currentMember.image}
                alt={currentMember.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151f28]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.h3 
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentMember.name}
                </motion.h3>
                <motion.p 
                  className="text-[#f57c00] font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {currentMember.role}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Description avec effets */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${currentIndex}`}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {currentMember.description}
                </p>

                <div className="space-y-4 mb-8">
                  {currentMember.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-2 w-2 rounded-full bg-[#f57c00]"></div>
                      </div>
                      <p className="ml-3 text-gray-600">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <motion.a
                    href={`tel:${currentMember.phone}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#f57c00] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="h-5 w-5" />
                    <span>{currentMember.phone}</span>
                  </motion.a>

                  <div className="flex gap-4">
                    <motion.a
                      href={currentMember.linkedin}
                      target="_blank"
                      className="text-gray-500 hover:text-[#f57c00] transition-colors"
                      whileHover={{ y: -3, scale: 1.2 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${currentMember.email}`}
                      className="text-gray-500 hover:text-[#f57c00] transition-colors"
                      whileHover={{ y: -3, scale: 1.2 }}
                    >
                      <Mail className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-8 mt-16">
          <motion.button
            onClick={prev}
            className="p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:border-[#f57c00] transition-colors"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-6 w-6 text-[#151f28]" />
          </motion.button>

          <div className="flex items-center gap-2">
            {teamMembers.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${currentIndex === i ? 'w-8 bg-[#f57c00]' : 'w-4 bg-gray-300'}`}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            className="p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:border-[#f57c00] transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-6 w-6 text-[#151f28]" />
          </motion.button>
        </div>

        
      </div>
    </section>
  );
}