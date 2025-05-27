"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

export function Steps({ value, className, ...props }: StepsProps) {
  const [steps, setSteps] = React.useState<HTMLElement[]>([])

  React.useLayoutEffect(() => {
    const stepsContainer = document.getElementById("steps-container")
    if (stepsContainer) {
      const stepElements = Array.from(stepsContainer.querySelectorAll('[role="step"]'))
      setSteps(stepElements as HTMLElement[])
    }
  }, [])

  return (
    <div
      id="steps-container"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            index: index + 1,
            active: value === index + 1,
            completed: value > index + 1,
          })
        }
        return child
      })}
    </div>
  )
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  active?: boolean
  completed?: boolean
  title: string
}

export function Step({ index, active, completed, title, className, ...props }: StepProps) {
  return (
    <div
      role="step"
      aria-current={active ? "step" : undefined}
      className={cn(
        "flex-1 flex flex-col items-center gap-1 text-center relative",
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors",
            active
              ? "border-primary bg-primary text-primary-foreground"
              : completed
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/20 bg-background text-muted-foreground"
          )}
        >
          {completed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            index
          )}
        </div>
        {index !== undefined && index > 1 && (
          <div
            className={cn(
              "absolute right-full w-full h-[2px]",
              completed ? "bg-primary" : "bg-muted-foreground/20"
            )}
          />
        )}
        {index !== undefined && props.children && (
          <div
            className={cn(
              "absolute left-full w-full h-[2px]",
              active || completed ? "bg-primary" : "bg-muted-foreground/20"
            )}
          />
        )}
      </div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  )
}
