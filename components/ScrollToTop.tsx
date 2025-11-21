'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] shadow-2xl hover:shadow-accent/40 transition-all duration-300 group overflow-hidden"
          aria-label="Scroll to top"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Arrow icon with bounce animation on hover */}
          <motion.svg
            className="w-6 h-6 text-white relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white/30"
            initial={{ scale: 0, opacity: 0.5 }}
            whileTap={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-xs font-medium text-[var(--text)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            Back to top
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}