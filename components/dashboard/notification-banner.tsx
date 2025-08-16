"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NotificationBannerProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

export const NotificationBanner = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  variant = 'info',
  className = ""
}: NotificationBannerProps) => {
  const variantStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-500",
    success: "bg-green-50 border-green-200 text-green-500", 
    warning: "bg-yellow-50 border-yellow-200 text-yellow-500",
    error: "bg-red-50 border-red-200 text-red-500"
  };

  return (
    <motion.div 
      className={`border rounded-xl p-4 flex items-center justify-between ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          variant === 'info' ? 'bg-blue-500' :
          variant === 'success' ? 'bg-green-500' :
          variant === 'warning' ? 'bg-yellow-500' :
          'bg-red-500'
        }`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="font-medium text-gray-900">{title}</span>
          <span className="text-gray-600 ml-1">{description}</span>
        </div>
      </div>
      {action && (
        <button 
          onClick={action.onClick}
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};