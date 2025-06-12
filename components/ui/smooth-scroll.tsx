'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children, className }) => {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.defaults({
      scroller: 'body',
      markers: false,
    });
    
    // Refresh ScrollTrigger after DOM updates
    ScrollTrigger.refresh();
    
    return () => {
      // Cleanup GSAP ScrollTriggers
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default SmoothScroll;
