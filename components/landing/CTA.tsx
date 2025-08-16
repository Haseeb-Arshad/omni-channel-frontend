import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Users, Zap, Shield, Clock, Sparkles } from 'lucide-react';
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
    { icon: <CheckCircle2 className="w-4 h-4" />, text: "No credit card required" },
    { icon: <Star className="w-4 h-4" />, text: "Free plan available" },
    { icon: <Zap className="w-4 h-4" />, text: "Setup in minutes" },
    { icon: <Shield className="w-4 h-4" />, text: "Enterprise security" },
    { icon: <Clock className="w-4 h-4" />, text: "24/7 support" },
    { icon: <Users className="w-4 h-4" />, text: "Team collaboration" }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "50+", label: "Integrations" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
      data-scroll-section
    >
      {/* Enhanced background with multiple animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full filter blur-[120px] opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-500 to-pink-400 rounded-full filter blur-[150px] opacity-15"
          animate={{
            x: [0, -40, 0],
            y: [0, -25, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-teal-500 to-green-400 rounded-full filter blur-[100px] opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      
      <motion.div 
        style={{ opacity, y }}
        className="container px-4 mx-auto relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main CTA Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Ready to Transform Your Communication?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-5xl mx-auto">
                Start Your{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                  OmniChannel
                </span>{' '}
                Journey Today
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Join thousands of businesses that trust OmniChannel to streamline their customer interactions and boost productivity across all communication platforms.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Benefits and CTA */}
            <div className="space-y-10">
              {/* Benefits Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="grid grid-cols-2 gap-4"
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3 text-slate-300 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="text-blue-400">
                      {benefit.icon}
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth/register">
                    <Button 
                      size="lg" 
                      className="min-w-[220px] h-16 text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 group transition-all duration-300"
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/demo">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="min-w-[220px] h-16 text-lg rounded-2xl border-slate-400 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm group transition-all duration-300"
                    >
                      <span>Schedule Demo</span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Additional info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="text-center sm:text-left"
              >
                <p className="text-slate-400 text-sm">
                  No setup fees • Cancel anytime • 
                  <Link href="/pricing" className="text-blue-400 hover:text-blue-300 ml-1 underline">
                    View pricing plans
                  </Link>
                </p>
              </motion.div>
            </div>
            
            {/* Right Column - Enhanced Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
              data-scroll
              data-scroll-speed="-0.2"
            >
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-1 shadow-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-sm" />
                
                <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 overflow-hidden">
                  {/* Dashboard Preview */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">OC</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">OmniChannel</div>
                          <div className="text-xs text-slate-400">Communication Hub</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-slate-600" />
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-slate-600" />
                      </div>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      {stats.map((stat, index) => (
                        <motion.div 
                          key={index}
                          className="h-20 rounded-xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/30 p-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <div className="text-xs text-slate-400">{stat.label}</div>
                          <div className="text-xl font-bold text-white mt-1">{stat.number}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Channel Status */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="text-sm font-medium text-white">Active Channels</div>
                      {[
                        { name: "WhatsApp", color: "bg-green-500", status: "Connected" },
                        { name: "SMS", color: "bg-blue-500", status: "Connected" },
                        { name: "Email", color: "bg-purple-500", status: "Connected" }
                      ].map((channel, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between bg-slate-700/20 rounded-lg p-3 border border-slate-600/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${channel.color} animate-pulse`} />
                            <span className="text-white text-sm">{channel.name}</span>
                          </div>
                          <span className="text-xs text-green-400">{channel.status}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  
                  {/* Success Notification */}
                  <motion.div
                    className="absolute bottom-4 right-4 max-w-[220px] bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-4 border border-green-500/20 shadow-lg"
                    initial={{ opacity: 0, x: 20, y: 10 }}
                    animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 10 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">Setup Complete!</div>
                        <div className="text-xs text-slate-300 mt-1">All channels connected successfully</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
