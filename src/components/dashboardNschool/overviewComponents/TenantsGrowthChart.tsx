import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { useTheme } from '@/contexts/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TenantsGrowthData {
  months: string[];
  schools: number[];
  universities: number[];
  admins: number[];
}

interface TenantsGrowthChartProps {
  data: TenantsGrowthData;
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

const TenantsGrowthChart = ({ data }: TenantsGrowthChartProps) => {
  const { theme } = useTheme();

  if (!data.months.length || !data.schools.length || !data.universities.length || !data.admins.length) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`relative rounded-3xl p-8 shadow-xl border backdrop-blur-sm overflow-hidden w-full min-w-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] border-[#f57c00]/20'
            : 'bg-gradient-to-br from-white/95 to-gray-50/90 border-[#f57c00]/20'
        }`}
      >
        <p className={`text-sm text-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Aucune donnée disponible pour le graphique
        </p>
      </motion.div>
    );
  }

  const createGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, theme === 'dark' ? '#f97316' : '#f57c00');
    gradient.addColorStop(1, theme === 'dark' ? '#2b4a6a' : '#2b4a6a');
    return gradient;
  };

  const chartData: ChartData<'line'> = {
    labels: data.months,
    datasets: [
      {
        label: 'Écoles',
        data: data.schools,
        borderColor: (context: any) => createGradient(context.chart.ctx),
        backgroundColor: theme === 'dark' ? '#f97316' : '#f57c00',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: theme === 'dark' ? '#f97316' : '#f57c00',
        pointBorderColor: theme === 'dark' ? '#1e2a35' : '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Universités',
        data: data.universities,
        borderColor: (context: any) => createGradient(context.chart.ctx),
        backgroundColor: '#2b4a6a',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#2b4a6a',
        pointBorderColor: theme === 'dark' ? '#1e2a35' : '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Admins',
        data: data.admins,
        borderColor: (context: any) => createGradient(context.chart.ctx),
        backgroundColor: '#6b7280',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#6b7280',
        pointBorderColor: theme === 'dark' ? '#1e2a35' : '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
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
          },
          color: theme === 'dark' ? '#f3f4f6' : '#2b4a6a',
          boxWidth: 20,
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Croissance des Tenants (12 derniers mois)',
        font: {
          size: 16,
          family: 'Inter, sans-serif',
        },
        color: theme === 'dark' ? '#f3f4f6' : '#2b4a6a',
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(30, 42, 53, 0.95)' : 'rgba(43, 74, 106, 0.95)',
        titleFont: { size: 13 },
        bodyFont: { size: 11 },
        padding: 12,
        cornerRadius: 10,
        borderColor: theme === 'dark' ? '#f97316' : '#f57c00',
        borderWidth: 2,
        displayColors: true,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} nouveaux tenants`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois',
          color: theme === 'dark' ? '#f3f4f6' : '#2b4a6a',
          font: { size: 12, weight: 'bold' },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nouveaux Tenants',
          color: theme === 'dark' ? '#f3f4f6' : '#2b4a6a',
          font: { size: 12, weight: 'bold' },
        },
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        },
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`relative rounded-3xl p-8 shadow-xl border backdrop-blur-sm overflow-hidden w-full min-w-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] border-[#f57c00]/20'
          : 'bg-gradient-to-br from-white/95 to-gray-50/90 border-[#f57c00]/20'
      }`}
    >
      <div className="w-full h-[500px]">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default TenantsGrowthChart;