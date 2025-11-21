'use client';

import { AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/api';
import ProductCard from './ProductCard';
import ProductListCard from './ProductListCard';

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

export default function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-[var(--text-secondary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
          No products found
        </h3>
        <p className="text-[var(--text-secondary)]">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {products.map((product) => (
              <ProductListCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}