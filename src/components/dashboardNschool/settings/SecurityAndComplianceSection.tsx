'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

export default function SecurityAndComplianceSection() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordComplexity: true,
    loginAttempts: 5,
    ipWhitelist: false,
    auditLog: true
  });

  const handleSecurityChange = (key: string, value: any) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const complianceStatus = {
    gdpr: true,
    dataEncryption: true,
    backupFrequency: 'daily',
    retentionPolicy: '7years',
    auditTrail: true
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Sécurité */}
      <div className={`rounded-2xl shadow-sm border p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#f57c00]/10 rounded-lg">
            <ShieldCheckIcon className="h-6 w-6 text-[#f57c00]" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Sécurité</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>Paramètres de sécurité avancés</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Authentification à deux facteurs */}
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <KeyIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>2FA obligatoire</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Authentification à deux facteurs pour tous les utilisateurs</p>
                </div>
              </div>
              <button
                onClick={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  securitySettings.twoFactorAuth ? 'bg-[#f57c00]' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Complexité des mots de passe */}
            <div className={`flex items-center justify-between p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Complexité des mots de passe</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Exiger des mots de passe complexes</p>
                </div>
              </div>
              <button
                onClick={() => handleSecurityChange('passwordComplexity', !securitySettings.passwordComplexity)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  securitySettings.passwordComplexity ? 'bg-red-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    securitySettings.passwordComplexity ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Journal d'audit */}
            <div className={`flex items-center justify-between p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Journal d'audit</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Enregistrer toutes les actions utilisateur</p>
                </div>
              </div>
              <button
                onClick={() => handleSecurityChange('auditLog', !securitySettings.auditLog)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  securitySettings.auditLog ? 'bg-red-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    securitySettings.auditLog ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Paramètres de session */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Délai d'expiration de session (minutes)</label>
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-600 text-white'
                    : 'bg-white border-gray-200'
                }`}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 heure</option>
                <option value={120}>2 heures</option>
                <option value={480}>8 heures</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Tentatives de connexion max</label>
              <select
                value={securitySettings.loginAttempts}
                onChange={(e) => handleSecurityChange('loginAttempts', parseInt(e.target.value))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-600 text-white'
                    : 'bg-white border-gray-200'
                }`}
              >
                <option value={3}>3 tentatives</option>
                <option value={5}>5 tentatives</option>
                <option value={10}>10 tentatives</option>
              </select>
            </div>

            <div className={`flex items-center justify-between p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
                  }`}>Liste blanche IP</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Restreindre l'accès aux IP autorisées</p>
                </div>
              </div>
              <button
                onClick={() => handleSecurityChange('ipWhitelist', !securitySettings.ipWhitelist)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  securitySettings.ipWhitelist ? 'bg-[#f57c00]' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    securitySettings.ipWhitelist ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conformité */}
      <div className={`rounded-2xl shadow-sm border p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#f57c00]/10 rounded-lg">
            <DocumentTextIcon className="h-6 w-6 text-[#f57c00]" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`}>Conformité</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>Statut de conformité et réglementations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>RGPD</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Conformité au règlement européen</p>
                </div>
              </div>
              <span className="text-green-500 text-sm font-medium">Conforme</span>
            </div>

            <div className={`flex items-center justify-between p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <LockClosedIcon className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Chiffrement des données</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Données chiffrées en transit et au repos</p>
                </div>
              </div>
              <span className="text-green-500 text-sm font-medium">Actif</span>
            </div>

            <div className={`flex items-center justify-between p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Piste d'audit</h4>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Traçabilité complète des actions</p>
                </div>
              </div>
              <span className="text-green-500 text-sm font-medium">Actif</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Fréquence de sauvegarde</label>
              <select
                value={complianceStatus.backupFrequency}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-600 text-white'
                    : 'bg-white border-gray-200'
                }`}
              >
                <option value="daily">Quotidienne</option>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Politique de rétention</label>
              <select
                value={complianceStatus.retentionPolicy}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#f57c00] focus:border-[#f57c00] transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-600 text-white'
                    : 'bg-white border-gray-200'
                }`}
              >
                <option value="1year">1 an</option>
                <option value="3years">3 ans</option>
                <option value="7years">7 ans</option>
                <option value="indefinite">Indéfini</option>
              </select>
            </div>

            <div className={`p-4 border rounded-xl ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'
            }`}>
              <h4 className={`text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Dernière vérification</h4>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {new Date().toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className={`mt-6 p-4 border rounded-xl ${
          theme === 'dark'
            ? 'border-yellow-800/50 bg-yellow-900/20'
            : 'border-yellow-200 bg-yellow-50'
        }`}>
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className={`h-5 w-5 mt-0.5 ${
              theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
            }`} />
            <div>
              <h4 className={`text-sm font-medium ${
                theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'
              }`}>Recommandations de sécurité</h4>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'
              }`}>
                Activez l'authentification à deux facteurs pour tous les comptes administrateur. 
                Vérifiez régulièrement les journaux d'audit et mettez à jour les politiques de sécurité.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Changement de mot de passe */}
      <div className={`rounded-2xl shadow-sm border p-6 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-50'
          }`}>
            <LockClosedIcon className={`h-6 w-6 ${
              theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
            }`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Changement de mot de passe</h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}>Modifiez votre mot de passe administrateur</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Mot de passe actuel</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Nouveau mot de passe</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200'
              }`}
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-3">
            <label className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200'
              }`}
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 text-sm font-medium"
            >
              Changer le mot de passe
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 