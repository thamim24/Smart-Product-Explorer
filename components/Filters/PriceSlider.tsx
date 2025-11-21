'use client';

interface PriceSliderProps {
  maxPrice: number;
  value: number;
  onChange: (value: number) => void;
}

export default function PriceSlider({ maxPrice, value, onChange }: PriceSliderProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-[var(--text)]">
          Price Range
        </label>
        <span className="text-sm font-bold text-accent px-3 py-1 bg-accent/10 rounded-lg">
          ${value.toFixed(2)}
        </span>
      </div>
      <div className="relative pt-1">
        <input
          type="range"
          min="0"
          max={maxPrice}
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer transition-all"
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(value / maxPrice) * 100}%, var(--border) ${(value / maxPrice) * 100}%, var(--border) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
          <span>$0</span>
          <span>${maxPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}