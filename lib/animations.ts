import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Reusable animations
export const fadeIn = (element: Element, delay: number = 0, duration: number = 0.6) => {
  return gsap.fromTo(
    element,
    { 
      opacity: 0,
      y: 20 
    },
    { 
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out' 
    }
  );
};

export const fadeInStagger = (elements: Element[], staggerDelay: number = 0.1, startDelay: number = 0) => {
  return gsap.fromTo(
    elements,
    { 
      opacity: 0,
      y: 20 
    },
    { 
      opacity: 1,
      y: 0,
      stagger: staggerDelay,
      duration: 0.6,
      delay: startDelay,
      ease: 'power2.out' 
    }
  );
};

export const scaleIn = (element: Element, delay: number = 0, duration: number = 0.5) => {
  return gsap.fromTo(
    element,
    { 
      opacity: 0,
      scale: 0.9 
    },
    { 
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: 'back.out(1.7)' 
    }
  );
};

export const slideInLeft = (element: Element, delay: number = 0, duration: number = 0.7) => {
  return gsap.fromTo(
    element,
    { 
      opacity: 0,
      x: -50 
    },
    { 
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out' 
    }
  );
};

export const slideInRight = (element: Element, delay: number = 0, duration: number = 0.7) => {
  return gsap.fromTo(
    element,
    { 
      opacity: 0,
      x: 50 
    },
    { 
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: 'power3.out' 
    }
  );
};

export const createScrollAnimation = (
  trigger: string | Element, 
  animation: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn',
  scrub: boolean = false,
  start: string = 'top 80%',
  end: string = 'bottom 20%',
) => {
  const element = typeof trigger === 'string' ? document.querySelector(trigger) : trigger;
  if (!element) return;

  let tween;
  
  switch (animation) {
    case 'fadeIn':
      tween = gsap.fromTo(element, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: scrub ? 1 : 0.6 });
      break;
    case 'slideInLeft':
      tween = gsap.fromTo(element, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: scrub ? 1 : 0.7 });
      break;
    case 'slideInRight':
      tween = gsap.fromTo(element, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: scrub ? 1 : 0.7 });
      break;
    case 'scaleIn':
      tween = gsap.fromTo(element, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: scrub ? 1 : 0.5 });
      break;
  }

  ScrollTrigger.create({
    trigger: element,
    start,
    end,
    scrub: scrub ? 1 : false,
    animation: tween,
    toggleActions: scrub ? undefined : 'play none none none',
  });
};

// Card hover animation
export const createCardHoverAnimation = (card: Element) => {
  const hoverScale = 1.02;
  const easing = 'power2.out';
  const duration = 0.3;

  card.addEventListener('mouseenter', () => {
    gsap.to(card, { 
      scale: hoverScale, 
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', 
      y: -5,
      duration, 
      ease: easing 
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { 
      scale: 1, 
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', 
      y: 0,
      duration, 
      ease: easing 
    });
  });
};

// Initialize animations on DOM elements
export const initAnimations = () => {
  if (typeof window === 'undefined') return;

  // Apply hover animations to cards
  document.querySelectorAll('.animate-hover-card').forEach((card) => {
    createCardHoverAnimation(card);
  });

  // Setup scroll animations
  document.querySelectorAll('.scroll-fade-in').forEach((element) => {
    createScrollAnimation(element, 'fadeIn');
  });

  document.querySelectorAll('.scroll-slide-left').forEach((element) => {
    createScrollAnimation(element, 'slideInLeft');
  });

  document.querySelectorAll('.scroll-slide-right').forEach((element) => {
    createScrollAnimation(element, 'slideInRight');
  });

  document.querySelectorAll('.scroll-scale-in').forEach((element) => {
    createScrollAnimation(element, 'scaleIn');
  });
};
