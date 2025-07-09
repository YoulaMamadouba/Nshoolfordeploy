import React from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { useTheme } from '@/contexts/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TenantsChartData {
  schools: number;
  universities: number;
  admins: number;
}

interface TenantsChartProps {
  data: TenantsChartData;
}

const TenantsChart = ({ data }: TenantsChartProps) => {
  const { theme } = useTheme();

  const total = data.schools + data.universities + data.admins;

  if (total === 0) {
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

  const chartData: ChartData<'doughnut'> = {
    labels: ['Écoles', 'Universités', 'Admins'],
    datasets: [
      {
        data: [data.schools, data.universities, data.admins],
        backgroundColor: [
          theme === 'dark' ? '#f97316' : '#f57c00',
          theme === 'dark' ? '#3b82f6' : '#3b82f6',
          theme === 'dark' ? '#10b981' : '#10b981',
        ],
        borderColor: [
          theme === 'dark' ? '#ea580c' : '#ea580c',
          theme === 'dark' ? '#2563eb' : '#2563eb',
          theme === 'dark' ? '#059669' : '#059669',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
      animateScale: true,
      animateRotate: true,
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: theme === 'dark' ? '#f3f4f6' : '#374151',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: 'Répartition des Tenants',
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
        Répartition des Tenants
      </motion.h2>
      
      <div className="h-80">
        <Doughnut data={chartData} options={options} />
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
            Écoles
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {data.schools}
          </p>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {((data.schools / total) * 100).toFixed(1)}%
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
            Universités
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {data.universities}
          </p>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {((data.universities / total) * 100).toFixed(1)}%
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
            Admins
          </p>
          <p className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {data.admins}
          </p>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {((data.admins / total) * 100).toFixed(1)}%
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TenantsChart;