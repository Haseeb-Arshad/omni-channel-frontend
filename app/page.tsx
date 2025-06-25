'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThreeDScene, StarfieldBackground } from "@/components/ui/3d-scene";
import SmoothScroll from "@/components/ui/smooth-scroll";
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
  const loaderRef = useRef<HTMLDivElement>(null);
  
  // State to manage loading screen
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Initialize effects when content is loaded
  useEffect(() => {
    const handleLoad = async () => {
      if (!isLoaded) return;
      
      // Initialize GSAP animations
      initAnimations();
      
      // Initialize cursor effects
      initCursorEffects();
    };
    
    handleLoad();
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded]);
  
  // Loading animation
  useEffect(() => {
    // Start loading animation
    const loadAssets = async () => {
      // Preload critical assets (fonts, images)
      await Promise.all([
        // Simulate loading key assets
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
      
      // Begin progress animation
      const duration = 2000; // 2 seconds total
      const interval = 15; // Update every 15ms
      const steps = duration / interval;
      let currentStep = 0;
      
      const progressInterval = setInterval(() => {
        currentStep++;
        const easeProgress = easeOutExpo(currentStep / steps);
        setLoadingProgress(Math.min(easeProgress * 100, 100));
        
        if (currentStep >= steps) {
          clearInterval(progressInterval);
          
          // Transition to the main content
          setTimeout(() => {
            if (loaderRef.current) {
              gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                  setIsLoading(false);
                  
                  // After loader fades out, reveal the content
                  setTimeout(() => {
                    setIsLoaded(true);
                  }, 300);
                }
              });
            }
          }, 400);
        }
      }, interval);
      
      return () => clearInterval(progressInterval);
    };
    
    loadAssets();
  }, []);
  
  // Easing function for smooth progress animation
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };
  
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
      {isLoading && (
        <motion.div 
          ref={loaderRef}
          className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Background elements */}
            <div className="absolute -z-10 inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-[100px] animate-pulse-slow" />
              <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-[100px] animate-pulse-slow" />
            </div>
            
            <div className="max-w-lg">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {/* Logo animation */}
                <div className="relative h-24 w-24 mb-8 rounded-full bg-gradient-to-r from-primary to-indigo-500 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    initial={{ boxShadow: "0 0 0 0 rgba(124, 58, 237, 0.7)" }}
                    animate={{ 
                      boxShadow: ["0 0 0 0 rgba(124, 58, 237, 0.7)", "0 0 0 20px rgba(124, 58, 237, 0)"],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeOut" 
                    }}
                  />
                  <span className="text-white font-bold text-4xl">OC</span>
                </div>
                
                <motion.h1 
                  className="text-4xl font-bold mb-8 text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">OmniChannel</span>
                </motion.h1>
                
                <motion.div 
                  className="w-64 h-1.5 bg-muted rounded-full overflow-hidden"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "16rem" }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary to-indigo-500 relative"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    {/* Shimmer effect */}
                    <motion.div 
                      className="absolute top-0 bottom-0 w-20 left-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ left: ['-100%', '100%'] }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-muted-foreground text-sm">
                    Loading experience... <span className="font-medium">{Math.round(loadingProgress)}%</span>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
      
      {isLoaded && (
        <motion.div 
          ref={mainRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Dynamic background */}
          <StarfieldBackground className="fixed inset-0 -z-10 opacity-[0.15]" />
          
          <SmoothScroll>
            <div data-scroll-container>
              <Header />
              
              {/* Main content */}
              <main className="relative">
                {/* 3D interactive background (subtle) */}
                <ThreeDScene className="fixed inset-0 -z-10 opacity-[0.15]" />
                
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
