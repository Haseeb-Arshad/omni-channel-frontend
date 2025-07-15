import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Split text animation
  useEffect(() => {
    if (!textRef.current) return;
    
    const splitText = (element: HTMLDivElement) => {
      const textContent = element.textContent;
      element.textContent = '';
      
      const words = textContent?.split(' ') || [];
      
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.classList.add('inline-block');
        
        const letters = word.split('');
        
        letters.forEach((letter) => {
          const letterSpan = document.createElement('span');
          letterSpan.classList.add('hero-letter', 'inline-block');
          letterSpan.textContent = letter;
          letterSpan.style.opacity = '0';
          wordSpan.appendChild(letterSpan);
        });
        
        element.appendChild(wordSpan);
        if (i < words.length - 1) {
          const space = document.createElement('span');
          space.textContent = ' ';
          element.appendChild(space);
        }
      });
    };
    
    const h1Element = textRef.current.querySelector('h1');
    const pElement = textRef.current.querySelector('p');
    
    if (h1Element) splitText(h1Element as HTMLDivElement);
    if (pElement) splitText(pElement as HTMLDivElement);
    
    // Animate letters
    gsap.to('.hero-letter', {
      opacity: 1,
      duration: 0.05,
      stagger: 0.02,
      delay: 0.5,
      ease: 'power2.out'
    });
    
    // Animate image
    gsap.from(imageRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 1,
      ease: 'power3.out'
    });
  }, []);
  
  return (
    <section 
      ref={containerRef}
      className="minimalist minimalist-section relative min-h-screen pt-40 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800"
      data-scroll-section
    >
      <div className="absolute w-full h-full top-0 left-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500 rounded-full opacity-[0.15] blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-teal-400 rounded-full opacity-[0.1] blur-[150px]" />
      </div>
      
      <div className="minimalist-container px-4 mx-auto relative z-10">
        <motion.div 
          ref={textRef}
          style={{ y: y1, opacity }}
          className="max-w-4xl mx-auto text-center mb-16"
          data-scroll
          data-scroll-speed="1"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            Unify All Your Communication Channels
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            One platform to connect, engage and respond across SMS, WhatsApp, Email and Web Chat—powered by AI
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 min-w-[180px] h-14 text-lg text-white border-0"
              asChild
            >
              <Link href="/dashboard" className="flex items-center justify-center">
                <span>Go to Dashboard</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-slate-400 text-white hover:bg-slate-700 hover:text-white min-w-[180px] h-14 text-lg"
              asChild
            >
              <Link href="#features" className="flex items-center justify-center">
                Learn More
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          ref={imageRef}
          style={{ y: y2 }}
          className="relative max-w-5xl mx-auto"
          data-scroll
          data-scroll-speed="-0.5"
        >
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-[var(--shadow-medium)] border-[var(--border-subtle)] bg-white">
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-3xl px-8">
                <div className="w-full h-12 rounded-lg mb-6 bg-[hsl(var(--gray-light))] flex items-center gap-2 px-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="flex-1"></div>
                  <div className="h-5 w-32 rounded bg-[hsl(var(--gray-medium))]" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1 space-y-4">
                    <div className="h-8 w-full rounded bg-[hsl(var(--gray-light))]" />
                    <div className="h-24 w-full rounded bg-[hsl(var(--gray-light))]" />
                    <div className="h-32 w-full rounded bg-[hsl(var(--gray-light))]" />
                  </div>
                  <div className="col-span-2 space-y-4">
                    <div className="h-8 w-1/3 rounded bg-[hsl(var(--gray-light))]" />
                    <div className="h-64 w-full rounded bg-[hsl(var(--gray-light))] flex items-center justify-center">
                      <div className="text-2xl font-bold text-[hsl(var(--charcoal))]">
                        OmniChannel Dashboard
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-10 rounded bg-[hsl(var(--gray-light))]" />
                      <div className="h-10 rounded bg-[hsl(var(--charcoal-light))]" />
                      <div className="h-10 rounded bg-[hsl(var(--gray-light))]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-12 -left-12 w-24 h-24 rounded-lg bg-white p-1 shadow-[var(--shadow-medium)] animate-float-slow">
            <div className="w-full h-full rounded-lg bg-[hsl(var(--cream))] flex items-center justify-center">
              <div className="text-4xl font-bold text-[hsl(var(--charcoal))]">W</div>
            </div>
          </div>
          
          <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-lg bg-white p-1 shadow-[var(--shadow-medium)] animate-float">
            <div className="w-full h-full rounded-lg bg-[hsl(var(--cream))] flex items-center justify-center">
              <div className="text-4xl font-bold text-[hsl(var(--charcoal))]">@</div>
            </div>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-20 h-20 rounded-full bg-white p-1 shadow-[var(--shadow-medium)] animate-float-slow">
            <div className="w-full h-full rounded-full bg-[hsl(var(--cream))] flex items-center justify-center">
              <div className="text-3xl font-bold text-[hsl(var(--gray-dark))]">S</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <motion.div 
          className="w-8 h-12 rounded-full border-2 border-[hsl(var(--gray-medium))] p-1 flex items-start justify-center"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-3 rounded-full bg-[hsl(var(--charcoal))]" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
