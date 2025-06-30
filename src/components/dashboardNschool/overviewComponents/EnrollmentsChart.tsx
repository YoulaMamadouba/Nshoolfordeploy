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

const EnrollmentsChart = () => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/30 backdrop-blur-md border border-[#f57c00]/20 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Inscriptions Mensuelles</h3>
      <Bar
        data={{
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Inscriptions',
            data: [150, 200, 180, 220, 250, 300],
            backgroundColor: 'rgba(43, 74, 106, 0.7)',
            borderColor: '#2b4a6a',
            borderWidth: 1,
          }],
        }}
        options={{
          animation: {
            delay: (ctx: ScriptableContext<'bar'>) => ctx.dataIndex * 100,
            duration: 1000,
            easing: 'easeOutBounce',
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

export default EnrollmentsChart;