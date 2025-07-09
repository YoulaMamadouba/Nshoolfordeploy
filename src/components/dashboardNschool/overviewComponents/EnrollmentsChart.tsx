import React from 'react';
import { motion } from 'framer-motion';
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
import { useTheme } from '@/contexts/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EnrollmentsChartData {
  months: string[];
  enrollments: number[];
}

interface EnrollmentsChartProps {
  data: EnrollmentsChartData;
}

const EnrollmentsChart = ({ data }: EnrollmentsChartProps) => {
  const { theme } = useTheme();

  if (!data.months.length || !data.enrollments.length) {
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

  const chartData: ChartData<'bar'> = {
    labels: data.months,
    datasets: [
      {
        label: 'Inscriptions',
        data: data.enrollments,
        backgroundColor: theme === 'dark' 
          ? 'rgba(245, 124, 0, 0.8)' 
          : 'rgba(245, 124, 0, 0.8)',
        borderColor: theme === 'dark' ? '#f97316' : '#f57c00',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      delay: (ctx) => ctx.dataIndex * 100,
    },
    layout: {
      padding: {
        top: 15,
        bottom: 15,
        left: 8,
        right: 8,
      },
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
        text: 'Inscriptions Mensuelles',
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
          label: (context) => `${context.parsed.y} inscriptions`,
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
          text: 'Nombre d\'Inscriptions',
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
          stepSize: 1,
        },
      },
    },
  };

  const totalEnrollments = data.enrollments.reduce((sum, value) => sum + value, 0);
  const averageEnrollments = totalEnrollments / data.enrollments.length;
  const maxEnrollments = Math.max(...data.enrollments);

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
        Inscriptions Mensuelles
      </motion.h2>
      
      <div className="h-80">
        <Bar data={chartData} options={options} />
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
            {totalEnrollments.toLocaleString()}
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
            {Math.round(averageEnrollments).toLocaleString()}
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
            {maxEnrollments.toLocaleString()}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnrollmentsChart;