'use client';
import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fonction pour appliquer le thème
  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    applyTheme(newTheme);
  };

  // Initialisation au montage
  useEffect(() => {
    setMounted(true);
    
    // Récupérer le thème depuis localStorage
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(initialTheme);
    applyTheme(initialTheme);
  }, []);

  return {
    isDark,
    mounted,
    toggleTheme,
  };
} 