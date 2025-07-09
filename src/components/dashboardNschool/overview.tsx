import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import StatsCard from '@/components/dashboardNschool/overviewComponents/StatsCard';
import TenantsGrowthChart from '@/components/dashboardNschool/overviewComponents/TenantsGrowthChart';
import SubscriptionDistributionChart from '@/components/dashboardNschool/overviewComponents/SubscriptionDistributionChart';
import PlanRevenueChart from '@/components/dashboardNschool/overviewComponents/PlanRevenueChart';
import ActivityLog from '@/components/dashboardNschool/overviewComponents/ActivityLog';
import AlertsCards from '@/components/dashboardNschool/overviewComponents/AlertsCards';
import {
  UsersIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

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

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
  type: 'inscription' | 'paiement' | 'ajout-tenant' | 'abonnement' | 'rapport' | 'ajout-etudiant';
}

const mockData = {
  metrics: {
    totalTenants: { value: 150, change: 4.5 },
    activeTenants: { value: 120, activityPercentage: 80 },
    revenue: { value: 50000, change: 10.2, monthlyGoal: 60000 },
    newSubscriptions: { value: 25, conversionRate: 3.5, change: 2.8 },
  },
  tenantTypes: {
    schools: 8,
    universities: 5,
    admins: 2,
  },
  tenantsGrowth: {
    months: [
      'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24',
      'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25',
    ],
    schools: [2, 3, 1, 4, 2, 3, 5, 2, 3, 4, 1, 2],
    universities: [1, 2, 2, 1, 3, 2, 2, 1, 2, 3, 2, 1],
    admins: [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
  },
  subscriptionDistribution: {
    free: 50,
    starter: 40,
    basic: 30,
    premium: 20,
    enterprise: 10,
  },
  planRevenue: {
    months: ['Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25'],
    free: [0, 0, 0, 0, 0, 0],
    starter: [1000, 1200, 1100, 1300, 1400, 1500],
    basic: [2000, 2100, 2200, 2300, 2400, 2500],
    premium: [3000, 3200, 3100, 3300, 3500, 3600],
    enterprise: [5000, 5200, 5100, 5300, 5500, 5700],
  },
  alertsCenter: {
    alerts: [
      { id: 1, tenant: 'École A', issue: 'Paiement échoué', type: 'payment_failed' as const, date: '28/06/2025 14:30' },
      { id: 2, tenant: 'Université B', issue: 'Abonnement expiré', type: 'subscription_expired' as const, date: '27/06/2025 09:15' },
      { id: 3, tenant: 'Tenant C', issue: 'Problème technique', type: 'technical_issue' as const, date: '26/06/2025 16:45' },
      { id: 4, tenant: 'École D', issue: 'Compte suspendu', type: 'account_suspended' as const, date: '25/06/2025 11:20' },
      { id: 5, tenant: 'Université E', issue: 'Mise à jour requise', type: 'update_required' as const, date: '24/06/2025 13:00' },
      { id: 6, tenant: 'Tenant F', issue: 'Paiement échoué', type: 'payment_failed' as const, date: '23/06/2025 08:10' },
      { id: 7, tenant: 'École G', issue: 'Abonnement expiré', type: 'subscription_expired' as const, date: '22/06/2025 17:30' },
    ],
    actions: [
      { id: 1, description: 'Code promo expire dans 3 jours', type: 'promo_code' as const },
      { id: 2, description: 'Demande de support prioritaire', type: 'support_request' as const },
      { id: 3, description: 'Migration DB en attente', type: 'db_migration' as const },
      { id: 4, description: 'Vérifier nouveau ticket de support', type: 'support_request' as const },
    ],
  },
  activities: [
    { id: 1, action: 'Nouveau étudiant inscrit', user: 'Jean Dupont', time: 'Il y a 10 min', type: 'inscription' as const },
    { id: 2, action: 'Paiement reçu', user: 'Tenant A', time: 'Il y a 1h', type: 'paiement' as const },
    { id: 3, action: 'Tenant ajouté', user: 'Admin', time: 'Il y a 2h', type: 'ajout-tenant' as const },
    { id: 4, action: 'Abonnement renouvelé', user: 'Tenant B', time: 'Il y a 3h', type: 'abonnement' as const },
    { id: 5, action: 'Rapport généré', user: 'Admin', time: 'Il y a 4h', type: 'rapport' as const },
  ],
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

type OverviewData = typeof mockData;

const Overview = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-[#f57c00] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-6 px-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-full"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Tenants"
          value={data?.metrics.totalTenants.value ?? 0}
          change={data?.metrics.totalTenants.change ?? 0}
          icon={<BuildingOffice2Icon className="w-6 h-6" />}
        />
        <StatsCard
          title="Tenants Actifs"
          value={data?.metrics.activeTenants.value ?? 0}
          change={data?.metrics.activeTenants.activityPercentage ?? 0}
          icon={<UsersIcon className="w-6 h-6" />}
          isActiveTenants
        />
        <StatsCard
          title="Revenus Mensuels"
          value={data?.metrics.revenue.value ?? 0}
          change={data?.metrics.revenue.change ?? 0}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          prefix="$"
          monthlyGoal={data?.metrics.revenue.monthlyGoal ?? 0}
        />
        <StatsCard
          title="Nouveaux Abonnements"
          value={data?.metrics.newSubscriptions.value ?? 0}
          change={data?.metrics.newSubscriptions.change ?? 0}
          conversionRate={data?.metrics.newSubscriptions.conversionRate ?? 0}
          icon={<CreditCardIcon className="w-6 h-6" />}
        />
      </div>

      {/* Tenants Growth Chart - Full Width */}
      <div className="w-full mb-8">
        <TenantsGrowthChart data={data?.tenantsGrowth ?? { months: [], schools: [], universities: [], admins: [] }} />
      </div>

      {/* Revenue and Subscription Distribution Charts */}
      <div className="w-full flex flex-col lg:flex-row gap-8 mb-8 items-stretch">
        <div className="flex-1 min-w-0">
          <PlanRevenueChart
            data={data?.planRevenue ?? { months: [], free: [], starter: [], basic: [], premium: [], enterprise: [] }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <SubscriptionDistributionChart
            data={data?.subscriptionDistribution ?? { free: 0, starter: 0, basic: 0, premium: 0, enterprise: 0 }}
          />
        </div>
      </div>

      {/* Alerts Cards (nouveau centre d'alertes) */}
      <div className="mb-8">
        <AlertsCards
          alerts={data?.alertsCenter?.alerts ?? []}
          actions={data?.alertsCenter?.actions ?? []}
        />
      </div>
      {/* Activity Log */}
      <div className="grid grid-cols-1 gap-4">
        <ActivityLog activities={data?.activities ?? []} />
      </div>
    </motion.div>
  );
};

export default Overview;