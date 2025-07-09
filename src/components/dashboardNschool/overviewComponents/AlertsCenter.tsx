import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExclamationTriangleIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

interface Alert {
  id: number;
  tenant: string;
  issue: string;
  type: 'payment_failed' | 'subscription_expired' | 'technical_issue' | 'account_suspended' | 'update_required';
  date: string;
}

interface Action {
  id: number;
  description: string;
  type: 'promo_code' | 'support_request' | 'db_migration';
}

interface AlertsCenterProps {
  alerts: Alert[];
  actions: Action[];
}

const AlertsCenter = ({ alerts, actions }: AlertsCenterProps) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const { theme } = useTheme();

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'payment_failed':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'subscription_expired':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'technical_issue':
        return <CogIcon className="w-5 h-5 text-blue-500" />;
      case 'account_suspended':
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
      case 'update_required':
        return <DocumentTextIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'payment_failed':
        return theme === 'dark' ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-200';
      case 'subscription_expired':
        return theme === 'dark' ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200';
      case 'technical_issue':
        return theme === 'dark' ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200';
      case 'account_suspended':
        return theme === 'dark' ? 'bg-orange-900/20 border-orange-500/30' : 'bg-orange-50 border-orange-200';
      case 'update_required':
        return theme === 'dark' ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-50 border-purple-200';
      default:
        return theme === 'dark' ? 'bg-gray-800/20 border-gray-500/30' : 'bg-gray-50 border-gray-200';
    }
  };

  const getActionIcon = (type: Action['type']) => {
    switch (type) {
      case 'promo_code':
        return <DocumentTextIcon className="w-5 h-5 text-green-500" />;
      case 'support_request':
        return <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500" />;
      case 'db_migration':
        return <CogIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActionColor = (type: Action['type']) => {
    switch (type) {
      case 'promo_code':
        return theme === 'dark' ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50 border-green-200';
      case 'support_request':
        return theme === 'dark' ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-200';
      case 'db_migration':
        return theme === 'dark' ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-50 border-purple-200';
      default:
        return theme === 'dark' ? 'bg-gray-800/20 border-gray-500/30' : 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-xl p-6 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] border border-[#f57c00]/20' 
        : 'bg-white border border-gray-200'
    } shadow-lg`}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        Centre d&apos;Alertes
      </motion.h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Section */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Alertes ({alerts.length})
          </motion.h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: theme === 'dark' 
                    ? '0 8px 25px rgba(245, 124, 0, 0.15)' 
                    : '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setSelectedAlert(alert)}
                className={`cursor-pointer rounded-lg p-3 border transition-all duration-300 ${
                  getAlertColor(alert.type)
                } ${
                  selectedAlert?.id === alert.id 
                    ? (theme === 'dark' ? 'ring-2 ring-orange-400' : 'ring-2 ring-orange-500')
                    : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {alert.tenant}
                    </p>
                    <p className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {alert.issue}
                    </p>
                    <p className={`text-xs mt-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {alert.date}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-2 h-2 rounded-full ${
                      alert.type === 'payment_failed' ? 'bg-red-500' :
                      alert.type === 'subscription_expired' ? 'bg-yellow-500' :
                      alert.type === 'technical_issue' ? 'bg-blue-500' :
                      alert.type === 'account_suspended' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Actions Requises ({actions.length})
          </motion.h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: theme === 'dark' 
                    ? '0 8px 25px rgba(34, 197, 94, 0.15)' 
                    : '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setSelectedAction(action)}
                className={`cursor-pointer rounded-lg p-3 border transition-all duration-300 ${
                  getActionColor(action.type)
                } ${
                  selectedAction?.id === action.id 
                    ? (theme === 'dark' ? 'ring-2 ring-green-400' : 'ring-2 ring-green-500')
                    : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getActionIcon(action.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {action.description}
                    </p>
                    <p className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Action requise
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Alert Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-xl p-6 max-w-md w-full mx-4 ${
                theme === 'dark' 
                  ? 'bg-[#1e2a35] border border-[#f57c00]/20' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                {getAlertIcon(selectedAlert.type)}
                <div>
                  <h3 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {selectedAlert.tenant}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {selectedAlert.date}
                  </p>
                </div>
              </div>
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {selectedAlert.issue}
              </p>
              <div className="flex space-x-2">
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}>
                  Résoudre
                </button>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Action Modal */}
      <AnimatePresence>
        {selectedAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedAction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-xl p-6 max-w-md w-full mx-4 ${
                theme === 'dark' 
                  ? 'bg-[#1e2a35] border border-[#f57c00]/20' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                {getActionIcon(selectedAction.type)}
                <div>
                  <h3 className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Action Requise
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {selectedAction.type}
                  </p>
                </div>
              </div>
              <p className={`mb-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {selectedAction.description}
              </p>
              <div className="flex space-x-2">
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}>
                  Traiter
                </button>
                <button 
                  onClick={() => setSelectedAction(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertsCenter;