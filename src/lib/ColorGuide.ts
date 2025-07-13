// Palette de couleurs N School - Extraite du design existant
export const colors = {
  // Couleurs principales
  primary: '#f57c00', // Orange principal
  secondary: '#ff9800', // Orange secondaire
  accent: '#2b4a6a', // Bleu foncé
  accentLight: '#7ba1c9', // Bleu clair
  
  // Couleurs de fond
  background: '#FFFFFF',
  backgroundDark: '#1a1a1a',
  backgroundLight: '#f8fafc',
  backgroundGradient: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fef3c7 100%)',
  
  // Couleurs de texte
  text: '#111111',
  textLight: '#6b7280',
  textDark: '#1f2937',
  textWhite: '#ffffff',
  
  // Couleurs d'état
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Couleurs de gradient
  gradientPrimary: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
  gradientSecondary: 'linear-gradient(135deg, #2b4a6a 0%, #7ba1c9 100%)',
  gradientAccent: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  
  // Couleurs d'animation
  glow: '#f57c00',
  shimmer: '#ffb74d',
  pulse: '#ffcc02',
  
  // Couleurs de bordure
  border: '#e5e7eb',
  borderDark: '#374151',
  borderAccent: '#f57c00',
  
  // Couleurs d'ombre
  shadow: 'rgba(245, 124, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.1)',
  
  // Couleurs de transparence
  overlay: 'rgba(245, 124, 0, 0.05)',
  overlayDark: 'rgba(0, 0, 0, 0.05)',
};

// Thèmes
export const themes = {
  light: {
    background: colors.background,
    text: colors.text,
    border: colors.border,
    shadow: colors.shadow,
  },
  dark: {
    background: colors.backgroundDark,
    text: colors.textWhite,
    border: colors.borderDark,
    shadow: colors.shadowDark,
  },
};

// Animations
export const animations = {
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
    duration: 0.6,
  },
  ease: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5,
  },
  bounce: {
    type: 'spring',
    stiffness: 200,
    damping: 10,
  },
};

// Transitions
export const transitions = {
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  card: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  slide: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}; 