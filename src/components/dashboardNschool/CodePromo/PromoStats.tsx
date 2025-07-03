'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  CurrencyEuroIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface PromoCode {
  id: number;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  maxUses: number | null;
  currentUses: number;
  status: 'active' | 'paused' | 'expired';
  applicablePlans: string[];
  conditions: string;
  revenueGenerated: number;
  revenueLost: number;
  conversionRate: number;
}

interface PromoStatsProps {
  promoCodes: PromoCode[];
}

const PromoStats: React.FC<PromoStatsProps> = ({ promoCodes }) => {
  // Calculs des métriques
  const totalRevenueGenerated = promoCodes.reduce((sum, promo) => sum + promo.revenueGenerated, 0);
  const totalRevenueLost = promoCodes.reduce((sum, promo) => sum + promo.revenueLost, 0);
  const totalUses = promoCodes.reduce((sum, promo) => sum + promo.currentUses, 0);
  const activePromos = promoCodes.filter(promo => promo.status === 'active').length;
  const avgConversionRate = promoCodes.length > 0 
    ? promoCodes.reduce((sum, promo) => sum + promo.conversionRate, 0) / promoCodes.length 
    : 0;

  // Données pour les graphiques
  const planData = promoCodes.reduce((acc, promo) => {
    promo.applicablePlans.forEach(plan => {
      acc[plan] = (acc[plan] || 0) + promo.currentUses;
    });
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = [
    { month: 'Jan', revenue: 12500, uses: 45 },
    { month: 'Fév', revenue: 15800, uses: 52 },
    { month: 'Mar', revenue: 14200, uses: 48 },
    { month: 'Avr', revenue: 18900, uses: 61 },
    { month: 'Mai', revenue: 22100, uses: 73 },
    { month: 'Juin', revenue: 25600, uses: 84 },
  ];

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
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const StatCard = ({ title, value, icon: Icon, trend, color, index }: {
    title: string;
    value: string;
    icon: any;
    trend?: { value: number; isPositive: boolean };
    color: string;
    index: number;
  }) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
            {trend.value}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-xl">
          <ChartBarIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2b4a6a]">Statistiques Marketing</h2>
          <p className="text-gray-600">Performance de vos codes promotionnels</p>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Revenus générés"
          value={`${totalRevenueGenerated.toLocaleString()}€`}
          icon={CurrencyEuroIcon}
          trend={{ value: 12.5, isPositive: true }}
          color="bg-gradient-to-r from-green-500 to-emerald-600"
          index={0}
        />
        <StatCard
          title="Revenus perdus"
          value={`${totalRevenueLost.toLocaleString()}€`}
          icon={ArrowTrendingDownIcon}
          trend={{ value: 8.3, isPositive: false }}
          color="bg-gradient-to-r from-red-500 to-pink-600"
          index={1}
        />
        <StatCard
          title="Utilisations totales"
          value={totalUses.toLocaleString()}
          icon={UsersIcon}
          trend={{ value: 15.7, isPositive: true }}
          color="bg-gradient-to-r from-blue-500 to-indigo-600"
          index={2}
        />
        <StatCard
          title="Codes actifs"
          value={activePromos.toString()}
          icon={SparklesIcon}
          color="bg-gradient-to-r from-[#f57c00] to-[#ff9800]"
          index={3}
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique d'évolution mensuelle */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50"
        >
          <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4">Évolution mensuelle</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 w-8">{data.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.revenue / 30000) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#f57c00] to-[#ff9800] rounded-full"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                  {data.revenue.toLocaleString()}€
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Répartition par plan */}
        <motion.div
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50"
        >
          <h3 className="text-lg font-semibold text-[#2b4a6a] mb-4">Utilisation par plan</h3>
          <div className="space-y-4">
            {Object.entries(planData).map(([plan, uses], index) => (
              <div key={plan} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 flex-1">{plan}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(uses / Math.max(...Object.values(planData))) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                  {uses}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Métriques supplémentaires */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          custom={6}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <ArrowTrendingUpIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taux de conversion moyen</p>
              <p className="text-xl font-bold text-green-700">{avgConversionRate.toFixed(1)}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={7}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Codes expirés ce mois</p>
              <p className="text-xl font-bold text-blue-700">
                {promoCodes.filter(p => new Date(p.endDate) < new Date() && new Date(p.endDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={8}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f57c00] rounded-lg">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">ROI moyen</p>
              <p className="text-xl font-bold text-orange-700">
                {totalRevenueGenerated > 0 ? ((totalRevenueGenerated / (totalRevenueGenerated + totalRevenueLost)) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PromoStats; 