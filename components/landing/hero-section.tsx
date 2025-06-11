'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial GSAP animation for text elements
    // This is a placeholder and will be expanded significantly
    if (headlineRef.current && taglineRef.current && ctaButtonsRef.current) {
      gsap.fromTo(
        [headlineRef.current, taglineRef.current, ctaButtonsRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          delay: 0.5, // Delay to allow page elements to settle
        }
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white p-4 md:p-8"
    >
      {/* Placeholder for animated background - will be implemented with GSAP/Custom CSS */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Example: <AnimatedBackground /> */}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="block">Unify Your Conversations.</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Amplify Your Intelligence.
          </span>
        </motion.h1>

        <motion.p
          ref={taglineRef}
          className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          OmniChannel brings all your customer interactions into one seamless platform, supercharged by cutting-edge AI to elevate every conversation.
        </motion.p>

        <motion.div
          ref={ctaButtonsRef}
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold text-lg py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              Get Started Free
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-slate-400 text-slate-200 hover:bg-slate-700 hover:text-white font-semibold text-lg py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75"
          >
            <Link href="#features" className="flex items-center gap-2">
              Discover Features
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll down indicator - optional */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <ChevronRight className="h-8 w-8 rotate-90 text-slate-400" />
      </motion.div>

      {/* Custom CSS for more advanced effects can be added in globals.css or a dedicated CSS module */}
      <style jsx global>{`
        body {
          // Potentially add smooth scroll here later if not using a library
        }
        .hero-glow {
          // Example for a text glow effect if needed
          text-shadow: 0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,105,180,0.3);
        }
      `}</style>
    </section>
  );
};
