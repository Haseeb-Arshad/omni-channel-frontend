"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  once?: boolean;
  delayMs?: number;
  animationClass?: string;
}

/**
 * LazySection component that leverages Intersection Observer to load content
 * only when it enters the viewport (or approaches it based on rootMargin).
 * 
 * This is optimized for the lower sections of the page that might be causing
 * loading performance issues. It works with the global CSS lazy-section classes.
 */
const LazySection: React.FC<LazyLoadProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '200px 0px',
  className = '',
  once = true,
  delayMs = 0,
  animationClass = 'fade-in-up',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      // Fallback for browsers without IntersectionObserver support
      setIsVisible(true);
      setIsLoaded(true);
      return;
    }

    // Clean up previous observer if it exists
    if (observer) {
      observer.disconnect();
    }

    // Create new IntersectionObserver with optimized settings
    const newObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // When section is visible, set it to visible
          setIsVisible(true);
          
          // Wait for a small delay if specified before loading content
          // This can help with staggered loading effects
          if (delayMs > 0) {
            setTimeout(() => setIsLoaded(true), delayMs);
          } else {
            setIsLoaded(true);
          }
          
          // If once is true, unobserve after it becomes visible
          if (once && entry.isIntersecting) {
            newObserver.unobserve(entry.target);
          }
        } else if (!once) {
          // If not using "once" mode, toggle visibility based on intersection
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin,
      }
    );

    // Observe the section
    if (sectionRef.current) {
      newObserver.observe(sectionRef.current);
    }
    
    setObserver(newObserver);

    // Cleanup on unmount
    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, [threshold, rootMargin, once, delayMs]);

  return (
    <div
      ref={sectionRef}
      className={`lazy-section ${isVisible ? 'lazy-visible' : 'lazy-hidden'} ${
        isLoaded ? 'lazy-loaded' : ''
      } ${isVisible && animationClass ? animationClass : ''} ${className}`}
      data-loaded={isLoaded ? 'true' : 'false'}
    >
      {/* Only render children when visible or already loaded to save resources */}
      {(isVisible || isLoaded) && children}
    </div>
  );
};

export default LazySection;
