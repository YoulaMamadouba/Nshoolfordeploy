import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PlanRevenueData {
  months: string[];
  free: number[];
  starter: number[];
  basic: number[];
  premium: number[];
  enterprise: number[];
}

interface PlanRevenueChartProps {
  data: PlanRevenueData;
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

const PlanRevenueChart = ({ data }: PlanRevenueChartProps) => {
  if (
    !data.months.length ||
    !data.free.length ||
    !data.starter.length ||
    !data.basic.length ||
    !data.premium.length ||
    !data.enterprise.length
  ) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-gradient-to-br from-white/90 to-gray-50/80 rounded-2xl p-3 shadow-sm border border-[#f57c00]/30 backdrop-blur-sm overflow-visible max-w-[650px] w-full min-w-0"
      >
        <p className="text-base text-gray-500 text-center">Aucune donnée disponible pour le graphique</p>
      </motion.div>
    );
  }

  const chartData: ChartData<'bar'> = {
    labels: data.months,
    datasets: [
      {
        label: 'Free',
        data: data.free,
        backgroundColor: 'rgba(209, 213, 219, 0.8)',
        borderColor: '#d1d5db',
        borderWidth: 1,
      },
      {
        label: 'Starter',
        data: data.starter,
        backgroundColor: 'rgba(96, 165, 250, 0.8)',
        borderColor: '#60a5fa',
        borderWidth: 1,
      },
      {
        label: 'Basic',
        data: data.basic,
        backgroundColor: 'rgba(43, 74, 106, 0.8)',
        borderColor: '#2b4a6a',
        borderWidth: 1,
      },
      {
        label: 'Premium',
        data: data.premium,
        backgroundColor: 'rgba(245, 124, 0, 0.8)',
        borderColor: '#f57c00',
        borderWidth: 1,
      },
      {
        label: 'Enterprise',
        data: data.enterprise,
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: '#a855f7',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeOutCubic',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
            weight: 'bold',
          },
          color: '#2b4a6a',
          boxWidth: 14,
          padding: 10,
          usePointStyle: true,
          boxPadding: 4,
          generateLabels: (chart) => {
            const { data } = chart;
            return data.datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor as string,
              strokeStyle: dataset.borderColor as string,
              lineWidth: 1,
              pointStyle: 'circle',
              fontColor: '#2b4a6a',
              padding: 8,
              boxWidth: 12,
            }));
          },
        },
      },
      title: {
        display: true,
        text: 'Revenus par Plan (6 derniers mois)',
        font: {
          size: 16,
          family: 'Inter, sans-serif',
          weight: 'bold',
        },
        color: '#2b4a6a',
        padding: { bottom: 12, top: 8 },
      },
      tooltip: {
        backgroundColor: 'rgba(43, 74, 106, 0.9)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        borderColor: '#f57c00',
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Revenus ($)',
          color: '#2b4a6a',
          font: { size: 14, weight: 'bold' },
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          borderColor: '#2b4a6a',
        },
        stacked: true,
        ticks: {
          font: { size: 12 },
          color: '#2b4a6a',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Mois',
          color: '#2b4a6a',
          font: { size: 14, weight: 'bold' },
        },
        grid: {
          display: false,
        },
        stacked: true,
        ticks: {
          font: { size: 12 },
          color: '#2b4a6a',
        },
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-gradient-to-br from-white/90 to-gray-50/80 rounded-2xl p-3 shadow-sm border border-[#f57c00]/30 backdrop-blur-sm overflow-visible max-w-[650px] w-full min-w-0"
    >
      <div className="w-full h-80">
        <Bar data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default PlanRevenueChart;