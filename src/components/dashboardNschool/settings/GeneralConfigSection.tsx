'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  LanguageIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

export default function GeneralConfigSection() {
  const { theme } = useTheme();
  const [timezone, setTimezone] = useState('Africa/Lagos');
  const [currency, setCurrency] = useState('XOF');
  const [language, setLanguage] = useState('fr');
  const [interfaceTheme, setInterfaceTheme] = useState('light');

  const timezones = [
    { value: 'Africa/Lagos', label: 'Lagos (GMT+1)' },
    { value: 'Africa/Abidjan', label: 'Abidjan (GMT+0)' },
    { value: 'Africa/Dakar', label: 'Dakar (GMT+0)' },
    { value: 'Africa/Bamako', label: 'Bamako (GMT+0)' },
    { value: 'Africa/Ouagadougou', label: 'Ouagadougou (GMT+0)' },
  ];

  const currencies = [
    { value: 'XOF', label: 'Franc CFA (XOF)' },
    { value: 'XAF', label: 'Franc CFA (XAF)' },
    { value: 'NGN', label: 'Naira (NGN)' },
    { value: 'GHS', label: 'Cedi (GHS)' },
    { value: 'USD', label: 'Dollar US (USD)' },
  ];

  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'pt', label: 'Português' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className={`rounded-2xl shadow-sm border p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#f57c00]/10 rounded-lg">
            <GlobeAltIcon className="h-6 w-6 text-[#f57c00]" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Configuration Générale</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>Paramètres de base du système</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fuseau horaire */}
          <div className="space-y-3">
            <label className={`flex items-center gap-2 text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <ClockIcon className="h-4 w-4 text-gray-400" />
              Fuseau horaire
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white'
                  : 'bg-white border-gray-200'
              }`}
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Devise */}
          <div className="space-y-3">
            <label className={`flex items-center gap-2 text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
              Devise par défaut
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white'
                  : 'bg-white border-gray-200'
              }`}
            >
              {currencies.map((curr) => (
                <option key={curr.value} value={curr.value}>
                  {curr.label}
                </option>
              ))}
            </select>
          </div>

          {/* Langue */}
          <div className="space-y-3">
            <label className={`flex items-center gap-2 text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <LanguageIcon className="h-4 w-4 text-gray-400" />
              Langue d'interface
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white'
                  : 'bg-white border-gray-200'
              }`}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Thème */}
          <div className="space-y-3">
            <label className={`flex items-center gap-2 text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <SunIcon className="h-4 w-4 text-gray-400" />
              Thème d'interface
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setInterfaceTheme('light')}
                className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 ${
                  interfaceTheme === 'light'
                    ? 'border-[#f57c00] bg-[#f57c00]/10 text-[#f57c00]'
                    : theme === 'dark'
                      ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <SunIcon className="h-4 w-4" />
                Clair
              </button>
              <button
                onClick={() => setInterfaceTheme('dark')}
                className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 ${
                  interfaceTheme === 'dark'
                    ? 'border-[#f57c00] bg-[#f57c00]/10 text-[#f57c00]'
                    : theme === 'dark'
                      ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <MoonIcon className="h-4 w-4" />
                Sombre
              </button>
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-6 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Sauvegarde automatique</h4>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>Les paramètres sont sauvegardés automatiquement</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-[#f57c00] text-white rounded-lg hover:bg-[#e65100] transition-colors duration-200 text-sm font-medium"
            >
              Sauvegarder
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 