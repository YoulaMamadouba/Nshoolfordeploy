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
} from 'chart.js';
import { ScriptableContext } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

interface TenantTypes {
  schools: number;
  universities: number;
  admins: number;
}

interface TenantsChartProps {
  tenantTypes: TenantTypes;
}

const TenantsChart = ({ tenantTypes }: TenantsChartProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white/90 backdrop-blur-sm border border-[#2b4a6a]/20 rounded-2xl p-4 shadow-lg max-w-lg max-h-80 overflow-hidden"
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="text-2xl font-semibold text-gray-900 text-center mb-4 drop-shadow-md"
      >
        Répartition des Tenants
      </motion.h3>
      
      <div className="h-48">
        <Bar
          data={{
            labels: ['Écoles', 'Universités', 'Admins'],
            datasets: [{
              label: 'Tenants',
              data: [tenantTypes.schools, tenantTypes.universities, tenantTypes.admins],
              backgroundColor: [
                'rgba(43, 74, 106, 0.8)', // Bleu soft pour écoles
                'rgba(255, 152, 0, 0.8)',  // Orange soft pour universités
                'rgba(255, 193, 7, 0.8)'   // Ambre pour admins
              ],
              borderColor: [
                '#2b4a6a', // Bleu sidebar
                '#ff9800', // Orange
                '#ffc107'  // Ambre
              ],
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
              barThickness: 35,
              maxBarThickness: 40,
            }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              delay: (ctx: ScriptableContext<'bar'>) => ctx.dataIndex * 200,
              duration: 800,
              easing: 'easeOutQuart',
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                cornerRadius: 8,
                displayColors: false,
                titleFont: { size: 14, weight: 600 },
                bodyFont: { size: 13 },
                callbacks: {
                  label: (context) => `${context.parsed.y} tenant${context.parsed.y !== 1 ? 's' : ''}`,
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  color: '#6b7280',
                  font: { size: 12, weight: 500 },
                },
                border: { display: false },
              },
              y: {
                grid: { color: 'rgba(0, 0, 0, 0.1)' },
                beginAtZero: true,
                ticks: {
                  color: '#6b7280',
                  font: { size: 11 },
                  stepSize: 1,
                },
                border: { display: false },
              },
            },
            layout: {
              padding: { top: 10, bottom: 5 },
            },
          }}
        />
      </div>
      
      <div className="flex justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#2b4a6a]"></div>
          <span className="text-gray-600 font-medium">Écoles</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#ff9800]"></div>
          <span className="text-gray-600 font-medium">Universités</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[#ffc107]"></div>
          <span className="text-gray-600 font-medium">Admins</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TenantsChart;