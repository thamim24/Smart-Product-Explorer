import { useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(callback: () => void) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(node);
      elementRef.current = node;
    }
  }, [callback]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return setRef;
}