import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CountUp } from 'use-count-up';

const StatItem: React.FC<{ number: number; label: string; suffix?: string; delay: number }> = ({ 
  number, 
  label, 
  suffix = '',
  delay 
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={itemRef}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: [0.25, 0.25, 0, 1] }}
    >
      <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white flex justify-center">
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
      <p className="text-slate-300">{label}</p>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-slate-900"
      data-scroll-section
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/5 to-teal-900/5">
        <div className="absolute inset-0 bg-[size:50px_50px] border-t border-slate-700/10" />
      </div>
      
      <motion.div 
        style={{ opacity, scale }}
        className="minimalist-container px-4 mx-auto relative z-10"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700 p-10 md:p-14 shadow-xl">
          <div className="text-center mb-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              data-scroll
              data-scroll-speed="0.3"
            >
              Trusted by Businesses Worldwide
            </motion.h2>
            <motion.div 
              className="h-px w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem number={98} label="Customer Satisfaction" suffix="%" delay={0} />
            <StatItem number={5} label="Communication Channels" delay={1} />
            <StatItem number={10} label="Average Response Time" suffix="m" delay={2} />
            <StatItem number={1500} label="Active Users" suffix="+" delay={3} />
          </div>
          
          {/* Minimal subtle dots for decoration */}
          <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 hidden md:block">
            <div className="relative w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-blue-400"
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: Math.random() * 0.3 + 0.1,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: Math.random() * 0.3 + 0.1,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 hidden md:block">
            <div className="relative w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-blue-400"
                  initial={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: Math.random() * 0.3 + 0.1,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: Math.random() * 0.3 + 0.1,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
