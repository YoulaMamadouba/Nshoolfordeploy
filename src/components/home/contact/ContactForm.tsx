'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    focus: { scale: 1.02 }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: '0 10px 25px rgba(245, 124, 0, 0.3)' },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#2b4a6a] mb-3">
          Envoyez-nous un message
        </h2>
        <p className="text-gray-600">
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom et Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileFocus="focus"
            className="relative"
          >
            <label 
              htmlFor="name"
              className={`block text-sm font-medium mb-2 transition-colors ${
                focusedField === 'name' ? 'text-[#f57c00]' : 'text-gray-700'
              }`}
            >
              Nom complet *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                focusedField === 'name'
                  ? 'border-[#f57c00] shadow-lg shadow-orange-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Votre nom complet"
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            whileFocus="focus"
            className="relative"
          >
            <label 
              htmlFor="email"
              className={`block text-sm font-medium mb-2 transition-colors ${
                focusedField === 'email' ? 'text-[#f57c00]' : 'text-gray-700'
              }`}
            >
              Adresse email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                focusedField === 'email'
                  ? 'border-[#f57c00] shadow-lg shadow-orange-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="votre@email.com"
            />
          </motion.div>
        </div>

        {/* Sujet */}
        <motion.div
          variants={inputVariants}
          initial="initial"
          animate="animate"
          whileFocus="focus"
          className="relative"
        >
          <label 
            htmlFor="subject"
            className={`block text-sm font-medium mb-2 transition-colors ${
              focusedField === 'subject' ? 'text-[#f57c00]' : 'text-gray-700'
            }`}
          >
            Sujet *
          </label>
          <input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            required
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
              focusedField === 'subject'
                ? 'border-[#f57c00] shadow-lg shadow-orange-100'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            placeholder="De quoi souhaitez-vous nous parler ?"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          variants={inputVariants}
          initial="initial"
          animate="animate"
          whileFocus="focus"
          className="relative"
        >
          <label 
            htmlFor="message"
            className={`block text-sm font-medium mb-2 transition-colors ${
              focusedField === 'message' ? 'text-[#f57c00]' : 'text-gray-700'
            }`}
          >
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            required
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none ${
              focusedField === 'message'
                ? 'border-[#f57c00] shadow-lg shadow-orange-100'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            placeholder="Décrivez votre demande en détail..."
          />
        </motion.div>

        {/* Bouton d'envoi */}
        <motion.button
          type="submit"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#f57c00] to-orange-600 hover:from-[#e65100] hover:to-orange-700'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
              />
              Envoi en cours...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Envoyer le message
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm; 