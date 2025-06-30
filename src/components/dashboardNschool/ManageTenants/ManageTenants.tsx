'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TenantsList from './TenantsList';
import TenantDetails from './TenantDetails';
import CreateTenant from './CreateTenant';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

type View = 'list' | 'details' | 'create';

interface Tenant {
  id: number;
  name: string;
  code: string;
  domain: string;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  users: number;
  logo?: string;
}

const ManageTenants = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: 1,
      name: 'École Polytechnique',
      code: 'EP001',
      domain: 'polytechnique.edu',
      plan: 'Premium',
      status: 'active',
      createdAt: '2024-01-15',
      users: 1250,
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9e1?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 2,
      name: 'Université de Paris',
      code: 'UP002',
      domain: 'univ-paris.fr',
      plan: 'Enterprise',
      status: 'active',
      createdAt: '2024-02-20',
      users: 3200,
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 3,
      name: 'Lycée Saint-Louis',
      code: 'LSL003',
      domain: 'saintlouis.edu',
      plan: 'Basic',
      status: 'inactive',
      createdAt: '2024-03-10',
      users: 450,
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 4,
      name: 'Institut de Formation',
      code: 'IF004',
      domain: 'institut-formation.com',
      plan: 'Starter',
      status: 'suspended',
      createdAt: '2024-04-05',
      users: 180,
      logo: 'https://images.unsplash.com/photo-1523240794102-9ebd83de8428?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 5,
      name: 'Académie des Sciences',
      code: 'AS005',
      domain: 'academie-sciences.fr',
      plan: 'Premium',
      status: 'active',
      createdAt: '2024-05-12',
      users: 890,
      logo: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 6,
      name: 'Collège International',
      code: 'CI006',
      domain: 'college-international.edu',
      plan: 'Basic',
      status: 'active',
      createdAt: '2024-06-01',
      users: 650,
      logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 7,
      name: 'École de Commerce',
      code: 'EC007',
      domain: 'ecole-commerce.fr',
      plan: 'Enterprise',
      status: 'active',
      createdAt: '2024-06-15',
      users: 2100,
      logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 8,
      name: 'Centre de Formation Pro',
      code: 'CFP008',
      domain: 'formation-pro.com',
      plan: 'Starter',
      status: 'active',
      createdAt: '2024-07-01',
      users: 320,
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 9,
      name: 'Université Technique',
      code: 'UT009',
      domain: 'univ-technique.edu',
      plan: 'Premium',
      status: 'active',
      createdAt: '2024-07-10',
      users: 1800,
      logo: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 10,
      name: 'Lycée des Arts',
      code: 'LA010',
      domain: 'lycee-arts.fr',
      plan: 'Basic',
      status: 'inactive',
      createdAt: '2024-07-20',
      users: 280,
      logo: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 11,
      name: 'École d\'Ingénieurs',
      code: 'EI011',
      domain: 'ecole-ingenieurs.edu',
      plan: 'Enterprise',
      status: 'active',
      createdAt: '2024-08-01',
      users: 2500,
      logo: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 12,
      name: 'Institut de Langues',
      code: 'IL012',
      domain: 'institut-langues.com',
      plan: 'Starter',
      status: 'active',
      createdAt: '2024-08-10',
      users: 420,
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 13,
      name: 'Académie de Musique',
      code: 'AM013',
      domain: 'academie-musique.fr',
      plan: 'Basic',
      status: 'active',
      createdAt: '2024-08-15',
      users: 350,
      logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 14,
      name: 'École de Design',
      code: 'ED014',
      domain: 'ecole-design.edu',
      plan: 'Premium',
      status: 'active',
      createdAt: '2024-08-20',
      users: 680,
      logo: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center',
    },
    {
      id: 15,
      name: 'Centre de Recherche',
      code: 'CR015',
      domain: 'centre-recherche.fr',
      plan: 'Enterprise',
      status: 'active',
      createdAt: '2024-08-25',
      users: 120,
      logo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop&crop=center',
    },
  ]);

  const handleViewChange = (view: View, tenant?: Tenant) => {
    setCurrentView(view);
    if (tenant) {
      setSelectedTenant(tenant);
    }
  };

  const handleTenantCreated = (tenant: Tenant) => {
    // Ajouter le nouveau tenant à la liste
    setTenants(prevTenants => [tenant, ...prevTenants]);
    
    setNotificationMessage(`Tenant "${tenant.name}" créé avec succès !`);
    setShowNotification(true);
    setCurrentView('list');
    
    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-2 px-2 min-h-full"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Gestion des Tenants
            </h1>
            <p className="text-lg text-gray-600 mt-1 font-medium">
              Gérez vos tenants et leurs configurations
            </p>
          </div>
          
          {currentView === 'list' && (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f57c00' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewChange('create')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#f57c00] to-[#ff9800] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
                boxShadow: '0 4px 15px rgba(245, 124, 0, 0.3)',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ajouter un Tenant
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {currentView === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <TenantsList
                tenants={tenants}
                onViewDetails={(tenant) => handleViewChange('details', tenant)}
                onAddTenant={() => handleViewChange('create')}
              />
            </motion.div>
          )}

          {currentView === 'details' && selectedTenant && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <TenantDetails
                tenant={selectedTenant}
                onBack={() => handleViewChange('list')}
              />
            </motion.div>
          )}

          {currentView === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <CreateTenant
                onBack={() => handleViewChange('list')}
                onTenantCreated={handleTenantCreated}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-100" />
                <div>
                  <p className="font-semibold text-lg">{notificationMessage}</p>
                  <p className="text-green-100 text-sm">Le tenant a été ajouté à votre liste</p>
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageTenants; 