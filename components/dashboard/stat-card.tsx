"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  gradient: string;
  delay?: number;
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = 'up', 
  gradient, 
  delay = 0 
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 overflow-hidden"
  >
    {/* Background Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
    
    {/* Floating Orb */}
    <motion.div 
      className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
    ></motion.div>
    
    <div className="relative z-10 flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
        <motion.p 
          className="text-3xl font-bold text-slate-900 mb-3"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4, ease: "backOut" }}
        >
          {value}
        </motion.p>
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.4, duration: 0.3 }}
            className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
              trend === 'up' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend === 'up' ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {change}
          </motion.div>
          <span className="text-xs text-slate-500 ml-2">vs last week</span>
        </div>
      </div>
      
      <motion.div 
        className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon className="h-7 w-7 text-white" />
      </motion.div>
    </div>
    
    {/* Sparkle Effect */}
    <motion.div
      className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }}
    />
  </motion.div>
);