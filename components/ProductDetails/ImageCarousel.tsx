'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main image with enhanced styling */}
        <div
          className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--border)] group cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 pointer-events-none z-10" />
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons with enhanced design */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-xl border-2 border-[var(--border)] hover:border-accent shadow-xl hover:shadow-2xl transition-all z-20 group/btn"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-[var(--text)] group-hover/btn:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-3 rounded-xl border-2 border-[var(--border)] hover:border-accent shadow-xl hover:shadow-2xl transition-all z-20 group/btn"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-[var(--text)] group-hover/btn:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}

        {/* Enhanced image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 z-20 bg-black/70 dark:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/20 shadow-lg">
            <span className="text-accent">{currentIndex + 1}</span>
            <span className="mx-1.5">/</span>
            <span>{images.length}</span>
          </div>
        )}

          {/* Zoom hint */}
          <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border border-white/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              Click to zoom
            </div>
          </div>
        </div>

      {/* Enhanced thumbnails grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all shadow-md hover:shadow-xl ${
                index === currentIndex
                  ? 'border-accent ring-2 ring-accent/30 scale-105'
                  : 'border-[var(--border)] hover:border-accent/50'
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
              {/* Active indicator */}
              {index === currentIndex && (
                <motion.div
                  layoutId="activeThumb"
                  className="absolute inset-0 bg-accent/20 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {/* Thumbnail number */}
              <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                {index + 1}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Image indicators (dots) for mobile */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 sm:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-[var(--border)] hover:bg-accent/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
      </div>

      {/* Zoomed Image Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full border-2 border-white/20 hover:border-white/40 transition-all group"
              aria-label="Close zoom"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Navigation in zoom mode */}
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full border-2 border-white/20 hover:border-white/40 transition-all"
                  aria-label="Previous image"
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full border-2 border-white/20 hover:border-white/40 transition-all"
                  aria-label="Next image"
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}

            {/* Image counter in zoom */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-lg font-bold border-2 border-white/20"
              >
                <span className="text-accent">{currentIndex + 1}</span>
                <span className="mx-2">/</span>
                <span>{images.length}</span>
              </motion.div>
            )}

            {/* Zoomed Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] cursor-zoom-out"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex]}
                alt={`${title} - Zoomed Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Hint text */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-[110] bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
            >
              Click anywhere to close • Use arrows to navigate
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}