'use client';

import React, { useEffect, useState } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThreeDScene, StarfieldBackground } from "@/components/ui/3d-scene";
import SmoothScroll from "@/components/ui/smooth-scroll";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Channels from "@/components/landing/Channels";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function Home() {
  // State to manage loading screen
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      const fakeLoad = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          if (newProgress >= 100) {
            clearInterval(fakeLoad);
            return 100;
          }
          return newProgress;
        });
      }, 150);
      
      return () => clearInterval(fakeLoad);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle completion of loading
  useEffect(() => {
    if (loadingProgress === 100) {
      setTimeout(() => {
        setIsLoading(false);
        
        // Wait for exit animation to complete before setting isLoaded
        setTimeout(() => {
          setIsLoaded(true);
          
          // Initialize page animations after load
          if (typeof window !== 'undefined') {
            // Create a scroll-driven animation for header
            gsap.to('header', {
              scrollTrigger: {
                start: 'top top',
                end: '100 top',
                scrub: true,
              },
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            });
          }
        }, 1000);
      }, 500);
    }
  }, [loadingProgress]);

  return (
    <>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: loadingProgress === 100 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
              OmniChannel
            </h1>
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-indigo-500"
                initial={{ width: '0%' }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              Loading experience... {Math.round(loadingProgress)}%
            </p>
          </motion.div>
        </motion.div>
      )}
      
      {isLoaded && (
        <div className="relative">
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
        </div>
      )}
    </>
  );
}
