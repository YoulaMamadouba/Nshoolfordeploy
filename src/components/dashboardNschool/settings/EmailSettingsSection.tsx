'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  BellIcon, 
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function EmailSettingsSection() {
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromName, setFromName] = useState('Nschool');
  const [notifications, setNotifications] = useState({
    newUser: true,
    paymentSuccess: true,
    paymentFailed: true,
    systemAlerts: true,
    weeklyReports: false,
    marketing: false
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const testEmailConnection = () => {
    // Simulation d'un test de connexion
    console.log('Test de connexion email...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Configuration SMTP */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <EnvelopeIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Configuration SMTP</h3>
            <p className="text-sm text-gray-500">Paramètres du serveur d'envoi d'emails</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Serveur SMTP</label>
            <input
              type="text"
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="smtp.gmail.com"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Port SMTP</label>
            <input
              type="text"
              value={smtpPort}
              onChange={(e) => setSmtpPort(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="587"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
              type="email"
              value={smtpUser}
              onChange={(e) => setSmtpUser(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="votre-email@gmail.com"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={smtpPassword}
              onChange={(e) => setSmtpPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Email d'expédition</label>
            <input
              type="email"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="noreply@nschool.com"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Nom d'expédition</label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Nschool"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={testEmailConnection}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            Tester la connexion
          </motion.button>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            Connexion établie
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-50 rounded-lg">
            <BellIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications par Email</h3>
            <p className="text-sm text-gray-500">Gérez les types de notifications envoyées</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 capitalize">
                    {key === 'newUser' && 'Nouveaux utilisateurs'}
                    {key === 'paymentSuccess' && 'Paiements réussis'}
                    {key === 'paymentFailed' && 'Échecs de paiement'}
                    {key === 'systemAlerts' && 'Alertes système'}
                    {key === 'weeklyReports' && 'Rapports hebdomadaires'}
                    {key === 'marketing' && 'Emails marketing'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {key === 'newUser' && 'Recevoir une notification quand un nouvel utilisateur s\'inscrit'}
                    {key === 'paymentSuccess' && 'Notification automatique pour les paiements réussis'}
                    {key === 'paymentFailed' && 'Alerte immédiate en cas d\'échec de paiement'}
                    {key === 'systemAlerts' && 'Alertes importantes du système'}
                    {key === 'weeklyReports' && 'Rapports hebdomadaires de performance'}
                    {key === 'marketing' && 'Campagnes marketing et promotions'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  value ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Conseil</h4>
              <p className="text-sm text-blue-700 mt-1">
                Activez uniquement les notifications essentielles pour éviter la surcharge d'emails. 
                Les alertes système et les échecs de paiement sont recommandés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 