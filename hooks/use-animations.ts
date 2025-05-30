import { useEffect, useRef } from 'react';
import { initAnimations, fadeIn, fadeInStagger, scaleIn, slideInLeft, slideInRight } from '@/lib/animations';

interface UseAnimationOptions {
  triggerOnMount?: boolean;
  delay?: number;
  duration?: number;
}

export const useAnimations = (options: UseAnimationOptions = {}) => {
  const { triggerOnMount = true, delay = 0, duration } = options;
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (triggerOnMount && !hasInitialized.current) {
      initAnimations();
      hasInitialized.current = true;
    }
  }, [triggerOnMount]);

  return {
    initAnimations,
    fadeIn: (element: Element) => fadeIn(element, delay, duration),
    fadeInStagger: (elements: Element[], staggerDelay = 0.1) => fadeInStagger(elements, staggerDelay, delay),
    scaleIn: (element: Element) => scaleIn(element, delay, duration),
    slideInLeft: (element: Element) => slideInLeft(element, delay, duration),
    slideInRight: (element: Element) => slideInRight(element, delay, duration),
  };
};

// Hook for animating elements when they enter the viewport
export const useIntersectionAnimation = (
  animation: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn' = 'fadeIn',
  options: IntersectionObserverInit = {}
) => {
  const ref = useRef<HTMLElement>(null);
  const animationRef = useRef<GSAPAnimation | null>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Determine which animation to use
          switch (animation) {
            case 'fadeIn':
              animationRef.current = fadeIn(currentRef);
              break;
            case 'slideInLeft':
              animationRef.current = slideInLeft(currentRef);
              break;
            case 'slideInRight':
              animationRef.current = slideInRight(currentRef);
              break;
            case 'scaleIn':
              animationRef.current = scaleIn(currentRef);
              break;
          }
          
          // Unobserve after animation is triggered
          observer.unobserve(currentRef);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
      ...options
    });
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [animation, options]);
  
  return ref;
};

// Custom type declaration for GSAP animation
type GSAPAnimation = {
  kill: () => void;
};
