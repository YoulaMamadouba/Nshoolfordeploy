import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SubscriptionDistributionData {
  free: number;
  starter: number;
  basic: number;
  premium: number;
  enterprise: number;
}

interface SubscriptionDistributionChartProps {
  data: SubscriptionDistributionData;
}

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
};

const SubscriptionDistributionChart: React.FC<SubscriptionDistributionChartProps> = ({ data }) => {

  const total = data.free + data.starter + data.basic + data.premium + data.enterprise;

  if (total === 0) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 backdrop-blur-sm overflow-hidden max-w-[318px] w-full min-w-0"
      >
        <p className="text-sm text-gray-500 text-center">Aucune donnée disponible pour le graphique</p>
      </motion.div>
    );
  }

  const chartData: ChartData<'pie'> = {
    labels: ['Free', 'Starter', 'Basic', 'Premium', 'Enterprise'],
    datasets: [
      {
        data: [data.free, data.starter, data.basic, data.premium, data.enterprise],
        backgroundColor: ['#d1d5db', '#60a5fa', '#2b4a6a', '#f57c00', '#a855f7'],
        borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2500,
      easing: 'easeOutQuart',
      animateScale: true,
      animateRotate: true,
    },
    layout: {
      padding: {
        top: 12,
        bottom: 12,
        left: 8,
        right: 8,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          color: '#2b4a6a',
          boxWidth: 18,
          padding: 10,
          usePointStyle: true,
          pointStyle: 'rect',
        },
      },
      title: {
        display: true,
        text: 'Répartition des Abonnements',
        font: {
          size: 14,
          family: 'Inter, sans-serif',
        },
        color: '#2b4a6a',
        padding: { bottom: 12, top: 8 },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(43, 74, 106, 0.95)',
        titleFont: { size: 13 },
        bodyFont: { size: 11 },
        padding: 12,
        cornerRadius: 8,
        borderColor: '#f57c00',
        borderWidth: 2,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },

  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 backdrop-blur-sm overflow-hidden w-full min-w-0"
    >
      <div className="w-full h-[450px] relative">
        <Pie data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default SubscriptionDistributionChart;