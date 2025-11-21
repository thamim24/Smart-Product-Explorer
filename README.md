# Smart Product Explorer

Next.js + TypeScript + Tailwind + Framer Motion

Data: DummyJSON (https://dummyjson.com/products)

## Features

- Real-time debounced search
- Category & Brand filtering
- Price slider
- Sorting & Grid/List view
- Infinite scroll
- Product detail pages
- Light/Dark theme

## Run

1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **API:** DummyJSON

## Project Structure

```
woyage-product-filter/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles with CSS variables
│   ├── page.tsx             # Home page with products
│   └── product/[id]/
│       └── page.tsx         # Product details page
├── components/
│   ├── Hero.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── SearchBar.tsx
│   ├── Filters/             # All filter components
│   ├── Product/             # Product card components
│   └── ProductDetails/      # Product details components
├── hooks/
│   ├── useDebounced.ts      # Debounce hook
│   └── useInfiniteScroll.ts # Infinite scroll hook
└── lib/
    └── api.ts               # API wrapper functions
```

## Developer

**Thamimul Ansari M**  
Frontend Engineer — Next.js · React · UI

- Email: thamimul2004@gmail.com
- Phone: +91 93428 76443