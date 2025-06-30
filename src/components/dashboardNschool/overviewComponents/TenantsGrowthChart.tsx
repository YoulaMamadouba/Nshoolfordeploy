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
  if (!data.months.length || !data.schools.length || !data.universities.length || !data.admins.length) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 backdrop-blur-sm overflow-hidden max-w-[800px] w-full min-w-0"
      >
        <p className="text-sm text-gray-500 text-center">Aucune donnée disponible pour le graphique</p>
      </motion.div>
    );
  }

  const createGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#f57c00');
    gradient.addColorStop(1, '#2b4a6a');
    return gradient;
  };

  const totalByMonth = data.months.map((_, i) => data.schools[i] + data.universities[i] + data.admins[i]);
  const maxGrowthIndex = totalByMonth.indexOf(Math.max(...totalByMonth));

  const chartData: ChartData<'line'> = {
    labels: data.months,
    datasets: [
      {
        label: 'Écoles',
        data: data.schools,
        borderColor: (context: any) => createGradient(context.chart.ctx),
        backgroundColor: '#f57c00',
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#f57c00',
        pointBorderColor: '#fff',
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
        pointBorderColor: '#fff',
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
        pointBorderColor: '#fff',
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
            weight: 'bold',
          },
          color: '#2b4a6a',
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
          weight: 'bold',
        },
        color: '#2b4a6a',
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: '#2b4a6a',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} nouveaux tenants`,
        },
      },
      annotation: {
        annotations: {
          peak: {
            type: 'line',
            xMin: maxGrowthIndex,
            xMax: maxGrowthIndex,
            yMin: 0,
            yMax: totalByMonth[maxGrowthIndex],
            borderColor: '#f57c00',
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: `Pic: ${totalByMonth[maxGrowthIndex]} tenants`,
              display: true,
              position: 'top',
              backgroundColor: '#f57c00',
              color: '#fff',
              font: { size: 12, weight: 'bold' },
              padding: 6,
              borderRadius: 4,
            },
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois',
          color: '#2b4a6a',
          font: { size: 12, weight: 'bold' },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nouveaux Tenants',
          color: '#2b4a6a',
          font: { size: 12, weight: 'bold' },
        },
        beginAtZero: true,
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 backdrop-blur-sm overflow-hidden max-w-[800px] w-full min-w-0"
    >
      <div className="w-full h-96">
        <Line data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default TenantsGrowthChart;