"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Card Skeleton Loading Component
const CardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-charcoal-200 dark:bg-charcoal-700 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-charcoal-200 dark:bg-charcoal-700 rounded w-3/4"></div>
        <div className="h-3 bg-charcoal-200 dark:bg-charcoal-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-charcoal-200 dark:bg-charcoal-700 rounded"></div>
      <div className="h-3 bg-charcoal-200 dark:bg-charcoal-700 rounded w-5/6"></div>
      <div className="h-3 bg-charcoal-200 dark:bg-charcoal-700 rounded w-4/6"></div>
    </div>
  </div>
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: boolean
    glass?: boolean
    hover?: boolean
    interactive?: boolean
    elevation?: "none" | "sm" | "md" | "lg" | "xl"
    loading?: boolean
  }
>(({ 
  className, 
  gradient, 
  glass, 
  hover, 
  interactive, 
  elevation = "sm",
  loading = false,
  children,
  ...props 
}, ref) => {
  const elevationClasses = {
    none: "",
    sm: "shadow-sm hover:shadow-md",
    md: "shadow-md hover:shadow-lg",
    lg: "shadow-lg hover:shadow-xl",
    xl: "shadow-xl hover:shadow-2xl"
  }

  if (loading) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border-2 bg-card text-card-foreground p-6",
          "border-charcoal-200 dark:border-charcoal-700",
          elevationClasses[elevation],
          className
        )}
        {...props}
      >
        <CardSkeleton />
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        // Base styles with charcoal theming
        "rounded-xl border-2 bg-card text-card-foreground",
        "border-charcoal-200 dark:border-charcoal-700",
        "transition-all duration-normal ease-out",
        // Elevation effects
        !glass && elevationClasses[elevation],
        // Hover effects
        hover && [
          "hover:border-charcoal-300 dark:hover:border-charcoal-600",
          "hover:bg-charcoal-50/50 dark:hover:bg-charcoal-800/50"
        ],
        // Interactive effects
        interactive && [
          "cursor-pointer",
          "hover:-translate-y-1 hover:scale-[1.02]",
          "active:translate-y-0 active:scale-100"
        ],
        // Special effects
        gradient && "gradient-border",
        glass && [
          "glass-morphism border-0 backdrop-blur-sm",
          "bg-charcoal-50/80 dark:bg-charcoal-900/80"
        ],
        className
      )}
      whileHover={interactive ? {
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      } : {}}
      whileTap={interactive ? {
        y: 0,
        scale: 1,
        transition: { duration: 0.1, ease: "easeIn" }
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    separated?: boolean
  }
>(({ className, separated, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6", 
      separated && "border-b border-border/50 pb-4",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    padded?: boolean
  }
>(({ className, padded = true, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      padded ? "p-6 pt-0" : "px-0 pt-0", 
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    separated?: boolean
  }
>(({ className, separated, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0", 
      separated && "border-t border-border/50 mt-4 pt-4",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Additional card components for specific use cases
const DashboardCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    accentColor?: string
  }
>(({ className, accentColor, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "overflow-hidden h-full",
      accentColor && `border-t-4 border-t-${accentColor}`,
      className
    )}
    hover
    {...props}
  />
))
DashboardCard.displayName = "DashboardCard"

const StatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode
    label?: string
    value?: string | number
    trend?: number
    trendLabel?: string
    color?: string
  }
>(({ 
  className, 
  icon, 
  label, 
  value, 
  trend, 
  trendLabel,
  color = "primary",
  ...props 
}, ref) => (
  <Card
    ref={ref}
    className={cn("overflow-hidden", className)}
    hover
    {...props}
  >
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        {icon && (
          <div className={`p-2 rounded-md bg-${color}/10`}>
            <div className={`text-${color}`}>{icon}</div>
          </div>
        )}
        {trend !== undefined && (
          <div className={`flex items-center text-xs font-medium ${
            trend >= 0 ? "text-green-500" : "text-red-500"
          }`}>
            {trend >= 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path
                  fillRule="evenodd"
                  d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path
                  fillRule="evenodd"
                  d="M1.22 5.222a.75.75 0 011.06 0L7 9.94l3.172-3.172a.75.75 0 011.06 0l5.25 5.25a.75.75 0 11-1.06 1.06L11 8.658l-3.172 3.172a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{Math.abs(trend)}%</span>
            {trendLabel && <span className="text-muted-foreground ml-1">{trendLabel}</span>}
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-muted-foreground text-xs mt-1">{label}</p>
    </CardContent>
  </Card>
))
StatCard.displayName = "StatCard"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  DashboardCard,
  StatCard
}
