"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-110 dark:hover:brightness-125",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        outline: "border border-primary/50 text-primary hover:bg-primary/10",
        secondary: "bg-secondary text-secondary-foreground hover:brightness-110 dark:hover:brightness-125",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "underline-offset-4 hover:underline text-primary",
        gradient: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90",
        glass: "glass-morphism text-foreground hover:opacity-90",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...(Comp === motion.button && {
          whileHover: { scale: 1.03, transition: { duration: 0.15 } },
          whileTap: { scale: 0.97, transition: { duration: 0.1 } },
        })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
