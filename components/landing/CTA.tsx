'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, BrainCircuit, MessageCircle, Bot } from 'lucide-react';
import { MagneticButton, PerspectiveText, FadeInView } from '@/components/ui/advanced-animations';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect with framer motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  useEffect(() => {
    if (!cardRef.current || !contentRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
    
    tl.from(contentRef.current.querySelectorAll('.reveal-item'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
    
    // Card animation
    tl.from(cardRef.current.querySelectorAll('.card-item'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.6");
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 relative overflow-hidden"
      data-scroll-section
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"
          style={{ y }}
        />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-background/30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] bg-primary/5" />
      </div>
      
      <div className="container max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side: Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="reveal-item">
              <PerspectiveText className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to transform your customer experience?
                </h2>
              </PerspectiveText>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 reveal-item">
              Start using OmniChannel today and see how AI-assisted communication can revolutionize your customer interactions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 reveal-item">
              <MagneticButton strength={20}>
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-indigo-500 hover:shadow-lg hover:shadow-primary/20 transition-shadow px-8 py-6 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Get Started for Free
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </MagneticButton>
              
              <MagneticButton strength={10}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/20 hover:border-primary/40 px-8 py-6 text-lg"
                >
                  <Link href="/docs" className="flex items-center gap-2">
                    Book a Demo
                  </Link>
                </Button>
              </MagneticButton>
            </div>
            
            <div className="pt-8 reveal-item">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Quick Setup</h4>
                    <p className="text-sm text-muted-foreground">Connect your channels in minutes, not days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Smart AI</h4>
                    <p className="text-sm text-muted-foreground">Powered by advanced language models</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">24/7 Support</h4>
                    <p className="text-sm text-muted-foreground">Always available when you need help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Floating dashboard preview */}
          <div ref={cardRef} className="relative">
            <FadeInView 
              delay={0.2}
              threshold={0.1}
              className="pointer-events-none"
            >
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px]" />
              
              <Card className="glass-card p-6 shadow-2xl border border-white/10 card-item">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <h3 className="font-medium">OmniChannel Dashboard</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
                
                <div className="space-y-4 card-item">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-primary" />
                      </div>
                      <span>Twilio SMS</span>
                    </div>
                    <div className="text-sm text-green-500">Connected</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50 card-item">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <BrainCircuit className="h-4 w-4" />
                      </div>
                      <span>Knowledge Base</span>
                    </div>
                    <div className="text-sm text-green-500">3 Documents</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background/50 card-item">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <span>AI Persona</span>
                    </div>
                    <div className="text-sm text-green-500">Active</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 card-item">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Recent Activity</div>
                    <div className="text-xs text-muted-foreground">Today</div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-1 h-1 rounded-full bg-green-500"></div>
                      <span className="text-muted-foreground">12:42 PM</span>
                      <span>New conversation from +1234567890</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <span className="text-muted-foreground">11:15 AM</span>
                      <span>Knowledge base updated with new content</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                      <span className="text-muted-foreground">09:30 AM</span>
                      <span>AI Persona settings modified</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Floating notification */}
              <motion.div 
                className="absolute -top-6 right-8 card-item"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              >
                <Card className="glass-card p-3 shadow-xl border border-white/10 max-w-[200px]">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-500 text-[10px]">✓</span>
                    </div>
                    <span>New integration added!</span>
                  </div>
                </Card>
              </motion.div>
            </FadeInView>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
