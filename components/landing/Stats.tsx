'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/ui/advanced-animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Channels Integrated", value: "8+", plus: true },
  { label: "Response Rate", value: "95", percent: true },
  { label: "Avg. Resolution Time", value: "3", unit: "min" },
  { label: "Customer Satisfaction", value: "98", percent: true },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!statsRef.current) return;
    
    const counters = statsRef.current.querySelectorAll('.stat-counter');
    
    counters.forEach((counter, index) => {
      const statValue = stats[index].value;
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(counter, 
            { textContent: "0" },
            {
              duration: 2,
              textContent: statValue,
              ease: "power2.out",
              snap: { textContent: 1 },
              stagger: 1,
            }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(counter, 
            { textContent: "0" },
            {
              duration: 2,
              textContent: statValue,
              ease: "power2.out",
              snap: { textContent: 1 },
              stagger: 1,
            }
          );
        },
        once: true
      });
    });
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-background via-primary/5 to-background"
      data-scroll-section
    >
      <div className="container max-w-6xl mx-auto">
        <FadeInView 
          className="text-center mb-16"
          threshold={0.1}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Numbers That Speak</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform has helped hundreds of businesses improve their customer communication metrics
          </p>
        </FadeInView>
        
        <div 
          ref={statsRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 w-full">
            {stats.map((stat, index) => (
              <StaggerItem 
                key={index}
                className="relative"
              >
                <div className="text-center p-6 relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-xl -z-10"></div>
                  <h3 className="flex items-center justify-center text-4xl md:text-5xl font-bold text-primary mb-2">
                    <span className="stat-counter">{stat.value}</span>
                    {stat.plus && <span>+</span>}
                    {stat.percent && <span>%</span>}
                    {stat.unit && <span className="text-2xl ml-1">{stat.unit}</span>}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
