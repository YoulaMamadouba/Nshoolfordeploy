'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTeamSection from './AdminTeamSection';
import GlobalUsersListCards from './GlobalUsersListCards';
import GlobalUsersListTable from './GlobalUsersListTable';
import PermissionsMatrix from './PermissionsMatrix';
import { mockUsers, GlobalUser } from './data';
import {
  ChartBarIcon,
  Squares2X2Icon,
  TableCellsIcon,
  ShieldCheckIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

type View = 'overview' | 'cards' | 'table' | 'permissions';

const GlobalUsersPage: React.FC = () => {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<View>('overview');
  const [users, setUsers] = useState<GlobalUser[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<GlobalUser | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleViewDetails = (user: GlobalUser) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleEditUser = (id: number) => {
    console.log('Modifier utilisateur:', id);
    // TODO: Implémenter la logique de modification
  };

  const handleToggleStatus = (id: number) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'active' ? 'suspended' : 'active'
            }
          : user
      )
    );
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }
  };

  const handleAddUser = () => {
    console.log('Ajouter un nouvel utilisateur');
    // TODO: Implémenter la logique d'ajout
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`rounded-3xl p-4 shadow-xl border backdrop-blur-sm ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900/50 border-gray-700/50'
            : 'bg-gradient-to-br from-white via-white to-gray-50/50 border-gray-200/50'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className={`text-3xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
            }`} style={{ 
              textShadow: theme === 'dark' 
                ? '0 2px 4px rgba(0,0,0,0.3)' 
                : '0 2px 4px rgba(0,0,0,0.1)' 
            }}>
              Utilisateurs Globaux
            </h1>
            <p className={`text-lg mt-1 font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Gérez votre équipe d'administration et les permissions
            </p>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('overview')}
              className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'overview'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
              title="Vue d'ensemble"
            >
              <ChartBarIcon className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('cards')}
              className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'cards'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
              title="Vue Cards"
            >
              <Squares2X2Icon className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('table')}
              className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'table'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
              title="Vue Tableau"
            >
              <TableCellsIcon className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('permissions')}
              className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'permissions'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
              title="Permissions"
            >
              <ShieldCheckIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-end">
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {users.length} utilisateurs au total
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <AdminTeamSection />
          </motion.div>
        )}

        {currentView === 'cards' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <GlobalUsersListCards
              users={users}
              onViewDetails={handleViewDetails}
              onEditUser={handleEditUser}
              onToggleStatus={handleToggleStatus}
              onDeleteUser={handleDeleteUser}
            />
          </motion.div>
        )}

        {currentView === 'table' && (
          <motion.div
            key="table"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <GlobalUsersListTable
              users={users}
              onViewDetails={handleViewDetails}
              onEditUser={handleEditUser}
              onToggleStatus={handleToggleStatus}
              onDeleteUser={handleDeleteUser}
            />
          </motion.div>
        )}

        {currentView === 'permissions' && (
          <motion.div
            key="permissions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <PermissionsMatrix />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal pour les détails utilisateur */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
              theme === 'dark'
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-[#2b4a6a]'
              }`}>Détails de l'utilisateur</h2>
              <button
                onClick={() => setShowUserDetails(false)}
                className={`text-2xl hover:opacity-70 transition-opacity ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f57c00] to-[#ff9800] rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                  }`}>{selectedUser.name}</h3>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>Rôle</label>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                  }`}>{selectedUser.role}</p>
                </div>
                <div>
                  <label className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                  }`}>Statut</label>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                  }`}>{selectedUser.status}</p>
                </div>
              </div>
              
              <div>
                <label className={`text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Permissions</label>
                <div className="mt-2 space-y-1">
                  {selectedUser.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#f57c00] rounded-full"></div>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                      }`}>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className={`text-sm font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>Tenants accessibles</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedUser.tenantAccess.map((tenant, index) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {tenant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`flex justify-end gap-3 mt-6 pt-6 border-t ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setShowUserDetails(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  handleEditUser(selectedUser.id);
                  setShowUserDetails(false);
                }}
                className="px-4 py-2 bg-[#f57c00] text-white rounded-lg hover:bg-[#e65100] transition-colors"
              >
                Modifier
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default GlobalUsersPage; 