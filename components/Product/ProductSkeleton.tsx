export default function ProductSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[var(--card)] to-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-2xl p-6 shadow-lg overflow-hidden">
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative">
        {/* Image skeleton */}
        <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-4 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_infinite]" />
        </div>

        {/* Badge skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full animate-pulse" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-3 mb-4">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg w-3/4 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_infinite_0.2s]" />
          </div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg w-1/2 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_infinite_0.4s]" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg w-full animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg w-5/6 animate-pulse" />
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full animate-pulse" />
            <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}