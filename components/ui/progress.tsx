"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    animated?: boolean
    showValue?: boolean
    size?: "sm" | "md" | "lg"
    variant?: "default" | "success" | "warning" | "error"
  }
>(({ 
  className, 
  value, 
  animated = true, 
  showValue = false, 
  size = "md", 
  variant = "default",
  ...props 
}, ref) => {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2", 
    lg: "h-3"
  }

  const variantClasses = {
    default: "bg-accent-blue",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500"
  }

  return (
    <div className="space-y-1">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-charcoal-200 dark:bg-charcoal-700",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out",
            variantClasses[variant]
          )}
          style={{ 
            transform: `translateX(-${100 - (value || 0)}%)`,
            transition: animated ? "transform 0.5s ease-out" : "none"
          }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <div className="flex justify-end">
          <span className="text-xs text-charcoal-600 font-medium">
            {Math.round(value || 0)}%
          </span>
        </div>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

// Enhanced animated progress with Framer Motion
const AnimatedProgress = React.forwardRef<
  HTMLDivElement,
  {
    value: number
    className?: string
    size?: "sm" | "md" | "lg"
    variant?: "default" | "success" | "warning" | "error"
    showValue?: boolean
    duration?: number
  }
>(({ 
  value, 
  className, 
  size = "md", 
  variant = "default", 
  showValue = false,
  duration = 0.5 
}, ref) => {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2", 
    lg: "h-3"
  }

  const variantClasses = {
    default: "bg-accent-blue",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500"
  }

  return (
    <div className="space-y-1">
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-full bg-charcoal-200 dark:bg-charcoal-700",
          sizeClasses[size],
          className
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-full",
            variantClasses[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ 
            duration, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        />
      </div>
      {showValue && (
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: duration * 0.5 }}
        >
          <span className="text-xs text-charcoal-600 font-medium">
            {Math.round(value)}%
          </span>
        </motion.div>
      )}
    </div>
  )
})
AnimatedProgress.displayName = "AnimatedProgress"

export { Progress, AnimatedProgress }