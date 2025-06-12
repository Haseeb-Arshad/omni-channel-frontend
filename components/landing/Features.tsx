'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MessageSquare, BrainCircuit, Upload, Bot, Zap } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TiltCard, RevealText, StaggerContainer, StaggerItem, FadeInView } from '@/components/ui/advanced-animations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Omnichannel Communication",
    description: "Connect with customers across multiple channels including SMS, WhatsApp, Telegram, and more - all in one unified interface.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI-Powered Assistance",
    description: "Leverage cutting-edge AI models to provide intelligent responses and automate customer interactions with context from your knowledge base.",
  },
  {
    icon: <Upload className="h-10 w-10 text-primary" />,
    title: "Knowledge Base Integration",
    description: "Upload documents that your AI can reference to provide accurate and contextual responses, ensuring consistency across all communications.",
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "Custom AI Personas",
    description: "Create AI personas with specific tones and system prompts that perfectly match your brand identity and communication style.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Real-time Analytics",
    description: "Gain insights into customer interactions, response times, and satisfaction metrics to continually improve your communication strategy.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Seamless Integration",
    description: "Connect with your existing CRM and support tools through our open API, ensuring a smooth workflow for your team.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate the heading when it enters the viewport
    if (headingRef.current) {
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headingRef.current!.querySelectorAll('.reveal-text'), {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out",
          });
        },
      });
    }
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
      data-scroll-section
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <RevealText className="reveal-text">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Advanced Features for Modern Business</h2>
          </RevealText>
          <RevealText className="reveal-text" delay={0.1}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
              Everything you need to streamline communication and enhance customer interactions
              with AI-powered assistance.
            </p>
          </RevealText>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
          {features.map((feature, i) => (
            <FadeInView 
              key={i}
              delay={i * 0.1} 
              className="h-full"
              threshold={0.1}
            >
              <TiltCard className="h-full transition-all duration-300 hover:shadow-xl">
                <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="mb-4 p-2 w-fit rounded-xl bg-primary/10">
                      {feature.icon}
                    </div>
                    <motion.h3 
                      className="text-xl font-semibold"
                      initial={{ opacity: 0.5 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.title}
                    </motion.h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </TiltCard>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
