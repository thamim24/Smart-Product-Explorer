'use client';

interface CategorySelectProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({ categories, value, onChange }: CategorySelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--text)] mb-3">
        Category
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 hover:border-[var(--accent)]/30 transition-all cursor-pointer appearance-none bg-right pr-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}