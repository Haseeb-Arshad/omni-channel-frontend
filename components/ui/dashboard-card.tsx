"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface DashboardCardProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  footer?: ReactNode
  isLoading?: boolean
}

export function DashboardCard({
  title,
  description,
  children,
  className = "",
  footer,
  isLoading = false,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`eleven-card bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Card header */}
      {(title || description) && (
        <div className="px-6 py-5 border-b border-gray-100">
          {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      )}
      
      {/* Card content */}
      <div className={`px-6 py-5 ${isLoading ? "min-h-[200px] flex items-center justify-center" : ""}`}>
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <div className="h-8 w-8 border-2 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          children
        )}
      </div>
      
      {/* Card footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </motion.div>
  )
}

// Dashboard card grid layout component
export function DashboardCardGrid({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  )
}
