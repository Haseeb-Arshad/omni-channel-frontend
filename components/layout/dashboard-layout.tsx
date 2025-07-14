"use client"

import React, { ReactNode, useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { motion } from "framer-motion"
import "@/app/elevenlabs-theme.css" // Import the Eleven Labs theme

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.25, 
        ease: [0.16, 1, 0.3, 1], // Subtle ease out for Eleven Labs-like smoothness
        when: "beforeChildren",
        staggerChildren: 0.05 
      } 
    },
  };

  // Add the Eleven Labs theme class to the document body
  useEffect(() => {
    document.body.classList.add('eleven-labs-theme');
    
    // Apply background color
    document.documentElement.style.setProperty('--background', 'var(--white-pure)');
    
    // Cleanup function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('eleven-labs-theme');
      document.documentElement.style.removeProperty('--background');
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar />
      
      <div className="eleven-content flex-1 min-h-screen pt-16 md:pt-0">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[1200px] mx-auto px-4 py-8"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
