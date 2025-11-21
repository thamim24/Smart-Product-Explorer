'use client';

import CategorySelect from './CategorySelect';
import BrandSelect from './BrandSelect';
import PriceSlider from './PriceSlider';
import SortSelect from './SortSelect';

interface FiltersWrapperProps {
  categories: string[];
  brands: string[];
  selectedCategory: string;
  selectedBrand: string;
  maxPrice: number;
  filterMaxPrice: number;
  sortBy: string;
  viewMode: 'grid' | 'list';
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (value: 'grid' | 'list') => void;
}

export default function FiltersWrapper({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  maxPrice,
  filterMaxPrice,
  sortBy,
  viewMode,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onSortChange,
  onViewModeChange,
}: FiltersWrapperProps) {
  return (
    <div className="px-6 mb-16">
      <div className="max-w-6xl mx-auto">
        {/* Main filter card */}
        <div className="relative bg-gradient-to-br from-[var(--card)] to-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-3xl shadow-2xl shadow-accent/5 p-8 backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -z-10" />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border)]">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-1">Refine Your Search</h2>
              <p className="text-sm text-[var(--text-secondary)]">Filter and sort to find exactly what you need</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-2xl p-2 shadow-inner">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-accent to-purple-600 text-white shadow-xl shadow-accent/40 scale-105'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--card)]'
                }`}
                aria-label="Grid view"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-accent to-purple-600 text-white shadow-xl shadow-accent/40 scale-105'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--card)]'
                }`}
                aria-label="List view"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
          
          {/* Filters grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <CategorySelect
              categories={categories}
              value={selectedCategory}
              onChange={onCategoryChange}
            />
            <BrandSelect
              brands={brands}
              value={selectedBrand}
              onChange={onBrandChange}
            />
            <SortSelect value={sortBy} onChange={onSortChange} />
          </div>

          {/* Price slider - full width */}
          <div className="pt-6 border-t border-[var(--border)]">
            <PriceSlider
              maxPrice={maxPrice}
              value={filterMaxPrice}
              onChange={onPriceChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}