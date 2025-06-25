import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

const CTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const benefits = [
    "No credit card required",
    "Free plan available",
    "Setup in minutes",
    "24/7 customer support"
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      data-scroll-section
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
      
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px]"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[120px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>
      
      <motion.div 
        style={{ opacity, y }}
        className="container px-4 mx-auto relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text and CTA */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-5"
                data-scroll
                data-scroll-speed="0.3"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  Start Unifying Your Communication Today
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of businesses that use OmniChannel to streamline their customer interactions across multiple platforms.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="flex flex-wrap gap-3"
              >
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-muted/50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/auth/register" passHref>
                  <Button size="lg" className="min-w-[180px] h-14 text-lg rounded-full bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 shadow-lg shadow-primary/25 group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <div className="text-sm text-muted-foreground mt-2 sm:mt-4">
                  or <Link href="/pricing" className="text-primary hover:underline">view our pricing plans</Link>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
              data-scroll
              data-scroll-speed="-0.2"
            >
              <div className="relative bg-gradient-to-br from-background to-muted rounded-xl p-1 shadow-2xl shadow-primary/10 border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
                
                <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-8 overflow-hidden">
                  {/* Dashboard Preview */}
                  <div className="space-y-6">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-indigo-500 flex items-center justify-center">
                          <span className="text-white font-bold">OC</span>
                        </div>
                        <div className="font-medium">OmniChannel Dashboard</div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-6 h-6 rounded-full bg-white/10" />
                        <div className="w-6 h-6 rounded-full bg-white/10" />
                      </div>
                    </div>
                    
                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div 
                        className="col-span-1 h-24 rounded-lg bg-white/5 border border-white/10 p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <div className="text-xs text-muted-foreground">Total Conversations</div>
                        <div className="text-2xl font-semibold mt-2">2,845</div>
                      </motion.div>
                      <motion.div 
                        className="col-span-1 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-indigo-500/20 border border-primary/20 p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <div className="text-xs text-muted-foreground">Response Time</div>
                        <div className="text-2xl font-semibold mt-2">10m</div>
                      </motion.div>
                      <motion.div 
                        className="col-span-1 h-24 rounded-lg bg-white/5 border border-white/10 p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                        <div className="text-2xl font-semibold mt-2">98%</div>
                      </motion.div>
                    </div>
                    
                    {/* Channel Section */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="text-sm font-medium">Active Channels</div>
                      <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-green-500" />
                          </div>
                          <span>WhatsApp</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Connected</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-blue-500" />
                          </div>
                          <span>SMS</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Connected</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Animated Notification */}
                  <motion.div
                    className="absolute bottom-4 right-4 max-w-[200px] bg-gradient-to-r from-primary/10 to-indigo-500/10 backdrop-blur-sm rounded-lg p-3 border border-primary/20 shadow-lg shadow-primary/10"
                    initial={{ opacity: 0, x: 20, y: 10 }}
                    animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 10 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">✓</div>
                      <div>
                        <div className="text-xs font-medium">New message received</div>
                        <div className="text-xs text-muted-foreground mt-1">Process completed successfully</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
