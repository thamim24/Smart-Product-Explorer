'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Product } from '@/lib/api';

interface ProductListCardProps {
  product: Product;
}

export default function ProductListCard({ product }: ProductListCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.id}`}
        className="flex flex-col sm:flex-row gap-6 p-6 bg-gradient-to-r from-[var(--card)] to-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-2xl hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 group relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 via-purple-500/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={isHovered ? { x: ['-100%', '100%'] } : {}}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        />

        {/* Image section */}
        <div className="relative w-full sm:w-56 h-56 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg">
          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discountPercentage.toFixed(0)}%
            </div>
          )}
          {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              Low Stock
            </div>
          )}
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
            sizes="(max-width: 640px) 100vw, 224px"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content section */}
        <div className="flex-1 flex flex-col justify-between z-10">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-2xl font-bold text-[var(--text)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-purple-600 transition-all duration-300 line-clamp-2">
                {product.title}
              </h3>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {discountedPrice ? (
                  <>
                    <span className="text-sm text-[var(--text-secondary)] line-through">
                      ${product.price}
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
                      ${discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Category and Brand */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-xs font-semibold text-[var(--text)] capitalize">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {product.category}
              </span>
              {product.brand && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20 rounded-full text-xs font-semibold text-accent">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {product.brand}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">
              {product.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-4">
              {product.rating && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full">
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              )}
              {product.stock !== undefined && (
                <span
                  className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
                    product.stock > 0
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                </span>
              )}
            </div>

            {/* View Details button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-accent to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 flex items-center gap-2"
            >
              View Details
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}