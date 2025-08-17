"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface EditorialHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function EditorialHeader({ title, subtitle, actions }: EditorialHeaderProps) {
  return (
    <header className={cn("editorial-section editorial-container")}> 
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <h1 className="h1">{title}</h1>
          {subtitle && <p className="subtle text-sm md:text-base">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}

interface StatProps {
  label: string
  value: string | number
  meta?: string
}

export function EditorialStatTile({ label, value, meta }: StatProps) {
  return (
    <div className="stat-tile">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {meta && <div className="meta">{meta}</div>}
    </div>
  )
}

interface PanelProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function EditorialPanel({ title, children, className }: PanelProps) {
  return (
    <section className={cn("editorial-section editorial-container")}> 
      <div className={cn("editorial-panel p-6", className)}>
        {title && <h2 className="h2 mb-4">{title}</h2>}
        {children}
      </div>
    </section>
  )
}

