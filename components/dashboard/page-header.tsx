"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  children, 
  className = "" 
}: PageHeaderProps) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`flex items-center justify-between ${className}`}
  >
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
      {subtitle && (
        <p className="text-gray-600">{subtitle}</p>
      )}
    </div>
    {children && (
      <div className="flex items-center space-x-3">
        {children}
      </div>
    )}
  </motion.div>
);