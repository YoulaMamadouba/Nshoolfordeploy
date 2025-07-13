'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentChartBarIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CogIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'revenue' | 'activity' | 'performance' | 'custom';
  icon: any;
  color: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'error';
  format: 'pdf' | 'csv' | 'excel' | 'json';
}

const ReportsAndExportSection: React.FC = () => {
  const { theme } = useTheme();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'excel' | 'json'>('pdf');
  const [emailSchedule, setEmailSchedule] = useState<'daily' | 'weekly' | 'monthly' | 'never'>('never');
  const [emailRecipients, setEmailRecipients] = useState<string>('');

  const reports: Report[] = [
    {
      id: '1',
      name: 'Rapport Revenus Mensuels',
      description: 'Analyse détaillée des revenus et abonnements',
      type: 'revenue',
      icon: CurrencyDollarIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      lastGenerated: '2024-01-15T10:30:00Z',
      status: 'ready',
      format: 'pdf',
    },
    {
      id: '2',
      name: 'Activité des Tenants',
      description: 'Statistiques d\'utilisation par établissement',
      type: 'activity',
      icon: UsersIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      lastGenerated: '2024-01-14T15:45:00Z',
      status: 'ready',
      format: 'excel',
    },
    {
      id: '3',
      name: 'Performance Technique',
      description: 'Métriques de performance et temps de réponse',
      type: 'performance',
      icon: ChartBarIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      lastGenerated: '2024-01-15T08:20:00Z',
      status: 'generating',
      format: 'csv',
    },
    {
      id: '4',
      name: 'Rapport Personnalisé',
      description: 'Rapport configurable selon vos besoins',
      type: 'custom',
      icon: CogIcon,
      color: 'from-[#f57c00] to-[#ff9800]',
      lastGenerated: '2024-01-13T14:15:00Z',
      status: 'error',
      format: 'json',
    },
  ];

  const handleGenerateReport = (reportId: string) => {
    setIsGenerating(true);
    setSelectedReport(reportId);
    
    // Simuler la génération du rapport
    setTimeout(() => {
      setIsGenerating(false);
      console.log(`Génération du rapport ${reportId} en format ${exportFormat}`);
    }, 3000);
  };

  const handleExport = (reportId: string, format: string) => {
    console.log(`Export du rapport ${reportId} en format ${format}`);
  };

  const handleScheduleEmail = () => {
    if (emailRecipients && emailSchedule !== 'never') {
      console.log(`Programmation d'envoi email ${emailSchedule} à ${emailRecipients}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return CheckCircleIcon;
      case 'generating': return ClockIcon;
      case 'error': return ExclamationTriangleIcon;
      default: return CheckCircleIcon;
    }
  };

  const getStatusColor = (status: string) => {
    if (theme === 'dark') {
      switch (status) {
        case 'ready': return { bg: 'bg-green-900/30', text: 'text-green-400', icon: 'text-green-400' };
        case 'generating': return { bg: 'bg-yellow-900/30', text: 'text-yellow-400', icon: 'text-yellow-400' };
        case 'error': return { bg: 'bg-red-900/30', text: 'text-red-400', icon: 'text-red-400' };
        default: return { bg: 'bg-[#f57c00]/10', text: 'text-[#f57c00]', icon: 'text-[#f57c00]' };
      }
    } else {
      switch (status) {
        case 'ready': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
        case 'generating': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
        case 'error': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
        default: return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
      }
    }
  };

  const formatLastGenerated = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
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
            : 'bg-white border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <DocumentChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Rapports & Export</h2>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Générez et exportez vos rapports personnalisés</p>
          </div>
        </div>
      </motion.div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => {
          const ReportIcon = report.icon;
          const StatusIcon = getStatusIcon(report.status);
          const statusColors = getStatusColor(report.status);
          
          return (
            <motion.div
              key={report.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`group relative rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${report.color} rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden shadow-lg relative flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ReportIcon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className={`font-bold text-lg leading-tight mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{report.name}</h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{report.description}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors.bg} ${statusColors.text} shadow-sm`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                    <span className="truncate">
                      {report.status === 'ready' ? 'Prêt' : report.status === 'generating' ? 'Génération...' : 'Erreur'}
                    </span>
                  </motion.span>
                  
                  <div className="text-right">
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Dernière génération
                    </div>
                    <div className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatLastGenerated(report.lastGenerated)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGenerateReport(report.id)}
                    disabled={isGenerating && selectedReport === report.id}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isGenerating && selectedReport === report.id
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#f57c00] text-white hover:bg-[#e65100] shadow-md'
                    }`}
                  >
                    {isGenerating && selectedReport === report.id ? 'Génération...' : 'Générer'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleExport(report.id, report.format)}
                    className="px-4 py-2 bg-[#f57c00]/10 text-[#f57c00] rounded-lg text-sm font-medium hover:bg-[#f57c00] hover:text-white transition-all duration-300 border border-[#f57c00]/20"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Email Scheduling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`rounded-3xl p-6 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
            : 'bg-white border-gray-200/50'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <EnvelopeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Programmation Email</h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>Configurez l'envoi automatique de rapports par email</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Fréquence
            </label>
            <select
              value={emailSchedule}
              onChange={(e) => setEmailSchedule(e.target.value as any)}
              className={`w-full px-3 py-2 rounded-lg border text-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white focus:border-[#f57c00] focus:ring-[#f57c00]/50'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-[#f57c00] focus:ring-[#f57c00]/50'
              }`}
            >
              <option value="never">Jamais</option>
              <option value="daily">Quotidien</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Destinataires
            </label>
            <input
              type="email"
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
              placeholder="email@exemple.com"
              className={`w-full px-3 py-2 rounded-lg border text-sm transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#f57c00] focus:ring-[#f57c00]/50'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#f57c00] focus:ring-[#f57c00]/50'
              }`}
            />
          </div>

          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScheduleEmail}
              disabled={!emailRecipients || emailSchedule === 'never'}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                !emailRecipients || emailSchedule === 'never'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#f57c00] text-white hover:bg-[#e65100] shadow-md'
              }`}
            >
              Programmer
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportsAndExportSection; 