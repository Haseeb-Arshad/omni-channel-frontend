"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    size?: "sm" | "md" | "lg"
    variant?: "default" | "success" | "warning" | "error"
  }
>(({ className, size = "md", variant = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-4 w-7",
    md: "h-5 w-9", 
    lg: "h-6 w-11"
  }

  const thumbSizeClasses = {
    sm: "h-3 w-3 data-[state=checked]:translate-x-3",
    md: "h-4 w-4 data-[state=checked]:translate-x-4",
    lg: "h-5 w-5 data-[state=checked]:translate-x-5"
  }

  const variantClasses = {
    default: "data-[state=checked]:bg-accent-blue",
    success: "data-[state=checked]:bg-green-500",
    warning: "data-[state=checked]:bg-amber-500",
    error: "data-[state=checked]:bg-red-500"
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-charcoal-200 dark:data-[state=unchecked]:bg-charcoal-700",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
          thumbSizeClasses[size]
        )}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

// Enhanced animated switch with Framer Motion
const AnimatedSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    size?: "sm" | "md" | "lg"
    variant?: "default" | "success" | "warning" | "error"
  }
>(({ className, size = "md", variant = "default", checked, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-4 w-7",
    md: "h-5 w-9", 
    lg: "h-6 w-11"
  }

  const thumbSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }

  const translateClasses = {
    sm: 12, // 3 * 4px
    md: 16, // 4 * 4px  
    lg: 20  // 5 * 4px
  }

  const variantClasses = {
    default: "bg-accent-blue",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500"
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 relative overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
      ref={ref}
      checked={checked}
    >
      {/* Background */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          checked ? variantClasses[variant] : "bg-charcoal-200 dark:bg-charcoal-700"
        )}
        animate={{
          backgroundColor: checked 
            ? variantClasses[variant] === "bg-accent-blue" ? "#1a73e8" : 
              variantClasses[variant] === "bg-green-500" ? "#10b981" :
              variantClasses[variant] === "bg-amber-500" ? "#f59e0b" : "#ef4444"
            : "hsl(var(--charcoal-200))"
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Thumb */}
      <motion.div
        className={cn(
          "block rounded-full bg-white shadow-lg ring-0 relative z-10",
          thumbSizeClasses[size]
        )}
        animate={{
          x: checked ? translateClasses[size] : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
      />
    </SwitchPrimitives.Root>
  )
})
AnimatedSwitch.displayName = "AnimatedSwitch"

export { Switch, AnimatedSwitch }