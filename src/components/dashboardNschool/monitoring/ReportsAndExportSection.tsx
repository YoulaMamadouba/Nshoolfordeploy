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
    switch (status) {
      case 'ready': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
      case 'generating': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
      case 'error': return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
      default: return { bg: 'bg-[#f57c00]/10', text: 'text-[#2b4a6a]', icon: 'text-[#f57c00]' };
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
        className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <DocumentChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2b4a6a]">Rapports & Export</h2>
            <p className="text-gray-600">Générez et exportez vos rapports personnalisés</p>
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
              className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
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
                      <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{report.name}</h3>
                      <p className="text-sm text-gray-500">{report.description}</p>
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
                    <p className="text-xs text-gray-500">Dernière génération</p>
                    <p className="text-xs font-semibold text-gray-900">{formatLastGenerated(report.lastGenerated)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={isGenerating && selectedReport === report.id}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        isGenerating && selectedReport === report.id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-[#f57c00] text-white hover:bg-[#e65100] shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isGenerating && selectedReport === report.id ? (
                        <div className="flex items-center gap-2">
                          <CogIcon className="w-4 h-4 animate-spin" />
                          Génération...
                        </div>
                      ) : (
                        'Générer'
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleExport(report.id, report.format)}
                      className="px-4 py-2 text-[#2b4a6a] bg-gray-50 rounded-lg hover:bg-[#2b4a6a] hover:text-white transition-all duration-300 text-sm font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      {report.format.toUpperCase()}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Export Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
            <ArrowDownTrayIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a]">Configuration Export</h3>
            <p className="text-gray-600">Personnalisez vos options d'export</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Format d'export</label>
            <div className="grid grid-cols-2 gap-3">
              {(['pdf', 'csv', 'excel', 'json'] as const).map((format) => (
                <motion.button
                  key={format}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setExportFormat(format)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-semibold ${
                    exportFormat === format
                      ? 'border-[#f57c00] bg-[#f57c00]/10 text-[#f57c00]'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-[#f57c00]/50'
                  }`}
                >
                  {format.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Email Schedule */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Envoi programmé</label>
            <div className="space-y-3">
              <select
                value={emailSchedule}
                onChange={(e) => setEmailSchedule(e.target.value as any)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
              >
                <option value="never">Jamais</option>
                <option value="daily">Quotidien</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuel</option>
              </select>
              
              {emailSchedule !== 'never' && (
                <input
                  type="email"
                  placeholder="Email(s) séparés par des virgules"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
                />
              )}
            </div>
          </div>
        </div>

        {/* Schedule Button */}
        {emailSchedule !== 'never' && emailRecipients && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScheduleEmail}
            className="mt-6 px-6 py-3 bg-[#f57c00] text-white rounded-xl font-semibold shadow-lg hover:bg-[#e65100] transition-all duration-300 flex items-center gap-2"
          >
            <EnvelopeIcon className="w-5 h-5" />
            Programmer l'envoi email
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default ReportsAndExportSection; 