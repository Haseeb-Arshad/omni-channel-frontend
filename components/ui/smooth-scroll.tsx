import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

// Register GSAP plugins only once on client side
let pluginsRegistered = false;

if (typeof window !== 'undefined' && !pluginsRegistered) {
  try {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    pluginsRegistered = true;
  } catch (error) {
    console.error('Error registering GSAP plugins:', error);
  }
}

interface SmoothScrollProps {
  children: React.ReactNode;
  // Enable/disable smooth scrolling - useful for performance critical pages
  enabled?: boolean;
  // Optional options to customize locomotive scroll
  options?: {
    lerp?: number; // 0-1 (lower = smoother but slower)
    multiplier?: number; // Scroll speed multiplier
  };
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children, enabled = true, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize smooth scroll with lazy loading
  useEffect(() => {
    // Skip initialization if disabled
    if (!enabled) return;
    if (!containerRef.current) return;
    
    let scrollInstance: any = null;
    
    // Use requestIdleCallback for non-critical initialization
    const initScroll = async () => {
      try {
        // Dynamically import LocomotiveScroll to avoid SSR issues
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        // Initialize Locomotive Scroll with performance optimizations
        scrollInstance = new LocomotiveScroll({
          el: containerRef.current as HTMLElement,
          smooth: true,
          lerp: options?.lerp || 0.05, // Reduced from 0.08 for better performance
          // Customize other options with proper typing
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
        });
        
        // Apply custom multiplier if available (using direct property access instead)
        if (options?.multiplier && scrollInstance.scroll) {
          // Apply multiplier through the instance API instead of initialization
          (scrollInstance as any).options.multiplier = options.multiplier;
        }
        
        scrollRef.current = scrollInstance;
        
        // Setup ScrollTrigger integration with improved performance
        if (scrollInstance) {
          // Throttle scroll events for better performance
          let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
          scrollInstance.on('scroll', (instance: any) => {
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
              ScrollTrigger.update();
              scrollTimeout = null;
            }, 50);
          });
          
          // More efficient proxy setup
          if (containerRef.current) {
            ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
              if (scrollInstance) {
                if (arguments.length) {
                  // Make sure value is a valid number
                  const numValue = Number(value);
                  if (!isNaN(numValue)) {
                    scrollInstance.scrollTo(numValue);
                  }
                  return value;
                } else {
                  return scrollInstance.scroll.instance.scroll.y;
                }
              }
              return 0;
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                right: window.innerWidth,
                bottom: window.innerHeight,
              };
            },
            pinType: containerRef.current.style.transform ? 'transform' : 'fixed',
          });
          }
          
          setIsReady(true);
        }
      } catch (error) {
        console.error('Error initializing smooth scroll:', error);
        // Fall back to native scrolling on error
        setIsReady(true);
      }
    };
    
    // Use requestIdleCallback or setTimeout as fallback
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(initScroll);
      } else {
        setTimeout(initScroll, 200); // Delay initialization
      }
    }
    
    // Optimize resize handling with throttle
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) return;
      resizeTimeout = window.setTimeout(() => {
        scrollRef.current?.update();
        resizeTimeout = null;
      }, 100) as unknown as number; // Throttle to 100ms
    };
    
    // Use passive event listeners for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Load event optimization
    const handleLoad = () => {
      if (scrollRef.current) {
        scrollRef.current.update();
        ScrollTrigger.refresh(); // Force refresh
      }
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    // Clean up with improved error handling
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      // Declare scrollTimeout at this scope level to avoid reference errors
      const localScrollTimeout = scrollRef.current ? 
        (scrollRef.current as any).__scrollTimeout : null;
        
      if (localScrollTimeout) {
        clearTimeout(localScrollTimeout);
      }
      
      try {
        // Clean up ScrollTrigger
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.clearScrollMemory();
        
        // Clean up LocomotiveScroll
        if (scrollRef.current) {
          scrollRef.current.destroy();
          scrollRef.current = null;
        }
      } catch (error) {
        console.error('Error during smooth scroll cleanup:', error);
      }
    };
  }, [enabled, options]);

  // Only apply smooth scroll container if enabled
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className="smooth-scroll-container" ref={containerRef}>
      <div data-scroll-section>
        {/* Add lazy-load class to help with CSS-based optimizations */}
        <div className={`smooth-scroll-content ${isReady ? 'is-ready' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SmoothScroll;
