'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { RevealText, FadeInView, StaggerContainer, StaggerItem } from '@/components/ui/advanced-animations';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.from(heroRef.current.querySelectorAll('.hero-animate'), {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
    });
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-[90vh] flex items-center overflow-hidden py-20 md:py-32 px-4"
      data-scroll-section
    >
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                <span className="bg-primary/10 text-primary font-medium py-1 px-4 rounded-full text-sm">
                  Revolutionizing Communication
                </span>
              </motion.div>
              
              <RevealText className="hero-animate">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">Omni</span>Channel AI
                </h1>
              </RevealText>
              
              <RevealText className="hero-animate" delay={0.3}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  Communication
                </h1>
              </RevealText>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hero-animate"
              >
                <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-[90%]">
                  Connect all your channels in one place with AI-powered assistance that understands your business.
                </p>
              </motion.div>
            </div>
            
            <StaggerContainer className="flex flex-col sm:flex-row gap-4 pt-6 hero-animate">
              <StaggerItem>
                <Button size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 px-6 py-6 text-lg">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </StaggerItem>
              
              <StaggerItem>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group px-6 py-6 text-lg border-primary/20 hover:border-primary/40"
                >
                  <Link href="/docs" className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </StaggerItem>
            </StaggerContainer>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-8 pt-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">500+</span> businesses already connected
              </div>
            </motion.div>
          </div>
          
          <FadeInView 
            delay={0.3} 
            className="relative"
            threshold={0.1}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-indigo-500/10 rounded-3xl blur-2xl -z-10"></div>
            <div className="glass-card p-6 shadow-2xl rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-5 w-5 text-primary">💬</div>
                </div>
                <div>
                  <h3 className="font-medium">OmniChannel Assistant</h3>
                  <p className="text-xs text-muted-foreground">All channels, one interface</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs">JD</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-3 text-sm max-w-[80%]">
                    <p>Hi, I need help setting up my account and integrating with WhatsApp.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary/10 rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%]">
                    <p>I'd be happy to help with your setup! I'll guide you through the account configuration and WhatsApp integration. First, let's start with...</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs">AI</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs">JD</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-3 text-sm max-w-[80%]">
                    <p>Perfect! Can the same setup work for my email integrations too?</p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary/10 rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%]">
                    <p>Absolutely! The OmniChannel platform is designed to work seamlessly across all communication channels. After we set up WhatsApp, I'll show you how to connect your email systems using the same dashboard.</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs">AI</span>
                  </div>
                </div>
                
                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Live assistance</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Powered by AI</span>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
