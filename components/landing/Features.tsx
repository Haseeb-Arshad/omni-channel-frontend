import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { MessageSquare, Mail, Phone, Bot, Shield, BarChart3, Zap, Users, Clock, Globe, Star, Sparkles } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  gradient: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, gradient, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className={`feature-card group relative rounded-2xl p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm shadow-xl overflow-hidden hover:border-slate-600 ${className}`}
      initial={{ y: 60, opacity: 0, scale: 0.9 }}
      animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 60, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.25, 0.25, 0, 1] }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      data-scroll
      data-scroll-speed="0.2"
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`} />
      
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon with enhanced styling */}
        <motion.div 
          className={`flex items-center justify-center w-16 h-16 rounded-xl ${gradient} text-white mb-6 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed flex-grow">
          {description}
        </p>
        
        {/* Subtle arrow indicator */}
        <motion.div 
          className="flex items-center mt-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span className="text-sm font-medium">Learn more</span>
          <motion.div
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
    </motion.div>
  );
};

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  useEffect(() => {
    // Enhanced title animations
    if (titleRef.current) {
      gsap.fromTo('.feature-badge', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo('.feature-title', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );
      
      gsap.fromTo('.feature-subtitle', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
    }
  }, []);
  
  const features = [
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: "Multi-channel Messaging",
      description: "Unify SMS, WhatsApp, Email, and Web Chat in a single interface for seamless communications across all platforms.",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      icon: <Bot className="w-7 h-7" />,
      title: "AI-Powered Automation",
      description: "Let advanced AI handle routine inquiries, route conversations, and provide intelligent suggestions while you focus on complex interactions.",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, OAuth authentication, and compliance with industry standards.",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Smart Workflows",
      description: "Create automated workflows with triggers, conditions, and actions to streamline repetitive tasks and improve efficiency.",
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-500"
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Global Integration",
      description: "Connect with 100+ popular tools and platforms including CRM, helpdesk, and marketing automation systems.",
      gradient: "bg-gradient-to-br from-indigo-500 to-blue-500"
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Advanced Analytics",
      description: "Gain deep insights with real-time dashboards, performance metrics, and detailed reporting across all communication channels.",
      gradient: "bg-gradient-to-br from-teal-500 to-cyan-500"
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Team Collaboration",
      description: "Enable seamless team collaboration with shared inboxes, internal notes, and role-based access controls.",
      gradient: "bg-gradient-to-br from-rose-500 to-pink-500"
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "24/7 Availability",
      description: "Ensure round-the-clock customer support with automated responses, scheduling, and global timezone support.",
      gradient: "bg-gradient-to-br from-violet-500 to-purple-500"
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: "Premium Support",
      description: "Get dedicated support from our expert team with priority assistance, onboarding, and custom integrations.",
      gradient: "bg-gradient-to-br from-amber-500 to-yellow-500"
    }
  ];

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950"
      data-scroll-section
    >
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600 to-purple-600 rounded-full filter blur-[120px] opacity-[0.08]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full filter blur-[150px] opacity-[0.06]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.06, 0.1, 0.06]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

      <div className="container px-4 mx-auto relative z-10">
        <div
          ref={titleRef}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          {/* Enhanced badge */}
          <motion.div 
            className="feature-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Powerful Features</span>
          </motion.div>
          
          <h2 className="feature-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Scale Communication
            </span>
          </h2>
          
          <p className="feature-subtitle text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools and intelligent automation to manage, streamline, and optimize your customer communications across all channels
          </p>
        </div>
        
        {/* Enhanced grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={index}
            />
          ))}
        </div>
        
        {/* Call-to-action section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-slate-400 mb-6">Ready to experience these features?</p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
