import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CountUp } from 'use-count-up';
import { TrendingUp, Users, Clock, Shield, Sparkles } from 'lucide-react';

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
  delay: number;
  icon: React.ReactNode;
  gradient: string;
}

const StatItem: React.FC<StatItemProps> = ({ 
  number, 
  label, 
  suffix = '',
  delay,
  icon,
  gradient
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={itemRef}
      className="group relative text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.25, 0.25, 0, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />
      
      <div className="relative z-10">
        {/* Icon */}
        <motion.div 
          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${gradient} text-white mb-4 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        
        {/* Number */}
        <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white group-hover:text-blue-100 transition-colors duration-300">
          {isInView ? (
            <CountUp 
              isCounting
              start={0}
              end={number}
              duration={2.5}
              easing="easeOutCubic"
              formatter={(value) => `${value}${suffix}`}
            />
          ) : (
            `0${suffix}`
          )}
        </h3>
        
        {/* Label */}
        <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 font-medium">
          {label}
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-blue-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300" />
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  const stats = [
    {
      number: 99,
      label: "Customer Satisfaction",
      suffix: "%",
      icon: <TrendingUp className="w-7 h-7" />,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      number: 15000,
      label: "Active Users",
      suffix: "+",
      icon: <Users className="w-7 h-7" />,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      number: 5,
      label: "Avg Response Time",
      suffix: "m",
      icon: <Clock className="w-7 h-7" />,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      number: 100,
      label: "Uptime Guarantee",
      suffix: "%",
      icon: <Shield className="w-7 h-7" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-500"
    }
  ];
  
  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950"
      data-scroll-section
    >
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600 to-purple-600 rounded-full filter blur-[120px] opacity-[0.08]"
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
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full filter blur-[150px] opacity-[0.06]"
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
      
      <motion.div 
        style={{ opacity, scale }}
        className="container px-4 mx-auto relative z-10"
      >
        {/* Section Header */}
        <div
          ref={titleRef}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Proven Results</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
              Thousands
            </span>{' '}
            Worldwide
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Join businesses around the globe who have transformed their communication with measurable results
          </motion.p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
              delay={index}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          ))}
        </div>
        
        {/* Bottom section with additional info */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Global infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>Enterprise grade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span>24/7 availability</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Stats;
