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
  Filler,
} from 'chart.js';
import { ScriptableContext } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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

const RevenueChart = () => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/30 backdrop-blur-md border border-[#f57c00]/20 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Croissance des Revenus</h3>
      <Line
        data={{
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Revenus ($)',
            data: [5000, 7000, 6500, 8000, 9000, 10000],
            borderColor: '#f57c00',
            backgroundColor: 'rgba(245, 124, 0, 0.3)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#f57c00',
            pointHoverBackgroundColor: '#f57c00',
            pointHoverBorderColor: '#fff',
          }],
        }}
        options={{
          animation: {
            delay: (ctx: ScriptableContext<'line'>) => ctx.dataIndex * 100,
            duration: 1000,
            easing: 'easeOutQuad',
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#f57c00',
              titleColor: '#fff',
              bodyColor: '#fff',
            },
          },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#e5e7eb' }, beginAtZero: true },
          },
        }}
      />
    </motion.div>
  );
};

export default RevenueChart;