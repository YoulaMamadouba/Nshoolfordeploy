"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Directrice d'école",
    content: "Nschool a révolutionné notre gestion administrative. L'interface est intuitive et nous fait gagner un temps précieux chaque jour.",
    rating: 5,
    avatar: "/images/shawn.jpeg",
    category: "Administration"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Enseignant",
    content: "En tant qu'enseignant, je peux facilement suivre les progrès de mes élèves et communiquer avec les parents. Un outil indispensable !",
    rating: 5,
    avatar: "/images/shawn.jpeg",
    category: "Enseignement"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Parent d'élève",
    content: "Grâce à Nschool, je suis toujours informée des activités de mon enfant. La transparence et la facilité d'utilisation sont remarquables.",
    rating: 5,
    avatar: "/images/shawn.jpeg",
    category: "Parents"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Directeur technique",
    content: "L'intégration technique est parfaite. L'API est bien documentée et l'équipe support est réactive. Je recommande vivement !",
    rating: 5,
    avatar: "/images/shawn.jpeg",
    category: "Technique"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Responsable pédagogique",
    content: "La plateforme nous permet de personnaliser l'apprentissage pour chaque élève. Les résultats sont visibles dès les premiers mois.",
    rating: 5,
    avatar: "/images/shawn.jpeg",
    category: "Pédagogie"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Auto-play avec pause au hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/5 to-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-400/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de ceux qui ont transformé leur expérience éducative avec Nschool
          </p>
        </motion.div>

        {/* Système Cinématique Immersif */}
        <div className="relative max-w-6xl mx-auto">
          {/* Grille de cartes - Mur vivant */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`relative cursor-pointer group ${
                  index === currentIndex ? 'md:col-span-3 lg:col-span-3' : ''
                }`}
                onMouseEnter={() => {
                  setHoveredCard(index);
                  setIsAutoPlaying(false);
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setIsAutoPlaying(true);
                }}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                    index === currentIndex
                      ? 'bg-white shadow-2xl ring-2 ring-amber-400/20'
                      : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
                  }`}
                  layoutId={`card-${index}`}
                >
                  {/* Effet de spotlight pour la carte active */}
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-500/5 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  <div className="p-6">
                    {/* En-tête de la carte */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="relative"
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400/30">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Badge de catégorie */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            {testimonial.category.charAt(0)}
                          </span>
                        </div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Contenu du témoignage */}
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-amber-400/30" />
                      <p className={`text-gray-700 leading-relaxed ${
                        index === currentIndex ? 'text-base' : 'text-sm line-clamp-3'
                      }`}>
                        {testimonial.content}
                      </p>
                    </div>

                    {/* Indicateur de carte active */}
                    {index === currentIndex && (
                      <motion.div
                        className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Témoignage principal - Effet Glass Morphism */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-amber-400/20 p-8 md:p-12">
                {/* Effet de fresnel en arrière-plan */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-orange-500/5 rounded-3xl" />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 10, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-amber-400/30 shadow-lg">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Badge de catégorie premium */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-sm text-white font-bold">
                          {testimonials[currentIndex].category.charAt(0)}
                        </span>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {testimonials[currentIndex].name}
                        </h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-400/20 to-orange-500/20 text-amber-700 text-sm font-medium rounded-full">
                          {testimonials[currentIndex].category}
                        </span>
                      </div>
                      <p className="text-lg text-gray-600 mb-3">
                        {testimonials[currentIndex].role}
                      </p>
                      <div className="flex gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-amber-400/30" />
                    <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium pl-8">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Contrôles de navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl ring-1 ring-gray-200 hover:ring-amber-400/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-amber-600 transition-colors" />
            </motion.button>

            {/* Indicateurs de progression */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 scale-125'
                      : 'bg-gray-300 hover:bg-amber-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl ring-1 ring-gray-200 hover:ring-amber-400/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-amber-600 transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
