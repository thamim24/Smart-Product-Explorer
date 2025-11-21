'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored === 'dark' || (!stored && prefersDark);
    
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.08, rotate: 180 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-br from-[var(--card)] to-[var(--bg-secondary)] border-2 border-[var(--border)] shadow-2xl hover:shadow-accent/20 transition-all duration-300 backdrop-blur-sm group overflow-hidden"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon container with rotation animation */}
      <div className="relative w-7 h-7">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-7 h-7 text-[var(--text)] absolute inset-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-7 h-7 text-[var(--text)] absolute inset-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        {isDark ? 'Light' : 'Dark'} Mode
      </div>
    </motion.button>
  );
}