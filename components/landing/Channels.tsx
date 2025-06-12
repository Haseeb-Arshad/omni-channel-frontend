'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Marquee, FadeInView, RevealText } from '@/components/ui/advanced-animations';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

const channels = [
  {
    name: "Twilio SMS",
    icon: "/icons/twilio.svg",
    description: "Connect your Twilio account to handle SMS conversations with end-to-end encryption.",
    available: true,
    color: "rgb(240, 0, 0)",
  },
  {
    name: "WhatsApp",
    icon: "/icons/whatsapp.svg",
    description: "Integrate with WhatsApp Business API to reach over 2 billion users worldwide.",
    available: false,
    comingSoon: true,
    color: "rgb(37, 211, 102)",
  },
  {
    name: "Telegram",
    icon: "/icons/telegram.svg",
    description: "Add Telegram support for real-time messaging and group interactions.",
    available: false,
    comingSoon: true,
    color: "rgb(0, 136, 204)",
  },
  {
    name: "Slack",
    icon: "/icons/slack.svg",
    description: "Connect to Slack for team collaborations and internal communications.",
    available: false,
    comingSoon: true,
    color: "rgb(74, 21, 75)",
  },
  {
    name: "Email",
    icon: "/icons/email.svg",
    description: "Handle email communications through SMTP integration with your preferred provider.",
    available: true,
    color: "rgb(66, 133, 244)",
  },
  {
    name: "Web Chat",
    icon: "/icons/webchat.svg",
    description: "Embed a customizable chat widget on your website for instant visitor engagement.",
    available: true,
    color: "rgb(255, 149, 0)",
  },
];

export default function Channels() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });
    
    tl.from(headingRef.current.querySelectorAll('.reveal-text'), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-background via-muted/30 to-background"
      data-scroll-section
    >
      <div className="container max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <RevealText className="reveal-text">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Connect Every Channel</h2>
          </RevealText>
          <RevealText className="reveal-text" delay={0.1}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
              Seamlessly integrate with multiple communication platforms and manage them all from a single dashboard
            </p>
          </RevealText>
        </div>
        
        <div className="relative">
          {/* Channel cards with staggered animations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {channels.map((channel, i) => (
              <FadeInView
                key={i}
                delay={i * 0.1}
                threshold={0.1}
              >
                <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/50 bg-card/50 backdrop-blur-sm group">
                  {channel.comingSoon && (
                    <div className="absolute top-3 right-3 bg-primary/20 text-primary text-xs py-1 px-3 rounded-full font-medium z-10">
                      Coming Soon
                    </div>
                  )}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 -z-0" 
                    style={{ background: `radial-gradient(circle at center, ${channel.color}, transparent 70%)` }} 
                  />
                  <CardHeader className="pb-2 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center p-2 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 duration-700 transition-opacity" style={{ backgroundColor: channel.color }} />
                        {/* Fallback icon if SVG not available */}
                        <MessageCircle className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{channel.name}</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <Button 
                      variant={channel.available ? "default" : "outline"} 
                      className="w-full group-hover:shadow-md transition-shadow"
                      disabled={!channel.available}
                    >
                      {channel.available ? "Connect Now" : "Coming Soon"}
                    </Button>
                  </CardFooter>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
        
        {/* Partners section with marquee effect */}
        <div className="mt-24">
          <RevealText className="text-center mb-8">
            <h3 className="text-xl font-medium text-muted-foreground">Trusted By Industry-Leading Companies</h3>
          </RevealText>
          
          <Marquee 
            speed={20} 
            className="py-6"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="mx-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="bg-card/50 h-16 w-32 rounded-md flex items-center justify-center">
                  <div className="text-2xl font-bold text-muted-foreground">
                    Partner {i + 1}
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
