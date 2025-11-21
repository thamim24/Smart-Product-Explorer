'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/api';
import ImageCarousel from './ImageCarousel';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const handleAddToCart = () => {
    alert(`Added ${quantity} × ${product.title} to cart!`);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Back button */}
      <div className="px-6 py-8 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] text-[var(--text-secondary)] hover:text-accent hover:border-accent transition-all duration-300 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Products</span>
        </Link>
      </div>

      {/* Product details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image carousel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ImageCarousel images={product.images} title={product.title} />
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Header section */}
              <div className="space-y-4">
                {/* Category and Brand badges */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-sm font-semibold text-[var(--text)] capitalize">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20 rounded-full text-sm font-semibold text-accent">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {product.brand}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">
                  {product.title}
                </h1>

                {/* Rating and Stock */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl">
                    <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">{product.rating.toFixed(1)}</span>
                    <span className="text-[var(--text-secondary)]">/ 5.0</span>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                      product.stock > 0
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price section */}
              <div className="p-6 bg-gradient-to-br from-[var(--card)] to-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-2xl shadow-lg">
                <div className="flex items-baseline gap-4 mb-3">
                  {discountedPrice ? (
                    <>
                      <span className="text-5xl font-bold bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
                        ${discountedPrice}
                      </span>
                      <span className="text-2xl text-[var(--text-secondary)] line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                  )}
                </div>
                {product.discountPercentage > 0 && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    Save {product.discountPercentage.toFixed(0)}% OFF
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="p-6 bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl">
                <h2 className="text-xl font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Product Description
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-5 p-6 bg-gradient-to-br from-[var(--card)] to-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-2xl shadow-lg">
                <div>
                  <label className="block text-sm font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    Select Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] hover:border-accent hover:bg-accent/10 transition-all font-bold text-lg"
                      aria-label="Decrease quantity"
                    >
                      −
                    </motion.button>
                    <span className="min-w-[4rem] text-center font-bold text-2xl text-[var(--text)]">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-12 h-12 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] hover:border-accent hover:bg-accent/10 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-accent to-purple-600 text-white py-5 rounded-xl font-bold text-lg shadow-2xl shadow-accent/30 hover:shadow-accent/50 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}