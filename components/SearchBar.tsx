'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-6 py-8 mt-8">
      <div className="relative group">
        {/* Glowing effect on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-purple-600/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
        
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search for products, brands, categories..."
            className="w-full px-8 py-5 pl-16 pr-12 rounded-3xl bg-[var(--card)] border-2 border-[var(--border)] text-[var(--text)] text-lg placeholder:text-[var(--text-muted)] focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 shadow-xl shadow-[var(--shadow-md)] hover:shadow-2xl transition-all duration-300"
          />
          
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--text-muted)] group-focus-within:text-accent group-focus-within:scale-110 transition-all duration-300">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[var(--bg-secondary)] hover:scale-110 transition-all duration-200 group/clear"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5 text-[var(--text-secondary)] group-hover/clear:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}