'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTeamSection from './AdminTeamSection';
import GlobalUsersListCards from './GlobalUsersListCards';
import GlobalUsersListTable from './GlobalUsersListTable';
import PermissionsMatrix from './PermissionsMatrix';
import { mockUsers, GlobalUser } from './data';

type View = 'overview' | 'cards' | 'table' | 'permissions';

const GlobalUsersPage: React.FC = () => {
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
        className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Utilisateurs Globaux
            </h1>
            <p className="text-lg text-gray-600 mt-1 font-medium">
              Gérez votre équipe d'administration et les permissions
            </p>
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('overview')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'overview'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
            >
              Vue d'ensemble
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('cards')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'cards'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
            >
              Vue Cards
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('table')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'table'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
            >
              Vue Tableau
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('permissions')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                currentView === 'permissions'
                  ? 'bg-[#f57c00] text-white shadow-lg'
                  : 'bg-[#f57c00]/10 text-[#f57c00] border border-[#f57c00]/20 hover:bg-[#f57c00]/15'
              }`}
            >
              Permissions
            </motion.button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddUser}
              className="px-4 py-2 bg-[#f57c00] text-white rounded-xl font-semibold shadow-lg hover:bg-[#e65100] transition-all duration-300"
            >
              Nouvel Utilisateur
            </motion.button>
          </div>
          
          <div className="text-sm text-gray-500">
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
            className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2b4a6a]">Détails de l'utilisateur</h2>
              <button
                onClick={() => setShowUserDetails(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
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
                  <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Rôle</label>
                  <p className="text-gray-900">{selectedUser.role}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Statut</label>
                  <p className="text-gray-900">{selectedUser.status}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700">Permissions</label>
                <div className="mt-2 space-y-1">
                  {selectedUser.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#f57c00] rounded-full"></div>
                      <span className="text-sm text-gray-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700">Tenants accessibles</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedUser.tenantAccess.map((tenant, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tenant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowUserDetails(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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