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
  const [hoveredSection, setHoveredSection] = useState<{
    label: string;
    value: number;
    percentage: string;
    color: string;
    x: number;
    y: number;
  } | null>(null);

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
      duration: 2000,
      easing: 'easeOutCubic',
      animateScale: true,
      animateRotate: true,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 10,
            family: 'Inter, sans-serif',
            weight: 'bold',
          },
          color: '#2b4a6a',
          boxWidth: 14,
          padding: 8,
          usePointStyle: true,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i] as number;
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor![i] as string,
                  strokeStyle: '#fff',
                  lineWidth: 2,
                  pointStyle: 'circle',
                  fontColor: '#2b4a6a',
                };
              });
            }
            return [];
          },
        },
      },
      title: {
        display: true,
        text: 'Répartition des Abonnements',
        font: {
          size: 12,
          family: 'Inter, sans-serif',
          weight: 'bold',
        },
        color: '#2b4a6a',
        padding: { bottom: 10, top: 5 },
      },
      tooltip: {
        enabled: false,
      },
    },
    onHover: (event, chartElements) => {
      if (chartElements.length > 0) {
        const element = chartElements[0];
        const index = element.index;
        const dataset = chartData.datasets[0];
        const label = chartData.labels![index] as string;
        const value = dataset.data[index] as number;
        const percentage = ((value / total) * 100).toFixed(1);
        const color = dataset.backgroundColor![index] as string;

        const chart = element.element as any;
        const { startAngle, endAngle } = chart;
        const midAngle = (startAngle + endAngle) / 2;
        const { x: centerX, y: centerY } = chart.getCenterPoint();
        const radius = chart.outerRadius;

        // Positionnement spécifique pour chaque section
        let popupX, popupY;
        const baseOffset = 10;

        if (label === 'Free') {
          // Positionnement au-dessus de la section grise
          const angleOffset = -Math.PI / 2;
          const adjustedAngle = midAngle + angleOffset;
          popupX = centerX + (radius * 0.7) * Math.cos(adjustedAngle);
          popupY = centerY + (radius * 0.7) * Math.sin(adjustedAngle) - 20;
        } else {
          // Positionnement standard pour les autres sections
          popupX = centerX + (radius + baseOffset) * Math.cos(midAngle);
          popupY = centerY + (radius + baseOffset) * Math.sin(midAngle);
        }

        // Ajustements spécifiques pour Premium (orange) et Enterprise (violet)
        if (label === 'Premium') {
          popupY -= 15;
        } else if (label === 'Enterprise') {
          popupX += 5;
          popupY -= 10;
        }

        // Contraintes pour rester dans le conteneur
        const containerWidth = 318;
        const containerHeight = 288;
        const popupWidth = 80;
        const popupHeight = 80;
        const margin = 20;
        
        const boundedX = Math.max(
          margin + popupWidth / 2,
          Math.min(popupX, containerWidth - margin - popupWidth / 2)
        );
        const boundedY = Math.max(
          margin + popupHeight / 2,
          Math.min(popupY, containerHeight - margin - popupHeight / 2)
        );

        setHoveredSection({
          label,
          value,
          percentage,
          color,
          x: boundedX,
          y: boundedY,
        });
      } else {
        setHoveredSection(null);
      }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 backdrop-blur-sm overflow-hidden max-w-[318px] w-full min-w-0"
    >
      <div className="w-full h-72 relative">
        <Pie data={chartData} options={options} />
        {hoveredSection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 10,
              delay: hoveredSection.label === 'Premium' || hoveredSection.label === 'Enterprise' ? 0.1 : 0
            }}
            className="absolute rounded-full shadow-lg p-4 text-xs text-white flex flex-col items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${hoveredSection.color} 0%, ${hoveredSection.color}cc 70%, transparent 100%)`,
              boxShadow: `0 4px 15px ${hoveredSection.color}80, 0 0 20px ${hoveredSection.color}40`,
              width: '80px',
              height: '80px',
              top: `${hoveredSection.y}px`,
              left: `${hoveredSection.x}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              textShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-bold text-center">{hoveredSection.label}</p>
              <p className="text-center">Valeur: {hoveredSection.value}</p>
              <p className="text-center">Pourcentage: {hoveredSection.percentage}%</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SubscriptionDistributionChart;