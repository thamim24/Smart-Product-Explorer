'use client';

import { useEffect, useState, useMemo } from 'react';
import { Product, fetchProducts } from '@/lib/api';
import { useDebounced } from '@/hooks/useDebounced';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import FiltersWrapper from '@/components/Filters/FiltersWrapper';
import ProductGrid from '@/components/Product/ProductGrid';
import ProductSkeleton from '@/components/Product/ProductSkeleton';
import Footer from '@/components/Footer';

const INITIAL_VISIBLE_COUNT = 20;
const LOAD_MORE_COUNT = 20;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [filterMaxPrice, setFilterMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const debouncedSearch = useDebounced(search, 300);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(100);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Derive categories, brands, and max price
  const { categories, brands, maxPrice } = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category))).sort();
    const brds = Array.from(new Set(products.map(p => p.brand || 'Unknown'))).sort();
    const max = Math.max(...products.map(p => p.price), 0);
    return { categories: cats, brands: brds, maxPrice: max };
  }, [products]);

  // Initialize filterMaxPrice after products load
  useEffect(() => {
    if (maxPrice > 0 && filterMaxPrice === 0) {
      setFilterMaxPrice(maxPrice);
    }
  }, [maxPrice, filterMaxPrice]);

  // Filter and sort products
  const filteredList = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    
    let list = products.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (brand !== 'all' && (p.brand || 'Unknown') !== brand) return false;
      if (filterMaxPrice > 0 && p.price > filterMaxPrice) return false;
      if (term) {
        const searchText = `${p.title} ${p.description} ${p.category} ${p.brand}`.toLowerCase();
        return searchText.includes(term);
      }
      return true;
    });

    // Sort
    const copy = list.slice();
    if (sortBy === 'price-asc') {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      copy.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      copy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      copy.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'rating-desc') {
      copy.sort((a, b) => b.rating - a.rating);
    }

    return copy;
  }, [products, debouncedSearch, category, brand, filterMaxPrice, sortBy]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [debouncedSearch, category, brand]);

  // Display list (limited by visibleCount)
  const displayList = useMemo(() => {
    return filteredList.slice(0, visibleCount);
  }, [filteredList, visibleCount]);

  // Infinite scroll
  const loadMore = () => {
    if (visibleCount < filteredList.length) {
      setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredList.length));
    }
  };

  const loadRef = useInfiniteScroll(loadMore);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Hero />
        <div className="px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <SearchBar value={search} onChange={setSearch} />
      <FiltersWrapper
        categories={categories}
        brands={brands}
        selectedCategory={category}
        selectedBrand={brand}
        maxPrice={maxPrice}
        filterMaxPrice={filterMaxPrice}
        sortBy={sortBy}
        viewMode={viewMode}
        onCategoryChange={setCategory}
        onBrandChange={setBrand}
        onPriceChange={setFilterMaxPrice}
        onSortChange={setSortBy}
        onViewModeChange={setViewMode}
      />
      <ProductGrid products={displayList} viewMode={viewMode} />
      
      {/* Infinite scroll trigger */}
      {visibleCount < filteredList.length && (
        <div ref={loadRef} className="h-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      )}
      
      {/* Results count */}
      <div className="text-center py-8 text-sm text-[var(--text-secondary)]">
        Showing {displayList.length} of {filteredList.length} products
      </div>
      
      <Footer />
    </main>
  );
}