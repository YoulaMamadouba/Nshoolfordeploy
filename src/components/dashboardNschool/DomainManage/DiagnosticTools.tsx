'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  CpuChipIcon,
  SignalIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface DiagnosticResult {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'error' | 'running';
  message: string;
  duration: number;
  timestamp: string;
}

const DiagnosticTools: React.FC = () => {
  const { theme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('lycee-vhugo.nschool.fr');

  const diagnosticTests = [
    {
      id: 'dns',
      name: 'Test DNS',
      description: 'Vérification de la résolution DNS',
      icon: GlobeAltIcon,
    },
    {
      id: 'ssl',
      name: 'Test SSL',
      description: 'Validation du certificat SSL',
      icon: ShieldCheckIcon,
    },
    {
      id: 'connectivity',
      name: 'Test de Connectivité',
      description: 'Vérification de l\'accessibilité',
      icon: SignalIcon,
    },
    {
      id: 'performance',
      name: 'Test de Performance',
      description: 'Mesure des temps de réponse',
      icon: CpuChipIcon,
    },
    {
      id: 'security',
      name: 'Test de Sécurité',
      description: 'Analyse des vulnérabilités',
      icon: ShieldCheckIcon,
    },
    {
      id: 'uptime',
      name: 'Test de Disponibilité',
      description: 'Monitoring de la disponibilité',
      icon: ClockIcon,
    },
  ];

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);

    // Simuler les tests de diagnostic
    for (const test of diagnosticTests) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const status = Math.random() > 0.7 ? 'error' : Math.random() > 0.5 ? 'warning' : 'success';
      const messages = {
        success: 'Test réussi',
        warning: 'Attention détectée',
        error: 'Erreur identifiée',
      };

      setResults(prev => [...prev, {
        id: test.id,
        name: test.name,
        status,
        message: messages[status],
        duration: Math.floor(Math.random() * 3000) + 500,
        timestamp: new Date().toISOString(),
      }]);
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircleIcon;
      case 'warning': return ExclamationTriangleIcon;
      case 'error': return XCircleIcon;
      case 'running': return ArrowPathIcon;
      default: return ClockIcon;
    }
  };

  const getStatusColor = (status: string) => {
    if (theme === 'dark') {
      switch (status) {
        case 'success': return { bg: 'bg-green-900/30', text: 'text-green-300', border: 'border-green-600/50' };
        case 'warning': return { bg: 'bg-yellow-900/30', text: 'text-yellow-300', border: 'border-yellow-600/50' };
        case 'error': return { bg: 'bg-red-900/30', text: 'text-red-300', border: 'border-red-600/50' };
        case 'running': return { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-600/50' };
        default: return { bg: 'bg-gray-700/30', text: 'text-gray-300', border: 'border-gray-600/50' };
      }
    } else {
      switch (status) {
        case 'success': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', border: 'border-[#f57c00]/20' };
        case 'warning': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', border: 'border-[#f57c00]/20' };
        case 'error': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', border: 'border-[#f57c00]/20' };
        case 'running': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', border: 'border-[#f57c00]/20' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
            : 'bg-gradient-to-br from-white via-white to-gray-50/50 border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl shadow-lg">
            <WrenchScrewdriverIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Outils de Diagnostic</h2>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Tests et diagnostics avancés pour vos domaines</p>
          </div>
        </div>

        {/* Domain Selection */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <label className={`block text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-[#2b4a6a]'
            }`}>Domaine à tester</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00] focus:border-transparent transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'border-gray-200 text-gray-900'
              }`}
            >
              <option value="lycee-vhugo.nschool.fr">lycee-vhugo.nschool.fr</option>
              <option value="www.lycee-vhugo.edu">www.lycee-vhugo.edu</option>
              <option value="college-moliere.nschool.fr">college-moliere.nschool.fr</option>
            </select>
      </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={runDiagnostics}
            disabled={isRunning}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              isRunning
                ? theme === 'dark' 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#f57c00] text-white hover:bg-[#e65100] shadow-lg hover:shadow-xl'
            }`}
          >
            {isRunning ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                Tests en cours...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="w-5 h-5" />
                Lancer les diagnostics
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Diagnostic Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagnosticTests.map((test, index) => {
          const TestIcon = test.icon;
          const result = results.find(r => r.id === test.id);
          const isRunning = result?.status === 'running';
          
          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl shadow-lg border overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#f57c00]/10 rounded-lg">
                    <TestIcon className="w-5 h-5 text-[#f57c00]" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                    }`}>{test.name}</h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{test.description}</p>
                  </div>
                </div>

                {result && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${getStatusColor(result.status).bg} ${getStatusColor(result.status).text} ${getStatusColor(result.status).border}`}>
                        {isRunning ? (
                          <ArrowPathIcon className="w-3 h-3 mr-1.5 animate-spin" />
                        ) : (
                          React.createElement(getStatusIcon(result.status), { className: "w-3 h-3 mr-1.5" })
                        )}
                        {result.status === 'success' ? 'Succès' : 
                         result.status === 'warning' ? 'Attention' : 
                         result.status === 'error' ? 'Erreur' : 'En cours...'}
                      </span>
                      <span className="text-xs text-gray-500">{result.duration}ms</span>
                    </div>
                    
                    <p className="text-sm text-gray-600">{result.message}</p>
                    
                    <div className="text-xs text-gray-400">
                      {new Date(result.timestamp).toLocaleTimeString('fr-FR')}
                    </div>
                  </div>
                )}

                {!result && (
                  <div className="text-center py-4">
                    <ClockIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">En attente de test</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Results Summary */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white via-white to-gray-50/50 border-gray-200/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
              <DocumentTextIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2b4a6a]">Résumé des Tests</h3>
              <p className="text-gray-600">Synthèse des diagnostics effectués</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-[#f57c00]/10 rounded-xl border border-[#f57c00]/20">
              <div className="text-3xl font-bold text-[#f57c00] mb-2">
                {results.filter(r => r.status === 'success').length}
              </div>
              <p className="text-[#2b4a6a] font-semibold">Tests réussis</p>
            </div>
            
            <div className="text-center p-4 bg-[#f57c00]/10 rounded-xl border border-[#f57c00]/20">
              <div className="text-3xl font-bold text-[#f57c00] mb-2">
                {results.filter(r => r.status === 'warning').length}
              </div>
              <p className="text-[#2b4a6a] font-semibold">Avertissements</p>
            </div>
            
            <div className="text-center p-4 bg-[#f57c00]/10 rounded-xl border border-[#f57c00]/20">
              <div className="text-3xl font-bold text-[#f57c00] mb-2">
                {results.filter(r => r.status === 'error').length}
              </div>
              <p className="text-[#2b4a6a] font-semibold">Erreurs</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#f57c00]/10 rounded-xl border border-[#f57c00]/20">
            <div className="flex items-center gap-3">
              <GlobeAltIcon className="w-5 h-5 text-[#f57c00]" />
              <div>
                <p className="text-[#2b4a6a] font-semibold">Domaine testé : {selectedDomain}</p>
                <p className="text-[#f57c00] text-sm">
                  Dernière vérification : {new Date().toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
      </div>
    </motion.div>
      )}
    </div>
  );
};

export default DiagnosticTools;