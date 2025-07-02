'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StarfieldBackground, GeometricBackground, useDevicePerformance } from "@/components/ui/lightweight-background";
import SmoothScroll from "@/components/ui/smooth-scroll";
import "./lightweight-backgrounds.css";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Channels from "@/components/landing/Channels";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Loader2 } from 'lucide-react';
import { initCursorEffects } from './cursor-effects';

if (typeof window !== 'undefined') {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (error) {
    console.error('Error registering ScrollTrigger plugin:', error);
  }
}

export default function Home() {
  // Refs for animation elements
  const mainRef = useRef<HTMLDivElement>(null);
  
  // DEV MODE: Skip loading screen entirely
  // const loaderRef = useRef<HTMLDivElement>(null);
  // const [isLoading, setIsLoading] = useState(true);
  
  // Always start as loaded
  const [isLoaded, setIsLoaded] = useState(true);
  
  // Check device performance for optimal experience
  const { isLowPerformanceDevice } = useDevicePerformance();
  
  // Initialize effects immediately
  useEffect(() => {
    // Initialize GSAP animations
    initAnimations();
    
    // Initialize cursor effects
    initCursorEffects();
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);
  
  // Removed loading animation code for development
  
  // Initialize all page animations
  const initAnimations = () => {
    if (typeof window === 'undefined') return;
    
    try {
      // Header scroll animation
      gsap.to('header', {
        scrollTrigger: {
          start: 'top top',
          end: '100 top',
          scrub: true,
        },
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      });
      
      // Reveal animations for visible sections
      const sections = document.querySelectorAll('[data-scroll-section]');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => (section as HTMLElement).classList.add('visible'),
          onEnterBack: () => (section as HTMLElement).classList.add('visible'),
        });
      });
    } catch (error) {
      console.error('Error initializing animations:', error);
    }
  };

  return (
    <>
      {/* DEV MODE: Removed loading screen */}
      
      {/* Main content - always shown in development */}
      {(
        <motion.div 
          ref={mainRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Dynamic background using lightweight alternatives */}
          <StarfieldBackground className="fixed inset-0 -z-10 opacity-[0.15]" />
          
          <SmoothScroll>
            <div data-scroll-container>
              <Header />
              
              {/* Main content */}
              <main className="relative">
                {/* Lightweight geometric background instead of 3D scene */}
                <GeometricBackground className="fixed inset-0 -z-10 opacity-[0.15]" />
                
                {/* Hero section */}
                <Hero />
                
                {/* Stats section */}
                <Stats />
                
                {/* Features section */}
                <Features />
                
                {/* Channels section */}
                <Channels />
                
                {/* Call to action section */}
                <CTA />
              </main>
              
              <Footer />
            </div>
          </SmoothScroll>
          
          {/* Cursor follower (decorative element) */}
          <div className="fixed top-0 left-0 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-indigo-500 opacity-0 pointer-events-none mix-blend-screen blur-sm z-50" 
            id="cursor-follower"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
          
          {/* Fixed corner decoration */}
          <div className="fixed bottom-6 right-6 w-24 h-24 pointer-events-none z-10 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#corner-gradient)" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="url(#corner-gradient)" strokeWidth="1" strokeDasharray="6 4" />
              <defs>
                <linearGradient id="corner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(var(--indigo-500))" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      )}
    </>
  );
}
