"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Form context for managing form state
interface FormContextType {
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  setFieldError: (field: string, error: string) => void
  clearFieldError: (field: string) => void
  setFieldTouched: (field: string, touched: boolean) => void
}

const FormContext = React.createContext<FormContextType | null>(null)

export const useFormContext = () => {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a Form component")
  }
  return context
}

// Form validation types
export type ValidationRule = {
  required?: boolean | string
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  email?: boolean | string
  custom?: (value: any) => string | undefined
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (data: Record<string, any>, event: React.FormEvent) => void | Promise<void>
  validation?: Record<string, ValidationRule>
  initialValues?: Record<string, any>
}

// Validation utilities
const validateField = (value: any, rules: ValidationRule): string | undefined => {
  // Required validation
  if (rules.required) {
    const isEmpty = value === undefined || value === null || value === ""
    if (isEmpty) {
      return typeof rules.required === "string" ? rules.required : "This field is required"
    }
  }

  // Skip other validations if field is empty and not required
  if (!value && !rules.required) return undefined

  // Email validation
  if (rules.email && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return typeof rules.email === "string" ? rules.email : "Please enter a valid email address"
    }
  }

  // Min length validation
  if (rules.minLength && value) {
    const minLength = typeof rules.minLength === "number" ? rules.minLength : rules.minLength.value
    if (value.length < minLength) {
      const message = typeof rules.minLength === "object" 
        ? rules.minLength.message 
        : `Must be at least ${minLength} characters`
      return message
    }
  }

  // Max length validation
  if (rules.maxLength && value) {
    const maxLength = typeof rules.maxLength === "number" ? rules.maxLength : rules.maxLength.value
    if (value.length > maxLength) {
      const message = typeof rules.maxLength === "object" 
        ? rules.maxLength.message 
        : `Must be no more than ${maxLength} characters`
      return message
    }
  }

  // Pattern validation
  if (rules.pattern && value) {
    const pattern = rules.pattern instanceof RegExp ? rules.pattern : rules.pattern.value
    if (!pattern.test(value)) {
      const message = rules.pattern instanceof RegExp 
        ? "Invalid format" 
        : rules.pattern.message
      return message
    }
  }

  // Custom validation
  if (rules.custom && value) {
    return rules.custom(value)
  }

  return undefined
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ 
    className, 
    onSubmit, 
    validation = {},
    initialValues = {},
    children,
    ...props 
  }, ref) => {
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [touched, setTouched] = React.useState<Record<string, boolean>>({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement>(null)

    React.useImperativeHandle(ref, () => formRef.current!)

    const setFieldError = React.useCallback((field: string, error: string) => {
      setErrors(prev => ({ ...prev, [field]: error }))
    }, [])

    const clearFieldError = React.useCallback((field: string) => {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }, [])

    const setFieldTouched = React.useCallback((field: string, touched: boolean) => {
      setTouched(prev => ({ ...prev, [field]: touched }))
    }, [])

    const validateForm = React.useCallback((formData: FormData) => {
      const newErrors: Record<string, string> = {}
      const data: Record<string, any> = {}

      // Extract form data
      for (const [key, value] of formData.entries()) {
        data[key] = value
      }

      // Validate each field
      Object.entries(validation).forEach(([field, rules]) => {
        const error = validateField(data[field], rules)
        if (error) {
          newErrors[field] = error
        }
      })

      setErrors(newErrors)
      return { isValid: Object.keys(newErrors).length === 0, data, errors: newErrors }
    }, [validation])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      
      if (!onSubmit) return

      const formData = new FormData(event.currentTarget)
      const { isValid, data } = validateForm(formData)

      // Mark all fields as touched
      const allFields = Object.keys(validation)
      const touchedFields = allFields.reduce((acc, field) => {
        acc[field] = true
        return acc
      }, {} as Record<string, boolean>)
      setTouched(touchedFields)

      if (!isValid) return

      setIsSubmitting(true)
      try {
        await onSubmit(data, event)
      } catch (error) {
        console.error("Form submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    }

    const contextValue: FormContextType = {
      errors,
      touched,
      isSubmitting,
      setFieldError,
      clearFieldError,
      setFieldTouched
    }

    return (
      <FormContext.Provider value={contextValue}>
        <motion.form
          ref={formRef}
          className={cn("space-y-6", className)}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          {...props}
        >
          {children}
        </motion.form>
      </FormContext.Provider>
    )
  }
)
Form.displayName = "Form"

// Form Field wrapper component
export interface FormFieldProps {
  name: string
  children: React.ReactElement
  className?: string
}

const FormField = ({ name, children, className }: FormFieldProps) => {
  const { errors, touched, setFieldTouched } = useFormContext()
  const error = touched[name] ? errors[name] : undefined

  const handleBlur = (event: React.FocusEvent) => {
    setFieldTouched(name, true)
    // Call original onBlur if it exists
    if (children.props.onBlur) {
      children.props.onBlur(event)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {React.cloneElement(children, {
        name,
        error,
        onBlur: handleBlur,
        ...children.props
      })}
    </div>
  )
}

// Form Submit Button with loading state
export interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText?: string
}

const FormSubmit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  ({ children, loadingText = "Submitting...", disabled, ...props }, ref) => {
    const { isSubmitting } = useFormContext()
    
    return (
      <motion.button
        ref={ref}
        type="submit"
        disabled={disabled || isSubmitting}
        className={cn(
          "w-full h-12 px-6 rounded-lg font-medium transition-all duration-normal",
          "bg-charcoal-900 text-charcoal-50 hover:bg-charcoal-800",
          "dark:bg-charcoal-50 dark:text-charcoal-900 dark:hover:bg-charcoal-100",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-900/20",
          "dark:focus-visible:ring-charcoal-100/20"
        )}
        whileHover={!disabled && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isSubmitting ? { scale: 0.98 } : {}}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.div
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              {loadingText}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }
)
FormSubmit.displayName = "FormSubmit"

export { Form, FormField, FormSubmit }