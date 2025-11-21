# Smart Product Explorer - Features & Implementation

## ✨ Core Features

### 1. **Real-time Search**
- Debounced search input (300ms delay)
- Searches across product title, description, category, and brand
- Updates results dynamically without page reload
- Implementation: [`useDebounced`](hooks/useDebounced.ts) hook

### 2. **Dynamic Filtering**
- **Category Filter**: Dropdown with all available categories
- **Brand Filter**: Dropdown with all available brands
- **Price Slider**: Visual slider to set maximum price
- Filters work together (AND logic)
- Reset to initial count when filters change

### 3. **Sorting Options**
- Price: Low to High / High to Low
- Name: A to Z / Z to A
- Rating: High to Low
- Default (as returned from API)

### 4. **View Modes**
- **Grid View**: Responsive card grid (1-4 columns based on screen size)
- **List View**: Horizontal cards with more details
- Smooth transition between views
- Icons for easy mode switching

### 5. **Infinite Scroll**
- Initial load: 20 products
- Load 20 more on scroll to bottom
- Loading indicator during fetch
- Automatically stops when all filtered products shown
- Implementation: [`useInfiniteScroll`](hooks/useInfiniteScroll.ts) hook

### 6. **Product Details Page**
- Server-side rendering for SEO
- Image carousel with thumbnails
- Product information (price, rating, stock, description)
- Quantity selector
- Add to Cart simulation
- Dynamic metadata for sharing

### 7. **Light/Dark Theme**
- Toggle button in top-right corner
- Persists preference in localStorage
- Respects system preference on first visit
- Smooth transitions between themes
- CSS variables for consistent theming

### 8. **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly controls
- Optimized for all screen sizes

## 🎨 Design Principles

### Visual Hierarchy
- Clear section separation
- Consistent spacing using Tailwind utilities
- Maximum content width: 6xl (1152px)
- Horizontal padding: px-6 (24px) on mobile, px-8 on desktop

### Typography
- Font: Inter (system font fallback)
- Title: 4xl-5xl, bold
- Body: sm-base
- Consistent color usage with CSS variables

### Color Palette
- **Accent**: Purple (#8b5cf6)
- **Light mode**: White background, dark text
- **Dark mode**: Dark blue background, light text
- **Borders**: Subtle gray for cards and inputs

### Motion & Animation
- Framer Motion for smooth animations
- Hero: fade-in + upward motion
- Cards: scale on hover, layout animation
- Page transitions: opacity fade
- Duration: 200-600ms for different interactions

## 🏗️ Architecture

### State Management
- Local state with React hooks (useState, useMemo)
- Derived state for categories, brands, maxPrice
- Single source of truth: `products` array
- Never mutate original data (use `.slice()` before sort)

### Data Flow
1. Fetch products from DummyJSON API on mount
2. Compute derived data (categories, brands, max price)
3. Apply filters and sort in `useMemo`
4. Slice for visible count (infinite scroll)
5. Render in ProductGrid component

### Performance Optimizations
- `useMemo` for expensive computations
- Debounced search to reduce re-renders
- Image optimization with Next.js Image component
- Lazy loading with infinite scroll
- CSS animations (hardware-accelerated)

## 📁 File Structure Philosophy

### Separation of Concerns
- **app/**: Next.js App Router pages and layouts
- **components/**: Reusable UI components
- **hooks/**: Custom React hooks
- **lib/**: Utility functions and API wrappers

### Component Organization
- **Filters/**: All filter-related components
- **Product/**: Product display components
- **ProductDetails/**: Product detail page components

### Naming Conventions
- PascalCase for components
- camelCase for hooks and utilities
- Descriptive names (SearchBar, ProductCard, etc.)

## 🔑 Key Implementation Details

### Filtering Logic
```typescript
const filtered = useMemo(() => {
  let list = products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (brand !== 'all' && p.brand !== brand) return false;
    if (p.price > filterMaxPrice) return false;
    if (search && !matchesSearch(p, search)) return false;
    return true;
  });
  
  return list.slice().sort(comparator);
}, [products, search, category, brand, filterMaxPrice, sortBy]);
```

### Infinite Scroll Reset
```typescript
useEffect(() => {
  setVisibleCount(INITIAL_VISIBLE_COUNT);
}, [debouncedSearch, category, brand]);
```

### Theme Persistence
```typescript
useEffect(() => {
  const stored = localStorage.getItem('theme');
  const isDark = stored === 'dark' || (!stored && prefersDark);
  if (isDark) document.documentElement.classList.add('dark');
}, []);
```

## 🚀 Running Instructions

1. Navigate to project: `cd woyage-product-filter`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Open browser: http://localhost:3000

## 📦 Dependencies

- **next**: ^15.0.0 - React framework
- **react**: ^18.3.0 - UI library
- **framer-motion**: ^11.0.0 - Animations
- **tailwindcss**: ^3.4.0 - Styling
- **typescript**: ^5.0.0 - Type safety

## 🎯 Quality Standards

- Zero console warnings/errors
- All components have proper TypeScript types
- Unique keys for all mapped elements
- Accessible (ARIA labels, keyboard navigation)
- SEO-friendly (semantic HTML, meta tags)
- Production-ready code (error handling, loading states)