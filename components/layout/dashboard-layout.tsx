"use client"

import React, { ReactNode } from "react"
import { Header } from "@/components/layout/header"
import { motion } from "framer-motion"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-1">
        <motion.div
          className="container py-8"
          variants={mainContentVariants}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
