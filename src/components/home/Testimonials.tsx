// components/sections/Testimonials.tsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const testimonials = [
    {
      quote: "Depuis l'adoption de N School, notre établissement a gagné un temps précieux. La gestion des emplois du temps complexes pour nos 32 classes est maintenant un jeu d'enfant. La plateforme s'intègre parfaitement à notre contexte local.",
      author: "Dr. Fatou Ndiaye",
      role: "Directrice, Lycée Scientifique de Dakar (Sénégal)",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      stats: "+80% d'efficacité administrative"
    },
    {
      quote: "La communication avec les parents d'élèves a radicalement changé. Finis les carnets perdus ou les rendez-vous manqués. Les notifications en temps réel et le suivi des absences ont amélioré l'assiduité de nos élèves de 40%.",
      author: "M. Kwame Adjei",
      role: "Proviseur, Collège Moderne d'Abidjan (Côte d'Ivoire)",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      stats: "95% de parents satisfaits"
    },
    {
      quote: "En tant qu'enseignante dans une classe de 50 élèves, N School m'a sauvé la vie. La saisie des notes est intuitive et le calcul des moyennes automatique. Je gagne près de 10 heures par semaine !",
      author: "Mme Amina Bello",
      role: "Enseignante, Groupe Scolaire Étoile (Bénin)",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      stats: "30h/mois économisées"
    },
    {
      quote: "Nous avons testé plusieurs solutions avant de choisir N School. Son adaptation aux réalités africaines (coupures internet, multi-langues, prise en compte des spécificités locales) fait toute la différence.",
      author: "Prof. Issa Diop",
      role: "Doyen, Université Cheikh Anta Diop (Sénégal)",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      stats: "100% recommandation"
    },
    {
      quote: "La gestion financière intégrée a révolutionné notre école privée. Les paiements des frais scolaires sont maintenant tracés et sécurisés, avec des rapports automatiques pour notre comptabilité.",
      author: "M. Olivier Kouamé",
      role: "Directeur, Complexe Scolaire Les Pionniers (Côte d'Ivoire)",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      stats: "Paiements 100% tracés"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section 
      ref={ref}
      className="relative py-28 overflow-hidden bg-white"
    >
      {/* Fond scolaire créé avec CSS - version améliorée */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `
               linear-gradient(to right, #f57c0010 1px, transparent 1px),
               linear-gradient(to bottom, #f57c0010 1px, transparent 1px),
               repeating-linear-gradient(0deg, #151f2805 0px, #151f2805 1px, transparent 1px, transparent 40px),
               repeating-linear-gradient(90deg, #151f2805 0px, #151f2805 1px, transparent 1px, transparent 40px)
             `,
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-5xl font-bold text-[#151f28]"
        >
          Ils <span className="text-[#f57c00]">témoignent</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-center text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Découvrez comment N School transforme les établissements éducatifs en Afrique
        </motion.p>

        {/* Conteneur du carrousel */}
        <div className="mt-16 relative px-12">
          {/* Flèche gauche - style amélioré */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg border border-gray-200 hover:bg-[#f57c00] hover:border-[#f57c00] group transition-all"
            aria-label="Témoignage précédent"
          >
            <ChevronLeftIcon className="h-6 w-6 text-[#f57c00] group-hover:text-white transition-colors" />
          </button>

          {/* Témoignage actif */}
          <div className="mx-auto max-w-3xl">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
            >
              {/* Marquage scolaire en fond de carte */}
              <div className="absolute -right-4 -top-4 opacity-5 text-[#f57c00] text-9xl">
                {currentIndex % 3 === 0 ? "📚" : currentIndex % 3 === 1 ? "✏️" : "🏫"}
              </div>

              {/* Contenu du témoignage */}
              <div className="relative z-10">
                {/* Citation */}
                <blockquote className="text-gray-700 text-lg leading-relaxed italic relative pl-8">
                  <span className="absolute left-0 top-0 text-5xl text-[#f57c00] leading-none">"</span>
                  {testimonials[currentIndex].quote}
                </blockquote>

                {/* Auteur */}
                <div className="mt-8 flex items-center gap-4">
                  {/* Avatar en cercle - style amélioré */}
                  <div className="relative h-16 w-16 rounded-full border-2 border-[#f57c00] p-0.5 shadow-md">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].author}
                      className="rounded-full h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#151f28] text-lg">{testimonials[currentIndex].author}</p>
                    <p className="text-gray-500 text-sm mt-1">{testimonials[currentIndex].role}</p>
                  </div>
                </div>

                {/* Badge de stat - style amélioré */}
                <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-[#f57c00]/10 text-[#f57c00] text-sm font-semibold border border-[#f57c00]/20">
                  <span className="mr-2">📈</span>
                  {testimonials[currentIndex].stats}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Flèche droite - style amélioré */}
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg border border-gray-200 hover:bg-[#f57c00] hover:border-[#f57c00] group transition-all"
            aria-label="Témoignage suivant"
          >
            <ChevronRightIcon className="h-6 w-6 text-[#f57c00] group-hover:text-white transition-colors" />
          </button>

          {/* Indicateurs de position - style amélioré */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-8 rounded-full transition-all ${currentIndex === index ? 'bg-[#f57c00]' : 'bg-gray-300'}`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Éléments décoratifs scolaires animés - gauche et droite */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            transition: { duration: 25, repeat: Infinity, ease: "linear" } 
          }}
          className="absolute -left-20 top-1/3 opacity-5 text-[#f57c00] hidden md:block"
        >
          <svg width="180" height="180" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
            <path 
              d="M20,50 Q50,20 80,50 Q50,80 20,50" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{ 
            rotate: [360, 0],
            transition: { duration: 30, repeat: Infinity, ease: "linear" } 
          }}
          className="absolute -right-20 top-1/4 opacity-5 text-[#f57c00] hidden md:block"
        >
          <svg width="200" height="200" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,7" />
            <path 
              d="M30,30 L70,30 L70,70 L30,70 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}