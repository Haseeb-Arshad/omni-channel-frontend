"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline";
  }[];
}

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actions = [] 
}: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col items-center justify-center h-full p-8 text-center"
  >
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-8 w-8 text-gray-400" />
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    
    <p className="text-gray-600 mb-6 max-w-sm">
      {description}
    </p>
    
    {actions.length > 0 && (
      <div className="flex flex-col sm:flex-row gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={action.onClick}
              variant={action.variant || "default"}
              className={action.variant === "outline" 
                ? "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700" 
                : "bg-gray-900 text-white hover:bg-gray-800"
              }
            >
              {action.label}
            </Button>
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
);