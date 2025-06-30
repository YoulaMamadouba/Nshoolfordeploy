import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

interface PlanData {
  name: string;
  tenants: number;
  revenue: number;
  percentage: number;
  color: string;
}

interface PlanDistributionProps {
  plans: PlanData[];
  totalMRR: number;
}

const PlanDistribution = ({ plans, totalMRR }: PlanDistributionProps) => {
  const chartData = plans.map(plan => ({
    name: plan.name,
    value: plan.tenants,
    revenue: plan.revenue,
    percentage: plan.percentage,
    color: plan.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value} tenants</p>
          <p className="text-sm text-gray-600">{data.percentage}%</p>
          <p className="text-sm font-medium text-green-600">€{data.revenue.toLocaleString('fr-FR')}/mois</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#2b4a6a] tracking-tight">Répartition par Plans</h3>
            <p className="text-sm text-gray-600 mt-1">Distribution des tenants et revenus</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#f57c00]">€{totalMRR.toLocaleString('fr-FR')}</p>
            <p className="text-xs text-gray-500">Total MRR</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-[#f57c00]/30 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: plan.color }}
                  />
                  <div>
                    <p className="font-medium text-[#2b4a6a]">{plan.name}</p>
                    <p className="text-xs text-gray-500">{plan.tenants} tenants</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#f57c00]">
                    €{plan.revenue.toLocaleString('fr-FR')}
                  </p>
                  <p className="text-xs text-gray-500">{plan.percentage}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanDistribution;