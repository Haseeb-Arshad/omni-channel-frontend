"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background relative overflow-hidden",
  {
    variants: {
      variant: {
        primary: [
          "bg-charcoal-900 text-charcoal-50 shadow-md",
          "hover:bg-charcoal-800 hover:shadow-lg",
          "active:bg-charcoal-950 active:shadow-sm",
          "dark:bg-charcoal-50 dark:text-charcoal-900",
          "dark:hover:bg-charcoal-100 dark:active:bg-charcoal-200"
        ],
        secondary: [
          "bg-charcoal-100 text-charcoal-900 border border-charcoal-200",
          "hover:bg-charcoal-200 hover:border-charcoal-300 hover:shadow-sm",
          "active:bg-charcoal-300",
          "dark:bg-charcoal-800 dark:text-charcoal-100 dark:border-charcoal-700",
          "dark:hover:bg-charcoal-700 dark:hover:border-charcoal-600",
          "dark:active:bg-charcoal-600"
        ],
        ghost: [
          "text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900",
          "active:bg-charcoal-200",
          "dark:text-charcoal-300 dark:hover:bg-charcoal-800 dark:hover:text-charcoal-100",
          "dark:active:bg-charcoal-700"
        ],
        outline: [
          "border-2 border-charcoal-300 text-charcoal-700 bg-transparent",
          "hover:bg-charcoal-50 hover:border-charcoal-400 hover:text-charcoal-900",
          "active:bg-charcoal-100 active:border-charcoal-500",
          "dark:border-charcoal-600 dark:text-charcoal-300",
          "dark:hover:bg-charcoal-900 dark:hover:border-charcoal-500 dark:hover:text-charcoal-100",
          "dark:active:bg-charcoal-800 dark:active:border-charcoal-400"
        ],
        destructive: [
          "bg-error text-charcoal-50 shadow-md",
          "hover:bg-red-600 hover:shadow-lg",
          "active:bg-red-700 active:shadow-sm"
        ],
        link: [
          "text-charcoal-700 underline-offset-4 hover:underline hover:text-charcoal-900",
          "dark:text-charcoal-300 dark:hover:text-charcoal-100"
        ]
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base rounded-xl",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0 rounded-md",
        "icon-lg": "h-12 w-12 p-0 rounded-xl"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

// Loading spinner component
const LoadingSpinner = ({ className }: { className?: string }) => (
  <motion.div
    className={cn("w-4 h-4 border-2 border-current border-t-transparent rounded-full", className)}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    loadingText,
    children,
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    const buttonContent = loading ? (
      <div className="flex items-center gap-2">
        <LoadingSpinner />
        {loadingText || children}
      </div>
    ) : children

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isDisabled}
          {...props}
        >
          {React.cloneElement(children as React.ReactElement, {
            children: (
              <>
                {buttonContent}
                {!isDisabled && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </>
            )
          })}
        </Slot>
      )
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        whileHover={!isDisabled ? { 
          scale: 1.02, 
          transition: { duration: 0.15, ease: "easeOut" } 
        } : {}}
        whileTap={!isDisabled ? { 
          scale: 0.98, 
          transition: { duration: 0.1, ease: "easeIn" } 
        } : {}}
        initial={{ scale: 1 }}
        {...props}
      >
        {buttonContent}
        {!isDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            whileHover={{
              translateX: "200%",
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          />
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, LoadingSpinner }
