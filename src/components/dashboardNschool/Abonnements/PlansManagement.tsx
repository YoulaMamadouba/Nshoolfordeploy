'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import CountUp from 'react-countup';
import {
  PlusIcon,
  ArrowLeftIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UsersIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import PlanDistribution from './PlanDistribution';
import PlanCard from './PlanCard';
import CreatePlanModal from './CreatePlanModal';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
      delay: 0.2,
    },
  },
  hover: {
    scale: [1, 1.15, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

const valueVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

interface Metric {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  description: string;
}

interface SubscriptionMetricsProps {
  mrr: number;
  arr: number;
  retentionRate: number;
  clv: number;
}

const SubscriptionMetrics = ({ mrr, arr, retentionRate, clv }: SubscriptionMetricsProps) => {
  const metrics: Metric[] = [
    {
      title: 'MRR',
      value: mrr || 0,
      prefix: '€',
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      description: 'Revenu mensuel récurrent',
    },
    {
      title: 'ARR',
      value: arr || 0,
      prefix: '€',
      icon: <ChartBarIcon className="w-6 h-6" />,
      description: 'Revenu annuel récurrent',
    },
    {
      title: 'Taux de rétention',
      value: retentionRate || 0,
      suffix: '%',
      icon: <UsersIcon className="w-6 h-6" />,
      description: 'Taux de rétention des clients',
    },
    {
      title: 'CLV',
      value: clv || 0,
      prefix: '€',
      icon: <StarIcon className="w-6 h-6" />,
      description: 'Valeur vie client',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <motion.div
          key={metric.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50 overflow-hidden"
        >
          {/* Gradient Accent Border */}
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-[#f57c00]/0 via-[#f57c00]/20 to-[#f57c00]/0 rounded-2xl pointer-events-none" />

          {/* Content */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{metric.title}</p>
              <motion.p
                variants={valueVariants}
                className="text-2xl font-semibold text-gray-900 mt-0.5"
              >
                {metric.prefix || ''}
                <CountUp
                  end={metric.value}
                  duration={2.5}
                  separator=","
                  decimals={metric.title === 'Taux de rétention' ? 1 : 0}
                  formattingFn={(num) =>
                    metric.prefix === '€'
                      ? num.toLocaleString('fr-FR')
                      : num.toString()
                  }
                />
                {metric.suffix || ''}
              </motion.p>
              <p className="text-xs text-gray-600 mt-0.5">{metric.description}</p>
            </div>
            <motion.div
              variants={iconVariants}
              className="w-10 h-10 text-[#2b4a6a] flex items-center justify-center rounded-full bg-[#f57c00]/10"
            >
              {React.isValidElement(metric.icon)
                ? React.cloneElement(metric.icon as React.ReactElement<any>, { className: 'w-5 h-5' })
                : metric.icon}
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-[#f57c00]/5 opacity-0 rounded-2xl"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  users: number;
  storage: string;
  features: string[];
  color: string;
  tenantCount: number;
  revenue: number;
  isPopular?: boolean;
}

interface PlanDistributionData {
  name: string;
  tenants: number;
  revenue: number;
  percentage: number;
  color: string;
}

interface PlansManagementProps {
  onBack: () => void;
}

const mockPlans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuit',
    description: 'Plan de base pour commencer',
    price: 0,
    period: 'monthly',
    users: 100,
    storage: '5GB',
    features: ['Modules de base', 'Support communautaire', '100 élèves max', '5 enseignants max'],
    color: 'bg-gray-500',
    tenantCount: 1234,
    revenue: 0,
  },
  {
    id: 'starter',
    name: 'Démarrage',
    description: 'Parfait pour les petites écoles',
    price: 5,
    period: 'monthly',
    users: 250,
    storage: '20GB',
    features: ['Modules avancés', 'Support email', '250 élèves max', '15 enseignants max'],
    color: 'bg-green-500',
    tenantCount: 678,
    revenue: 3390,
  },
  {
    id: 'basic',
    name: 'Basique',
    description: 'Solution complète pour les établissements moyens',
    price: 10,
    period: 'monthly',
    users: 500,
    storage: '50GB',
    features: ['Tous les modules', 'Support prioritaire', '500 élèves max', '30 enseignants max'],
    color: 'bg-blue-500',
    tenantCount: 456,
    revenue: 4560,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Fonctionnalités avancées pour les grandes écoles',
    price: 20,
    period: 'monthly',
    users: 1000,
    storage: '100GB',
    features: ['Fonctionnalités premium', 'Support téléphonique', '1000 élèves max', '60 enseignants max'],
    color: 'bg-purple-500',
    tenantCount: 234,
    revenue: 4680,
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    description: 'Solution personnalisée pour les grandes organisations',
    price: 100,
    period: 'monthly',
    users: -1,
    storage: 'Illimité',
    features: ['Personnalisation', 'Intégrations avancées', 'Support dédié', 'Illimité'],
    color: 'bg-orange-500',
    tenantCount: 98,
    revenue: 9800,
  },
];

const PlansManagement = ({ onBack }: PlansManagementProps) => {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalMRR = plans.reduce((sum, plan) => sum + (plan.revenue || 0), 0);
  const totalARR = totalMRR * 12;
  const totalTenants = plans.reduce((sum, plan) => sum + (plan.tenantCount || 0), 0);
  const retentionRate = 94.5;
  const clv = 1250;

  const planDistributionData: PlanDistributionData[] = plans.map(plan => ({
    name: plan.name,
    tenants: plan.tenantCount || 0,
    revenue: plan.revenue || 0,
    percentage: totalTenants ? Math.round((plan.tenantCount / totalTenants) * 100) : 0,
    color: plan.color === 'bg-gray-500' ? '#6b7280' :
           plan.color === 'bg-green-500' ? '#10b981' :
           plan.color === 'bg-blue-500' ? '#3b82f6' :
           plan.color === 'bg-purple-500' ? '#8b5cf6' :
           plan.color === 'bg-orange-500' ? '#f97316' : '#6b7280',
  }));

  const handleCreatePlan = (newPlan: Omit<Plan, 'id' | 'tenantCount' | 'revenue'>) => {
    const plan: Plan = {
      ...newPlan,
      id: `plan-${Date.now()}`,
      tenantCount: 0,
      revenue: 0,
    };
    setPlans([...plans, plan]);
    setShowCreateModal(false);
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(plan => plan.id !== planId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.6 }}
      className="pt-2 px-2 min-h-full bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
        className="mb-6 bg-transparent"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-[#f57c00] rounded-full hover:bg-[#f57c00]/10 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#2b4a6a] tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                Gestion des Plans d&apos;Abonnement
              </h1>
              <p className="text-lg text-gray-600 mt-1 font-medium">
                Gérez vos plans d&apos;abonnement et métriques
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#f57c00] text-white rounded-lg hover:bg-[#e65100] transition-colors flex items-center space-x-2 shadow-lg"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Nouveau Plan</span>
          </button>
        </div>
      </motion.div>

      <SubscriptionMetrics
        mrr={totalMRR}
        arr={totalARR}
        retentionRate={retentionRate}
        clv={clv}
      />

      <div className="mb-8">
        <PlanDistribution plans={planDistributionData} totalMRR={totalMRR} />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2b4a6a] tracking-tight">Plans Disponibles</h2>
          <p className="text-sm text-gray-600">{plans.length} plans configurés</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={(plan) => {
                console.log('Éditer le plan:', plan);
              }}
              onDelete={handleDeletePlan}
            />
          ))}
        </div>
      </div>

      <CreatePlanModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreatePlan}
      />
    </motion.div>
  );
};

export default PlansManagement;