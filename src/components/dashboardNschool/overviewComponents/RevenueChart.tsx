import React from 'react';
import { motion } from 'framer-motion';
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

interface RevenueChartData {
  months: string[];
  revenue: number[];
}

interface RevenueChartProps {
  data: RevenueChartData;
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  const { theme } = useTheme();

  if (!data.months.length || !data.revenue.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl p-6 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] border border-[#f57c00]/20' 
            : 'bg-white border border-gray-200'
        } shadow-lg`}
      >
        <p className={`text-center ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Aucune donnée disponible
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
        label: 'Revenus',
        data: data.revenue,
        borderColor: (context: any) => createGradient(context.chart.ctx),
        backgroundColor: theme === 'dark' ? '#f97316' : '#f57c00',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: theme === 'dark' ? '#f97316' : '#f57c00',
        pointBorderColor: theme === 'dark' ? '#1e2a35' : '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
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
          color: theme === 'dark' ? '#f3f4f6' : '#374151',
          boxWidth: 20,
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Évolution des Revenus',
        font: {
          size: 16,
          family: 'Inter, sans-serif',
        },
        color: theme === 'dark' ? '#f3f4f6' : '#374151',
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(30, 42, 53, 0.95)' : 'rgba(43, 74, 106, 0.95)',
        titleFont: { size: 13 },
        bodyFont: { size: 11 },
        padding: 12,
        cornerRadius: 8,
        borderColor: theme === 'dark' ? '#f97316' : '#f57c00',
        borderWidth: 2,
        displayColors: true,
        callbacks: {
          label: (context) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois',
          color: theme === 'dark' ? '#f3f4f6' : '#374151',
          font: { size: 12, weight: 'bold' },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: { size: 11 },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenus ($)',
          color: theme === 'dark' ? '#f3f4f6' : '#374151',
          font: { size: 12, weight: 'bold' },
        },
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: { size: 11 },
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  const totalRevenue = data.revenue.reduce((sum, value) => sum + value, 0);
  const averageRevenue = totalRevenue / data.revenue.length;
  const maxRevenue = Math.max(...data.revenue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-xl p-6 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#1e2a35] to-[#2a3744] border border-[#f57c00]/20' 
          : 'bg-white border border-gray-200'
      } shadow-lg`}
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        Évolution des Revenus
      </motion.h2>
      
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'
          }`}
        >
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`}>
            Total
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ${totalRevenue.toLocaleString()}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}
        >
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Moyenne
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ${averageRevenue.toLocaleString()}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`text-center p-3 rounded-lg ${
            theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
          }`}
        >
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`}>
            Maximum
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ${maxRevenue.toLocaleString()}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;