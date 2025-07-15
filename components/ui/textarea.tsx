"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    error,
    helperText,
    resize = true,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const textareaClasses = cn(
      // Base styles
      "flex min-h-[100px] w-full rounded-lg border-2 bg-card px-4 py-3 text-sm transition-all duration-normal",
      "ring-offset-background placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Charcoal theming
      "border-charcoal-200 text-charcoal-900",
      "dark:border-charcoal-700 dark:text-charcoal-100",
      // Focus states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-900/20 focus-visible:border-charcoal-900",
      "dark:focus-visible:ring-charcoal-100/20 dark:focus-visible:border-charcoal-100",
      // Error states
      error && "border-error focus-visible:ring-error/20 focus-visible:border-error",
      // Resize control
      resize ? "resize-y" : "resize-none",
      className
    )

    const containerClasses = cn(
      "relative w-full",
      error && "mb-6" // Extra space for error message
    )

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <Label 
            htmlFor={props.id}
            className={cn(
              "block text-sm font-medium mb-2 text-charcoal-700 dark:text-charcoal-300",
              error && "text-error"
            )}
          >
            {label}
          </Label>
        )}

        {/* Textarea field */}
        <motion.textarea
          ref={ref}
          className={textareaClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          {...props}
        />

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2"
            >
              <p className="text-sm text-error flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-charcoal-500 dark:text-charcoal-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
