# Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Navigate to project directory:**
   ```bash
   cd woyage-product-filter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to http://localhost:3000

## Production Build

### Build for Production

```bash
npm run build
npm start
```

This will create an optimized production build and start the server.

## Deploy to Vercel (Recommended)

### Method 1: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts and deploy**

### Method 2: Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and configure settings
5. Click "Deploy"

## Environment Variables

No environment variables are required for this project as it uses the public DummyJSON API.

## Performance Optimization

The project includes:
- Image optimization via Next.js Image component
- Code splitting and lazy loading
- Debounced search (300ms)
- Infinite scroll for performance
- CSS variables for theme switching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Run `npm run build`

### TypeScript Errors

Ensure you have TypeScript 5.0+ installed:
```bash
npm install -D typescript@latest
```

### Image Loading Issues

Images are loaded from DummyJSON CDN. If images don't load, check:
- Internet connection
- next.config.js has correct image domains configured

## Testing Checklist

- [x] Search functionality works with debounce
- [x] Category filter updates products
- [x] Brand filter updates products  
- [x] Price slider filters correctly
- [x] Sort options work (price, name, rating)
- [x] Grid/List view toggle works
- [x] Infinite scroll loads more products
- [x] Product details page displays correctly
- [x] Theme toggle persists on reload
- [x] Responsive design on mobile/tablet/desktop
- [x] Images load correctly
- [x] Back navigation works
- [x] No console errors