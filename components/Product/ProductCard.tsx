'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="group relative bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40 transition-all duration-500 cursor-pointer h-full flex flex-col">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          
          {/* Image container */}
          <div className="relative aspect-square bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--border)] overflow-hidden">
            {/* Discount badge */}
            {product.discountPercentage > 0 && (
              <div className="absolute top-3 right-3 z-20 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                -{product.discountPercentage.toFixed(0)}%
              </div>
            )}
            
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-semibold text-sm px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                Quick View →
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col p-5 relative z-10">
            {/* Category */}
            <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              {product.category}
            </span>
            
            {/* Title */}
            <h3 className="font-bold text-[var(--text)] mb-3 line-clamp-2 text-lg group-hover:text-accent transition-colors leading-snug">
              {product.title}
            </h3>
            
            {/* Rating and stock */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-[var(--text)]">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-[var(--text-secondary)] text-xs">
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>
            
            {/* Price section */}
            <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-end justify-between">
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-accent via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </div>
                {product.discountPercentage > 0 && (
                  <div className="text-xs text-[var(--text-muted)] line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </div>
                )}
              </div>
              
              {/* Add to cart icon */}
              <div className="w-10 h-10 rounded-full bg-accent/10 group-hover:bg-accent text-[var(--text-muted)] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}