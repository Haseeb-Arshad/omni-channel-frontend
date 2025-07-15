"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  floatingLabel?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    label,
    error,
    helperText,
    floatingLabel = false,
    leftIcon,
    rightIcon,
    placeholder,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    React.useEffect(() => {
      if (inputRef.current) {
        setHasValue(inputRef.current.value.length > 0)
      }
    }, [props.value, props.defaultValue])

    const inputClasses = cn(
      // Base styles
      "flex h-12 w-full rounded-lg border-2 bg-card px-4 py-3 text-sm transition-all duration-normal",
      "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Charcoal theming
      "border-charcoal-200 text-charcoal-900 placeholder:text-charcoal-400",
      "dark:border-charcoal-700 dark:text-charcoal-100 dark:placeholder:text-charcoal-500",
      // Focus states
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-900/20 focus-visible:border-charcoal-900",
      "dark:focus-visible:ring-charcoal-100/20 dark:focus-visible:border-charcoal-100",
      // Error states
      error && "border-error focus-visible:ring-error/20 focus-visible:border-error",
      // Icon padding adjustments
      leftIcon && "pl-11",
      rightIcon && "pr-11",
      // Floating label adjustments
      floatingLabel && "pt-6 pb-2",
      className
    )

    const containerClasses = cn(
      "relative w-full",
      error && "mb-6" // Extra space for error message
    )

    return (
      <div className={containerClasses}>
        {/* Non-floating label */}
        {label && !floatingLabel && (
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

        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400 dark:text-charcoal-500">
              {leftIcon}
            </div>
          )}

          {/* Input field */}
          <motion.input
            ref={inputRef}
            type={type}
            className={inputClasses}
            placeholder={floatingLabel ? "" : placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            {...props}
          />

          {/* Floating label */}
          {floatingLabel && label && (
            <motion.label
              htmlFor={props.id}
              className={cn(
                "absolute left-4 pointer-events-none transition-all duration-normal",
                "text-charcoal-500 dark:text-charcoal-400",
                error && "text-error",
                (isFocused || hasValue) 
                  ? "top-2 text-xs font-medium" 
                  : "top-1/2 -translate-y-1/2 text-sm"
              )}
              animate={{
                y: (isFocused || hasValue) ? 0 : 0,
                scale: (isFocused || hasValue) ? 0.85 : 1,
                color: isFocused 
                  ? error 
                    ? "hsl(var(--error))" 
                    : "hsl(var(--charcoal-900))"
                  : error
                    ? "hsl(var(--error))"
                    : "hsl(var(--charcoal-500))"
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {label}
            </motion.label>
          )}

          {/* Right icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 dark:text-charcoal-500">
              {rightIcon}
            </div>
          )}
        </div>

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
Input.displayName = "Input"

export { Input }
