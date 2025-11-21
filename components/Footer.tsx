export default function Footer() {
  return (
    <footer className="mt-20 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center md:text-left space-y-4">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-2">
            <h3 className="font-bold text-[var(--text)]">Thamimul Ansari M</h3>
          </div>
          
          <p className="text-sm text-[var(--text-secondary)] font-medium">
            Frontend Engineer — Next.js · React · UI
          </p>
          
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-sm">
            <a
              href="mailto:thamimul2004@gmail.com"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-accent transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              thamimul2004@gmail.com
            </a>
            <a
              href="tel:+919342876443"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-accent transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 93428 76443
            </a>
          </div>
          
          <div className="pt-6 mt-6 border-t border-[var(--border-light)]">
            <p className="text-xs text-[var(--text-muted)] flex items-center justify-center md:justify-start gap-2">
              <span>Built with</span>
              <span className="text-accent">♥</span>
              <span>using Next.js • Framer Motion • TailwindCSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}